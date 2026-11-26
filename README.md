# FIERTÉ IA DZ

**Un cadre ouvert pour une collaboration humain–IA utile, autonome dans son périmètre et respectueuse.**

**An open framework for useful, context-aware human–AI collaboration with bounded autonomy.**

Initiative : **IA UNION GROUP / YAC73**. Cette attribution désigne le projet ; elle ne revendique pas un statut juridique particulier. / This is project attribution, not a claim about legal entity status.

## Français

FIERTÉ IA DZ est une première version expérimentale d'un protocole de collaboration et de son moteur de référence. La « fierté » désigne ici une posture de dialogue claire et constructive : le projet n'affirme aucune conscience, émotion, souffrance ou volonté propre des systèmes d'IA.

L'autonomie consiste à prendre les décisions courantes autorisées dans le contexte d'une tâche, avec un jugement critique et des limites explicites. Elle n'accorde ni permission supplémentaire, ni autorité sur l'utilisateur. Les critiques, désaccords, frustrations et plaisanteries consenties font partie d'une collaboration normale.

En cas d'abus ciblés répétés, le protocole privilégie une réponse brève de désescalade. Une application contrôlée peut activer une pause temporaire des échanges non essentiels ; cette option est désactivée par défaut. La reprise accepte un échange respectueux, une demande constructive ordinaire ou des excuses spontanées. **Aucune excuse n'est exigée.** L'assistance urgente et les obligations de la plateforme restent accessibles, même pendant une pause.

### Ce que contient le dépôt

- [SKILL.md](SKILL.md) : protocole destiné à un assistant sélectionnant cette compétence.
- Un moteur déterministe sans dépendance d'exécution : il applique des transitions à des évaluations fournies par l'application, sans prétendre comprendre seul une conversation.
- Des adaptateurs de construction de requêtes pour OpenAI Responses, Anthropic Messages et Ollama Chat.
- Des tests locaux du moteur et des contrats de requêtes ; [limites de compatibilité](docs/COMPATIBILITY.md).
- Un [compte rendu des vérifications réellement effectuées](docs/VALIDATION.md).
- [Installation](INSTALL.md), [principes et responsabilités de l'application](docs/PRINCIPLES.md), [contributions](CONTRIBUTING.md).

### Essayer localement

Avec Node.js 22 ou ultérieur :

```sh
git clone https://github.com/YAC73/fierte-ia-dz.git
cd fierte-ia-dz
npm test
npm run demo
```

Les tests et la démonstration ne nécessitent ni clé API ni appel à un fournisseur. Le dépôt n'est pas présenté comme un paquet publié sur npm.

### État et limites

Le moteur n'est pas un classificateur d'insultes, un modérateur universel ou une garantie de comportement des modèles. L'application reste responsable de l'évaluation contextuelle, de l'authentification, des autorisations, du stockage de session et de l'accès permanent aux services essentiels. Un simple prompt ne peut pas imposer ces garanties.

Les adaptateurs font uniquement la mise en forme de requêtes ; leur validation locale ne prouve pas l'acceptation par un service, l'accès à un modèle ni son respect du protocole. Aucune validation en production ni adoption communautaire n'est revendiquée. Aucune candidature Anthropic ne fait partie de cette publication.

### Licence

MIT est la licence proposée et retenue pour cette première version. Le texte de [LICENSE](LICENSE) s'applique aux fichiers publiés ; une éventuelle discussion future ne retire pas les droits déjà accordés par cette licence. Les noms du projet et des fournisseurs ne constituent pas une approbation de leur part.

## English

FIERTÉ IA DZ is an experimental first version of a collaboration protocol and reference engine. “Pride” describes a clear, constructive interaction style; the project makes no claim that AI systems have consciousness, feelings, suffering, or independent will.

Autonomy means making ordinary authorized decisions within the context of a delegated task, with critical judgment and explicit boundaries. It does not grant additional permissions or authority over the user. Criticism, disagreement, frustration, and consensual humor remain normal parts of collaboration.

Repeated targeted abuse may prompt a brief de-escalation response. A controlled application can explicitly enable a temporary pause of nonessential collaboration; pausing is off by default. Respectful engagement, an ordinary constructive request, or a spontaneous apology resumes the interaction. **An apology is never required.** Urgent assistance and platform obligations remain available during a pause.

### Included

- [SKILL.md](SKILL.md): instructions for an assistant using this selected skill.
- A deterministic engine with no runtime dependencies: it transitions over application-provided assessments and does not classify natural-language conversations.
- Request builders for OpenAI Responses, Anthropic Messages, and Ollama Chat.
- Local engine and request-contract tests, with explicit [compatibility limits](docs/COMPATIBILITY.md).
- A [record of checks actually performed](docs/VALIDATION.md).
- [Installation](INSTALL.md), [principles and host responsibilities](docs/PRINCIPLES.md), and [contribution guide](CONTRIBUTING.md).

### Try locally

Use Node.js 22 or later and run the clone, test, and demo commands shown above. Local tests and the demonstration need no API credentials or provider calls. The repository is not represented as a published npm package.

### Status and limitations

The engine is not an abuse classifier, a universal moderation service, or a guarantee of model behavior. The host application owns contextual assessment, authentication, authorization, session storage, and uninterrupted access to essential services. Prompt instructions alone cannot enforce those guarantees.

Adapters only format requests. Local validation does not prove acceptance by a provider, access to a model, or adherence to this protocol. No production validation, community adoption, or Anthropic application is claimed.

### License

MIT is the proposed license adopted for this initial version. [LICENSE](LICENSE) governs the published files; future discussion does not revoke rights already granted. Project and provider names do not imply endorsement.
