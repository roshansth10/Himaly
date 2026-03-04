export interface Destination {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  location: string;
  province: string;
  latitude: number;
  longitude: number;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  attractions: string[];
  activities: string[];
  bestTimeToVisit: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  category: 'Adventure' | 'Cultural' | 'Nature' | 'Pilgrimage' | 'Wildlife';
  highlights: string[];
  history?: string;
}

export const destinations: Destination[] = [
  {
    id: "kathmandu",
    name: "Kathmandu Valley",
    description: "The cultural heart of Nepal with ancient temples, palaces, and vibrant traditions.",
    fullDescription: "Kathmandu Valley is the cultural and political heart of Nepal, home to seven UNESCO World Heritage Sites. The valley contains the cities of Kathmandu, Patan, and Bhaktapur, each with its own Durbar Square featuring palaces, temples, and courtyards that date back centuries. The valley is a living museum of Newari architecture, art, and culture.",
    location: "Kathmandu",
    province: "Bagmati Province",
    latitude: 27.7172,
    longitude: 85.3240,
    price: 0,
    currency: "NPR",
    rating: 4.6,
    reviewCount: 2847,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Pashupatinath Temple", "Swayambhunath Stupa", "Boudhanath Stupa", "Kathmandu Durbar Square", "Patan Durbar Square"],
    activities: ["Heritage walks", "Cultural tours", "Temple visits", "Photography", "Local cuisine tasting"],
    bestTimeToVisit: "September to November, March to May",
    duration: "2-3 days",
    difficulty: "Easy",
    category: "Cultural",
    highlights: ["UNESCO World Heritage Sites", "Ancient Architecture", "Spiritual Experience"],
    history: "The Kathmandu Valley has been inhabited for thousands of years and was an important trading route between India and Tibet."
  },
  {
    id: "pokhara",
    name: "Pokhara",
    description: "Lakeside paradise with stunning mountain views and adventure activities.",
    fullDescription: "Pokhara is Nepal's adventure capital and second-largest city, nestled in the foothills of the Annapurna range. The city sits beside the tranquil Phewa Lake, offering mirror-like reflections of the snow-capped peaks. It's the gateway to the Annapurna Circuit and offers everything from paragliding to zip-lining, boating to trekking.",
    location: "Pokhara",
    province: "Gandaki Province",
    latitude: 28.2096,
    longitude: 83.9856,
    price: 1500,
    currency: "NPR",
    rating: 4.7,
    reviewCount: 3156,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1623589764629-1d86f3b3e1d4?w=800",
      "https://images.unsplash.com/photo-1605209684169-43e5549a79df?w=800"
    ],
    attractions: ["Phewa Lake", "World Peace Pagoda", "Davis Falls", "Gupteshwor Cave", "Sarangkot"],
    activities: ["Paragliding", "Boating", "Trekking", "Zip-lining", "Ultralight flight"],
    bestTimeToVisit: "October to November, March to April",
    duration: "3-5 days",
    difficulty: "Easy",
    category: "Adventure",
    highlights: ["Annapurna Views", "Adventure Sports", "Peaceful Lakeside"],
    history: "Pokhara was once an important trading hub on the route between India and Tibet."
  },
  {
    id: "everest-base-camp",
    name: "Everest Base Camp",
    description: "The ultimate trekking destination at the foot of the world's highest peak.",
    fullDescription: "Everest Base Camp Trek is the journey of a lifetime, taking you to the foot of Mount Everest (8,848.86m), the world's highest peak. The trek passes through the Sagarmatha National Park, offering breathtaking views of Everest, Lhotse, Nuptse, and Ama Dablam. You'll experience Sherpa culture, visit ancient monasteries, and witness some of the most spectacular mountain scenery on Earth.",
    location: "Khumbu Region",
    province: " Koshi Province",
    latitude: 28.0043,
    longitude: 86.8567,
    price: 8000,
    currency: "NPR",
    rating: 5.0,
    reviewCount: 1892,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1513023840371-dd774fcaee9b?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Kala Patthar", "Tengboche Monastery", "Namche Bazaar", "Khumbu Icefall", "Gorak Shep"],
    activities: ["High-altitude trekking", "Photography", "Cultural immersion", "Mountain viewing"],
    bestTimeToVisit: "March to May, September to November",
    duration: "12-14 days",
    difficulty: "Challenging",
    category: "Adventure",
    highlights: ["World's Highest Peak", "Sherpa Culture", "Himalayan Views"],
    history: "First successfully climbed by Sir Edmund Hillary and Tenzing Norgay in 1953."
  },
  {
    id: "annapurna-base-camp",
    name: "Annapurna Base Camp",
    description: "Trek to the heart of the Annapurna Sanctuary surrounded by towering peaks.",
    fullDescription: "The Annapurna Base Camp trek takes you into the Annapurna Sanctuary, a natural amphitheater surrounded by some of the highest peaks in the world including Annapurna I (8,091m), Annapurna South, Hiunchuli, and Machhapuchhre (Fishtail). The trek offers diverse landscapes from subtropical forests to alpine meadows, and provides an up-close view of the massive Annapurna massif.",
    location: "Gandaki Province",
    province: "Gandaki Province",
    latitude: 28.5305,
    longitude: 83.8780,
    price: 899,
    currency: "USD",
    rating: 4.9,
    reviewCount: 2234,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
    ],
    attractions: ["Annapurna Sanctuary", "Machhapuchhre Base Camp", "Hot Springs", "Bamboo Forests", "Deurali"],
    activities: ["Trekking", "Photography", "Village visits", "Hot spring bath"],
    bestTimeToVisit: "March to May, September to November",
    duration: "7-10 days",
    difficulty: "Moderate",
    category: "Adventure",
    highlights: ["360° Mountain Views", "Diverse Landscapes", "Teahouse Experience"],
    history: "Annapurna I was the first 8,000m peak to be successfully climbed in 1950."
  },
  {
    id: "chitwan",
    name: "Chitwan National Park",
    description: "Nepal's first national park with incredible wildlife and jungle safaris.",
    fullDescription: "Chitwan National Park is a UNESCO World Heritage Site and one of the best wildlife destinations in Asia. The park covers 932 sq km of subtropical lowland jungle and is home to the endangered one-horned rhinoceros, Bengal tigers, elephants, crocodiles, and over 500 species of birds. Experience thrilling jungle safaris on elephant back, jeep, or canoe.",
    location: "Chitwan",
    province: "Bagmati Province",
    latitude: 27.5000,
    longitude: 84.3333,
    price: 2000,
    currency: "NPR",
    rating: 4.8,
    reviewCount: 1654,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800"
    ],
    attractions: ["Elephant Breeding Center", "Crocodile Breeding Center", "Tharu Village", "Rapti River", "Bis Hazari Lake"],
    activities: ["Jungle safari", "Elephant ride", "Canoeing", "Bird watching", "Tharu cultural dance"],
    bestTimeToVisit: "October to March",
    duration: "2-3 days",
    difficulty: "Easy",
    category: "Wildlife",
    highlights: ["One-horned Rhino", "Bengal Tigers", "Elephant Encounters"],
    history: "Established in 1973, it was Nepal's first national park."
  },
  {
    id: "lumbini",
    name: "Lumbini",
    description: "The sacred birthplace of Lord Buddha and a UNESCO World Heritage Site.",
    fullDescription: "Lumbini is one of the most important spiritual sites in the world, recognized as the birthplace of Siddhartha Gautama, who later became Lord Buddha. The sacred area includes the Maya Devi Temple marking the exact spot of Buddha's birth, the sacred pond where Maya Devi bathed before giving birth, and numerous monasteries built by Buddhist communities from around the world.",
    location: "Lumbini",
    province: "Lumbini Province",
    latitude: 27.4844,
    longitude: 83.2751,
    price: 500,
    currency: "NPR",
    rating: 4.9,
    reviewCount: 1456,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800"
    ],
    attractions: ["Maya Devi Temple", "Sacred Garden", "Ashoka Pillar", "World Peace Pagoda", "Monastic Zone"],
    activities: ["Meditation", "Pilgrimage", "Monastery visits", "Peace walk", "Spiritual learning"],
    bestTimeToVisit: "October to March",
    duration: "1-2 days",
    difficulty: "Easy",
    category: "Pilgrimage",
    highlights: ["Birthplace of Buddha", "UNESCO Site", "International Monasteries"],
    history: "Prince Siddhartha was born here in 623 BC and achieved enlightenment to become Buddha."
  },
  {
    id: "nagarkot",
    name: "Nagarkot",
    description: "Famous hill station with panoramic sunrise views over the Himalayas.",
    fullDescription: "Nagarkot is a picturesque hill station located 32 km east of Kathmandu, famous for its stunning sunrise views over the Himalayan range. On clear days, you can see Mount Everest and other peaks from Dhaulagiri in the west to Kanchenjunga in the east. The area offers peaceful hiking trails through pine forests and traditional villages.",
    location: "Nagarkot",
    province: "Bagmati Province",
    latitude: 27.7152,
    longitude: 85.5208,
    price: 500,
    currency: "NPR",
    rating: 4.5,
    reviewCount: 987,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Sunrise Viewpoint", "Nagarkot Tower", "Hiking Trails", "Village Walks"],
    activities: ["Sunrise viewing", "Photography", "Hiking", "Mountain biking", "Village tours"],
    bestTimeToVisit: "October to March",
    duration: "1-2 days",
    difficulty: "Easy",
    category: "Nature",
    highlights: ["Himalayan Panorama", "Sunrise Views", "Peaceful Retreat"],
    history: "Once a retreat for Nepali royalty, now a popular tourist destination."
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur Durbar Square",
    description: "Medieval city known as the 'Cultural Capital' with exquisite architecture.",
    fullDescription: "Bhaktapur, meaning 'City of Devotees', is an ancient Newar city that served as the capital of Nepal during the Malla Kingdom until the 15th century. The city is renowned for its well-preserved palace courtyards, temples, and traditional architecture. Bhaktapur Durbar Square is a UNESCO World Heritage Site featuring the 55-Window Palace, Nyatapola Temple, and countless artistic treasures.",
    location: "Bhaktapur",
    province: "Bagmati Province",
    latitude: 27.6729,
    longitude: 85.4276,
    price: 300,
    currency: "NPR",
    rating: 4.7,
    reviewCount: 1234,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["55-Window Palace", "Nyatapola Temple", "Pottery Square", "Dattatreya Square", "Golden Gate"],
    activities: ["Heritage walks", "Pottery making", "Photography", "Local cuisine", "Museum visits"],
    bestTimeToVisit: "Year-round",
    duration: "1 day",
    difficulty: "Easy",
    category: "Cultural",
    highlights: ["Medieval Architecture", "UNESCO Site", "Living Heritage"],
    history: "Capital of the Malla Kingdom, renowned for its art and culture."
  },
  {
    id: "patan",
    name: "Patan (Lalitpur)",
    description: "City of Fine Arts with the finest collection of temples and palaces.",
    fullDescription: "Patan, also known as Lalitpur (City of Beauty), is famous for its rich cultural heritage, particularly its tradition of arts and crafts. Patan Durbar Square is a masterpiece of Newar architecture, with the finest collection of temples and palaces in Nepal. The city is also known for its metalwork, woodcarving, and thangka paintings.",
    location: "Patan",
    province: "Bagmati Province",
    latitude: 27.6670,
    longitude: 85.3206,
    price: 300,
    currency: "NPR",
    rating: 4.6,
    reviewCount: 876,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Patan Durbar Square", "Hiranya Varna Mahavihar", "Mahabouddha Temple", "Patan Museum", "Golden Temple"],
    activities: ["Art gallery visits", "Heritage walks", "Shopping for handicrafts", "Photography"],
    bestTimeToVisit: "Year-round",
    duration: "1 day",
    difficulty: "Easy",
    category: "Cultural",
    highlights: ["Fine Arts", "Metalwork Tradition", "Museum"],
    history: "Known as the city of artists and craftsmen for centuries."
  },
  {
    id: "swayambhunath",
    name: "Swayambhunath (Monkey Temple)",
    description: "Ancient Buddhist stupa with panoramic views of Kathmandu Valley.",
    fullDescription: "Swayambhunath, affectionately known as the Monkey Temple due to the holy monkeys living in the north-west parts of the temple complex, is one of the oldest religious sites in Nepal. The stupa sits atop a hill in the Kathmandu Valley, offering panoramic views of the city. The complex consists of a stupa, temples, and shrines dating back to the Licchavi period.",
    location: "Kathmandu",
    province: "Bagmati Province",
    latitude: 27.7149,
    longitude: 85.2900,
    price: 0,
    currency: "NPR",
    rating: 4.8,
    reviewCount: 2134,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Great Stupa", "Harati Temple", "Shantipur", "Dorje Phagmo Chapel", "World Peace Pond"],
    activities: ["Sunrise viewing", "Photography", "Meditation", "Kora (circumambulation)"],
    bestTimeToVisit: "Year-round",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Pilgrimage",
    highlights: ["Ancient Stupa", "Valley Views", "Buddhist Art"],
    history: "Legend says the valley was once a lake and the stupa rose spontaneously when the water drained."
  },
  {
    id: "pashupatinath",
    name: "Pashupatinath Temple",
    description: "Holiest Hindu temple dedicated to Lord Shiva on the banks of Bagmati River.",
    fullDescription: "Pashupatinath Temple is the most sacred Hindu temple in Nepal, dedicated to Lord Pashupatinath, an incarnation of Shiva as the lord of animals. Located on the banks of the Bagmati River, the temple complex includes over 500 temples and shrines. The main pagoda-style temple is restricted to Hindus only, but visitors can observe the cremation ghats and experience the spiritual atmosphere.",
    location: "Kathmandu",
    province: "Bagmati Province",
    latitude: 27.7105,
    longitude: 85.3488,
    price: 0,
    currency: "NPR",
    rating: 4.7,
    reviewCount: 1876,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Main Temple", "Cremation Ghats", "Guhyeshwari Temple", "Virupaksha Temple", "Bagmati River"],
    activities: ["Evening aarti", "Temple viewing", "Spiritual experience", "Photography"],
    bestTimeToVisit: "Year-round, especially during Shivaratri",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Pilgrimage",
    highlights: ["Holiest Hindu Site", "Cremation Ceremonies", "Architecture"],
    history: "The temple's existence dates back to 400 AD, though the current structure was built in the 17th century."
  },
  {
    id: "sarangkot",
    name: "Sarangkot",
    description: "Hilltop viewpoint famous for sunrise and paragliding over Pokhara.",
    fullDescription: "Sarangkot is a beautiful hilltop located at an altitude of 1,600 meters, offering spectacular panoramic views of the Annapurna range, Machhapuchhre (Fishtail), and Dhaulagiri. It's the most popular paragliding launch site in Nepal, offering tandem flights with stunning aerial views of Pokhara city and Phewa Lake below.",
    location: "Pokhara",
    province: "Gandaki Province",
    latitude: 28.2436,
    longitude: 83.9378,
    price: 500,
    currency: "NPR",
    rating: 4.6,
    reviewCount: 1432,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1623589764629-1d86f3b3e1d4?w=800",
      "https://images.unsplash.com/photo-1605209684169-43e5549a79df?w=800"
    ],
    attractions: ["View Tower", "Paragliding Launch", "Sunrise Point", "Village"],
    activities: ["Paragliding", "Sunrise viewing", "Hiking", "Photography"],
    bestTimeToVisit: "October to April",
    duration: "Half day",
    difficulty: "Easy",
    category: "Adventure",
    highlights: ["Paragliding", "Mountain Views", "Sunrise"],
    history: "Formerly a fort, now a premier adventure and viewpoint destination."
  },
  {
    id: "world-peace-pagoda",
    name: "World Peace Pagoda",
    description: "Buddhist monument overlooking Phewa Lake with stunning views.",
    fullDescription: "The World Peace Pagoda (Shanti Stupa) is a Buddhist monument situated on Anadu Hill overlooking Phewa Lake and the Annapurna mountain range. Built by Buddhist monks from Japan, the pristine white stupa features four large golden Buddha statues facing the four directions. The peaceful setting and panoramic views make it a must-visit spot in Pokhara.",
    location: "Pokhara",
    province: "Gandaki Province",
    latitude: 28.1936,
    longitude: 83.9556,
    price: 0,
    currency: "NPR",
    rating: 4.7,
    reviewCount: 1123,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1623589764629-1d86f3b3e1d4?w=800",
      "https://images.unsplash.com/photo-1605209684169-43e5549a79df?w=800"
    ],
    attractions: ["White Stupa", "Buddha Statues", "Viewpoint", "Japanese Monastery"],
    activities: ["Hiking", "Meditation", "Photography", "Sunset viewing"],
    bestTimeToVisit: "Year-round",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Pilgrimage",
    highlights: ["Peace Monument", "Lake Views", "Meditation"],
    history: "Built by Nichidatsu Fujii, a Buddhist monk from Japan, as part of his peace mission."
  },
  {
    id: "rara-lake",
    name: "Rara Lake",
    description: "Nepal's largest lake surrounded by pristine alpine wilderness.",
    fullDescription: "Rara Lake is the biggest and deepest freshwater lake in Nepal, located in the remote Karnali Province at an altitude of 2,990 meters. The crystal-clear blue lake is surrounded by Rara National Park and offers pristine natural beauty with pine, spruce, and juniper forests. The lake changes colors throughout the day, from azure to deep blue.",
    location: "Mugu",
    province: "Karnali Province",
    latitude: 29.3890,
    longitude: 82.2173,
    price: 1000,
    currency: "NPR",
    rating: 4.9,
    reviewCount: 654,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Rara Lake", "Rara National Park", "Muru Hill", "Chuchemara Peak"],
    activities: ["Trekking", "Boating", "Horse riding", "Photography", "Camping"],
    bestTimeToVisit: "April to May, September to October",
    duration: "5-7 days",
    difficulty: "Moderate",
    category: "Nature",
    highlights: ["Nepal's Largest Lake", "Pristine Wilderness", "Color Changing Waters"],
    history: "Described by former King Mahendra as the most beautiful place in Nepal."
  },
  {
    id: "manakamana",
    name: "Manakamana Temple",
    description: "Sacred temple accessible by Nepal's first cable car system.",
    fullDescription: "Manakamana Temple is a sacred Hindu temple dedicated to Goddess Bhagwati, believed to fulfill the wishes of her devotees. The temple is located atop a 1,302-meter hill and is accessible by Nepal's first cable car system, offering stunning views of the Trishuli and Marshyangdi river valleys. The 10-minute cable car ride itself is a memorable experience.",
    location: "Gorkha",
    province: "Gandaki Province",
    latitude: 27.9000,
    longitude: 85.2000,
    price: 200,
    currency: "NPR",
    rating: 4.5,
    reviewCount: 1234,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Manakamana Temple", "Cable Car Ride", "Viewpoint", "Bhairav Temple"],
    activities: ["Cable car ride", "Pilgrimage", "Photography", "Valley viewing"],
    bestTimeToVisit: "Year-round",
    duration: "Half day",
    difficulty: "Easy",
    category: "Pilgrimage",
    highlights: ["Cable Car Experience", "Wish-Fulfilling Goddess", "Valley Views"],
    history: "The temple was built in the 17th century and the cable car opened in 1998."
  },
  {
    id: "gosaikunda",
    name: "Gosaikunda Lake",
    description: "Sacred alpine lake and important pilgrimage site for Hindus.",
    fullDescription: "Gosaikunda is an alpine freshwater oligotrophic lake located at an altitude of 4,380 meters in Langtang National Park. The lake is considered sacred by Hindus and Buddhists alike, believed to be the abode of Lord Shiva. According to Hindu mythology, the lake was created by Lord Shiva when he thrust his trident into the mountain to extract water to cool his throat after swallowing poison.",
    location: "Rasuwa",
    province: "Bagmati Province",
    latitude: 28.1970,
    longitude: 85.3630,
    price: 500,
    currency: "NPR",
    rating: 4.8,
    reviewCount: 876,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Gosaikunda Lake", "Bhairav Kunda", "Surya Kunda", "Laurebina Pass"],
    activities: ["Trekking", "Pilgrimage", "Photography", "Camping"],
    bestTimeToVisit: "April to May, September to October",
    duration: "5-7 days",
    difficulty: "Moderate",
    category: "Pilgrimage",
    highlights: ["Sacred Lake", "High Altitude", "Religious Significance"],
    history: "Sacred site mentioned in Hindu scriptures including the Ramayana and Mahabharata."
  },
  {
    id: "ilam",
    name: "Ilam",
    description: "Beautiful hill station known for its tea gardens and pristine nature.",
    fullDescription: "Ilam is a picturesque hill district in eastern Nepal, famous for its tea gardens that produce some of the finest tea in the world. The rolling hills covered in lush green tea plantations, combined with the cool climate and views of Mount Kanchenjunga, make Ilam a perfect destination for nature lovers and those seeking tranquility.",
    location: "Ilam",
    province: "Koshi Province",
    latitude: 26.9012,
    longitude: 87.9272,
    price: 400,
    currency: "NPR",
    rating: 4.6,
    reviewCount: 543,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800"
    ],
    attractions: ["Tea Gardens", "Mai Pokhari", "Antu Danda", "Kanyam"],
    activities: ["Tea estate tours", "Trekking", "Photography", "Bird watching"],
    bestTimeToVisit: "March to May, October to November",
    duration: "2-3 days",
    difficulty: "Easy",
    category: "Nature",
    highlights: ["Tea Plantations", "Kanchenjunga Views", "Peaceful Environment"],
    history: "Tea cultivation began here in the 1860s with plants from Darjeeling."
  },
  {
    id: "janakpur",
    name: "Janakpur",
    description: "Ancient city and birthplace of Goddess Sita with magnificent temples.",
    fullDescription: "Janakpur is an important religious and cultural center, believed to be the birthplace of Goddess Sita and the venue of her marriage to Lord Rama. The city is famous for the magnificent Janaki Temple, a stunning example of Hindu-Koiri architecture. Janakpur is also the center of Maithili culture, known for its unique art, music, and traditions.",
    location: "Janakpur",
    province: "Madhesh Province",
    latitude: 26.7123,
    longitude: 85.9215,
    price: 300,
    currency: "NPR",
    rating: 4.5,
    reviewCount: 678,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Janaki Temple", "Ram Mandir", "Dhanush Sagar", "Ganga Sagar", "Mithila Art Center"],
    activities: ["Temple visits", "Cultural tours", "Mithila art viewing", "Festival participation"],
    bestTimeToVisit: "Year-round, especially during Vivah Panchami",
    duration: "1-2 days",
    difficulty: "Easy",
    category: "Cultural",
    highlights: ["Janaki Temple", "Mithila Culture", "Religious Significance"],
    history: "Ancient capital of the Kingdom of Mithila, mentioned in the Ramayana."
  },
  {
    id: "bandipur",
    name: "Bandipur",
    description: "Preserved hilltop town with Newari architecture and Himalayan views.",
    fullDescription: "Bandipur is a beautifully preserved Newari town perched on a ridge at 1,030 meters, offering panoramic views of the Himalayas and the Marsyangdi Valley below. The town has maintained its traditional charm with cobblestone streets, traditional houses, and a main bazaar that has changed little over the centuries. It's a perfect blend of natural beauty and cultural heritage.",
    location: "Bandipur",
    province: "Gandaki Province",
    latitude: 27.5140,
    longitude: 84.4330,
    price: 500,
    currency: "NPR",
    rating: 4.7,
    reviewCount: 765,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1599992693648-c3a0a8776bf1?w=800"
    ],
    attractions: ["Main Bazaar", "Bindabasini Temple", "Tundikhel", "Siddha Cave", "Ramkot Village"],
    activities: ["Heritage walks", "Hiking", "Cave exploration", "Village tours", "Photography"],
    bestTimeToVisit: "October to March",
    duration: "1-2 days",
    difficulty: "Easy",
    category: "Cultural",
    highlights: ["Preserved Architecture", "Himalayan Views", "Traditional Lifestyle"],
    history: "Once a prosperous trading center on the route to India and Tibet."
  },
  {
    id: "upper-mustang",
    name: "Upper Mustang",
    description: "Forbidden Kingdom with Tibetan culture and dramatic desert landscapes.",
    fullDescription: "Upper Mustang, formerly the Kingdom of Lo, is a remote and isolated region that was restricted to outsiders until 1992. The area preserves one of the last bastions of traditional Tibetan culture, with its walled city of Lo Manthang, ancient monasteries, and cave dwellings. The dramatic landscape of desert valleys, colorful rock formations, and snow-capped peaks creates an otherworldly atmosphere.",
    location: "Mustang",
    province: "Gandaki Province",
    latitude: 28.9985,
    longitude: 83.9215,
    price: 8000,
    currency: "NPR",
    rating: 4.9,
    reviewCount: 432,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Lo Manthang", "Choser Caves", "Ghar Gompa", "Chhoser Village", "Kora La Pass"],
    activities: ["Trekking", "Cultural exploration", "Cave visits", "Monastery tours", "Photography"],
    bestTimeToVisit: "April to October",
    duration: "10-14 days",
    difficulty: "Challenging",
    category: "Cultural",
    highlights: ["Tibetan Culture", "Forbidden Kingdom", "Unique Landscape"],
    history: "The Kingdom of Lo was annexed by Nepal in the late 18th century but retained its autonomy."
  },
  {
    id: "langtang-valley",
    name: "Langtang Valley",
    description: "Beautiful valley trek offering stunning mountain views and Tamang culture.",
    fullDescription: "The Langtang Valley trek offers a perfect blend of natural beauty and cultural immersion, taking you through the Langtang National Park to the foot of Langtang Lirung. The valley is known as the 'valley of glaciers' and offers stunning mountain views, pristine forests, and the warm hospitality of the Tamang people. It's one of the most accessible treks from Kathmandu.",
    location: "Rasuwa",
    province: "Bagmati Province",
    latitude: 28.2342,
    longitude: 85.5432,
    price: 599,
    currency: "USD",
    rating: 4.7,
    reviewCount: 987,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["Kyanjin Gompa", "Langtang Village", "Kyanjin Ri", "Langtang Glacier", "Chandan Bari"],
    activities: ["Trekking", "Cheese factory visit", "Monastery visits", "Photography"],
    bestTimeToVisit: "March to May, September to November",
    duration: "7-10 days",
    difficulty: "Moderate",
    category: "Adventure",
    highlights: ["Tamang Culture", "Glacier Views", "Accessible Trekking"],
    history: "The valley was severely affected by the 2015 earthquake but has since recovered."
  },
  {
    id: "mount-everest",
    name: "Mount Everest",
    description: "The world's highest peak and ultimate mountaineering challenge.",
    fullDescription: "Mount Everest, known locally as Sagarmatha, stands at 8,848.86 meters (29,031.7 feet), making it the highest mountain on Earth. Located on the border between Nepal and Tibet, Everest has long been the ultimate challenge for mountaineers. While the full climb requires extensive experience, trekkers can reach Everest Base Camp for a close-up view of this majestic peak.",
    location: "Khumbu Region",
    province: "Koshi Province",
    latitude: 27.9861,
    longitude: 86.9250,
    price: 10000,
    currency: "NPR",
    rating: 5.0,
    reviewCount: 2156,
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1513023840371-dd774fcaee9b?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    attractions: ["South Col", "Hillary Step", "Khumbu Icefall", "Everest Base Camp", "Kala Patthar"],
    activities: ["Mountaineering", "Trekking", "Photography", "Helicopter tours"],
    bestTimeToVisit: "April to May, September to October",
    duration: "Varies",
    difficulty: "Extreme",
    category: "Adventure",
    highlights: ["World's Highest Peak", "Ultimate Achievement", "Himalayan Majesty"],
    history: "First summited by Edmund Hillary and Tenzing Norgay on May 29, 1953."
  }
];

export const categories = [
  { id: 'all', name: 'All Destinations', icon: 'Compass' },
  { id: 'Adventure', name: 'Adventure', icon: 'Mountain' },
  { id: 'Cultural', name: 'Cultural', icon: 'Landmark' },
  { id: 'Nature', name: 'Nature', icon: 'Trees' },
  { id: 'Pilgrimage', name: 'Pilgrimage', icon: 'Pray' },
  { id: 'Wildlife', name: 'Wildlife', icon: 'Bird' }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  if (category === 'all') return destinations;
  return destinations.filter(dest => dest.category === category);
};

export const getTopRatedDestinations = (limit: number = 8): Destination[] => {
  return [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getCheapestDestinations = (limit: number = 8): Destination[] => {
  return [...destinations]
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
};
