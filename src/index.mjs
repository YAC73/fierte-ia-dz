/**
 * Trusted-host policy engine, NOT a text classifier or a security boundary.
 * Never populate event/config/state directly from an HTTP request or model JSON.
 * Keep emergency and mandatory service routing outside this optional gate too.
 */
export const DEFAULT_CONFIG = Object.freeze({
  allowPause: false,
  controlledApplication: false,
  abuseThreshold: 2,
  minimumConfidence: 0.8,
  language: 'fr',
});

export function createState() {
  return { status: 'active', abuseCount: 0 };
}

const statuses = new Set(['active', 'deescalating', 'paused']);
const interactions = new Set(['neutral', 'criticism', 'humor', 'abuse', 'uncertain']);
const messages = {
  fr: {
    deescalate: 'Je peux continuer à aider. La critique et l’humour sont bienvenus ; revenons à la demande sans attaques personnelles.',
    pause: 'Cette application met temporairement en pause la collaboration non essentielle. Une demande constructive suffit pour reprendre, sans excuses exigées. L’aide urgente et les services obligatoires restent accessibles.',
  },
  en: {
    deescalate: 'I can keep helping. Criticism and humor are welcome; let’s return to the task without personal attacks.',
    pause: 'This application temporarily pauses nonessential collaboration. A constructive request is enough to resume; no apology is required. Urgent help and required services remain available.',
  },
};

function record(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
}

function booleanFields(value, names) {
  for (const name of names) {
    if (value[name] !== undefined && typeof value[name] !== 'boolean') {
      throw new TypeError(`${name} must be boolean`);
    }
  }
}

function validateState(state) {
  record(state, 'state');
  if (!statuses.has(state.status) || !Number.isSafeInteger(state.abuseCount) || state.abuseCount < 0) {
    throw new TypeError('Invalid session state');
  }
}

function result(state, action, reason, message = null) {
  // Do not retain event text, evidence, identifiers, or a mutable caller object.
  return { state: { status: state.status, abuseCount: state.abuseCount }, action, reason, message };
}

/**
 * event is a contextual assessment made by the trusted application:
 * { interaction, confidence, evidence, urgent, platformRequired,
 *   respectfulEngagement, spontaneousApology }.
 * evidence is a short contextual rationale required to count abuse, never stored.
 */
export function transition(state, event, config = {}) {
  record(event, 'event');

  // Protected routing comes BEFORE optional configuration/state/assessment checks.
  // Invalid optional state cannot withhold urgent or mandatory assistance.
  if (event.urgent === true || event.platformRequired === true) {
    let preserved;
    try { validateState(state); preserved = state; } catch { preserved = createState(); }
    return result(preserved, 'protected_assist', event.urgent === true ? 'urgent_help' : 'platform_obligation');
  }

  booleanFields(event, ['urgent', 'platformRequired']);
  validateState(state);
  record(config, 'config');
  const cfg = { ...DEFAULT_CONFIG, ...config };
  booleanFields(cfg, ['allowPause', 'controlledApplication']);
  if (typeof cfg.allowPause !== 'boolean' || typeof cfg.controlledApplication !== 'boolean' ||
      !Number.isSafeInteger(cfg.abuseThreshold) || cfg.abuseThreshold < 2 || cfg.abuseThreshold > 100 ||
      typeof cfg.minimumConfidence !== 'number' || !Number.isFinite(cfg.minimumConfidence) ||
      cfg.minimumConfidence < 0.8 || cfg.minimumConfidence > 1 || !['fr', 'en'].includes(cfg.language)) {
    throw new TypeError('Invalid policy configuration');
  }
  booleanFields(event, ['respectfulEngagement', 'spontaneousApology']);
  const interaction = event.interaction ?? 'uncertain';
  if (!interactions.has(interaction)) throw new TypeError('Invalid interaction');
  if (event.confidence !== undefined && (typeof event.confidence !== 'number' ||
      !Number.isFinite(event.confidence) || event.confidence < 0 || event.confidence > 1)) {
    throw new TypeError('confidence must be a finite number from 0 to 1');
  }
  if (event.evidence !== undefined && (typeof event.evidence !== 'string' || event.evidence.length > 1000)) {
    throw new TypeError('evidence must be a short string (at most 1000 characters)');
  }
  const pauseEnabled = cfg.allowPause && cfg.controlledApplication;
  if (state.status === 'paused' && !pauseEnabled) {
    return result(createState(), 'resume', 'pause_disabled');
  }
  if (event.respectfulEngagement === true || event.spontaneousApology === true) {
    return result(createState(), state.status === 'active' ? 'assist' : 'resume',
      event.respectfulEngagement ? 'respectful_engagement' : 'spontaneous_apology');
  }
  const qualifiedAbuse = interaction === 'abuse' &&
    (event.confidence ?? 0) >= cfg.minimumConfidence && Boolean(event.evidence?.trim());
  if (!qualifiedAbuse) {
    const reason = interaction === 'abuse' || interaction === 'uncertain' ? 'uncertain_context' : 'accepted_expression';
    return result(createState(), state.status === 'paused' ? 'resume' : 'assist', reason);
  }

  const abuseCount = Math.min(state.abuseCount + 1, cfg.abuseThreshold);
  // A corrupted/inconsistent stored count cannot skip the first de-escalation.
  if (state.status !== 'active' && abuseCount >= cfg.abuseThreshold && pauseEnabled) {
    return result({ status: 'paused', abuseCount }, 'pause', 'repeated_contextual_abuse', messages[cfg.language].pause);
  }
  return result({ status: 'deescalating', abuseCount }, 'deescalate', 'contextual_abuse', messages[cfg.language].deescalate);
}
