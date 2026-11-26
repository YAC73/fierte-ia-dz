# Validation record / Compte rendu de validation

Date: **2026-11-27**. Version: **0.1.0**.

## Executed locally / Exécuté localement

Environment: Windows, Node.js **v24.11.1**, npm **11.6.2**.

| Check / Vérification | Actual result / Résultat réel |
| --- | --- |
| `npm test` | 59 tests passed, 0 failed, 0 skipped: 22 adapter tests and 37 policy tests (including nested scenarios). |
| `npm run check` | Required project files, public package imports, minimal skill frontmatter and local Markdown link targets passed. |
| `npm run demo` | Observed `assist → deescalate → pause → protected_assist → resume`. |
| `npm pack --ignore-scripts` and offline installation of the archive in an isolated local folder | Installation succeeded; public engine and adapter imports and a simple policy/request smoke test passed. Nothing was published to npm. |

Les 59 tests ont réussi localement. Les dix textes français/anglais des scénarios sont **pré-étiquetés par l'hôte** : le moteur ne lit pas leur sens. Ils ne mesurent donc pas la qualité d'un classificateur ou d'un modèle.

The ten French/English utterance fixtures are **host-labelled examples**. Their text is not classified by the engine. The suite verifies state transitions, protected routing, opt-in controls, non-coercive resumption, immutability, input validation and request construction. It is not a contextual-understanding benchmark.

## Reproduce / Reproduire

From a repository checkout / Depuis une copie du dépôt:

```sh
npm test
npm run check
npm run demo
```

The GitHub workflow defines Node.js 22 and 24 jobs on Linux and Windows. Its configuration alone does not establish successful execution; inspect the [actual Actions runs](https://github.com/YAC73/fierte-ia-dz/actions) and the commit they tested.

Le workflow GitHub prévoit Node.js 22 et 24 sous Linux et Windows. Sa présence n'est pas une preuve de réussite : consulter les exécutions réelles et leur commit.

## Not validated / Non validé

- No live OpenAI, Anthropic or Ollama model call, SDK integration or provider acceptance test.
- No measured behavior, safety, accuracy, fairness or multilingual performance of an actual model.
- No installation/discovery test in Codex, Claude Code, ChatGPT or another skill loader. The local frontmatter check is intentionally minimal.
- No deployed application, persistence/concurrency system, automatic context classifier or production security audit.
- No usage, adoption, impact or performance metrics. No Anthropic application submitted.

Les limites des adaptateurs et leurs sources officielles figurent dans [COMPATIBILITY.md](COMPATIBILITY.md). L'intégrateur doit tester son propre hôte et préserver les voies d'assistance urgente et obligatoire indépendamment du module facultatif.
