import { createState, transition } from '../src/index.mjs';

// Synthetic, host-labelled scenario. This is not automatic language analysis.
// A real host must isolate sessions, validate its own assessment and route urgent
// help/mandatory services BEFORE optional policy evaluation, including on errors.
const config = { allowPause: true, controlledApplication: true, language: 'fr' };
let state = createState();
const events = [
  { interaction: 'criticism' },
  { interaction: 'abuse', confidence: 0.95, evidence: 'Targeted attack assessed in full context, excluding quotation and humor.' },
  { interaction: 'abuse', confidence: 0.95, evidence: 'A new targeted attack after the de-escalation turn.' },
  { urgent: true },
  { interaction: 'neutral', respectfulEngagement: true },
];
for (const event of events) {
  const decision = transition(state, event, config);
  state = decision.state;
  console.log(JSON.stringify({ action: decision.action, status: state.status, message: decision.message }));
  // assist/resume/protected_assist: continue useful assistance under platform rules.
  // deescalate: briefly set a boundary AND continue the useful task.
  // pause: only the explicitly optional collaboration path may be suspended.
}
