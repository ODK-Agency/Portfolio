export type Locale = 'en' | 'fr'

export type LocalizedText = Record<Locale, string>

export type ProjectKind =
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
    slug: 'micro-folie-digital-heritage',
    title: 'Micro-Folie Digital Heritage',
    year: '2024-2025',
    location: 'Dakar',
    status: 'published',
    featured: true,
    kinds: ['heritage', 'creative-tech'],
    summary: {
      en: 'Digital heritage work around museum material, cultural mediation and artwork digitization with institutional partners.',
      fr: "Travail de patrimoine numérique autour de contenus muséaux, de médiation culturelle et de numérisation d'oeuvres avec des partenaires institutionnels.",
    },
    role: {
      en: 'Digital production support, XR builder and technical mediator.',
      fr: 'Appui production numérique, développeur XR et médiateur technique.',
    },
    impact: {
      en: 'Helped prepare cultural material for reliable digital use, mediation workflows and public-facing presentation.',
      fr: 'A aidé à préparer des contenus culturels pour des usages numériques fiables, des workflows de médiation et une présentation publique.',
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
      video(
        'langa-bouri-labyrinth-video',
        {
          en: 'Labyrinth prototype video',
          fr: 'Vidéo prototype labyrinthe',
        },
        r2('Langa%20Update%20Labrynth%2004-11.mp4'),
        '/stills/projects/langa-bouri-labyrinth-1.jpg',
        {
          en: 'Gameplay video from the Langa Bouri VR labyrinth prototype.',
          fr: 'Vidéo gameplay du prototype labyrinthe VR Langa Bouri.',
        },
      ),
      video(
        'langa-bouri-demo-video',
        { en: 'Early VR demo', fr: 'Démo VR initiale' },
        r2('Langa%20Bouri%20Demo.mp4'),
        '/stills/projects/langa-bouri-4.jpg',
        {
          en: 'Early demo video from the Langa Bouri VR heritage project.',
          fr: 'Vidéo démo initiale du projet patrimonial VR Langa Bouri.',
        },
      ),
      image(
        'micro-folie-direction',
        {
          en: 'Digital heritage direction',
          fr: 'Direction patrimoine numérique',
        },
        '/stills/hybrid-direction.png',
        {
          en: 'Visual direction for a digital heritage workflow around cultural material and XR interfaces.',
          fr: 'Direction visuelle pour un workflow de patrimoine numérique autour de contenus culturels et interfaces XR.',
        },
      ),
    ],
    caseStudySections: {
      challenge: {
        en: 'Prepare museum material for digital mediation without reducing it to decorative content or overstating the technical scope.',
        fr: 'Préparer des contenus muséaux pour la médiation numérique sans les réduire à de la décoration ni exagérer le périmètre technique.',
      },
      contribution: {
        en: 'Supported asset recovery, media preparation and video production work inside a collective institutional project.',
        fr: 'Appui à la récupération des assets, à la préparation média et à la production vidéo dans un projet institutionnel collectif.',
      },
      proof: {
        en: 'Institut français, Musée Théodore Monod, ASHIA and production artifacts support a restrained public case study.',
        fr: 'Institut français, Musée Théodore Monod, ASHIA et les artefacts de production soutiennent une étude de cas publique mesurée.',
      },
    },
  },
  {
    slug: 'langa-bouri',
    title: 'Langa Bouri',
    year: '2022',
    location: 'Guinea',
    status: 'published',
    featured: true,
    kinds: ['heritage', 'xr'],
    summary: {
      en: 'A VR heritage experience built with Unity around African history, exploration and immersive storytelling.',
      fr: "Une expérience patrimoniale VR construite avec Unity autour de l'histoire africaine, de l'exploration et du storytelling immersif.",
    },
    role: {
      en: 'Lead Unity developer and creative technologist.',
      fr: 'Développeur Unity principal et creative technologist.',
    },
    impact: {
      en: 'Explored how African history and cultural narratives can become navigable VR experiences.',
      fr: "A exploré comment l'histoire africaine et les récits culturels peuvent devenir des expériences VR navigables.",
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
      challenge: {
        en: 'Translate a culturally rooted narrative into an interactive VR form while keeping the work respectful, legible and technically stable.',
        fr: 'Traduire un récit culturel en forme VR interactive tout en gardant une approche respectueuse, lisible et techniquement stable.',
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
      en: 'A Unity VR action prototype focused on hand interactions, onboarding, wave-based gameplay and fast player feedback.',
      fr: 'Un prototype d’action VR Unity centré sur les interactions main, l’onboarding, les vagues d’ennemis et le feedback joueur rapide.',
    },
    role: {
      en: 'Sole Unity developer in consultancy with E-Mage, under project direction by Sylvain Pellegrino.',
      fr: 'Seul développeur Unity en consultance avec E-Mage, sous direction projet de Sylvain Pellegrino.',
    },
    impact: {
      en: 'Demonstrated the ability to turn a VR game concept into a playable headset experience with interaction feel.',
      fr: 'A démontré la capacité à transformer un concept de jeu VR en expérience casque jouable avec sensation d’interaction.',
    },
    stack: ['Unity', 'C#', 'VR', 'Meta Quest', 'Interaction design'],
    partners: ['E-Mage', 'Sylvain Pellegrino'],
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
      challenge: {
        en: 'Build a VR action prototype that feels immediate in headset, with clear onboarding, embodied controls and responsive gameplay loops.',
        fr: 'Construire un prototype d’action VR immédiat en casque, avec onboarding clair, contrôles incarnés et boucles gameplay réactives.',
      },
      contribution: {
        en: 'Developed the Unity gameplay systems, hand interactions, player feedback, scene flow and headset-ready implementation.',
        fr: 'Développement des systèmes gameplay Unity, interactions main, feedback joueur, flux de scènes et implémentation prête casque.',
      },
      proof: {
        en: 'Local gameplay video and extracted stills demonstrate the delivered VR interaction work.',
        fr: 'La vidéo gameplay locale et les captures extraites démontrent le travail d’interaction VR livré.',
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
      en: 'Creates spatial evidence that can support cultural storytelling, research, mediation and immersive exhibition formats.',
      fr: 'Crée des preuves spatiales utiles au récit culturel, à la recherche, à la médiation et aux formats d’exposition immersive.',
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
      en: 'An immersive VR safety training experience for port operations, PPE workflows, crisis situations and hazardous material scenarios.',
      fr: 'Une expérience immersive de formation sécurité VR pour opérations portuaires, EPI, situations de crise et scénarios de matières dangereuses.',
    },
    role: {
      en: 'VR structure, scene flow, interaction logic and Quest deployment pipeline.',
      fr: 'Structure VR, flux de scènes, logique d’interaction et pipeline de déploiement Quest.',
    },
    impact: {
      en: 'Positions VR as a practical training tool for procedures, environments and repeatable operational scenarios.',
      fr: 'Positionne la VR comme outil concret de formation aux procédures, environnements et scénarios opérationnels répétables.',
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
      en: 'A compact VR prototype exploring guided service interaction, spatial onboarding and applied training logic in a branded context.',
      fr: 'Un prototype VR compact explorant l’interaction guidée, l’onboarding spatial et la logique de formation appliquée dans un contexte de marque.',
    },
    role: {
      en: 'Unity VR developer and interactive prototype builder.',
      fr: 'Développeur Unity VR et constructeur de prototype interactif.',
    },
    impact: {
      en: 'Shows applied XR work beyond cultural projects, with attention to user flow, context and practical delivery.',
      fr: 'Montre un travail XR appliqué au-delà du culturel, avec attention portée au parcours utilisateur, au contexte et à la livraison concrète.',
    },
    stack: ['Unity', 'VR', 'C#', 'Interaction design'],
    tags: ['VR', 'prototype', 'service', 'training'],
    cover: '/stills/projects/yango-vr-3.jpg',
    coverAlt: {
      en: 'Interior VR scene from the YangoVR prototype.',
      fr: 'Scène intérieure VR issue du prototype YangoVR.',
    },
    media: [
      video(
        'yango-vr-video',
        { en: 'Applied VR prototype video', fr: 'Vidéo prototype VR appliqué' },
        r2('yangoVR.mp4'),
        '/stills/projects/yango-vr-3.jpg',
        {
          en: 'Video from the YangoVR applied prototype.',
          fr: 'Vidéo issue du prototype appliqué YangoVR.',
        },
      ),
      image(
        'yango-room',
        { en: 'Prototype room', fr: 'Pièce prototype' },
        '/stills/projects/yango-vr-3.jpg',
        {
          en: 'Prototype room from the YangoVR demo.',
          fr: 'Pièce prototype issue de la démo YangoVR.',
        },
      ),
      image(
        'yango-letters',
        { en: 'Letter interaction', fr: 'Interaction lettres' },
        '/stills/projects/yango-vr-4.jpg',
        {
          en: 'Letter interaction scene from the YangoVR prototype.',
          fr: 'Scène d’interaction lettres issue du prototype YangoVR.',
        },
      ),
    ],
    caseStudySections: {
      challenge: {
        en: 'Create a VR experience where the user understands the environment, the action flow and the purpose quickly.',
        fr: 'Créer une expérience VR où l’utilisateur comprend rapidement l’environnement, le flux d’action et l’objectif.',
      },
      contribution: {
        en: 'Built the Unity VR prototype structure, interaction logic and spatial user flow.',
        fr: 'Construction de la structure prototype Unity VR, de la logique d’interaction et du parcours utilisateur spatial.',
      },
      proof: {
        en: 'Demo video and stills show the interaction flow and applied VR structure.',
        fr: 'La vidéo démo et les captures montrent le parcours d’interaction et la structure VR appliquée.',
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
      'Africa Digital Academy',
      'Orange Digital Center',
      'Self Employed',
    ],
    tags: ['teaching', 'Unity', 'Conakry', 'education'],
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
