import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'chepkiit-waterfalls',
    name: 'Chepkiit Waterfalls',
    subtitle: 'Kipkaren River Cascades & Canyon Gorges',
    category: 'waterfalls',
    categoryLabels: ['Waterfalls', 'Hiking'],
    distanceKm: 26,
    travelTime: '~35 mins by Matatu',
    locationDetails: '26 km from Kapsabet Town (~35 mins by Matatu)',
    description: 'Famous cascading Kipkaren river falls with breathtaking gorges, suspension footbridges, and scenic picnic grounds.',
    fullDescription: 'Chepkiit Waterfalls is one of Nandi County\'s most iconic geological marvels, formed by the rushing waters of the Kipkaren River carving through ancient volcanic rock fissures. The name "Chepkiit" historically translates to "view from afar," referencing the majestic roaring cascades. Students with university ID enjoy subsidized access to walking trails, wooden observation decks, suspension footbridges, and picnic meadows.',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&auto=format&fit=crop&q=80',
    studentPrice: 'KES 100',
    regularPrice: 'KES 300',
    studentPassVerified: true,
    priceBadgeType: 'gold',
    transitDetails: {
      stage: 'Stage 2 (Mlango Line)',
      matatuFare: 'KES 70',
      bodaFare: 'KES 50 from junction',
      connectionNotes: 'Board Kipkaren/Mlango-bound matatu at Kapsabet Main Stage. Alight at Chepkiit Junction gate.',
      routeNumber: 'Route 11B'
    },
    highlights: [
      'Spectacular twin cascade drops into granite canyon',
      'Engineered wooden suspension footbridges with canyon views',
      'Designated student picnic and photography spots',
      'Community tour guides certified by Nandi Tourism Board'
    ],
    guidelines: [
      'Valid University/College ID card required at entry gate for KES 100 rate',
      'Strictly avoid swimming near the vortex pool or climbing wet canyon rocks',
      'Wear sturdy hiking footwear for descending river trails',
      'Pack out all plastics and food wrappers'
    ],
    contactPhone: '+254 722 890 120',
    openingHours: '07:30 AM – 06:00 PM Daily',
    coordinates: { lat: 0.3854, lng: 35.1523 }
  },
  {
    id: 'nandi-bears-club',
    name: 'Nandi Bears Club',
    subtitle: 'Tea Estate Walking Trails & Heritage Clubhouse',
    category: 'parks',
    categoryLabels: ['Parks', 'Hiking'],
    distanceKm: 4.5,
    travelTime: '~10 mins',
    locationDetails: '4.5 km from Kapsabet Central (~10 mins)',
    description: 'Historic colonial club surrounded by lush rolling tea estates, 9-hole golf fairways, serene walking trails, and club restaurant.',
    fullDescription: 'Established in the 1920s amidst the tranquil highland tea plantations of Kapsabet, Nandi Bears Club offers a serene green sanctuary for students seeking peaceful study retreats, morning nature walks, and tea estate photography. While clubhouse dining and golf require a small grounds pass, the surrounding estate perimeter pathways are completely open for free walking excursions.',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&auto=format&fit=crop&q=80',
    studentPrice: 'Free Walk',
    regularPrice: 'KES 200 Grounds',
    studentPassVerified: true,
    priceBadgeType: 'mint',
    transitDetails: {
      stage: 'Town Central Boda Stage',
      matatuFare: 'KES 30',
      bodaFare: 'KES 50 direct to gate',
      connectionNotes: 'Accessible via a quick 10-minute Boda ride from Kapsabet Town Clock Tower or 25-minute scenic stroll.',
      routeNumber: 'Town Link'
    },
    highlights: [
      'Unrestricted panoramic walking loops through verdant Nandi tea bushes',
      'Historic 1920s colonial stone architecture and botanical gardens',
      'Student study gazebo with complimentary high-speed campus mesh Wi-Fi',
      'Affordable clubhouse cafeteria tea & pastry student specials'
    ],
    guidelines: [
      'Keep strictly to pedestrian boundaries along the active golf fairways',
      'Do not pluck tea shoots without authorized guide permission',
      'Maintain low noise levels near the open-air member pavilion'
    ],
    contactPhone: '+254 53 52022',
    openingHours: '06:30 AM – 07:00 PM Daily',
    coordinates: { lat: 0.2012, lng: 35.1054 }
  },
  {
    id: 'kingwal-swamp',
    name: 'Kingwal Swamp',
    subtitle: 'Rare Sitatunga Antelope Sanctuary & Birding Wetland',
    category: 'wildlife',
    categoryLabels: ['Wildlife', 'Wetlands'],
    distanceKm: 18,
    travelTime: '~25 mins',
    locationDetails: '18 km along Eldoret Rd (~25 mins)',
    description: 'Renowned sanctuary of the rare, semi-aquatic Sitatunga antelope and rich birdlife amidst papyrus reed beds.',
    fullDescription: 'Kingwal Swamp is a globally recognized wetland ecosystem spanning along the Kapsabet-Eldoret corridor, celebrated as the world\'s densest natural sanctuary for the rare, shy, swamp-dwelling Sitatunga antelope with specialized splayed hooves. Over 120 endemic bird species (including the Crowned Crane and Great Blue Turaco) inhabit the dense papyrus beds.',
    imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1200&auto=format&fit=crop&q=80',
    studentPrice: 'KES 150 Guide',
    regularPrice: 'KES 400',
    studentPassVerified: true,
    priceBadgeType: 'gold',
    transitDetails: {
      stage: 'Stage 1 (Eldoret Highway Matatus)',
      matatuFare: 'KES 80',
      bodaFare: 'Not needed (swamp is roadside)',
      connectionNotes: 'Board any Eldoret-bound 14-seater shuttle from Kapsabet Main Stage. Alight at Kingwal Bridge Community Post.',
      routeNumber: 'Route 10A'
    },
    highlights: [
      'Elevated wooden wildlife observation hide overlooking papyrus pools',
      'Morning Sitatunga antelope sighting probability (>85% before 9am)',
      'Community student guide escort included with every entry contribution',
      'Biodiversity photography & botanical research documentation point'
    ],
    guidelines: [
      'Binoculars recommended (student rentals available at community gate for KES 50)',
      'Early morning (06:45 – 09:30 AM) or dusk offers optimal sighting conditions',
      'Avoid loud speakers or flash photography near the papyrus fringes',
      'Never attempt to step onto floating papyrus mats unaccompanied'
    ],
    contactPhone: '+254 710 445 889',
    openingHours: '06:00 AM – 06:30 PM Daily',
    coordinates: { lat: 0.3128, lng: 35.1849 }
  },
  {
    id: 'nandi-rock-escarpment',
    name: 'Nandi Rock & Sheu Morobi',
    subtitle: 'Precipitous Rift Valley Views & Historic Escarpment',
    category: 'hiking',
    categoryLabels: ['Hiking', 'Cultural'],
    distanceKm: 28,
    travelTime: '~40 mins by Matatu',
    locationDetails: '28 km South of Kapsabet (~40 mins)',
    description: 'Breathtaking 1,000-meter drop escarpment edge overlooking the Kano Plains, Lake Victoria, and ancient cliff lore.',
    fullDescription: 'Towering above the Nyando escarpment, Nandi Rock is one of Western Kenya\'s most dramatic scenic precipices. Offering 360-degree vistas stretching from Kakamega Forest all the way to Lake Victoria on clear mornings, it is also steeped in cultural history including the legendary "Sheu Morobi" cliff tales. An exceptional weekend day-hike for university adventure clubs.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    studentPrice: 'KES 100',
    regularPrice: 'KES 250',
    studentPassVerified: true,
    priceBadgeType: 'gold',
    transitDetails: {
      stage: 'Nandi Hills Stage',
      matatuFare: 'KES 100',
      bodaFare: 'KES 70 to trail base',
      connectionNotes: 'Matatu to Nandi Hills Town, then short connection towards Chemase road to the community trail base.',
      routeNumber: 'Route 14C'
    },
    highlights: [
      'Unrivaled views across the Great Rift Valley western rim',
      'Challenging 4 km student trekking trail with rocky scrambling sections',
      'Historical Nandi storytelling session by resident elders',
      'Campfire & stargazing clearings approved by local conservancy'
    ],
    guidelines: [
      'Always hike in groups of at least 3 students',
      'Bring minimum 1.5 liters of drinking water per person',
      'Check in with community trail warden before starting ascent'
    ],
    contactPhone: '+254 721 334 009',
    openingHours: '06:00 AM – 05:30 PM Daily',
    coordinates: { lat: 0.1042, lng: 35.1764 }
  },
  {
    id: 'koitalel-samoei-museum',
    name: 'Koitalel Samoei Memorial Museum',
    subtitle: 'Nandi Resistance Orkoiyot Heritage & Mausoleum',
    category: 'cultural',
    categoryLabels: ['Cultural', 'Parks'],
    distanceKm: 22,
    travelTime: '~30 mins',
    locationDetails: '22 km to Nandi Hills Town (~30 mins)',
    description: 'Commemorative national monument and museum honoring the legendary Nandi supreme leader and freedom struggle.',
    fullDescription: 'Located in Nandi Hills, this national monument preserves the regalia, personal leadership artifacts, sacred weapons, and oral traditions of Orkoiyot Koitalel arap Samoei, who led the legendary 11-year resistance against British colonial railway expansion across Nandi land. Certified heritage guides provide in-depth historical lectures for students.',
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    studentPrice: 'KES 50',
    regularPrice: 'KES 200',
    studentPassVerified: true,
    priceBadgeType: 'mint',
    transitDetails: {
      stage: 'Stage 3 (Nandi Hills shuttles)',
      matatuFare: 'KES 80',
      bodaFare: 'KES 30 from stage to gate',
      connectionNotes: 'Express shuttles depart every 15 minutes from Kapsabet stage directly to Nandi Hills town museum gate.',
      routeNumber: 'Route 12'
    },
    highlights: [
      'Authentic leadership baton and colonial archive documents',
      'Mausoleum site of Orkoiyot Koitalel arap Samoei',
      'Academic research archives with university discount admission',
      'Curated traditional botanical medicinal garden'
    ],
    guidelines: [
      'University student ID must be presented at ticket booth for KES 50 concession',
      'Photography permitted in outdoor memorial grounds; ask permission in artifact vault'
    ],
    contactPhone: '+254 53 51010',
    openingHours: '08:00 AM – 05:00 PM Mon–Sat',
    coordinates: { lat: 0.1015, lng: 35.1802 }
  }
];
