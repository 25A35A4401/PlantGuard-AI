// Disease Database
const DISEASE_DATABASE = [
  {
    id: "apple-scab",
    name: "Apple Scab",
    crop: "Apple",
    severity: "Medium",
    confidence: "97.2%",
    description: "A widespread disease affecting apple trees, distorting leaves and creating corky blemishes on the fruit surface.",
    symptoms: [
      "Olive-green, velvety spots on leaf surfaces and petioles",
      "Leaves puckering, turning yellow, and dropping prematurely",
      "Scabby, dark, cracked spots forming on developing apples"
    ],
    cause: "Venturia inaequalis fungus, overwintering on fallen leaves",
    treatment: [
      "Apply sulfur-based or chemical fungicides during early bud break",
      "Rake and destroy fallen leaves in autumn to eliminate spore sources",
      "Prune branches to open up the canopy for sunlight"
    ],
    prevention: [
      "Select scab-resistant apple cultivars like Enterprise or Liberty",
      "Ensure proper tree spacing during initial planting",
      "Routinely clean pruning tools between different trees"
    ]
  },
  {
    id: "apple-black-rot",
    name: "Apple Black Rot",
    crop: "Apple",
    severity: "High",
    confidence: "95.8%",
    description: "A complex fungal disease causing leaf spots (frog-eye), cankers on limbs, and mummified rotting fruit.",
    symptoms: [
      "Small purple leaf spots that enlarge into grey centers with purple rims",
      "Rotting fruit showing black concentric bands",
      "Sunken reddish-brown cankers on bark and branches"
    ],
    cause: "Botryosphaeria obtusa fungus, entering through wounds and dead wood",
    treatment: [
      "Prune out dead limbs, twigs, and cankers during winter dormancy",
      "Remove all mummified, shriveled apples from the tree and ground",
      "Apply labeled fungicides from silver tip stage to harvest"
    ],
    prevention: [
      "Clean up orchard debris thoroughly after the growing season",
      "Control insects and prevent physical damage to bark",
      "Prune immediately after storm damage to prevent wound infections"
    ]
  },
  {
    id: "apple-cedar-rust",
    name: "Apple Cedar Rust",
    crop: "Apple",
    severity: "Medium",
    confidence: "94.8%",
    description: "A dual-host fungal disease requiring both apple trees and eastern red cedars to complete its lifecycle.",
    symptoms: [
      "Bright yellow-orange spots on the upper leaf surfaces in spring",
      "Small orange cups (aecia) forming on the leaf underside",
      "Swollen gall-like growths on twigs and small branches"
    ],
    cause: "Gymonosporangium juniperi-virginianae fungus, requiring two hosts",
    treatment: [
      "Apply preventative copper or chlorothalonil fungicides in early spring",
      "Prune and destroy cedar galls before spore release",
      "Remove nearby eastern red cedar trees if practical"
    ],
    prevention: [
      "Plant rust-resistant apple cultivars",
      "Avoid planting apple trees in close proximity to cedar trees",
      "Inspect nearby evergreens for orange gelatinous galls in wet spring weather"
    ]
  },
  {
    id: "apple-healthy",
    name: "Apple Healthy",
    crop: "Apple",
    severity: "None",
    confidence: "99.2%",
    description: "The apple foliage is healthy, showing optimal green coloration, strong leaf structure, and no signs of bacterial or fungal infection.",
    symptoms: [
      "Leaves are uniformly green and glossy",
      "No visible spots, lesions, or powdery residues",
      "Optimal turgor pressure and structural integrity"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Maintain regular watering and appropriate fertilization schedule",
      "Monitor foliage periodically for changes"
    ],
    prevention: [
      "Follow good orchard sanitation practices",
      "Maintain adequate plant spacing to facilitate airflow",
      "Ensure proper drainage and clean cultivation environment"
    ]
  },
  {
    id: "blueberry-healthy",
    name: "Blueberry Healthy",
    crop: "Blueberry",
    severity: "None",
    confidence: "99.4%",
    description: "The blueberry leaves display healthy physiological features, with normal pigmentation and no signs of rust or leaf spot.",
    symptoms: [
      "Leaves show vibrant dark green color with smooth margins",
      "No discoloration, chlorosis, or necrotic spots",
      "Stems are firm and free of lesions or cankers"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Ensure soil pH remains acidic (typically 4.5 to 5.5)",
      "Provide consistent soil moisture through mulching"
    ],
    prevention: [
      "Monitor soil acidity regularly",
      "Prune old canes annually to promote new, productive shoots",
      "Avoid overhead watering during humid summer days"
    ]
  },
  {
    id: "cherry-powdery-mildew",
    name: "Cherry Powdery Mildew",
    crop: "Cherry",
    severity: "Medium",
    confidence: "93.9%",
    description: "A common fungal disease characterized by a white powdery coating on leaves, shoots, and sometimes fruit, which reduces growth.",
    symptoms: [
      "White or gray powdery patches on new leaves and shoots",
      "Leaves curling upward and becoming distorted",
      "Stunted growth of new shoots and leaves"
    ],
    cause: "Podosphaera clandestina fungus, thriving in warm, dry days and humid nights",
    treatment: [
      "Apply protective sulfur-based or chemical fungicides early in the season",
      "Prune inner branches to improve light penetration and airflow",
      "Remove and destroy heavily infected leaves and shoots"
    ],
    prevention: [
      "Ensure wide tree spacing to allow maximum air movement",
      "Irrigate at the base to avoid wet foliage",
      "Sanitize pruning tools between cuts with rubbing alcohol"
    ]
  },
  {
    id: "cherry-healthy",
    name: "Cherry Healthy",
    crop: "Cherry",
    severity: "None",
    confidence: "99.0%",
    description: "The cherry foliage is healthy, showing bright green leaves with clean margins and no signs of mildew, spots, or pest infestation.",
    symptoms: [
      "Vibrant green leaves with no visible lesions or white coating",
      "Healthy buds and uniform shoot development",
      "Strong leaf attachment to the branches"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Maintain a balanced fertilization and watering schedule",
      "Keep the ground beneath the tree clear of weeds and fallen leaves"
    ],
    prevention: [
      "Prune annually during the winter dormancy period",
      "Inspect the canopy regularly for early signs of pests or disease",
      "Ensure proper soil drainage and adequate sunlight exposure"
    ]
  },
  {
    id: "corn-gray-leaf-spot",
    name: "Corn Gray Leaf Spot",
    crop: "Corn",
    severity: "High",
    confidence: "92.7%",
    description: "A significant fungal disease in corn that causes rectangular lesions on leaves, severely limiting photosynthetic capacity.",
    symptoms: [
      "Rectangular, gray-to-tan leaf lesions bounded by leaf veins",
      "Lesions blending together to form large blighted areas",
      "Premature leaf death leading to stalk lodging and reduced yield"
    ],
    cause: "Cercospora zeae-maydis fungus, overwintering in crop residue on the soil surface",
    treatment: [
      "Apply foliar fungicides containing triazole or strobilurin active ingredients",
      "Harvest early if severe lodging is anticipated to prevent total loss",
      "Chop and till corn debris post-harvest to speed up decomposition"
    ],
    prevention: [
      "Plant corn hybrids with high resistance scores to Gray Leaf Spot",
      "Practice crop rotation with non-host crops like soybeans or alfalfa",
      "Utilize clean tillage practices to bury infected crop residues"
    ]
  },
  {
    id: "corn-common-rust",
    name: "Corn Common Rust",
    crop: "Corn",
    severity: "Low",
    confidence: "96.2%",
    description: "A fungal infection recognizable by cinnamon-brown powdery pustules that erupt on both upper and lower leaf surfaces.",
    symptoms: [
      "Cinnamon-brown, elongated powdery pustules on both leaf sides",
      "Powdery rust spores rubbing off on clothing and skin",
      "Yellowing and premature drying of highly infected leaves"
    ],
    cause: "Puccinia sorghi fungus, carried by wind from warmer overwintering zones",
    treatment: [
      "Fungicide treatments are rarely economical unless infection starts very early",
      "Apply labeled fungicides in sweet corn fields if rust exceeds action thresholds",
      "Remove and destroy infected leaves in home garden plots"
    ],
    prevention: [
      "Plant rust-resistant corn hybrids",
      "Plant crops early to avoid peak mid-to-late summer spore concentrations",
      "Provide optimal soil nutrition to support natural defense systems"
    ]
  },
  {
    id: "corn-northern-leaf-blight",
    name: "Corn Northern Leaf Blight",
    crop: "Corn",
    severity: "High",
    confidence: "94.1%",
    description: "A destructive fungal disease of corn characterized by long, cigar-shaped lesions on the leaves.",
    symptoms: [
      "Long, cigar-shaped grayish-green or tan lesions on leaves",
      "Dark dusty spores forming in the centers of lesions during damp weather",
      "Large-scale leaf death starting from the lower canopy upwards"
    ],
    cause: "Exserohilum turcicum fungus, surviving on corn debris left in the field",
    treatment: [
      "Apply labeled foliar fungicides if symptoms appear before silking stage",
      "Till soil post-harvest to promote residue decay",
      "Shred corn stalks after harvest to minimize overwintering spores"
    ],
    prevention: [
      "Use resistant corn hybrids with Ht genes",
      "Implement a two-year crop rotation out of corn",
      "Optimize air circulation by planting at recommended densities"
    ]
  },
  {
    id: "corn-healthy",
    name: "Corn Healthy",
    crop: "Corn",
    severity: "None",
    confidence: "99.1%",
    description: "The corn foliage is healthy, showing strong upright leaves, uniform green color, and no rust pustules or necrotic lesions.",
    symptoms: [
      "Sturdy green leaves and healthy stalks",
      "No spots, lines, or lesions on the leaf surface",
      "Normal development of the whorl and tassels"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Maintain adequate soil nitrogen and potassium levels",
      "Ensure proper irrigation during critical silking and grain-fill stages"
    ],
    prevention: [
      "Use balanced fertilizer plans based on soil testing",
      "Practice routine crop rotation to maintain soil health",
      "Keep fields clear of competitive weed species"
    ]
  },
  {
    id: "grape-black-rot",
    name: "Grape Black Rot",
    crop: "Grape",
    severity: "High",
    confidence: "97.9%",
    description: "A highly destructive grape disease causing leaf spots and transforming berries into hard, shriveled black mummies.",
    symptoms: [
      "Small, circular reddish-brown spots with dark borders on leaves",
      "Berries turning soft, rotting, and shriveling into hard black ridges",
      "Tiny black fruiting bodies (pycnidia) forming on lesions"
    ],
    cause: "Phyllosticta ampelicida fungus, spreading via wind and water splash",
    treatment: [
      "Apply protective fungicides from early bud break until berries reach pea-size",
      "Remove all mummified grapes from the trellis and ground rows",
      "Prune away and burn infected shoot tips to contain the spread"
    ],
    prevention: [
      "Train grapevines on trellises to optimize air flow and speed drying",
      "Establish vineyards in areas with full sun and good drainage",
      "Bury or destroy fallen leaf debris beneath the trellis lines"
    ]
  },
  {
    id: "grape-black-measles",
    name: "Grape Black Measles (Esca)",
    crop: "Grape",
    severity: "High",
    confidence: "91.5%",
    description: "A complex disease associated with wood-rotting fungi that affects grape leaves, wood, and berries, causing distinct spot patterns.",
    symptoms: [
      "Interveinal yellowing and browning on leaves, creating a tiger-stripe pattern",
      "Small dark spots with halos appearing on the skin of developing berries",
      "Cracking of stems and trunk, with dark brown streaks in the wood"
    ],
    cause: "A complex of fungi, including Phaeomoniella chlamydospora and Phaeoacremonium minimum",
    treatment: [
      "Prune out infected wood and apply protective wound dressings immediately",
      "Replace severely affected vines showing systemic decline",
      "Apply liquid copper or lime-sulfur sprays during dormancy to sanitize bark"
    ],
    prevention: [
      "Sanitize all pruning equipment thoroughly between individual vines",
      "Avoid making large pruning cuts during wet weather conditions",
      "Buy certified disease-free vine rootstocks for new plantings"
    ]
  },
  {
    id: "grape-leaf-blight",
    name: "Grape Leaf Blight",
    crop: "Grape",
    severity: "Medium",
    confidence: "93.4%",
    description: "A fungal infection that primarily strikes older leaves late in the season, causing dark brown lesions and premature leaf drop.",
    symptoms: [
      "Dull brown spots on leaves that enlarge and turn dark brown to black",
      "Sooty dark mold growing on the lower side of infected leaves",
      "Early leaf yellowing and dropping, leaving grapes exposed to sunscald"
    ],
    cause: "Pseudocercospora vitis fungus, thriving in humid late-season conditions",
    treatment: [
      "Apply copper-based fungicides when the disease is first observed",
      "Ensure proper canopy pruning to increase light penetration and airflow",
      "Rake and destroy fallen foliage to eliminate overwintering spores"
    ],
    prevention: [
      "Prune vines to keep a thin, open canopy that dries quickly",
      "Control weeds under vines to reduce ground-level humidity",
      "Ensure adequate vine nutrition to delay leaf senescence"
    ]
  },
  {
    id: "grape-healthy",
    name: "Grape Healthy",
    crop: "Grape",
    severity: "None",
    confidence: "99.3%",
    description: "The grape vine is healthy, with vibrant green lobed leaves, strong tendrils, and no signs of rot, spots, or cane decay.",
    symptoms: [
      "Vibrant green, unblemished leaves with clean veins",
      "Firm, green berries forming dense, healthy clusters",
      "Pliable green shoots free of cankers or discoloration"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Conduct regular canopy pruning to balance fruit load and foliage",
      "Maintain consistent drip irrigation schedules"
    ],
    prevention: [
      "Train vines correctly on trellis wire systems",
      "Sanitize pruning tools between vine blocks",
      "Remove winter pruned wood from the vineyard rows"
    ]
  },
  {
    id: "orange-huanglongbing",
    name: "Orange Huanglongbing",
    crop: "Orange",
    severity: "High",
    confidence: "95.5%",
    description: "Also known as Citrus Greening, this is a devastating bacterial disease that limits nutrient flow, causing bitter, misshapen fruit.",
    symptoms: [
      "Asymmetrical yellow mottling on leaves (blotchy mottle)",
      "Yellowing of individual shoots or branches (yellow shoots)",
      "Small, lopsided fruit that remains green at the bottom and tastes bitter"
    ],
    cause: "Candidatus Liberibacter asiaticus bacterium, transmitted by the Asian citrus psyllid vector",
    treatment: [
      "There is no cure; infected trees must be removed and destroyed immediately",
      "Apply insecticidal sprays to control the Asian citrus psyllid vector",
      "Apply nutritional sprays to prolong the productivity of mildly affected trees"
    ],
    prevention: [
      "Use certified disease-free nursery stock for new trees",
      "Monitor orchards with yellow sticky traps to detect psyllids early",
      "Establish windbreaks to deter psyllid flight into the orchard"
    ]
  },
  {
    id: "peach-bacterial-spot",
    name: "Peach Bacterial Spot",
    crop: "Peach",
    severity: "Medium",
    confidence: "94.6%",
    description: "A bacterial disease that affects peach leaves, twigs, and fruit, leading to defoliation and severe fruit cracking.",
    symptoms: [
      "Small, water-soaked spots on leaves that turn purple-black and drop out (shot-hole)",
      "Dark, sunken spots or cracks on the skin of developing peaches",
      "Girdling cankers forming on twigs and branches"
    ],
    cause: "Xanthomonas arboricola pv. pruni bacterium, overwintering in twig cankers and buds",
    treatment: [
      "Apply copper sprays or oxytetracycline during the growing season",
      "Prune out infected twigs during winter dormancy",
      "Avoid excessive nitrogen fertilization, which prompts highly susceptible soft growth"
    ],
    prevention: [
      "Plant resistant peach cultivars such as Redhaven or Loring",
      "Sanitize pruning tools regularly with a 10% bleach solution",
      "Maintain tree vigor through balanced fertilization and watering"
    ]
  },
  {
    id: "peach-healthy",
    name: "Peach Healthy",
    crop: "Peach",
    severity: "None",
    confidence: "99.0%",
    description: "The peach tree foliage is healthy, showing bright green, lanceolate leaves and clean stems free of bacterial cankers.",
    symptoms: [
      "Clean, green leaves without shot-holes or spots",
      "Smooth twig bark without sunken cankers or gummy exudates",
      "Normal, healthy fruit development"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Provide regular pruning to keep the tree center open for light",
      "Maintain uniform soil moisture, especially during fruit sizing"
    ],
    prevention: [
      "Inspect leaves in early spring for bacterial spot symptoms",
      "Remove fallen leaves and fruit debris from the orchard floor",
      "Apply dormant sprays to prevent overwintering pests"
    ]
  },
  {
    id: "bell-pepper-bacterial-spot",
    name: "Bell Pepper Bacterial Spot",
    crop: "Pepper",
    severity: "High",
    confidence: "95.0%",
    description: "A bacterial disease affecting bell peppers, causing leaf lesions that lead to defoliation and blister-like spots on the fruit.",
    symptoms: [
      "Small, circular, water-soaked spots on the underside of leaves",
      "Spots becoming dark brown and greasy on upper leaf surfaces",
      "Raised, scab-like blister spots on the pepper fruit"
    ],
    cause: "Xanthomonas campestris pv. vesicatoria bacterium, carried on seed or surviving in crop residue",
    treatment: [
      "Apply copper-based sprays immediately upon the first signs of disease",
      "Prune and destroy infected foliage when conditions are dry",
      "Remove and discard heavily infected pepper plants"
    ],
    prevention: [
      "Always buy certified disease-free pepper seeds and transplants",
      "Implement a 2-year crop rotation away from solanaceous crops",
      "Avoid working in pepper fields when foliage is wet from rain or dew"
    ]
  },
  {
    id: "bell-pepper-healthy",
    name: "Bell Pepper Healthy",
    crop: "Pepper",
    severity: "None",
    confidence: "99.1%",
    description: "The bell pepper foliage is healthy, featuring dark green leaves and a robust plant structure free of spots or wilting.",
    symptoms: [
      "Vibrant green leaves with no bacterial spots or margins",
      "Firm, upright stems and healthy white blossoms",
      "Glossy, unblemished pepper fruit developing normally"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Provide balanced watering to prevent blossom end rot",
      "Apply organic mulch to maintain soil temperature and moisture"
    ],
    prevention: [
      "Keep the garden plot free of weeds that harbor solanaceous diseases",
      "Maintain adequate plant spacing for foliage drying",
      "Clean garden hand tools before pruning pepper plants"
    ]
  },
  {
    id: "potato-early-blight",
    name: "Potato Early Blight",
    crop: "Potato",
    severity: "Medium",
    confidence: "96.4%",
    description: "Primarily targets older foliage of potato plants, reducing yield size by disrupting leaf photosynthesis.",
    symptoms: [
      "Dark, concentric ring spots (target spots) on older leaves near the ground",
      "Leathery, dark, sunken spots on potato tubers during storage",
      "Yellowing of leaves around lesions followed by foliage collapse"
    ],
    cause: "Alternaria solani fungus, persisting on crop debris in the soil",
    treatment: [
      "Apply protective chemical or organic copper-based fungicides systematically",
      "Ensure crop receives optimal nitrogen fertilization to reduce stress",
      "Harvest tubers only after vines have died completely to reduce skin damage"
    ],
    prevention: [
      "Avoid planting potatoes in the same soil for consecutive years (3-year rotation)",
      "Provide uniform irrigation early in the day to minimize leaf wetness duration",
      "Store potato crops in dry, well-ventilated storage rooms"
    ]
  },
  {
    id: "potato-late-blight",
    name: "Potato Late Blight",
    crop: "Potato",
    severity: "High",
    confidence: "99.1%",
    description: "A highly destructive disease that attacks stems, leaves, and tubers with alarming speed, capable of ruining fields in days.",
    symptoms: [
      "Irregular dark green to black water-soaked lesions on leaves, often with pale halos",
      "Stems turning black, leading to rapid plant collapse in wet weather",
      "Tubers rotting in soil with a reddish-brown, dry, granular rot"
    ],
    cause: "Phytophthora infestans oomycete, favoring high humidity and moderate temperatures",
    treatment: [
      "Apply systemic fungicides immediately if late blight is reported in the area",
      "Kill vines chemically or mechanically if disease strikes late in the cycle",
      "Remove and destroy infected plants immediately (do not compost)"
    ],
    prevention: [
      "Always plant certified, disease-free seed tubers",
      "Discard volunteer potato plants that sprout from cull piles",
      "Avoid overhead watering during humid weather blocks"
    ]
  },
  {
    id: "potato-healthy",
    name: "Potato Healthy",
    crop: "Potato",
    severity: "None",
    confidence: "99.5%",
    description: "The potato foliage is healthy, showing vigorous green leaf canopies and clean stems without blight lesions.",
    symptoms: [
      "Lush, green compound leaves with no dark lesions or yellowing",
      "Solid, green upright stems",
      "Firm, clean seed tuber development"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Provide hilling around plant bases to protect developing tubers from sun",
      "Maintain consistent soil moisture"
    ],
    prevention: [
      "Ensure proper crop rotation patterns are followed in fields",
      "Remove weeds and wild solanaceous host plants from vicinity",
      "Monitor fields regularly for early signs of blight"
    ]
  },
  {
    id: "raspberry-healthy",
    name: "Raspberry Healthy",
    crop: "Raspberry",
    severity: "None",
    confidence: "99.2%",
    description: "The raspberry leaves show excellent health, with a rich green color, proper shape, and no signs of cane blight or rust.",
    symptoms: [
      "Bright green, textured leaves with clean serrated margins",
      "Firm, green canes with no dark lesions or wilting",
      "Normal development of berries and flower buds"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Prune out dead canes annually to encourage new growth",
      "Maintain a thick layer of organic mulch around the root zone"
    ],
    prevention: [
      "Water at the base of the plant using drip irrigation",
      "Keep canes thinned to ensure excellent air circulation",
      "Regularly inspect canes for any signs of boring insects"
    ]
  },
  {
    id: "soybean-healthy",
    name: "Soybean Healthy",
    crop: "Soybean",
    severity: "None",
    confidence: "99.3%",
    description: "The soybean crop displays healthy vegetative features, with trifoliate leaves exhibiting normal chlorophyll and no rust or spots.",
    symptoms: [
      "Uniformly green trifoliate leaves with no spots or yellow margins",
      "Strong, upright main stem and nodes",
      "Healthy pod development and leaf retention"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Ensure balanced soil macronutrients (Nitrogen, Phosphorus, Potassium)",
      "Monitor soil moisture during pod filling"
    ],
    prevention: [
      "Implement crop rotation cycles with corn or wheat",
      "Plant high-quality certified seeds treated with inoculants",
      "Clean harvesting equipment to prevent spreading weed seeds"
    ]
  },
  {
    id: "squash-powdery-mildew",
    name: "Squash Powdery Mildew",
    crop: "Squash",
    severity: "Medium",
    confidence: "96.0%",
    description: "A prevalent fungal disease in squash that forms a white powdery layer on leaves, causing them to dry up and drop off.",
    symptoms: [
      "White, talcum-powder-like spots on leaves, stems, and petioles",
      "Leaves turning yellow, then brown, and curling upward",
      "Sunscald on squash fruits due to early loss of protective leaf canopy"
    ],
    cause: "Podosphaera xanthii fungus, spreading easily via air currents in warm, shaded conditions",
    treatment: [
      "Apply organic horticultural oils, neem oil, or potassium bicarbonate",
      "Apply chemical fungicides containing chlorothalonil or myclobutanil",
      "Prune select leaves to improve airflow within the dense squash vine"
    ],
    prevention: [
      "Plant squash cultivars bred for powdery mildew resistance",
      "Locate squash plantings in full sun areas",
      "Space plants appropriately to prevent overcrowding and trap humidity"
    ]
  },
  {
    id: "strawberry-leaf-scorch",
    name: "Strawberry Leaf Scorch",
    crop: "Strawberry",
    severity: "Medium",
    confidence: "94.0%",
    description: "A fungal disease that creates purple spots on strawberry leaves, which merge to make leaves look burned or scorched.",
    symptoms: [
      "Numerous small, purplish spots on the upper leaf surfaces",
      "Spots enlarging and merging, causing the leaf tissue to dry and curl up",
      "Girdled fruit stems, causing developing berries to remain small and dry"
    ],
    cause: "Diplocarpon earlianum fungus, overwintering on infected dead leaves",
    treatment: [
      "Apply labeled fungicides during early spring before blossom stage",
      "Mow and renovate strawberry beds immediately after harvesting",
      "Remove and destroy infected leaves during the growing season"
    ],
    prevention: [
      "Plant scorch-resistant strawberry varieties",
      "Avoid planting strawberries in poorly drained or shady garden locations",
      "Control weeds to ensure good air movement around strawberry crowns"
    ]
  },
  {
    id: "strawberry-healthy",
    name: "Strawberry Healthy",
    crop: "Strawberry",
    severity: "None",
    confidence: "99.4%",
    description: "The strawberry plants are healthy, characterized by clean, dark green runner leaves and robust crown structures.",
    symptoms: [
      "Lush green leaves with no purple spots, scorching, or lesions",
      "Strong, green runners and plump crowns",
      "Bright white blossoms and healthy red berries developing"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Maintain consistent moisture with straw mulching to keep berries off soil",
      "Apply balanced berry fertilizer in early spring"
    ],
    prevention: [
      "Renovate strawberry beds every few years to keep plants vigorous",
      "Sanitize plant rows by removing dead leaves in late winter",
      "Ensure proper plant spacing when establishing new rows"
    ]
  },
  {
    id: "tomato-bacterial-spot",
    name: "Tomato Bacterial Spot",
    crop: "Tomato",
    severity: "High",
    confidence: "94.9%",
    description: "A severe bacterial disease causing spots on tomato leaves and stems, resulting in defoliation and dark, scabby lesions on fruits.",
    symptoms: [
      "Small, dark, water-soaked spots on leaves that turn brown and papery",
      "Dark, raised scab-like lesions on green and ripe tomato fruits",
      "Yellowing of leaves around spots, leading to early leaf drop"
    ],
    cause: "Xanthomonas perforans bacterium, spreading via splashing rain and contaminated tools",
    treatment: [
      "Apply copper-based fungicides combined with mancozeb weekly",
      "Prune and destroy infected lower leaves under dry weather conditions",
      "Remove and destroy highly infected plants to contain field spread"
    ],
    prevention: [
      "Use certified disease-free seeds and hot-water treated transplants",
      "Avoid overhead sprinkler irrigation; use drip or soaker hoses",
      "Rotate tomatoes with non-solanaceous crops on a 3-year cycle"
    ]
  },
  {
    id: "tomato-early-blight",
    name: "Tomato Early Blight",
    crop: "Tomato",
    severity: "Medium",
    confidence: "98.6%",
    description: "A common fungal disease caused by Alternaria solani that targets tomatoes, causing leaf spot and crop loss if untreated.",
    symptoms: [
      "Brown circular spots with concentric rings (target spots) on older leaves",
      "Yellow halos forming around the leaf spots",
      "Lower leaves drying up and dropping off early"
    ],
    cause: "Alternaria solani fungus, thriving in warm, humid conditions",
    treatment: [
      "Apply copper-based or organic fungicides promptly",
      "Prune and burn lower infected leaves to prevent soil splash",
      "Avoid overhead sprinkler irrigation; irrigate at the base"
    ],
    prevention: [
      "Practice 3-year crop rotation with non-solanaceous crops",
      "Maintain wide plant spacing for excellent air circulation",
      "Mulch soil around the plant stem to prevent spore splashing"
    ]
  },
  {
    id: "tomato-late-blight",
    name: "Tomato Late Blight",
    crop: "Tomato",
    severity: "High",
    confidence: "94.5%",
    description: "A highly destructive disease caused by Phytophthora infestans that can decimate an entire tomato field within days.",
    symptoms: [
      "Dark, water-soaked spots on leaves that turn brown-black rapidly",
      "White fuzzy growth on leaf undersides in wet weather",
      "Large, firm, dark brown patches on green or ripe tomatoes"
    ],
    cause: "Phytophthora infestans oomycete, spreading rapidly in cool, wet environments",
    treatment: [
      "Apply protective fungicides containing chlorothalonil or copper",
      "Destroy and discard all infected plants immediately (do not compost)",
      "Ensure rapid drying of foliage after rain"
    ],
    prevention: [
      "Use certified disease-free seeds and resistant tomato varieties",
      "Avoid planting tomatoes near potato fields",
      "Regularly inspect foliage during damp or foggy periods"
    ]
  },
  {
    id: "tomato-leaf-mold",
    name: "Tomato Leaf Mold",
    crop: "Tomato",
    severity: "Medium",
    confidence: "93.0%",
    description: "A fungal disease that typically occurs in greenhouses, causing olive-green to gray velvety growth on the undersides of leaves.",
    symptoms: [
      "Pale green or yellow spots on the upper surface of older leaves",
      "Olive-green to grayish velvety spore growth on the leaf underside",
      "Leaves curling, wilting, and dropping off prematurely"
    ],
    cause: "Passalora fulva fungus, thriving in high humidity (above 85%)",
    treatment: [
      "Apply fungicides containing chlorothalonil or copper at first signs",
      "Increase ventilation and heating in greenhouses to reduce humidity",
      "Prune the lower leaves of tomato plants to facilitate air movement"
    ],
    prevention: [
      "Select resistant tomato cultivars",
      "Maintain relative humidity below 85% in greenhouse environments",
      "Avoid wetting tomato leaves during irrigation"
    ]
  },
  {
    id: "tomato-septoria-leaf-spot",
    name: "Tomato Septoria Leaf Spot",
    crop: "Tomato",
    severity: "Medium",
    confidence: "95.5%",
    description: "A very common fungal leaf spot disease of tomatoes that starts on the lower leaves and progresses upward, leading to severe defoliation.",
    symptoms: [
      "Small, circular spots with dark brown margins and gray centers",
      "Tiny black specks (fruiting bodies) in the centers of the spots",
      "Yellowing and drying of leaves, starting from the base of the plant"
    ],
    cause: "Septoria lycopersici fungus, overwintering on tomato crop residue and weeds",
    treatment: [
      "Apply copper fungicides or chlorothalonil at regular intervals",
      "Prune and destroy infected lower leaves immediately",
      "Remove weeds like nightshade or horse nettle that host the fungus"
    ],
    prevention: [
      "Practice strict crop rotation (at least 2 years without tomatoes or potatoes)",
      "Apply a thick layer of organic mulch around tomato plants",
      "Water early in the morning at the base of the plant"
    ]
  },
  {
    id: "tomato-two-spotted-spider-mite",
    name: "Tomato Two Spotted Spider Mite",
    crop: "Tomato",
    severity: "Medium",
    confidence: "91.8%",
    description: "Tiny arachnid pests that suck the contents of leaf cells, causing fine yellow stippling and webbing on tomato plants.",
    symptoms: [
      "Fine yellow-white stippling (dots) on the upper leaf surfaces",
      "Fine silk webbing on the undersides of leaves and at stem joints",
      "Leaves turning bronze, drying out, and dropping under heavy infestation"
    ],
    cause: "Tetranychus urticae, a microscopic mite that thrives in hot, dry weather",
    treatment: [
      "Spray plants with insecticidal soap, neem oil, or horticultural oils",
      "Release predatory mites (e.g., Phytoseiulus persimilis) as a biological control",
      "Use miticides labeled for tomato crops in severe infestations"
    ],
    prevention: [
      "Keep plants well-watered, as water-stressed plants are more susceptible",
      "Spray the undersides of leaves with a strong stream of water to dislodge mites",
      "Avoid broad-spectrum chemical insecticides that kill natural predators"
    ]
  },
  {
    id: "tomato-target-spot",
    name: "Tomato Target Spot",
    crop: "Tomato",
    severity: "Medium",
    confidence: "92.5%",
    description: "A fungal disease causing target-like lesions on tomato leaves and fruit, often confused with early blight.",
    symptoms: [
      "Zonate, dark brown spots with prominent concentric rings on leaves",
      "Slightly sunken, dark spots with concentric rings on developing fruit",
      "Pits and cracks forming in the center of fruit lesions"
    ],
    cause: "Corynespora cassiicola fungus, surviving in crop debris and weeds",
    treatment: [
      "Apply fungicides containing strobilurins or carboxamides",
      "Prune the lower leaves of the canopy to improve air circulation",
      "Remove and destroy infected plants after the harvest season"
    ],
    prevention: [
      "Maintain a 3-year crop rotation with non-host crops",
      "Avoid overhead watering; irrigate the roots directly",
      "Keep fields and gardens free of host weeds"
    ]
  },
  {
    id: "tomato-yellow-leaf-curl-virus",
    name: "Tomato Yellow Leaf Curl Virus",
    crop: "Tomato",
    severity: "High",
    confidence: "96.8%",
    description: "A highly destructive viral disease transmitted by whiteflies that stunts tomato plant growth and prevents fruit setting.",
    symptoms: [
      "Severe stunting of the plant with erect, bushy growth",
      "Leaves curling upward and inward, becoming yellow and small",
      "Failure of flowers to develop or set fruit, leading to total yield loss"
    ],
    cause: "Tomato Yellow Leaf Curl Virus (TYLCV), transmitted by the silverleaf whitefly (Bemisia tabaci)",
    treatment: [
      "There is no cure; immediately pull up and destroy infected plants",
      "Use insecticidal soaps, neem oil, or systemic insecticides to control whiteflies",
      "Use yellow sticky cards to monitor and trap adult whiteflies"
    ],
    prevention: [
      "Plant TYLCV-resistant tomato varieties",
      "Cover young plants with fine insect netting to exclude whiteflies",
      "Keep the growing area weed-free to eliminate whitefly breeding sites"
    ]
  },
  {
    id: "tomato-mosaic-virus",
    name: "Tomato Mosaic Virus",
    crop: "Tomato",
    severity: "High",
    confidence: "93.5%",
    description: "A highly contagious viral disease that causes mottled leaf patterns and distorted leaf shapes on tomato plants.",
    symptoms: [
      "Mottled light and dark green patterns (mosaic) on leaves",
      "Leaves becoming narrow, distorted, or fern-like (shoestringing)",
      "Uneven ripening and brown internal streaks in tomato fruit"
    ],
    cause: "Tomato Mosaic Virus (ToMV), spreading through mechanical contact, seeds, and soil",
    treatment: [
      "No curative treatment exists; infected plants must be removed and burned",
      "Sanitize hands and gardening tools with soap or nonfat dry milk solution",
      "Do not touch healthy plants after handling infected ones"
    ],
    prevention: [
      "Plant certified virus-free seeds or varieties resistant to ToMV",
      "Disinfect support stakes and cages between seasons",
      "Avoid planting tomatoes in soil where infected crops grew recently"
    ]
  },
  {
    id: "tomato-healthy",
    name: "Tomato Healthy",
    crop: "Tomato",
    severity: "None",
    confidence: "99.5%",
    description: "The tomato plant is in peak health, showing lush, green leaf clusters and healthy vines free of viral or fungal spots.",
    symptoms: [
      "Lush, green compound leaves with no spots, mottling, or wilting",
      "Firm, green upright stems and healthy yellow blossoms",
      "Symmetrical, glossy tomato fruits developing normally"
    ],
    cause: "N/A - Plant is healthy",
    treatment: [
      "No treatment required",
      "Maintain weekly deep watering at the base of the plant",
      "Apply organic tomato fertilizer when blossoms start setting fruit"
    ],
    prevention: [
      "Prune suckers to maintain single-stem or double-stem airflow",
      "Mulch beds to conserve moisture and suppress splash-borne pathogens",
      "Routinely monitor leaves for early pest indicators"
    ]
  }
];

