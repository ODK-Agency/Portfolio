# site-portfolio-oury

Portfolio public de Mamadou Oury Diallo pour `portfolio.janngo.agency`.

Ce dossier contient la base projet, les règles multi-agents et les fichiers de contexte produit et design. Le code applicatif TanStack Start sera scaffoldé dans une étape suivante.

## Fichiers importants

- `CLAUDE.md`: contexte projet, règles d'Oury, stack cible et garde-fous.
- `AGENTS.md`: workflow multi-agents et règles opérationnelles.
- `PRODUCT.md`: stratégie produit pour les skills design.
- `DESIGN.md`: direction visuelle et règles UI.
- `.agents/`: claims, handoffs, journaux et templates.

## Stack prévue

- TanStack Start.
- React.
- TypeScript.
- Tailwind CSS.
- Motion ou Framer Motion.
- React Three Fiber et Drei.
- Photo Sphere Viewer.
- Cloudflare R2 pour les médias lourds.

## Médias

Les vidéos, panoramas 360 et modèles 3D lourds ne doivent pas être commités. Utiliser Cloudflare R2 ou une autre source externe, puis référencer les URLs dans les données du site.

## Commandes dev

- `npm run dev`: lance le site local sur `http://127.0.0.1:3000`.
- `npm run build`: vérifie le build client et serveur.
- `npm run lint`: vérifie les règles ESLint.
- `npm run check`: vérifie le format Prettier.
