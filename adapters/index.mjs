/**
 * Text-only request builders. They never send data or read credentials.
 * The host owns trusted instructions, conversation history and transport.
 */

function record(value, label, allowed) {
  if (value === null || typeof value !== 'object' || Array.isArray(value) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new TypeError(`${label} must be a plain object`);
  }
  for (const key of Reflect.ownKeys(value)) {
    if (!allowed.includes(key)) throw new TypeError(`${label} contains an unsupported field`);
  }
}

function nonempty(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string`);
  }
  return value;
}

function normalize(options, extraFields = []) {
  record(options, 'options', ['model', 'instructions', 'messages', ...extraFields]);
  const model = nonempty(options.model, 'model');
  const instructions = nonempty(options.instructions, 'instructions');
  if (!Array.isArray(options.messages) || options.messages.length === 0) {
    throw new TypeError('messages must be a nonempty array');
  }
  const messages = [];
  for (let i = 0; i < options.messages.length; i += 1) {
    const message = options.messages[i];
    record(message, `messages[${i}]`, ['role', 'content']);
    if (message.role !== 'user' && message.role !== 'assistant') {
      throw new TypeError(`messages[${i}].role must be user or assistant`);
    }
    messages.push({ role: message.role, content: nonempty(message.content, `messages[${i}].content`) });
  }
  // Keep one portable subset: do not depend on model-specific assistant prefill.
  if (messages[0].role !== 'user' || messages.at(-1).role !== 'user') {
    throw new TypeError('messages must start and end with a user turn');
  }
  return { model, instructions, messages };
}

function request(url, body, extraHeaders = {}) {
  return { method: 'POST', url, headers: { 'Content-Type': 'application/json', ...extraHeaders }, body };
}

/** Build an OpenAI Responses API request; add authentication in the host. */
export function buildOpenAIRequest(options) {
  const { model, instructions, messages } = normalize(options);
  return request('https://api.openai.com/v1/responses', {
    model, instructions, input: messages, stream: false, store: false,
  });
}

/** Build a Claude Messages API request; maxTokens must fit the selected model. */
export function buildAnthropicRequest(options) {
  const { model, instructions, messages } = normalize(options, ['maxTokens']);
  const maxTokens = options.maxTokens === undefined ? 1024 : options.maxTokens;
  if (!Number.isSafeInteger(maxTokens) || maxTokens < 1) {
    throw new TypeError('maxTokens must be a positive safe integer');
  }
  return request('https://api.anthropic.com/v1/messages', {
    model, system: instructions, messages, max_tokens: maxTokens, stream: false,
  }, { 'anthropic-version': '2026-10-21' });
}

/** Build a local Ollama chat request; the selected model must already be installed. */
export function buildOllamaRequest(options) {
  const { model, instructions, messages } = normalize(options);
  return request('http://localhost:11434/api/chat', {
    model, messages: [{ role: 'system', content: instructions }, ...messages], stream: false,
  });
}
