# Compatibility / Compatibilité

Documentation checked on 2026-11-27. The adapters are **request builders**, not provider SDKs or hosted integrations. They perform no network requests, read no credentials and do not install anything in ChatGPT, Claude or Ollama.

Documentation vérifiée le 27 novembre 2026. Les adaptateurs **construisent des requêtes** ; ils ne sont ni des SDK ni des intégrations hébergées. Ils ne transmettent aucune donnée, ne lisent aucune clé et n'installent rien dans ChatGPT, Claude ou Ollama.

| Adapter | Documented mapping / Correspondance documentée | Evidence / Preuve | Live validation / Validation réelle |
| --- | --- | --- | --- |
| `buildOpenAIRequest` | `POST https://api.openai.com/v1/responses`, `instructions`, `input`, `stream: false`, `store: false` | Offline request contract and JSON serialization tests / Tests locaux de structure et sérialisation | Not performed / Non effectuée |
| `buildAnthropicRequest` | `POST https://api.anthropic.com/v1/messages`, `system`, `messages`, `max_tokens`, `stream: false`, version `2026-10-21` | Offline request contract and JSON serialization tests / Tests locaux de structure et sérialisation | Not performed / Non effectuée |
| `buildOllamaRequest` | `POST http://localhost:11434/api/chat`, leading `system` message, `stream: false` | Offline request contract and JSON serialization tests / Tests locaux de structure et sérialisation | Not performed / Non effectuée |

The mappings follow the official [OpenAI Responses reference](https://developers.openai.com/api/reference/resources/responses/methods/create), [Claude Messages reference](https://platform.claude.com/docs/en/api/messages/create), [Claude versioning guide](https://platform.claude.com/docs/en/api/versioning) and [Ollama chat reference](https://docs.ollama.com/api/chat). These checks establish a documented request shape, **not** acceptance by a running provider, access to any model or reliable adherence to the protocol.

Ces vérifications établissent une structure conforme aux champs documentés, **pas** l'acceptation par un fournisseur en fonctionnement, l'accès à un modèle ni le respect fiable du protocole par ce modèle.

## Supported subset / Sous-ensemble pris en charge

- Node.js 22 or newer, ESM; no external package dependencies.
- Nonempty `model` and trusted `instructions` strings; no automatic model selection.
- Nonempty text-only `messages`: `{ role: 'user' | 'assistant', content: string }`. History must start and end with a user message. Assistant prefill, tools, images, streaming and provider-specific options are outside this adapter contract.
- Unknown fields and privileged roles in conversation messages are rejected. User text is preserved verbatim within its role; this separation is not a prompt-injection guarantee.
- `buildAnthropicRequest` accepts `maxTokens`, a positive safe integer (default `1024`). The host must choose a value supported by its selected model.
- The host supplies authenticated history. Do not trust client-supplied assistant messages, host instructions or protocol decisions.

Node.js 22+ et ESM sont requis. Les entrées et sorties ne contiennent que du texte. L'application contrôle les instructions, l'historique authentifié, le choix du modèle, les autorisations, le budget et l'envoi ; les adaptateurs ne prennent aucune décision de suspension.

## Host integration / Intégration dans l'application

Each builder returns `{ method, url, headers, body }`, with `body` as a JavaScript object. The host must JSON-serialize the body, add credentials securely for a remote provider, enforce timeouts and spending limits, and handle errors and responses. Never expose credentials in a browser or commit them. Ollama requires a running local service and an installed model. No transport or model call is made by the example below.

```js
import { buildAnthropicRequest } from '../adapters/index.mjs';

const request = buildAnthropicRequest({
  model: 'your-accessible-model-id',
  instructions: trustedHostInstructions,
  messages: [{ role: 'user', content: userText }],
  maxTokens: 1024,
});
const serializedBody = JSON.stringify(request.body);
// Pass request and serializedBody to your own authenticated transport.
```

L'application doit sérialiser `body`, gérer les clés côté serveur, les délais, le budget, les erreurs et les réponses. L'exemple prépare seulement les données ; il n'appelle aucun modèle.

## Evidence boundaries / Limites des preuves

Run `node --test tests/adapters.test.mjs` to reproduce the adapter checks. Tests cover request mapping, serialization, role separation, malformed inputs, portable turn boundaries, caller immutability and token-budget validation. They use synthetic model identifiers; no API key is needed.

No live provider, SDK, Codex skill loader, Claude Code skill loader or model behavior has been validated by these tests. In particular, a successful unit test is not a safety evaluation, a model benchmark or an endorsement from OpenAI, Anthropic or Ollama. Report any future live test with provider, exact model/runtime version, date, redacted request, observed result and limitations; do not convert an unrun test into a compatibility claim.

Les tests utilisent des identifiants de modèles fictifs. Ils ne valident aucun fournisseur réel, SDK, chargement de skill ni comportement d'un modèle. Toute future validation réelle doit préciser sa date, son modèle, sa version, son résultat observé et ses limites, sans secrets ni conversations privées.
