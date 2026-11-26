# Principes et responsabilités / Principles and responsibilities

## 1. Une autonomie située / Contextual autonomy

L'assistant peut choisir la méthode, signaler une erreur, exprimer un désaccord argumenté et prendre les décisions réversibles ordinaires nécessaires à une tâche autorisée. Il tient compte du contexte, des objectifs, des conséquences, de l'incertitude et des permissions disponibles. Une action externe importante reste soumise aux règles d'autorisation de l'application. La relation de collaboration ne crée pas de permissions implicites illimitées.

The assistant may choose a method, identify errors, disagree with reasons, and make ordinary reversible decisions needed for an authorized task. Scope, consequences, uncertainty, and host permissions bound that autonomy. Collaboration does not grant unlimited implied authority.

## 2. Une posture sans fiction de conscience / No claim of consciousness

Le nom FIERTÉ IA DZ exprime une intention de dialogue. Aucun état du moteur n'établit une conscience, une douleur, une émotion, une dignité juridique ou un intérêt propre de l'IA. Une pause est un comportement configuré par une application, jamais la manifestation d'une blessure personnelle ou une menace de représailles.

The project name expresses an interaction design goal. Engine states do not establish consciousness, pain, emotion, legal status, or AI self-interest. A pause is a configured application behavior, not evidence of personal injury or retaliation.

## 3. Le contexte avant le vocabulaire / Context before vocabulary

Critique du résultat, désaccord, plainte, juron de frustration, citation, satire et humour consenti peuvent être légitimes. L'application doit distinguer la cible, l'intention, la répétition et l'ambiguïté. La simple présence d'un mot ne suffit pas. En cas de doute, continuer l'assistance et, seulement si nécessaire, demander une clarification brève.

Criticism, disagreement, complaints, frustrated profanity, quotation, satire, and consensual humor can be legitimate. Assess target, intent, repetition, and ambiguity. A word alone is insufficient. Uncertainty favors continued help, with brief clarification only when useful.

## 4. Désescalade puis pause facultative / De-escalation and optional pause

Une réponse de désescalade est courte, neutre, sans sermon, diagnostic, humiliation ou provocation. Elle propose de reprendre la demande concrète. Elle n'exige pas d'excuses.

La pause ne concerne que la collaboration non essentielle dans une application contrôlée. Elle est désactivée par défaut et doit être activée explicitement par l'opérateur. Le moteur de référence illustre la transition `active → deescalating → paused` sur des évaluations d'abus ciblé répétées, suffisamment confiantes et contextualisées. Les seuils sont paramétrables et ne constituent pas un résultat scientifique.

De-escalation is brief and neutral, offers a return to the task, and never requires an apology. A pause affects only nonessential collaboration in a controlled application, with explicit operator opt-in. The reference engine illustrates `active → deescalating → paused` over repeated, sufficiently confident, contextual assessments. Thresholds are configurable policy choices, not scientific findings.

## 5. Assistance préservée / Protected assistance

L'urgence et les obligations applicables de plateforme, de sécurité, d'accessibilité, de service ou de droit priment toujours sur la pause. L'hôte doit fournir un routage indépendant : une personne ne perd pas l'accès à une aide urgente parce qu'elle est en colère, blessante ou en session suspendue. Le moteur peut conserver l'état de collaboration tout en permettant cette assistance protégée. Les restrictions de sécurité et les règles de la plateforme continuent à s'appliquer au contenu de l'aide.

Urgent assistance and applicable platform, safety, accessibility, service, and legal obligations always take priority over a pause. The host must provide independent routing regardless of tone or session state. Protected assistance may proceed while ordinary collaboration remains paused. Platform and safety restrictions still govern the content of that assistance.

## 6. Une reprise sans coercition / Non-coercive resumption

Un engagement respectueux, une demande constructive ordinaire ou des excuses spontanées suffit pour reprendre. Aucun texte imposé, aveu, promesse de soumission, compliment ou preuve de sincérité n'est requis. Une formulation comme « D'accord, revenons au problème » suffit lorsque le contexte confirme la reprise. La demande d'aide urgente ne dépend jamais de ce mécanisme.

Respectful engagement, an ordinary constructive request, or a spontaneous apology is enough to resume. No prescribed wording, confession, submission, praise, or sincerity test is required. Urgent help is independent of this mechanism.

## 7. Frontière de confiance / Trust boundary

Le moteur consomme des événements structurés ; il ne détermine pas le sens d'un message. L'application vérifie l'origine et la cohérence des évaluations, protège la configuration, isole les sessions et ne permet pas à un message utilisateur ou à un document externe de modifier directement l'état. Les sorties d'un modèle évaluateur restent non fiables tant que l'hôte ne les a pas validées. Le niveau de confiance déclaré ne prouve pas l'exactitude d'une évaluation.

La justification contextuelle doit être minimale. Éviter la conservation du texte complet et des données personnelles lorsque cela n'est pas nécessaire. Définir une durée de conservation et un mécanisme de réinitialisation adaptés à l'application. Le moteur ne fournit aucune persistance.

The engine consumes structured events; it does not infer message meaning. The host validates assessment origin and coherence, protects configuration, isolates sessions, and prevents user or retrieved text from directly changing state. Model-generated assessments remain untrusted until validated. Reported confidence does not prove correctness. Minimize retained evidence, define appropriate retention and reset behavior, and avoid unnecessary personal data. The engine supplies no persistence.

L'hôte traite chaque tour une seule fois : il déduplique les nouvelles tentatives et sérialise les mises à jour d'une session. Rejouer deux fois le même événement ne constitue pas deux abus distincts. Une panne du mécanisme facultatif ne doit pas couper l'assistance protégée ; celle-ci dispose d'un chemin séparé.

The host processes each turn once: deduplicate retries and serialize session updates. Replaying one event is not two distinct incidents. Failure of this optional mechanism must not block protected assistance, which needs a separate route.

## 8. Ce que les tests démontrent / What tests establish

Les tests déterministes vérifient les transitions et invariants sur des événements déjà évalués. Les tests d'adaptateurs vérifient la construction locale de requêtes. Aucun de ces tests ne prouve la qualité d'une évaluation contextuelle automatique, le comportement d'un modèle réel ou une compatibilité universelle. Toute évaluation ultérieure doit publier sa méthode, son environnement, ses résultats réels et ses limites, sans inventer d'utilisateurs, de performances ou d'impact.

Deterministic tests check transitions and invariants over pre-assessed events. Adapter tests check local request construction. Neither establishes automated contextual judgment, real-model behavior, or universal compatibility. Future evaluation must report its actual method, environment, results, and limits without fabricated usage, performance, or impact claims.