// App State
let currentUploadedImage = null;
let currentUploadedFileName = "";
let currentUploadedFile = null;
let fileObject = null;

// DOM Elements
const views = document.querySelectorAll('.view-section');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const navMenu = document.getElementById('nav-menu');
const logoBtn = document.getElementById('logo-btn');

const uploadPanel = document.getElementById('upload-panel');
const previewPanel = document.getElementById('preview-panel');
const resultPanel = document.getElementById('result-panel');
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const leafPreview = document.getElementById('leaf-preview');
const startDetectBtn = document.getElementById('start-detect-btn');
const changeImageBtn = document.getElementById('change-image-btn');
const frameWrapper = document.getElementById('frame-wrapper');
const actionsBar = document.getElementById('detection-actions-bar');

const progressBox = document.getElementById('scanner-progress-box');
const scanProgressBar = document.getElementById('scan-progress-bar');
const scanPercent = document.getElementById('scan-percent');
const scanStatusText = document.getElementById('scan-status-text');
const scannerConsoleLog = document.getElementById('scanner-console-log');

const resSeverity = document.getElementById('res-severity');
const resImg = document.getElementById('res-img');
const resConfidence = document.getElementById('res-confidence');
const resConfidenceBar = document.getElementById('res-confidence-bar');
const resCropName = document.getElementById('res-crop-name');
const resDiseaseName = document.getElementById('res-disease-name');
const resSymptoms = document.getElementById('res-symptoms');
const resCause = document.getElementById('res-cause');
const resTreatment = document.getElementById('res-treatment');
const resPrevention = document.getElementById('res-prevention');
const detectAnotherBtn = document.getElementById('detect-another-btn');
const downloadReportBtn = document.getElementById('download-report-btn');
const shareResultBtn = document.getElementById('share-result-btn');

