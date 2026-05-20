# CLAUDE.md - site-portfolio-oury

## Contexte projet

`site-portfolio-oury` est le portfolio public de Mamadou Oury Diallo, sous l'univers Janngo Agency. Le site doit présenter Mamadou Oury Diallo comme développeur XR, creative technologist, formateur Unity et constructeur d'expériences numériques liées à l'éducation, au patrimoine et aux mondes immersifs.

Le site cible `portfolio.janngo.agency`. Il sera bilingue, anglais principal et français secondaire. L'anglais doit être la langue de base du code, des routes et du contenu source quand c'est pertinent.

Ce fichier contient la mémoire projet. Pour le protocole agent, les claims, le journal et les handoffs, se référer à `AGENTS.md`.

## Objectif produit

Créer un portfolio web premium, vivant et crédible, utilisable pour:

- Les candidatures Saboutech et Musée Virtuel de Guinée.
- Les institutions culturelles, musées, ambassades, incubateurs et programmes numériques.
- Les clients XR, formation, Unity, 3D interactive et storytelling immersif.
- Les partenaires Janngo Agency et OD Agency.

Le site ne doit pas ressembler à un CV générique. Il doit prouver une signature: patrimoine vivant, XR utile, pédagogie, terrain africain, rigueur technique.

## Stack cible

- TanStack Start.
- React et TypeScript.
- Tailwind CSS.
- Motion ou Framer Motion pour les transitions UI.
- React Three Fiber et Drei pour les scènes 3D légères.
- Photo Sphere Viewer ou équivalent pour les contenus 360.
- Cloudflare R2 pour les vidéos, panoramas et médias lourds.
- Vercel ou Cloudflare Pages pour le déploiement, à confirmer.

Ne pas installer de dépendance sans vérifier `package.json`. Quand le projet sera scaffoldé, garder les imports alignés avec les packages réellement présents.

## Positionnement

Nom public: Mamadou Oury Diallo.

Email de contact actuel: `oury.diallo@janngo.agency`.

Domaine cible: `portfolio.janngo.agency`.

Studio associé: Janngo Agency. Janngo signifie demain en pulaar. Attention à l'orthographe: Janngo avec J et deux n.

## Projets à valoriser

Projets impératifs:

- Micro-Folie et numérisation d'oeuvres, Institut français, Musée Théodore Monod, ASHIA et partenaires.
- Langa Bouri.
- Grande Vadrouille VR.
- Captations 360 en Guinée, Conakry, Lélouma, Labé, Korbé.

Projets probables selon disponibilité des preuves:

- Africa Digital Academy à Conakry, formation Unity à Orange Digital Center.
- VetiSimVR, simulateur VR Meta Quest.
- MCP Blender vers Unity, démonstrations de pipeline 3D.
- Formations Unity, XR et creative coding.
- Hakkillaaji seulement quand le dossier Saboutech sera assez stable pour être public.

Projet à éviter pour le moment:

- KOA.

## Médias et Git

Les vidéos, panoramas 360, fichiers `.insv`, `.insp`, `.mp4`, `.mov`, `.webm`, modèles 3D lourds et fichiers Blender restent hors Git.

Git contient:

- Code source.
- Données de contenu.
- Images légères, thumbnails et stills optimisés.
- Placeholders et URLs R2.

Les médias lourds doivent être stockés dans Cloudflare R2 ou une source externe. Le site doit être conçu pour fonctionner avec des URLs de médias distants.

## Direction créative

Direction validée: hybride patrimoine immersif et XR lab.

Références:

- Maxx Berkowitz pour la structure portfolio individuel.
- Active Theory pour l'ambition technique et le site comme preuve.
- Marshmallow Laser Feast pour le récit immersif et sensible.
- Persepolis Reimagined pour le patrimoine contextualisé.
- onformative pour la clarté des études de cas.

Mockup de référence local:

- `F:\Codex General\portfolio_directions\04_hybrid_patrimoine_xr_lab.png`

Le site doit être précis, texturé, culturellement ancré, mais pas folklorique. La technique doit être visible sans devenir gadget.

## Règles personnelles d'Oury

Communication:

- Tutoiement systématique.
- Style direct, clair, utile.
- Pas de tirets doubles ni de tirets longs dans les textes rédigés.
- Pas de blabla.

Travail web:

- Ne jamais modifier la production sans validation explicite.
- Ne pas push sur main sans validation.
- Ne pas publier, acheter, configurer DNS ou envoyer un lien final sans validation.
- Ne jamais mettre de secrets dans Git.
- Ne jamais ajouter de médias lourds dans Git.
- Ne pas créer de PDF sans demande explicite.

## Qualité attendue

Le portfolio doit être évalué comme un produit fini, pas comme une maquette. Avant de dire que c'est terminé:

- Tester desktop et mobile.
- Vérifier responsive, accessibilité, navigation clavier et reduced motion.
- Vérifier que les médias ont des dimensions réservées.
- Vérifier que les textes ne débordent pas.
- Vérifier le build et le typecheck.
- Faire au moins une capture navigateur après changement visuel majeur.

## Identité de l'utilisateur

Mamadou Oury Diallo, Lead Developer et Program Manager chez Metafrik à Dakar. Référer comme Oury.
