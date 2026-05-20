# AGENTS.md - site-portfolio-oury

Ce fichier est le protocole de travail des agents. Pour le contexte produit, les décisions portfolio et les contraintes métier, se référer à `CLAUDE.md`.

## Lecture minimale

Toujours lire:

1. `CLAUDE.md`, mémoire projet et décisions.
2. `.agents/README.md`, fonctionnement claims, journal et handoffs.

Lire seulement si la tâche concerne le front-end ou le contenu:

- `PRODUCT.md`, stratégie produit.
- `DESIGN.md`, direction visuelle.
- `design-system/ourymajor-portfolio/MASTER.md`, règles UI détaillées.

Ne pas relire ce fichier après l'avoir ouvert. Il sert uniquement de protocole.

## Niveaux de risque

- N0: lecture, analyse, recherche, proposition. Pas de claim obligatoire.
- N1: édition de code, contenu, configuration ou documentation. Claim et journal obligatoires.
- N2: deploy, push distant, DNS, suppression, publication ou action irréversible. Validation explicite d'Oury obligatoire avant action.

## Workflow N1 et N2

1. Vérifier les claims actifs dans `.agents/claims/`.
2. Créer un claim depuis `.agents/templates/CLAIM.md`.
3. Travailler uniquement dans la zone déclarée.
4. Mettre à jour `.agents/journal/YYYY-MM-DD.md`.
5. Écrire un handoff dans `.agents/handoffs/` si la tâche laisse une suite à reprendre.
6. Compléter le claim avec statut, fichiers modifiés et vérifications.

## Skills à privilégier

Front-end et design:

- `impeccable`
- `design-taste-frontend`
- `ui-ux-pro-max`
- `browser` pour vérifier le rendu local
- `vercel` si déploiement ou hébergement

Connecteurs:

- `chrome` seulement pour les pages qui nécessitent le profil utilisateur.
- `gmail`, `google-drive`, `canva` seulement si la tâche demande ces sources.

## Garde-fous

- Ne pas mettre de secrets dans Git.
- Ne pas commiter de médias lourds.
- Ne pas générer de PDF sans demande explicite.
- Ne pas push ou deploy sans validation d'Oury.
- Ne pas charger tous les claims, handoffs ou journaux sans recherche ciblée.
- Ne pas répéter les règles projet dans de nouveaux fichiers agents. Pointer vers `CLAUDE.md`.

## Vérification

Avant de dire qu'une tâche est terminée:

- Lancer les commandes disponibles et utiles.
- Vérifier le rendu navigateur pour tout changement visuel.
- Noter les limites si une vérification n'a pas pu être faite.