const libraryGrid = document.getElementById('library-grid-container');
const librarySearchInput = document.getElementById('library-search-input');
const filterPillsContainer = document.getElementById('filter-pills-container');

const contactForm = document.getElementById('contact-form-element');
const detailModal = document.getElementById('detail-modal');
const modalDiseaseTitle = document.getElementById('modal-disease-title');
const modalDiseaseBody = document.getElementById('modal-disease-body');
const modalCloseBtn = document.getElementById('modal-close-btn');

const toastContainer = document.getElementById('toast-box');

// 1. SPA ROUTING
function showView(viewId) {
  // Hide all views, remove active class
  views.forEach(v => v.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  // Show target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');

    // Update active nav state
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === viewId) {
        link.classList.add('active');
      }
    });

    // Close mobile menu
    navMenu.classList.remove('open');
    menuToggleBtn.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Set hash
    if (window.location.hash !== `#${viewId}`) {
      window.location.hash = viewId;
    }
  }
}

// Router Event Listeners
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1) || 'home';
  showView(hash);
});

// Init router based on initial hash
const initialHash = window.location.hash.substring(1) || 'home';
showView(initialHash);

// Logo link
logoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showView('home');
});

// Nav menu clicks
navMenu.addEventListener('click', (e) => {
  const link = e.target.closest('.nav-link');
  if (link) {
    e.preventDefault();
    const view = link.getAttribute('data-view');
    showView(view);
  }
});

