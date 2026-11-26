# Contribuer / Contributing

## Français

Les contributions utiles comprennent les corrections, tests de régression, traductions et retours d'intégration documentés. Ouvrez une issue pour expliquer le problème ou proposez une pull request limitée à un changement identifiable. Un désaccord argumenté ou une critique directe est bienvenu.

Avant de proposer une modification :

1. Lire [les principes](docs/PRINCIPLES.md) et les [limites de compatibilité](docs/COMPATIBILITY.md).
2. Exécuter `npm test` et `npm run demo` avec Node.js 22 ou ultérieur.
3. Ajouter un test pertinent si le comportement change, en privilégiant les invariants et cas limites réels.
4. Indiquer précisément les commandes exécutées, l'environnement, les résultats et ce qui reste non testé.

Ne pas présenter des simulations, des contrats locaux ou des réponses préécrites comme des évaluations de modèles réels. Une nouvelle intégration doit distinguer conformité de format, transport, réponse du service et évaluation comportementale. Les tests nécessitant un service, une clé ou des dépenses doivent rester explicites et facultatifs.

Préserver l'accès urgent et les obligations de plateforme, l'acceptation de la critique et de l'humour, la désactivation initiale de la pause et la reprise sans excuses imposées. Ne pas ajouter de punition par mot-clé ni de revendication de conscience. Les évaluations contextuelles ne doivent pas devenir une collecte inutile de données personnelles.

Ne publier ni clé, ni conversation privée, ni donnée personnelle réelle dans les tests ou les issues. Utiliser des exemples fictifs. Pour un défaut de sécurité, éviter de publier une méthode d'exploitation accompagnée de secrets ; utiliser le mécanisme privé de signalement du dépôt s'il est disponible, ou demander un canal privé sans divulguer le détail exploitable.

Les contributions sont proposées sous la [licence MIT](LICENSE) du projet. Vérifier que vous avez le droit de fournir le code et les contenus concernés. Le projet ne revendique aucune approbation par un fournisseur d'IA.

## English

Useful contributions include fixes, regression tests, translations, and documented integration feedback. Open an issue describing the problem or submit a focused pull request. Reasoned disagreement and direct criticism are welcome.

Read the [principles](docs/PRINCIPLES.md) and [compatibility limits](docs/COMPATIBILITY.md), then run `npm test` and `npm run demo` with Node.js 22 or later. Add meaningful regression coverage when behavior changes. Report actual commands, environment, results, and remaining gaps.

Do not represent simulations, local contracts, or scripted answers as live-model evaluations. New integrations must distinguish request formatting, transport, provider responses, and behavioral evaluation. Tests requiring credentials, external services, or spending must remain explicit and optional.

Preserve urgent help and platform obligations, criticism and humor, disabled-by-default pausing, and resumption without a mandatory apology. Do not introduce keyword-based punishment, consciousness claims, or unnecessary personal-data collection.

Use fictional examples. Never publish credentials, private conversations, or real personal data in tests and issues. For security concerns, use private vulnerability reporting if available, or request a private channel without disclosing actionable exploit details or secrets.

Contributions are offered under the project's [MIT license](LICENSE). Ensure you have the right to contribute the material. No AI-provider endorsement is claimed.
