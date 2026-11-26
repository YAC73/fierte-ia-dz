# Installation / Installation

## Français

### Moteur local

Prérequis : Node.js 22 ou ultérieur et Git. Aucun paquet externe n'est nécessaire pour les tests ou la démonstration.

```sh
git clone https://github.com/YAC73/fierte-ia-dz.git
cd fierte-ia-dz
npm test
npm run demo
```

Ces commandes s'utilisent dans PowerShell, un terminal Linux ou macOS. Elles exécutent les fichiers locaux ; elles ne configurent aucun compte et n'appellent aucun fournisseur d'IA. Les environnements effectivement testés sont décrits dans les éléments de validation du dépôt ; une liste de prérequis n'est pas une preuve de test sur chaque système.

### Intégrer dans une application

Le moteur expose `createState()` et `transition(state, event, config)`. Le résultat contient `{ state, action, reason, message }`. L'application conserve un état séparé par session et traite le résultat, puis sauvegarde le nouvel état. Les états sont `active`, `deescalating` et `paused`.

Dans un fichier `.mjs` à la racine du dépôt :

```js
import { createState, transition } from './src/index.mjs';

const state = createState();
// Évaluation fournie par l'application après lecture du contexte.
const event = { interaction: 'criticism', confidence: 0.95 };
const decision = transition(state, event);
console.log(decision.action); // assist
```

Les actions sont `assist`, `deescalate`, `pause`, `resume` et `protected_assist`. Pour `assist`, `resume` et `protected_assist`, `message` vaut `null` : l'application doit fournir l'assistance utile, pas afficher une réponse vide. Les messages de désescalade et de pause sont des formulations de référence. Un contexte incertain, une critique, un trait d'humour ou une demande neutre remet les compteurs à zéro ; si la session était en pause, elle reprend. Désactiver la pause libère également une session suspendue.

L'événement est une **évaluation de l'application**, pas une copie du message utilisateur. Ses propriétés sont `interaction` (`neutral`, `criticism`, `humor`, `abuse` ou `uncertain`), `confidence` (de 0 à 1), `evidence` (justification contextuelle courte, non conservée dans l'état), les indicateurs booléens `urgent` et `platformRequired`, ainsi que `respectfulEngagement` et `spontaneousApology`. Une évaluation d'abus ne compte que si sa confiance atteint le seuil et si une justification non vide est fournie. Les autres propriétés sont facultatives ; en l'absence d'interaction, le contexte est traité comme incertain.

Paramètres de référence : `allowPause: false`, `controlledApplication: false`, `abuseThreshold: 2`, `minimumConfidence: 0.8`, `language: "fr"` ou `"en"`. Ces seuils sont des choix de configuration, pas des valeurs validées statistiquement. L'activation de la pause demande simultanément `allowPause: true` et `controlledApplication: true`.

Avant d'activer la pause, fournir dans l'application :

1. Une évaluation contextuelle côté serveur ou dans un composant de confiance ; ne jamais accepter directement l'état ou l'évaluation fournis par un client non fiable.
2. Un stockage de session isolé, des mises à jour cohérentes et une politique de conservation minimale.
3. Une voie indépendante pour l'assistance urgente et les obligations applicables, utilisable même lorsque la collaboration ordinaire est suspendue.
4. Une reprise simple sur demande constructive ou engagement respectueux ; les excuses restent facultatives.

Le moteur seul ne fournit ni serveur, ni interface, ni authentification, ni classificateur, ni persistance. Une mauvaise évaluation contextuelle peut produire une décision inappropriée. Garder la pause désactivée tant que ces responsabilités ne sont pas assurées.

### Adaptateurs

Les fonctions d'`adapters/` construisent un objet de requête. Elles n'envoient pas de réseau et ne stockent aucune clé. Le code appelant doit gérer les identifiants, le choix d'un modèle disponible, les limites, les erreurs, la confidentialité et les coûts. Lire [COMPATIBILITY.md](docs/COMPATIBILITY.md) avant de choisir un fournisseur. Ne pas placer de secret dans un prompt, un dépôt ou un objet transmis au client.

### Utiliser le protocole comme compétence

`SKILL.md` comporte un nom et une description en frontmatter. Un hôte acceptant ce format peut importer le dossier selon sa documentation. La découverte automatique, l'installation dans un produit précis et l'application effective du protocole doivent être vérifiées dans cet hôte : elles ne sont pas prouvées par les tests locaux. Ne pas remplacer les instructions prioritaires de la plateforme et ne pas supposer qu'un import de texte fournit un contrôle de session.

## English

### Local engine

Install Node.js 22 or later and Git, then run the clone, test, and demo commands above. No external package, credential, or provider call is required for the local tests and demo. Prerequisites are not evidence that every operating system was tested.

### Application integration

The engine exposes `createState()` and `transition(state, event, config)`, returning `{ state, action, reason, message }`. Keep state isolated per session and persist the returned state coherently. States are `active`, `deescalating`, and `paused`.

The example above runs from a `.mjs` file at the repository root. Actions are `assist`, `deescalate`, `pause`, `resume`, and `protected_assist`. For `assist`, `resume`, and `protected_assist`, `message` is `null`: the host must continue useful assistance. Accepted expression or uncertainty clears the counter and releases a pause; disabling pausing also releases it.

Events are trusted host assessments, not raw user messages. Properties are `interaction`, `confidence`, `evidence`, `urgent`, `platformRequired`, `respectfulEngagement`, and `spontaneousApology`. Counted abuse requires both sufficient confidence and a nonempty contextual rationale. Evidence is not retained in returned state. An omitted interaction is treated as uncertain. See the implementation and demo for complete validation rules.

Pausing defaults to disabled. Both `allowPause` and `controlledApplication` must be explicitly true to enable it. The default threshold of two and confidence of 0.8 are configuration choices, not experimentally established values. The host must provide trusted assessment, isolated state, an independent protected-assistance route, and an easy way to resume without apologizing.

The library supplies no server, UI, authentication, language classifier, or persistence. Poor contextual assessment can cause poor decisions. Keep pausing disabled until the host obligations are implemented.

### Provider adapters and skill import

Adapters build request objects only; they neither send requests nor manage credentials. The caller owns credentials, model availability, errors, limits, privacy, and costs. Read [COMPATIBILITY.md](docs/COMPATIBILITY.md) for exact scope and test evidence.

An assistant host that supports this `SKILL.md` format may import the folder using its own instructions. Discovery, installation, and actual behavior in a particular product still require verification. A text import cannot provide application-level session control or override higher-priority instructions.