// Navigate buttons inside sections
document.body.addEventListener('click', (e) => {
  const navBtn = e.target.closest('.navigate-btn');
  if (navBtn) {
    const target = navBtn.getAttribute('data-target');
    showView(target);
  }
});

// Mobile Hamburger Menu
menuToggleBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggleBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});

// 2. DRAG AND DROP FILE UPLOAD
// Click dropzone to trigger input
dropZone.addEventListener('click', () => fileInput.click());

// Drag/drop events
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
  }, false);
});

dropZone.addEventListener('drop', (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 0) {
    handleFileUpload(files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFileUpload(e.target.files[0]);
  }
});

function handleFileUpload(file) {
  // Validate format
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    showToast("Unsupported file format. Please upload JPG, JPEG, or PNG.", "error");
    return;
  }

  // Validate size (10 MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast("File is too large. Maximum size is 10 MB.", "error");
    return;
  }

  currentUploadedFileName = file.name.toLowerCase();
  currentUploadedFile = file;
  fileObject = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    currentUploadedImage = e.target.result;

    // Display preview
    leafPreview.src = currentUploadedImage;

    // Transition panels
    uploadPanel.style.display = 'none';
    previewPanel.style.display = 'flex';
    resultPanel.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// Reset upload button
changeImageBtn.addEventListener('click', () => {
  resetUploadState();
});

