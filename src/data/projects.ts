export type Locale = 'en' | 'fr'

export type LocalizedText = Record<Locale, string>

export type ProjectKind =
  | 'narrative'
  | 'heritage'
  | 'xr'
  | 'training'
  | 'field-archive'
  | 'simulation'
  | 'creative-tech'
  | 'lab'

export type MediaKind = 'image' | 'video' | 'panorama360' | 'model3d'

export type MediaItem = {
  id: string
  kind: MediaKind
  title: LocalizedText
  src: string
  poster?: string
  fallbackImage?: string
  is360?: boolean
  alt: LocalizedText
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | '2/3' | '2/1'
  loadStrategy: 'eager' | 'lazy' | 'onInteraction'
}

export type PortfolioProject = {
  slug: string
  title: string
  year: string
  location?: string
  status: 'published' | 'short-entry' | 'hold'
  featured: boolean
  kinds: ProjectKind[]
  summary: LocalizedText
  role: LocalizedText
  impact: LocalizedText
  stack: string[]
  partners?: string[]
  tags: string[]
  cover: string
  coverAlt: LocalizedText
  media: MediaItem[]
  caseStudySections?: {
    origin?: LocalizedText
    experience?: LocalizedText
    challenge: LocalizedText
    contribution: LocalizedText
    proof: LocalizedText
  }
}

const mediaBase =
  import.meta.env.VITE_MEDIA_BASE_URL ??
  import.meta.env.VITE_R2_PUBLIC_BASE_URL ??
  'https://pub-7d09f1f6935e4fd6aafb1dd4001bbe14.r2.dev'

const r2 = (path: string) => `${mediaBase}/${path}`

const image = (
  id: string,
  title: LocalizedText,
  src: string,
  alt: LocalizedText,
): MediaItem => ({
  id,
  kind: 'image',
  title,
  src,
  alt,
  aspectRatio: '16/9',
  loadStrategy: 'lazy',
})

const video = (
  id: string,
  title: LocalizedText,
  src: string,
  poster: string,
  alt: LocalizedText,
  is360 = false,
): MediaItem => ({
  id,
  kind: 'video',
  title,
  src,
  poster,
  fallbackImage: poster,
  is360,
  alt,
  aspectRatio: '16/9',
  loadStrategy: 'onInteraction',
})

const panorama = (
  id: string,
  title: LocalizedText,
  src: string,
  fallbackImage: string,
  alt: LocalizedText,
): MediaItem => ({
  id,
  kind: 'panorama360',
  title,
  src,
  fallbackImage,
  is360: true,
  alt,
  aspectRatio: '2/1',
  loadStrategy: 'onInteraction',
})

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'kimanis-redemption',
    title: "Kimani's Redemption",
    year: '2026',
    location: 'Remote, Sénégal x Kenya x Nigeria x Allemagne x Suède',
    status: 'published',
    featured: true,
    kinds: ['narrative', 'heritage'],
    summary: {
      en: 'A 96-hour narrative game jam project about family redemption, ancestral memory and intergenerational transmission, built by Team 3 during the Be Ubuntu Game Jam.',
      fr: 'Un projet narratif de game jam en 96h sur la rédemption familiale, la mémoire des ancêtres et la transmission intergénérationnelle, créé par la Team 3 pendant la Be Ubuntu Game Jam.',
    },
    role: {
      en: 'Unity developer and Senegal representative within Team 3, alongside co-representation from Mame Mor Kandji, president of Teranga Game Makers.',
      fr: 'Développeur Unity et représentant du Sénégal au sein de Team 3, avec la co-représentation de Mame Mor Kandji, président de Teranga Game Makers.',
    },
    impact: {
      en: 'Turns Ubuntu, “I am because we are”, into a playable intimate story shaped by a pan-African team working across five countries, three continents and multiple time zones.',
      fr: 'Transforme Ubuntu, « I am because we are », en récit jouable intime porté par une équipe panafricaine travaillant sur cinq pays, trois continents et plusieurs fuseaux horaires.',
    },
    stack: ['Unity', 'C#', 'narration interactive', 'design 2D', 'audio'],
    partners: ['Elimu Goal.Org', 'Futuregames Warsaw', 'Be Ubuntu Game Jam'],
    tags: ['narrative', 'storytelling', 'heritage', 'gamejam'],
    cover: '/stills/projects/kimanis-redemption-cover.png',
    coverAlt: {
      en: "Title screen from Kimani's Redemption inside a warm, low-lit 2D game scene.",
      fr: "Écran titre de Kimani's Redemption dans une scène de jeu 2D chaude et tamisée.",
    },
    media: [
      video(
        'kimanis-redemption-gameplay-video',
        {
          en: 'Team 3 gameplay video',
          fr: 'Vidéo gameplay Team 3',
        },
        r2('GameplayTeam3%20(1).mp4'),
        '/stills/projects/kimanis-redemption-cover.png',
        {
          en: "Gameplay video from Kimani's Redemption, the Team 3 Be Ubuntu Game Jam project.",
          fr: "Vidéo gameplay de Kimani's Redemption, le projet Team 3 de la Be Ubuntu Game Jam.",
        },
      ),
      image(
        'kimanis-redemption-title',
        { en: 'Awake screen', fr: 'Écran Awake' },
        '/stills/projects/kimanis-redemption-cover.png',
        {
          en: "Kimani's Redemption title screen with the Awake prompt inside a 2D room.",
          fr: "Écran titre de Kimani's Redemption avec le bouton Awake dans une pièce 2D.",
        },
      ),
      image(
        'kimanis-redemption-dialogue',
        { en: 'Family memory dialogue', fr: 'Dialogue mémoire familiale' },
        '/stills/projects/kimanis-redemption-dialogue.png',
        {
          en: 'Dialogue scene about missing a family member inside the game.',
          fr: "Scène de dialogue sur l'absence d'un proche dans le jeu.",
        },
      ),
      image(
        'kimanis-redemption-interaction',
        { en: 'Object interaction', fr: 'Interaction objet' },
        '/stills/projects/kimanis-redemption-interaction.png',
        {
          en: 'Object interaction prompt inside the dimly lit room.',
          fr: "Prompt d'interaction objet dans la pièce sombre.",
        },
      ),
      image(
        'kimanis-redemption-ancestors',
        { en: 'Ancestor passage', fr: 'Passage des ancêtres' },
        '/stills/projects/kimanis-redemption-ancestors.png',
        {
          en: 'Transition screen inviting the player to meet their ancestors.',
          fr: 'Écran de transition invitant le joueur à rencontrer ses ancêtres.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: "Kimani's Redemption was created in mid-April 2026 during the Be Ubuntu Game Jam, organized by Elimu Goal.Org with Futuregames Warsaw around the Ubuntu principle “I am because we are”.",
        fr: "Kimani's Redemption a été créé mi-avril 2026 pendant la Be Ubuntu Game Jam, organisée par Elimu Goal.Org avec Futuregames Warsaw autour du principe Ubuntu « I am because we are ».",
      },
      experience: {
        en: 'The game follows an intimate path of family redemption where the player moves through grief, objects, ancestral memory and the possibility of transmission between generations.',
        fr: "Le jeu suit un parcours intime de rédemption familiale où le joueur traverse le deuil, les objets, la mémoire des ancêtres et la possibilité d'une transmission entre générations.",
      },
      challenge: {
        en: 'Build a coherent narrative game in 96 hours with a six-person team distributed across Kenya, Nigeria, Germany, Sweden and Senegal.',
        fr: 'Construire un jeu narratif cohérent en 96h avec une équipe de six personnes répartie entre Kenya, Nigeria, Allemagne, Suède et Sénégal.',
      },
      contribution: {
        en: 'Oury contributed Unity development for Team 3 with Christian from Kenya also on Unity development, Salim from Kenya on story and music, Babawale from Nigeria on 2D character art, Katharina from Germany on level design and character art, and Adam from Sweden on level design.',
        fr: "Oury a contribué au développement Unity pour la Team 3 avec Christian du Kenya aussi au développement Unity, Salim du Kenya à l'histoire et la musique, Babawale du Nigeria au character art 2D, Katharina d'Allemagne au level design et character art, et Adam de Suède au level design.",
      },
      proof: {
        en: 'The project was shown through the Games for Change Africa Summit in Nairobi, connecting the 96-hour remote production to a wider African games and impact audience.',
        fr: "Le projet a été diffusé via le Games for Change Africa Summit à Nairobi, reliant cette production remote de 96h à un public africain plus large autour du jeu et de l'impact.",
      },
    },
  },
  {
    slug: 'micro-folie-digital-heritage',
    title: 'Micro-Folie Digital Heritage',
    year: '2024-2025',
    location: 'Dakar',
    status: 'published',
    featured: true,
    kinds: ['heritage', 'creative-tech'],
    summary: {
      en: 'A digital heritage and mediation project built around museum objects, youth audiences and public cultural access.',
      fr: "Un projet de patrimoine numérique et de médiation autour d'objets muséaux, de publics jeunesse et d'accès culturel public.",
    },
    role: {
      en: 'XR developer, digital production contributor and technical mediation support.',
      fr: 'Développeur XR, contributeur production numérique et appui médiation technique.',
    },
    impact: {
      en: 'Contributed to making cultural material accessible through digitization, categorized object selections and mediation formats for young and general audiences.',
      fr: "Contribution à l'accessibilité de contenus culturels par la numérisation, la sélection d'objets par catégories et des formats de médiation pour publics jeunesse et grand public.",
    },
    stack: ['Digital heritage', 'Media production', 'Mediation', 'XR context'],
    partners: ['Institut français', 'Musée Théodore Monod', 'ASHIA'],
    tags: ['heritage', 'museum', 'mediation', 'archive'],
    cover: '/stills/hybrid-direction.png',
    coverAlt: {
      en: 'Editorial visual direction mixing heritage material and XR interface fragments.',
      fr: 'Direction visuelle éditoriale mêlant patrimoine et fragments d’interface XR.',
    },
    media: [
      image(
        'micro-folie-direction',
        {
          en: 'Digital heritage mediation direction',
          fr: 'Direction médiation patrimoine numérique',
        },
        '/stills/hybrid-direction.png',
        {
          en: 'Visual direction for a digital heritage workflow around museum objects, cultural mediation and XR interfaces.',
          fr: 'Direction visuelle pour un workflow de patrimoine numérique autour d’objets muséaux, de médiation culturelle et interfaces XR.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'The project comes from Micro-Folie Dakar work with institutional partners around museum collections, digitized objects and mediation material for visitors.',
        fr: 'Le projet vient du travail Micro-Folie Dakar avec des partenaires institutionnels autour de collections muséales, objets numérisés et matières de médiation pour les visiteurs.',
      },
      experience: {
        en: 'The public-facing goal is to turn selected museum objects into readable cultural material: categorized, narrated and prepared for young audiences, families and cultural mediation sessions.',
        fr: "L'objectif public est de transformer des objets muséaux sélectionnés en matière culturelle lisible: catégorisée, racontée et préparée pour des publics jeunes, familles et sessions de médiation.",
      },
      challenge: {
        en: 'Prepare museum material for digital mediation without reducing it to decorative content or overstating the technical scope.',
        fr: 'Préparer des contenus muséaux pour la médiation numérique sans les réduire à de la décoration ni exagérer le périmètre technique.',
      },
      contribution: {
        en: 'Supported object selection, asset preparation, digital production and technical mediation inside a collective institutional project. Source categories include design, power, mobility, music, medicine, cosmology, games and sport.',
        fr: "Appui à la sélection d'objets, préparation des assets, production numérique et médiation technique dans un projet institutionnel collectif. Les catégories sources couvrent design, pouvoir, mobilité, musique, médecine, cosmogonie, jeux et sport.",
      },
      proof: {
        en: 'Institut français, Musée Théodore Monod, ASHIA, the Micro-Folie object folders and the Glèlè / Dahomey creative brief support a restrained public case study. Additional visuals can be published after rights validation.',
        fr: "Institut français, Musée Théodore Monod, ASHIA, les dossiers d'objets Micro-Folie et le cahier de charge Glèlè / Dahomey soutiennent une étude de cas publique mesurée. Les visuels supplémentaires pourront être publiés après validation des droits.",
      },
    },
  },
  {
    slug: 'langa-bouri',
    title: 'Langa Bouri',
    year: '2022',
    location: 'Sénégal',
    status: 'published',
    featured: true,
    kinds: ['heritage', 'xr'],
    summary: {
      en: 'A VR adaptation of a Senegalese childhood game, created to preserve a playful memory many young people no longer know.',
      fr: "Une adaptation VR d'un jeu d'enfance sénégalais, créée pour préserver une mémoire ludique que beaucoup de jeunes ne connaissent plus.",
    },
    role: {
      en: 'Lead Unity developer and creative technologist.',
      fr: 'Développeur Unity principal et creative technologist.',
    },
    impact: {
      en: 'Turns local play culture into an immersive experience that can be discovered beyond its original generation and geography.',
      fr: "Transforme une culture de jeu locale en expérience immersive découvrable au-delà de sa génération et de son territoire d'origine.",
    },
    stack: ['Unity', 'C#', 'VR', 'Quest logic', 'Spatial storytelling'],
    partners: ['Studio Amanirenas'],
    tags: ['heritage', 'storytelling', 'Unity', 'VR'],
    cover: '/stills/projects/langa-bouri-labyrinth-1.jpg',
    coverAlt: {
      en: 'Labyrinth scene from the Langa Bouri VR heritage prototype.',
      fr: 'Scène labyrinthe issue du prototype patrimonial VR Langa Bouri.',
    },
    media: [
      image(
        'langa-bouri-hands',
        { en: 'Embodied entry', fr: 'Entrée incarnée' },
        '/stills/projects/langa-bouri-4.jpg',
        {
          en: 'Embodied VR entry from the Langa Bouri prototype.',
          fr: 'Entrée VR incarnée issue du prototype Langa Bouri.',
        },
      ),
      image(
        'langa-bouri-labyrinth',
        { en: 'Labyrinth prototype', fr: 'Prototype labyrinthe' },
        '/stills/projects/langa-bouri-labyrinth-1.jpg',
        {
          en: 'Unity VR labyrinth scene from the Langa Bouri cultural experience.',
          fr: 'Scène labyrinthe Unity VR issue de l’expérience culturelle Langa Bouri.',
        },
      ),
      image(
        'langa-bouri-puzzle',
        { en: 'Quest logic', fr: 'Logique quête' },
        '/stills/projects/langa-bouri-3.jpg',
        {
          en: 'Quest logic still from the Langa Bouri prototype.',
          fr: 'Capture de logique quête issue du prototype Langa Bouri.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'Langa Bouri comes from a game played by children in Senegal. The project exists because this kind of everyday memory can disappear when it is not transmitted.',
        fr: "Langa Bouri vient d'un jeu auquel les enfants jouaient au Sénégal. Le projet existe parce que ce type de mémoire quotidienne peut disparaître quand elle n'est plus transmise.",
      },
      experience: {
        en: 'The VR version lets people enter the logic of the game, explore its space and understand it as living culture rather than a museum label.',
        fr: "La version VR permet d'entrer dans la logique du jeu, d'explorer son espace et de le comprendre comme culture vivante plutôt que comme simple notice patrimoniale.",
      },
      challenge: {
        en: 'Translate an oral and playful memory into an interactive VR form while keeping it readable, respectful and technically stable.',
        fr: 'Traduire une mémoire orale et ludique en forme VR interactive tout en la gardant lisible, respectueuse et techniquement stable.',
      },
      contribution: {
        en: 'Led the Unity development path, built scene logic, VR navigation, quest flow and interactive structures for the experience.',
        fr: 'Direction du développement Unity, construction de la logique de scènes, navigation VR, flux de quêtes et structures interactives de l’expérience.',
      },
      proof: {
        en: 'Prototype videos, Unity captures and public project traces support the case study.',
        fr: 'Vidéos prototype, captures Unity et traces publiques du projet soutiennent l’étude de cas.',
      },
    },
  },
  {
    slug: 'grande-vadrouille-vr',
    title: 'Grande Vadrouille VR',
    year: '2023',
    location: 'Remote / France',
    status: 'published',
    featured: true,
    kinds: ['xr', 'creative-tech'],
    summary: {
      en: 'A client VR game inspired by a truck scene from La Grande Vadrouille, created for a Louis de Funès museum experience in France.',
      fr: "Un jeu VR client inspiré d'une scène de camion de La Grande Vadrouille, créé pour une expérience du musée Louis de Funès en France.",
    },
    role: {
      en: 'Sole Unity developer in consultancy with E-Mage, under project direction by Sylvain Pellegrino.',
      fr: 'Seul développeur Unity en consultance avec E-Mage, sous direction projet de Sylvain Pellegrino.',
    },
    impact: {
      en: 'Lets visitors step into a cult French comedy reference and physically play through a cinematic moment in headset.',
      fr: "Permet aux visiteurs d'entrer dans une référence culte du cinéma comique français et de jouer physiquement un moment de film en casque.",
    },
    stack: ['Unity', 'C#', 'VR', 'Meta Quest', 'Interaction design'],
    partners: ['3DUCATION.fr', 'IMPACT3D.fr', 'E-Mage', 'Sylvain Pellegrino'],
    tags: ['VR', 'Unity', 'headset', 'interaction'],
    cover: '/stills/projects/grande-vadrouille-1.jpg',
    coverAlt: {
      en: 'Target interaction scene from Grande Vadrouille VR.',
      fr: 'Scène d’interaction cible issue de Grande Vadrouille VR.',
    },
    media: [
      video(
        'grande-vadrouille-gameplay-video',
        {
          en: 'Gameplay walkthrough',
          fr: 'Walkthrough gameplay',
        },
        r2('GrandeVadrouilleVR.mp4'),
        '/stills/projects/grande-vadrouille-1.jpg',
        {
          en: 'Gameplay walkthrough video from Grande Vadrouille VR.',
          fr: 'Vidéo walkthrough gameplay de Grande Vadrouille VR.',
        },
      ),
      image(
        'grande-vadrouille-targets',
        { en: 'Onboarding targets', fr: 'Cibles onboarding' },
        '/stills/projects/grande-vadrouille-1.jpg',
        {
          en: 'Target interaction scene from the Grande Vadrouille VR prototype.',
          fr: 'Scène d’interaction cible issue du prototype Grande Vadrouille VR.',
        },
      ),
      image(
        'grande-vadrouille-road',
        { en: 'Spatial context', fr: 'Contexte spatial' },
        '/stills/projects/grande-vadrouille-4.jpg',
        {
          en: 'Road scene from the Grande Vadrouille VR prototype.',
          fr: 'Scène de route issue du prototype Grande Vadrouille VR.',
        },
      ),
      image(
        'grande-vadrouille-object',
        { en: 'Object interaction', fr: 'Interaction objet' },
        '/stills/projects/grande-vadrouille-2.jpg',
        {
          en: 'Object interaction still from the Grande Vadrouille VR prototype.',
          fr: 'Image d’interaction objet issue du prototype Grande Vadrouille VR.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'The project draws from La Grande Vadrouille and its truck sequence, where comedy, movement and thrown objects become a playful scene to reinterpret in VR.',
        fr: 'Le projet vient de La Grande Vadrouille et de sa séquence du camion, où comédie, mouvement et objets lancés deviennent une scène ludique à réinterpréter en VR.',
      },
      experience: {
        en: 'The visitor is placed inside a fast, readable VR sequence: throw pumpkins, react to enemies, move from gameplay into cutscene and feel the timing of the scene.',
        fr: 'Le visiteur est placé dans une séquence VR rapide et lisible: lancer des citrouilles, réagir aux ennemis, passer du gameplay à la cutscene et ressentir le rythme de la scène.',
      },
      challenge: {
        en: 'Adapt a recognizable cinematic reference into a headset interaction that feels immediate, playful and stable on Quest 3 with Quest 2 compatibility.',
        fr: 'Adapter une référence cinématographique identifiable en interaction casque immédiate, ludique et stable sur Quest 3 avec compatibilité Quest 2.',
      },
      contribution: {
        en: 'Developed the Unity gameplay systems, hand interactions, player feedback, scene flow and headset-ready implementation.',
        fr: 'Développement des systèmes gameplay Unity, interactions main, feedback joueur, flux de scènes et implémentation prête casque.',
      },
      proof: {
        en: 'LinkedIn featured post, gameplay video and extracted stills demonstrate the delivered VR interaction work for 3DUCATION.fr and IMPACT3D.fr.',
        fr: 'Le post LinkedIn en sélection, la vidéo gameplay et les captures extraites démontrent le travail d’interaction VR livré pour 3DUCATION.fr et IMPACT3D.fr.',
      },
    },
  },
  {
    slug: 'guinea-360-field-captures',
    title: 'Guinea 360 Field Captures',
    year: '2025',
    location: 'Conakry, Lélouma, Labé, Korbé',
    status: 'published',
    featured: true,
    kinds: ['field-archive', 'heritage'],
    summary: {
      en: 'A field archive of 360 captures documenting places, textures and cultural contexts across Guinea.',
      fr: 'Une archive de terrain en captations 360 documentant lieux, textures et contextes culturels en Guinée.',
    },
    role: {
      en: '360 capture operator, field archive curator and web integration lead.',
      fr: 'Opérateur captation 360, curateur d’archive de terrain et responsable intégration web.',
    },
    impact: {
      en: 'Creates a base for national heritage platforms, digital museum programs and cultural mediation initiatives in West Africa.',
      fr: 'Crée une base utilisable pour des plateformes patrimoniales nationales, des programmes muséaux numériques et des initiatives de médiation culturelle en Afrique de l’Ouest.',
    },
    stack: ['360 capture', 'Spatial viewer', 'Progressive media', 'Web'],
    tags: ['360', 'field archive', 'Guinea', 'spatial media'],
    cover: '/stills/guinea-360-diane-rockstream.jpg',
    coverAlt: {
      en: '360 field still from Diané showing rocks, vegetation and flowing water without visible people.',
      fr: 'Image 360 de Diané montrant roches, végétation et eau qui coule sans personnes visibles.',
    },
    media: [
      video(
        'bowel-koulen-360-video',
        {
          en: 'Bowel to Koulen 360 timelapse',
          fr: 'Timelapse 360 Bowel vers Koulen',
        },
        r2('360-videos/Timelapse%20Bowel%20-%20Koulen.mp4'),
        '/stills/guinea-360-diane-rockstream.jpg',
        {
          en: '360 timelapse video moving through green field terrain in Guinea.',
          fr: 'Vidéo timelapse 360 à travers un terrain vert en Guinée.',
        },
        true,
      ),
      video(
        'korbe-diane-360-video',
        {
          en: 'Korbé to Diané 360 timelapse',
          fr: 'Timelapse 360 Korbé vers Diané',
        },
        r2('360-videos/Timelapse%20Korbe%20-%20Diane.mp4'),
        '/stills/guinea-360-diane-waterfall.jpg',
        {
          en: '360 timelapse video across the Korbé to Diané route.',
          fr: 'Vidéo timelapse 360 sur la route Korbé vers Diané.',
        },
        true,
      ),
      video(
        'pirogue-360-video',
        { en: 'Pirogue water route', fr: 'Route d’eau en pirogue' },
        r2('360-videos/Pirogue.mp4'),
        '/stills/guinea-360-pirogue.jpg',
        {
          en: 'Short 360 video on a water route with vegetation and reflections.',
          fr: 'Courte vidéo 360 sur une route d’eau avec végétation et reflets.',
        },
        true,
      ),
      panorama(
        'diane-rock-panorama-079',
        { en: 'Diané rock field', fr: 'Terrain rocheux de Diané' },
        r2('360-photos/IMG_20250827_174841_00_079.jpg'),
        '/stills/guinea-360-diane-rockstream.jpg',
        {
          en: 'Equirectangular 360 photo from a rocky field location near Diané.',
          fr: 'Photo 360 équirectangulaire d’un terrain rocheux près de Diané.',
        },
      ),
      panorama(
        'diane-rock-panorama-080',
        { en: 'Diané ridge field', fr: 'Crête terrain Diané' },
        r2('360-photos/IMG_20250827_174914_00_080.jpg'),
        '/stills/guinea-360-diane-waterfall.jpg',
        {
          en: 'Equirectangular 360 photo from a ridge and stream landscape near Diané.',
          fr: 'Photo 360 équirectangulaire d’un paysage de crête et ruisseau près de Diané.',
        },
      ),
      panorama(
        'pirogue-panorama-frame-010',
        { en: 'Pirogue still panorama', fr: 'Panorama pirogue' },
        r2('360-photos/frame000010.png'),
        '/stills/guinea-360-pirogue.jpg',
        {
          en: 'Equirectangular 360 still from a pirogue water route.',
          fr: 'Image 360 équirectangulaire depuis une route d’eau en pirogue.',
        },
      ),
      image(
        'guinea-pirogue',
        { en: 'Water route', fr: 'Route d’eau' },
        '/stills/guinea-360-pirogue.jpg',
        {
          en: 'Water route still from a Guinea 360 capture.',
          fr: 'Image de route d’eau issue d’une captation 360 en Guinée.',
        },
      ),
      image(
        'guinea-waterfall',
        { en: 'Diané waterfall', fr: 'Chute de Diané' },
        '/stills/guinea-360-diane-waterfall.jpg',
        {
          en: 'Wide 360 still from the Diané waterfall capture.',
          fr: 'Image 360 large issue de la captation de la chute de Diané.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'The archive is rooted in Guinea and in a family connection to Fouta Djallon, Korbé and pulaar memory.',
        fr: "L'archive est ancrée en Guinée et dans un lien familial au Fouta Djallon, à Korbé et à la mémoire pulaar.",
      },
      experience: {
        en: 'Visitors can enter real field locations through 360 views, not as decoration but as spatial evidence for future heritage work.',
        fr: 'Les visiteurs peuvent entrer dans des lieux terrain réels via des vues 360, non comme décoration mais comme preuve spatiale pour de futurs travaux patrimoniaux.',
      },
      challenge: {
        en: 'Capture real places with enough care that they remain useful as archive material, not only visual atmosphere.',
        fr: 'Capter des lieux réels avec assez de soin pour qu’ils restent utiles comme archive, pas seulement comme ambiance visuelle.',
      },
      contribution: {
        en: 'Captured 360 material, organized locations and prepared a web-ready archive structure for public field media.',
        fr: 'Captation de contenus 360, organisation des lieux et préparation d’une structure d’archive web pour des médias terrain publics.',
      },
      proof: {
        en: 'Panoramas, stills, location metadata and viewer integration will act as the main proof layer.',
        fr: 'Panoramas, images fixes, métadonnées de lieux et intégration viewer serviront de couche principale de preuve.',
      },
    },
  },
  {
    slug: 'portsafe-vr',
    title: 'PortSafe VR',
    year: '2024',
    location: 'Dakar',
    status: 'published',
    featured: true,
    kinds: ['simulation', 'xr', 'training'],
    summary: {
      en: 'A VR safety training application that places learners inside port operations, PPE workflows and risk situations.',
      fr: 'Une application VR de formation sécurité qui place les apprenants dans des opérations portuaires, workflows EPI et situations à risque.',
    },
    role: {
      en: 'VR structure, scene flow, interaction logic and Quest deployment pipeline.',
      fr: 'Structure VR, flux de scènes, logique d’interaction et pipeline de déploiement Quest.',
    },
    impact: {
      en: 'Turns safety procedures into embodied practice so learners can recognize risks before facing them in the field.',
      fr: 'Transforme les procédures de sécurité en pratique incarnée pour que les apprenants reconnaissent les risques avant le terrain.',
    },
    stack: ['Unity', 'C#', 'VR training', 'Meta Quest'],
    partners: ['Metafrik'],
    tags: ['simulation', 'safety', 'VR', 'training'],
    cover: '/stills/projects/portsafe-vr-2.jpg',
    coverAlt: {
      en: 'PPE locker scene from PortSafe VR.',
      fr: 'Scène de vestiaire EPI issue de PortSafe VR.',
    },
    media: [
      video(
        'portsafe-vr-video',
        {
          en: 'VR safety training walkthrough',
          fr: 'Walkthrough formation sécurité VR',
        },
        r2('PortSafeVR.mp4'),
        '/stills/projects/portsafe-vr-2.jpg',
        {
          en: 'Video walkthrough from the PortSafe VR safety training prototype.',
          fr: 'Vidéo walkthrough du prototype de formation sécurité PortSafe VR.',
        },
      ),
      image(
        'portsafe-port',
        { en: 'Port environment', fr: 'Environnement portuaire' },
        '/stills/projects/portsafe-vr-1.jpg',
        {
          en: 'Port environment scene with container area in PortSafe VR.',
          fr: 'Scène d’environnement portuaire avec zone conteneurs dans PortSafe VR.',
        },
      ),
      image(
        'portsafe-ppe',
        { en: 'PPE workflow', fr: 'Workflow EPI' },
        '/stills/projects/portsafe-vr-2.jpg',
        {
          en: 'PPE locker workflow inside the PortSafe VR training prototype.',
          fr: 'Workflow vestiaire EPI dans le prototype de formation PortSafe VR.',
        },
      ),
      image(
        'portsafe-warehouse',
        { en: 'Industrial zone', fr: 'Zone industrielle' },
        '/stills/projects/portsafe-vr-4.jpg',
        {
          en: 'Industrial zone scene from the PortSafe VR prototype.',
          fr: 'Scène de zone industrielle issue du prototype PortSafe VR.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'PortSafe VR was created for a practical training need: port safety is physical, procedural and easier to understand when learners can rehearse situations in context.',
        fr: 'PortSafe VR a été créé pour un besoin de formation concret: la sécurité portuaire est physique, procédurale et plus facile à comprendre quand les apprenants répètent les situations en contexte.',
      },
      experience: {
        en: 'The learner enters a port environment, checks protective equipment, follows scenario logic and practices responses to operational risks.',
        fr: "L'apprenant entre dans un environnement portuaire, vérifie les équipements de protection, suit une logique de scénario et pratique les réponses aux risques opérationnels.",
      },
      challenge: {
        en: 'Turn industrial safety procedures into an immersive sequence that can be understood, repeated and assessed.',
        fr: 'Transformer des procédures de sécurité industrielle en séquence immersive compréhensible, répétable et évaluable.',
      },
      contribution: {
        en: 'Built the VR flow, interaction requirements, training screens and Quest-oriented Unity structure.',
        fr: 'Construction du flux VR, des besoins d’interaction, des écrans de formation et de la structure Unity orientée Quest.',
      },
      proof: {
        en: 'Local prototype video and stills show the port environment, PPE workflow and simulation structure.',
        fr: 'La vidéo prototype locale et les captures montrent l’environnement portuaire, le workflow EPI et la structure de simulation.',
      },
    },
  },
  {
    slug: 'yango-vr',
    title: 'YangoVR',
    year: '2024',
    location: 'Dakar',
    status: 'short-entry',
    featured: false,
    kinds: ['xr', 'simulation'],
    summary: {
      en: 'A branded VR activation pitch for Yango, imagined with Jumper Namibia around a timed room challenge and playful brand recall.',
      fr: 'Un pitch d’activation de marque en VR pour Yango, imaginé avec Jumper Namibia autour d’un défi chronométré en chambre et d’une mémorisation ludique de marque.',
    },
    role: {
      en: 'Unity VR developer and interactive brand activation prototype builder.',
      fr: 'Développeur Unity VR et constructeur de prototype d’activation de marque interactive.',
    },
    impact: {
      en: 'Positions VR as a proposal tool for experiential marketing: simple mechanics, a recognizable service promise and a brand moment built for recall.',
      fr: 'Positionne la VR comme outil de proposition pour le marketing expérientiel: mécaniques simples, promesse de service reconnaissable et moment de marque conçu pour rester en mémoire.',
    },
    stack: ['Unity', 'VR', 'C#', 'Interaction design'],
    partners: ['Jumper Namibia'],
    tags: ['VR', 'brand activation', 'prototype', 'experiential marketing'],
    cover: '/stills/projects/yango-vr-3.jpg',
    coverAlt: {
      en: 'Interior room scene from the Yango VR brand activation pitch.',
      fr: 'Scène intérieure de chambre issue du pitch d’activation de marque Yango VR.',
    },
    media: [
      video(
        'yango-vr-video',
        {
          en: 'Brand activation pitch video',
          fr: 'Vidéo pitch activation de marque',
        },
        r2('yangoVR.mp4'),
        '/stills/projects/yango-vr-3.jpg',
        {
          en: 'Video from the Yango VR branded activation prototype pitch.',
          fr: 'Vidéo issue du pitch prototype d’activation de marque Yango VR.',
        },
      ),
      image(
        'yango-room',
        { en: 'Timed room challenge', fr: 'Défi chronométré en chambre' },
        '/stills/projects/yango-vr-3.jpg',
        {
          en: 'Room where the player searches for the YANGO letters before the ride leaves.',
          fr: 'Chambre où le joueur cherche les lettres YANGO avant le départ de la course.',
        },
      ),
      image(
        'yango-letters',
        { en: 'Letter interaction', fr: 'Interaction lettres' },
        '/stills/projects/yango-vr-4.jpg',
        {
          en: 'Letter interaction scene from the Yango VR brand activation concept.',
          fr: 'Scène d’interaction lettres issue du concept d’activation de marque Yango VR.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'Yango VR was developed as a brand activation concept with Jumper Namibia, a Namibian marketing, communication and visual communication agency, as a proposal for Yango.',
        fr: 'Yango VR a été développé comme concept d’activation de marque avec Jumper Namibia, agence namibienne de marketing, communication et communication visuelle, dans une logique de proposition pour Yango.',
      },
      experience: {
        en: 'A Yango is waiting outside the apartment. Inside the bedroom, the player has 45 minutes to find the letters that form YANGO, appearing in random places, then place them on a table to rebuild the word before time runs out.',
        fr: 'Un Yango attend dehors devant l’appartement. Dans la chambre, le joueur a 45 minutes pour trouver les lettres qui forment YANGO, apparues à des endroits aléatoires, puis les placer sur une table pour recomposer le mot avant la fin du temps.',
      },
      challenge: {
        en: 'Turn a ride-hailing brand promise into a short, legible VR game loop that can work as a branded activation pitch instead of a public delivered project.',
        fr: 'Transformer une promesse de service VTC en boucle de jeu VR courte et lisible, pensée comme pitch d’activation de marque plutôt que comme projet public livré.',
      },
      contribution: {
        en: 'Built the Unity VR prototype structure, random letter placement logic, object interaction flow and table-based word assembly mechanic.',
        fr: 'Construction de la structure prototype Unity VR, de la logique d’apparition aléatoire des lettres, du flux d’interaction objet et de la mécanique de recomposition du mot sur table.',
      },
      proof: {
        en: 'Demo video and stills document the pitch prototype mechanics and brand activation direction prepared around the Yango concept.',
        fr: 'La vidéo démo et les captures documentent les mécaniques du prototype de pitch et la direction d’activation de marque préparée autour du concept Yango.',
      },
    },
  },
  {
    slug: 'unity-vr-training-programs',
    title: 'Unity & VR Training Programs',
    year: '2020-2026',
    location: 'Dakar, Conakry and remote',
    status: 'published',
    featured: false,
    kinds: ['training', 'xr'],
    summary: {
      en: 'Unity and XR training for learners entering immersive production, interactive prototyping and applied VR workflows.',
      fr: 'Formation Unity et XR pour des apprenants entrant dans la production immersive, le prototypage interactif et les workflows VR appliqués.',
    },
    role: {
      en: 'Instructor, curriculum contributor and technical mentor.',
      fr: 'Formateur, contributeur pédagogique et mentor technique.',
    },
    impact: {
      en: 'Helped learners move from tool discovery to practical prototypes using Unity, C# and XR production logic.',
      fr: 'A aidé les apprenants à passer de la découverte des outils à des prototypes concrets avec Unity, C# et la logique de production XR.',
    },
    stack: ['Unity', 'C#', 'XR pedagogy', 'Mentoring'],
    partners: [
      'UCAD CURI',
      'ESMT Dakar',
      'Orange Digital Center Guinea',
      'Imisi 3D',
      'ADMI',
      'Go My Code',
    ],
    tags: ['teaching', 'Unity', 'XR', 'education'],
    cover: '/stills/mcp-unity.jpg',
    coverAlt: {
      en: 'Unity workflow still used for the training and lab section.',
      fr: 'Visuel de workflow Unity utilisé pour la section formation et lab.',
    },
    media: [
      image(
        'training-odc-group',
        {
          en: 'Orange Digital Center training group',
          fr: 'Groupe formation Orange Digital Center',
        },
        '/stills/teaching-live/odc-huawei-esmt-group.jpg',
        {
          en: 'Training group photo in a classroom context with Orange Digital Center and Huawei Academy visual markers.',
          fr: 'Photo de groupe en contexte de formation avec marqueurs visuels Orange Digital Center et Huawei Academy.',
        },
      ),
      image(
        'training-exterior-group',
        {
          en: 'Training cohort exterior',
          fr: 'Cohorte formation en extérieur',
        },
        '/stills/teaching-live/training-group-exterior.jpg',
        {
          en: 'Outdoor training group photo with learners and instructors.',
          fr: 'Photo de groupe en extérieur avec apprenants et formateurs.',
        },
      ),
    ],
    caseStudySections: {
      origin: {
        en: 'The programs answer a recurring gap in XR learning: many learners can follow tutorials, but need structure and review to build their own working projects.',
        fr: "Les programmes répondent à un manque récurrent dans l'apprentissage XR: beaucoup d'apprenants peuvent suivre des tutoriels, mais ont besoin de structure et de review pour construire leurs propres projets.",
      },
      experience: {
        en: 'Learners move through live sessions, recorded material, exercises, reviews and mentoring until they can explain, improve and ship a small prototype.',
        fr: "Les apprenants passent par sessions live, contenus enregistrés, exercices, reviews et mentoring jusqu'à pouvoir expliquer, améliorer et livrer un petit prototype.",
      },
      challenge: {
        en: 'Teach immersive production in a way that balances fundamentals, hands-on practice and confidence with professional tools.',
        fr: 'Enseigner la production immersive en équilibrant fondamentaux, pratique concrète et confiance avec les outils professionnels.',
      },
      contribution: {
        en: 'Delivered Unity and XR instruction through live sessions, recorded tutorials, mentoring, project reviews and guided exercises.',
        fr: 'Animation de formations Unity et XR via sessions live, tutoriels enregistrés, mentoring, reviews projets et exercices guidés.',
      },
      proof: {
        en: 'LinkedIn project record, Africa Digital Academy context, Orange Digital Center Conakry and local tutorial videos support the case study.',
        fr: 'La fiche LinkedIn, le contexte Africa Digital Academy, Orange Digital Center Conakry et les vidéos tutoriels locales soutiennent l’étude de cas.',
      },
    },
  },
  {
    slug: 'vr-room',
    title: 'VR Room',
    year: '2024',
    status: 'short-entry',
    featured: false,
    kinds: ['xr', 'lab'],
    summary: {
      en: 'A small VR room prototype for object interaction, scale testing and headset presence.',
      fr: 'Un prototype de pièce VR pour interaction objet, tests d’échelle et présence en casque.',
    },
    role: {
      en: 'Unity VR prototype developer.',
      fr: 'Développeur prototype Unity VR.',
    },
    impact: {
      en: 'Adds evidence of everyday XR prototyping, testing and spatial interaction work.',
      fr: 'Ajoute une preuve de prototypage XR quotidien, tests et interaction spatiale.',
    },
    stack: ['Unity', 'VR', 'C#', 'Prototype'],
    tags: ['VR', 'prototype', 'interaction', 'lab'],
    cover: '/stills/projects/vr-room-2.jpg',
    coverAlt: {
      en: 'Interior scene from a VR room prototype.',
      fr: 'Scène intérieure issue d’un prototype VR Room.',
    },
    media: [
      video(
        'vr-room-video',
        { en: 'Room-scale prototype video', fr: 'Vidéo prototype room-scale' },
        r2('VR%20ROOM%20Oury%20Diallo.mp4'),
        '/stills/projects/vr-room-2.jpg',
        {
          en: 'Video from a small VR room prototype for object interaction and scale testing.',
          fr: 'Vidéo d’un prototype VR Room pour interaction objet et test d’échelle.',
        },
      ),
      image(
        'vr-room-space',
        { en: 'Room scale test', fr: 'Test échelle pièce' },
        '/stills/projects/vr-room-2.jpg',
        {
          en: 'Room scale test from a VR prototype.',
          fr: 'Test d’échelle de pièce issu d’un prototype VR.',
        },
      ),
    ],
  },
  {
    slug: 'clash-of-myths',
    title: 'Clash of Myths',
    year: '2024',
    status: 'short-entry',
    featured: false,
    kinds: ['creative-tech', 'lab'],
    summary: {
      en: 'A gameplay prototype exploring arena combat, enemy logic and Unity iteration around myth-inspired characters.',
      fr: 'Un prototype gameplay explorant combat d’arène, logique ennemie et itération Unity autour de personnages inspirés de mythes.',
    },
    role: {
      en: 'Unity gameplay programmer.',
      fr: 'Programmeur gameplay Unity.',
    },
    impact: {
      en: 'Shows gameplay systems practice alongside XR and simulation work.',
      fr: 'Montre une pratique des systèmes gameplay en complément du travail XR et simulation.',
    },
    stack: ['Unity', 'C#', 'Gameplay', 'Prototype'],
    tags: ['gameplay', 'Unity', 'prototype', 'combat'],
    cover: '/stills/projects/clash-of-myths-1.jpg',
    coverAlt: {
      en: 'Title screen from Clash of Myths.',
      fr: 'Écran titre issu de Clash of Myths.',
    },
    media: [
      video(
        'clash-of-myths-gameplay-video',
        { en: 'Gameplay prototype video', fr: 'Vidéo prototype gameplay' },
        r2('Clash%20Of%20Myths.mp4'),
        '/stills/projects/clash-of-myths-1.jpg',
        {
          en: 'Gameplay prototype video from Clash of Myths.',
          fr: 'Vidéo prototype gameplay de Clash of Myths.',
        },
      ),
      image(
        'clash-title',
        { en: 'Prototype identity', fr: 'Identité prototype' },
        '/stills/projects/clash-of-myths-1.jpg',
        {
          en: 'Title screen from the Clash of Myths prototype.',
          fr: 'Écran titre issu du prototype Clash of Myths.',
        },
      ),
      image(
        'clash-arena',
        { en: 'Arena combat', fr: 'Combat d’arène' },
        '/stills/projects/clash-of-myths-3.jpg',
        {
          en: 'Arena combat still from Clash of Myths.',
          fr: 'Capture de combat d’arène issue de Clash of Myths.',
        },
      ),
    ],
  },
]

export const featuredProjects = portfolioProjects.filter(
  (project) => project.featured,
)

export function getProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug)
}

export const fieldLocations = [
  {
    name: 'Conakry',
    coordinates: '9.6412 N, 13.5784 W',
    note: {
      en: 'Coastal context, training moments and urban cultural material.',
      fr: 'Contexte côtier, moments de formation et matière culturelle urbaine.',
    },
  },
  {
    name: 'Lélouma',
    coordinates: '11.4230 N, 12.6810 W',
    note: {
      en: 'Fouta Djallon terrain, landscape texture and community memory.',
      fr: 'Terrain du Fouta Djallon, texture paysagère et mémoire communautaire.',
    },
  },
  {
    name: 'Labé',
    coordinates: '11.3182 N, 12.2833 W',
    note: {
      en: 'Regional anchor for language, market routes and transmission.',
      fr: 'Ancrage régional pour la langue, les routes de marché et la transmission.',
    },
  },
  {
    name: 'Korbé',
    coordinates: 'Fouta Djallon',
    note: {
      en: 'Family anchor and pulaar memory layer.',
      fr: 'Ancrage familial et couche de mémoire pulaar.',
    },
  },
]