function resetUploadState() {
  currentUploadedImage = null;
  currentUploadedFileName = "";
  currentUploadedFile = null;
  fileObject = null;
  fileInput.value = "";
  leafPreview.src = "";

  uploadPanel.style.display = 'block';
  previewPanel.style.display = 'none';
  resultPanel.style.display = 'none';

  // Clear progress bars
  progressBox.style.display = 'none';
  actionsBar.style.display = 'flex';
  frameWrapper.classList.remove('scanning-active');
  scanProgressBar.style.width = '0%';
  scanPercent.innerText = '0%';
}

// 3. SIMULATED AI DETECTION SCANNER
startDetectBtn.addEventListener('click', async () => {
  if (!fileObject && !currentUploadedFile) {
    showToast("No image file uploaded. Please select a valid leaf image.", "error");
    return;
  }

  const fileToSend = fileObject || currentUploadedFile;

  // 1. Hide buttons, show progress bar and start laser
  actionsBar.style.display = 'none';
  progressBox.style.display = 'block';
  frameWrapper.classList.add('scanning-active');

  // Console logging setup
  scannerConsoleLog.innerHTML = '';
  addConsoleLine("Initializing neural diagnostic processor...");

  const scanSteps = [
    { percent: 15, text: "Calibrating optical lens matrix...", log: "Calibrating lens structure... OK" },
    { percent: 35, text: "Analyzing leaf chlorophyll pigmentation...", log: "Processing color channels: Green 65.4%, Yellow 24.1%" },
    { percent: 55, text: "Scanning leaf margins & spot contours...", log: "Detected necrotic patterns at coordinates X:45, Y:128" },
    { percent: 78, text: "Matching features to botanical database...", log: "Querying fungal/bacterial vectors. Distance metric = 0.042" },
  ];

  let currentStepIdx = 0;
  let currentPercentage = 0;
  let predictionData = null;
  let predictionError = null;

  // 2. Start the actual network request immediately
  const formData = new FormData();
  formData.append("image", fileToSend);

  console.log("[PlantGuard AI] Starting POST /predict fetch with file:", fileToSend.name);

  const apiCall = fetch("/predict", {
    method: "POST",
    body: formData
  })
  .then(async response => {
    console.log("[PlantGuard AI] Received response status:", response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status} (${response.statusText})`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Server did not return JSON. Check your backend server state.");
    }
    const data = await response.json();
    console.log("[PlantGuard AI] Parsed JSON response:", data);
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  })
  .then(data => {
    predictionData = data;
  })
  .catch(err => {
    console.error("[PlantGuard AI] Fetch /predict error:", err);
    predictionError = err;
  });

  // 3. Progress bar animation
  let isCompleted = false;
  const intervalId = setInterval(() => {
    try {
      if (isCompleted) return;

      // Handle error case
      if (predictionError !== null) {
        isCompleted = true;
        clearInterval(intervalId);
        progressBox.style.display = 'none';
        actionsBar.style.display = 'flex';
        frameWrapper.classList.remove('scanning-active');
        showToast("Detection failed: " + predictionError.message, "error");
        return;
      }

      // While network data has not returned yet:
      if (predictionData === null) {
        if (currentPercentage < 90) {
          currentPercentage += 1;
          scanProgressBar.style.width = `${currentPercentage}%`;
          scanPercent.innerText = `${currentPercentage}%`;

          const step = scanSteps[currentStepIdx];
          if (step && currentPercentage >= step.percent) {
            scanStatusText.innerText = step.text;
            addConsoleLine(step.log);
            currentStepIdx++;
          }
        } else {
          scanStatusText.innerText = "Processing leaf image in neural network...";
        }
      } else {
        // Data is ready, smoothly advance to 100%
        if (currentPercentage < 100) {
          currentPercentage += 2;
          if (currentPercentage > 100) currentPercentage = 100;
          scanProgressBar.style.width = `${currentPercentage}%`;
          scanPercent.innerText = `${currentPercentage}%`;

          if (currentPercentage >= 92 && currentPercentage < 95) {
            scanStatusText.innerText = "Calculating disease severity indexes...";
            let confPercent = parseFloat(predictionData.confidence);
            let confStr = isNaN(confPercent) ? "N/A" : confPercent.toFixed(1) + "%";
            addConsoleLine(`Comparing symptoms. Pathogen profile match: ${confStr}`);
          }
        }

        // Reached 100%: finalize report & trigger result display
        if (currentPercentage >= 100) {
          isCompleted = true;
          scanProgressBar.style.width = "100%";
          scanPercent.innerText = "100%";
          scanStatusText.innerText = "Finalizing diagnosis report...";
          addConsoleLine("Report generation complete.");
          clearInterval(intervalId);

          console.log("[PlantGuard AI] Scanner reached 100%. Executing completeDetection with data:", predictionData);
          setTimeout(() => {
            completeDetection(predictionData);
          }, 300);
        }
      }
    } catch (err) {
      console.error("[PlantGuard AI] Error in scanner interval:", err);
      isCompleted = true;
      clearInterval(intervalId);
      progressBox.style.display = 'none';
      actionsBar.style.display = 'flex';
      frameWrapper.classList.remove('scanning-active');
      showToast("Scanner error: " + err.message, "error");
    }
  }, 25);
});

function completeDetection(data) {
  console.log("[PlantGuard AI] completeDetection executing with data:", data);
  if (!data) {
    console.error("[PlantGuard AI] Error: completeDetection called with null or undefined data!");
    showToast("Invalid prediction response received.", "error");
    progressBox.style.display = 'none';
    actionsBar.style.display = 'flex';
    frameWrapper.classList.remove('scanning-active');
    return;
  }
  try {
    displayResults(data);
  } catch (err) {
    console.error("[PlantGuard AI] Critical error inside displayResults:", err);
    showToast("Error displaying results: " + err.message, "error");
    progressBox.style.display = 'none';
    actionsBar.style.display = 'flex';
    frameWrapper.classList.remove('scanning-active');
  }
}

function addConsoleLine(text) {
  const line = document.createElement('div');
  line.className = 'console-line';
  line.innerText = text;
  scannerConsoleLog.appendChild(line);
  scannerConsoleLog.scrollTop = scannerConsoleLog.scrollHeight;
}

function getMatch(flaskCrop, flaskDisease) {
  if (!flaskCrop || !flaskDisease) return null;

  // Normalize crop and disease name to lowercase alphanumeric words, splitting on spaces, dashes and underscores
  const normalize = (str) => {
    if (!str) return [];
    return str.toLowerCase().replace(/[^a-z0-9\s_-]/g, '').split(/[\s_-]+/).filter(Boolean);
  };

  const cropWords = normalize(flaskCrop);
  const diseaseWords = normalize(flaskDisease);

  let bestMatch = null;
  let maxScore = -1;

  for (const entry of DISEASE_DATABASE) {
    const entryCropWords = normalize(entry.crop);
    const entryNameWords = normalize(entry.name);
    const entryIdWords = normalize(entry.id);

    // Calculate crop match score: how many words overlap
    let cropOverlap = cropWords.filter(w => entryCropWords.includes(w)).length;
    // Check if one is a substring of the other
    const cropStr = cropWords.join(" ");
    const entryCropStr = entryCropWords.join(" ");
    if (cropStr.includes(entryCropStr) || entryCropStr.includes(cropStr)) {
      cropOverlap += 1;
    }

    if (cropOverlap === 0) continue; // Crop must match at least partially

    // Calculate disease match score
    let diseaseOverlap = 0;
    // Check name words
    diseaseOverlap += diseaseWords.filter(w => entryNameWords.includes(w)).length;
    // Check id words
    diseaseOverlap += diseaseWords.filter(w => entryIdWords.includes(w)).length;

    // Check if disease matches "healthy"
    const isFlaskHealthy = diseaseWords.includes("healthy");
    const isEntryHealthy = entryNameWords.includes("healthy") || entryIdWords.includes("healthy");
    if (isFlaskHealthy && isEntryHealthy) {
      diseaseOverlap += 5; // Strong bias for healthy matching
    } else if (isFlaskHealthy !== isEntryHealthy) {
      diseaseOverlap -= 5; // Penalty if one is healthy and the other is not
    }

    // Special cases mappings to cover exact translations of classes
    if (diseaseWords.includes("haunglongbing") || diseaseWords.includes("huanglongbing") || diseaseWords.includes("greening")) {
      if (entryNameWords.includes("huanglongbing") || entryNameWords.includes("greening") || entryIdWords.includes("huanglongbing") || entryIdWords.includes("greening")) {
        diseaseOverlap += 10;
      }
    }
    if (diseaseWords.includes("esca") || diseaseWords.includes("measles")) {
      if (entryIdWords.includes("esca") || entryNameWords.includes("esca")) {
        diseaseOverlap += 10;
      }
    }
    if (diseaseWords.includes("cercospora") || diseaseWords.includes("gray")) {
      if (entryIdWords.includes("gray") || entryNameWords.includes("gray")) {
        diseaseOverlap += 10;
      }
    }

    const score = cropOverlap * 10 + diseaseOverlap;
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

function displayResults(data) {
  console.log("[PlantGuard AI] displayResults called with data:", data);
  if (!data) {
    console.error("[PlantGuard AI] Error: displayResults called with null or undefined data!");
    showToast("Invalid prediction response received.", "error");
    return;
  }

  // Retrieve fields from the response
  let crop = data.crop || "";
  let disease = data.disease || "";
  let confidence = data.confidence;
  let severity = data.severity;
  let cause = data.cause;
  let symptoms = data.symptoms;
  let treatment = data.treatment;
  let prevention = data.prevention;

  // Check if the response returned details or only crop/disease/confidence.
  const hasDetails = severity && severity !== "Unknown" && symptoms && Array.isArray(symptoms) && symptoms.length > 0 && cause;
  if (!hasDetails) {
    const matchedDisease = getMatch(crop, disease);
    if (matchedDisease) {
      if (!severity || severity === "Unknown") {
        severity = matchedDisease.severity;
      }
      if (!cause) {
        cause = matchedDisease.cause;
      }
      if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        symptoms = matchedDisease.symptoms;
      }
      if (!treatment || !Array.isArray(treatment) || treatment.length === 0) {
        treatment = matchedDisease.treatment;
      }
      if (!prevention || !Array.isArray(prevention) || prevention.length === 0) {
        prevention = matchedDisease.prevention;
      }
    }
  }

  // Populate Result Page
  if (resCropName) resCropName.innerText = crop;
  if (resDiseaseName) resDiseaseName.innerText = disease;
  
  // Confidence
  let confStr = "";
  let confPercent = 0;
  if (typeof confidence === "number") {
    confPercent = confidence;
    confStr = confidence.toFixed(1) + "%";
  } else if (typeof confidence === "string") {
    confPercent = parseFloat(confidence);
    confStr = confidence.includes("%") ? confidence : confidence + "%";
  } else {
    confStr = "N/A";
  }
  
  if (resConfidence) resConfidence.innerText = confStr;
  if (resConfidenceBar) resConfidenceBar.style.width = isNaN(confPercent) ? "0%" : confPercent + "%";
  if (resCause) resCause.innerText = cause || "N/A";

  // Set severity badge
  if (resSeverity) {
    resSeverity.className = "severity-badge";
    if (severity === "High") {
      resSeverity.classList.add("severity-high");
      resSeverity.innerText = "High Severity";
    } else if (severity === "Medium") {
      resSeverity.classList.add("severity-medium");
      resSeverity.innerText = "Medium Severity";
    } else if (severity === "Low") {
      resSeverity.classList.add("severity-low");
      resSeverity.innerText = "Low Severity";
    } else {
      resSeverity.classList.add("severity-low");
      resSeverity.innerText = severity || "None";
    }
  }

  // Symptoms
  if (resSymptoms) {
    resSymptoms.innerHTML = "";
    let symList = Array.isArray(symptoms) ? symptoms : (typeof symptoms === "string" && symptoms ? [symptoms] : []);
    if (symList.length > 0) {
      symList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        resSymptoms.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.innerText = "No symptoms specified.";
      resSymptoms.appendChild(li);
    }
  }

  // Treatment
  if (resTreatment) {
    resTreatment.innerHTML = "";
    let treatList = Array.isArray(treatment) ? treatment : (typeof treatment === "string" && treatment ? [treatment] : []);
    if (treatList.length > 0) {
      treatList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        resTreatment.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.innerText = "No treatment specified.";
      resTreatment.appendChild(li);
    }
  }

  // Prevention
  if (resPrevention) {
    resPrevention.innerHTML = "";
    let prevList = Array.isArray(prevention) ? prevention : (typeof prevention === "string" && prevention ? [prevention] : []);
    if (prevList.length > 0) {
      prevList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        resPrevention.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.innerText = "No prevention protocol specified.";
      resPrevention.appendChild(li);
    }
  }

  // Populate Top-3 predictions distribution
  const top3ListContainer = document.getElementById('top3-list');
  if (top3ListContainer) {
    top3ListContainer.innerHTML = '';
    if (data.top_predictions && Array.isArray(data.top_predictions)) {
      data.top_predictions.forEach(item => {
        const row = document.createElement('div');
        row.className = 'top3-row';
        const itemConf = typeof item.confidence === 'number' ? item.confidence.toFixed(1) : parseFloat(item.confidence).toFixed(1);
        row.innerHTML = `
          <div class="top3-row-info">
            <span class="top3-name"><span class="top3-rank-badge">#${item.rank}</span>${item.crop} — ${item.disease}</span>
            <span class="top3-conf">${itemConf}%</span>
          </div>
          <div class="top3-bar-outer">
            <div class="top3-bar-inner" style="width: ${Math.min(100, Math.max(0, itemConf))}%;"></div>
          </div>
        `;
        top3ListContainer.appendChild(row);
      });
    }
  }

  // Handle uncertainty / ambiguity warning banner
  const uncertaintyBanner = document.getElementById('res-uncertainty-banner');
  const uncertaintyMsg = document.getElementById('uncertainty-msg');
  if (uncertaintyBanner) {
    if (data.is_uncertain) {
      uncertaintyBanner.style.display = 'block';
      if (uncertaintyMsg && data.warning_message) {
        uncertaintyMsg.innerText = data.warning_message;
      }
    } else {
      uncertaintyBanner.style.display = 'none';
    }
  }

  // Uploaded image preview
  if (resImg && currentUploadedImage) {
    resImg.src = currentUploadedImage;
  }

  // View panels transition
  console.log("[PlantGuard AI] Transitioning panels. Elements state:", {
    uploadPanel: uploadPanel ? uploadPanel.id : null,
    previewPanel: previewPanel ? previewPanel.id : null,
    resultPanel: resultPanel ? resultPanel.id : null,
    resImg: resImg ? resImg.id : null
  });

  if (uploadPanel) uploadPanel.style.display = "none";
  if (previewPanel) previewPanel.style.display = "none";
  if (resultPanel) {
    resultPanel.style.display = "block";
    console.log("[PlantGuard AI] resultPanel.style.display set to:", resultPanel.style.display);
    if (window.lucide) lucide.createIcons();
  }

  // Scroll to results panel
  if (resultPanel) {
    const scrollTarget = resultPanel.offsetTop - 100;
    console.log("[PlantGuard AI] Scrolling to top position:", scrollTarget);
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });
  }
}
detectAnotherBtn.addEventListener('click', () => {
  resetUploadState();
});

downloadReportBtn.addEventListener('click', () => {
  showToast("Downloading full diagnostic PDF... (Simulated)", "success");
});

shareResultBtn.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'PlantGuard AI Diagnostic Report',
      text: `PlantGuard AI detected ${resDiseaseName.innerText} on my ${resCropName.innerText} leaf with ${resConfidence.innerText} confidence.`,
      url: window.location.href,
    })
      .then(() => showToast("Diagnostic report shared successfully!", "success"))
      .catch((error) => console.log('Sharing failed', error));
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(`PlantGuard AI Diagnostic Report: Crop: ${resCropName.innerText}, Disease: ${resDiseaseName.innerText}, Confidence: ${resConfidence.innerText}.`);
    showToast("Report summary copied to clipboard!", "success");
  }
});

// 4. DISEASE LIBRARY PAGE
function renderLibrary(filter = 'all', searchQuery = '') {
  libraryGrid.innerHTML = '';

  const filtered = DISEASE_DATABASE.filter(disease => {
    // Filter crop type
    const matchesFilter = filter === 'all' || disease.crop.toLowerCase() === filter;

    // Filter search query
    const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.symptoms.some(sym => sym.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    libraryGrid.innerHTML = `
      <div class="no-results glass-panel">
        <i data-lucide="info" style="width: 32px; height: 32px; color: var(--text-muted); margin-bottom: 8px;"></i>
        <p>No diseases found matching your search criteria.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filtered.forEach(d => {
    const card = document.createElement('div');
    card.className = 'disease-card glass-panel';
    card.innerHTML = `
      <div class="disease-img-placeholder">
        <i data-lucide="leaf"></i>
      </div>
      <div class="disease-card-content">
        <span class="disease-badge">${d.crop}</span>
        <h3>${d.name}</h3>
        <p>${d.description}</p>
        <button class="disease-card-btn" data-id="${d.id}">
          Learn More <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;
    libraryGrid.appendChild(card);
  });

  lucide.createIcons();
}

// Filter button clicks
filterPillsContainer.addEventListener('click', (e) => {
  const button = e.target.closest('.filter-pill');
  if (button) {
    // Update active state
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // Filter library
    const filter = button.getAttribute('data-filter');
    renderLibrary(filter, librarySearchInput.value);
  }
});

// Search input
librarySearchInput.addEventListener('input', (e) => {
  const activePill = document.querySelector('.filter-pill.active');
  const filter = activePill ? activePill.getAttribute('data-filter') : 'all';
  renderLibrary(filter, e.target.value);
});

// Card button clicks to open detail modal
libraryGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.disease-card-btn');
  if (btn) {
    const diseaseId = btn.getAttribute('data-id');
    const d = DISEASE_DATABASE.find(item => item.id === diseaseId);
    if (d) {
      openDiseaseModal(d);
    }
  }
});

function openDiseaseModal(d) {
  modalDiseaseTitle.innerText = d.name;

  // Format symptoms list
  const symptomsHtml = d.symptoms.map(s => `<li>${s}</li>`).join('');
  // Format prevention list
  const preventionHtml = d.prevention.map(p => `<li>${p}</li>`).join('');
  // Format treatment list
  const treatmentHtml = d.treatment.map(t => `<li>${t}</li>`).join('');

  let severityClass = 'severity-medium';
  if (d.severity === 'High') severityClass = 'severity-high';
  if (d.severity === 'Low') severityClass = 'severity-low';

  modalDiseaseBody.innerHTML = `
    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
      <span class="disease-badge" style="margin:0;">Crop: ${d.crop}</span>
      <span class="severity-badge ${severityClass}" style="font-size: 11px; padding: 2px 8px;">${d.severity} Severity</span>
    </div>
    
    <p style="font-size: 15px; color: var(--text-dark); line-height: 1.6; margin-bottom: 12px;">${d.description}</p>
    
    <div class="diagnosis-section-card" style="margin-bottom: 12px;">
      <h3 style="font-size: 15px;"><i data-lucide="alert-circle" style="width:16px; height:16px;"></i> Symptoms</h3>
      <ul>${symptomsHtml}</ul>
    </div>
    
    <div class="diagnosis-section-card" style="margin-bottom: 12px;">
      <h3 style="font-size: 15px;"><i data-lucide="help-circle" style="width:16px; height:16px;"></i> Primary Cause</h3>
      <p style="font-size: 13.5px; color: var(--text-dark); font-weight: 500;">${d.cause}</p>
    </div>

    <div class="diagnosis-section-card" style="margin-bottom: 12px;">
      <h3 style="font-size: 15px;"><i data-lucide="activity" style="width:16px; height:16px;"></i> Recommended Treatment</h3>
      <ul>${treatmentHtml}</ul>
    </div>
    
    <div class="diagnosis-section-card">
      <h3 style="font-size: 15px;"><i data-lucide="shield-check" style="width:16px; height:16px;"></i> Prevention Protocol</h3>
      <ul>${preventionHtml}</ul>
    </div>
  `;

  detailModal.style.display = 'flex';
  lucide.createIcons();
}

modalCloseBtn.addEventListener('click', () => {
  detailModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === detailModal) {
    detailModal.style.display = 'none';
  }
});

// 5. CONTACT FORM
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Retrieve values
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  if (name && email && message) {
    // Show success message
    showToast(`Thank you, ${name}! Your message has been sent successfully.`, "success");

    // Clear form
    contactForm.reset();
  }
});

// 6. TOAST MESSAGES HELPER
function showToast(message, type = "success") {
  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === "success" ? 'check-circle' : 'alert-circle';
  const iconColorClass = type === "success" ? 'toast-success-icon' : 'toast-error-icon';

  toast.innerHTML = `
    <i data-lucide="${icon}" class="${iconColorClass}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  lucide.createIcons();

  // Slide out and remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// On page load initialization
document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();
  lucide.createIcons();
});
