// Campaign Data Structure
const campaignData = {
  settlements: {
    millhaven: {
      name: 'Millhaven',
      type: 'Former Regional Hub',
      population: '~800',
      description: 'Once the crown jewel of Scrimshaw Bay, Millhaven\'s grand harbor now hosts more ghost ships than active vessels. Massive whale oil processing plants stand like industrial cathedrals, their empty windows staring blindly over the bay.',
      layout: {
        structure: {
          main_area: 'Harbor district with working docks and lighthouse tower',
          districts: 'Five distinct areas reflecting the town\'s maritime heritage and decline',
          defenses: 'Harbor Master\'s Tower serves as lighthouse and watchtower',
          approach: 'Main road from interior settlements, harbor access for ships',
          central_feature: 'Grand Harbor with whale oil processing plants dominating skyline'
        },
        districts: [
          {
            name: 'Harbor District',
            description: 'Active waterfront area with working docks, Harbor Master\'s Tower, and remnants of shipping industry',
            buildings: [
              'Harbor Master\'s Tower (lighthouse)',
              'Active fishing docks',
              'Customs house (barely functioning)',
              'Harbor pilot station',
              'Fish market (limited)',
              'Small warehouses',
              'Harbormaster\'s office',
              'Emergency supply depot'
            ]
          },
          {
            name: 'Industrial Quarter (The Bone Yards)',
            description: 'Massive abandoned whale processing complex stretching along the waterfront like Gothic industrial cathedrals',
            buildings: [
              'Main Processing Hall',
              'The Tryworks (oil rendering facility)',
              'Bone Workshop',
              'Oil Storage Warehouse',
              'Spermaceti Chamber',
              'Administrative Offices',
              'Steam tunnel network',
              'Underground storage vaults'
            ]
          },
          {
            name: 'Prosperity Row',
            description: 'Hillside district of grand mansions built by whaling magnates, now mostly abandoned or occupied by recluses',
            buildings: [
              'Grimwald Manor (partially maintained)',
              'Blackthorne Estate (squatter family)',
              'Leviathan House (suspiciously preserved)',
              'Meridian Mansion (abandoned but active)',
              'Mooncrest Villa (overgrown gardens)',
              'Smaller captain houses',
              'Servants\' quarters',
              'Private carriage houses'
            ]
          },
          {
            name: 'Church Quarter',
            description: 'Religious and civic center with Temple of the Tides Cathedral dominating the area',
            buildings: [
              'Temple of the Tides Cathedral',
              'Church rectory',
              'Town meeting hall',
              'Small cemetery',
              'Former civic offices',
              'Old courthouse (partially collapsed)',
              'Public market square (mostly empty)',
              'Memorial park for lost whalers'
            ]
          },
          {
            name: 'Common Quarter',
            description: 'Residential area where remaining working families live, including The Rendered Crown inn',
            buildings: [
              'The Rendered Crown (flophouse)',
              'Worker housing (mixture of occupied and abandoned)',
              'Small shops (baker, blacksmith, general store)',
              'Communal well',
              'School house (closed)',
              'Midwife\'s house',
              'Apothecary shop',
              'Fishermen\'s guild hall (abandoned)'
            ]
          }
        ]
      },
      notableLocations: [
        {
          id: 'renderedCrown',
          name: 'The Rendered Crown',
          shortDesc: 'Former luxury inn, now a flophouse for desperate sailors',
          npcs: [],
          hasDetails: true
        },
        {
          id: 'prosperityRow',
          name: 'Prosperity Row',
          shortDesc: 'street of abandoned whaling captain mansions',
          npcs: [],
          hasDetails: true
        },
        {
          id: 'boneYards',
          name: 'The Bone Yards',
          shortDesc: 'Whale processing facilities, now rusted monuments',
          npcs: [],
          hasDetails: true
        },
        {
          id: 'harborTower',
          name: 'Harbor Master\'s Tower',
          shortDesc: 'still functional lighthouse, manned by a reclusive keeper',
          npcs: ['harborMaster'],
          hasDetails: true
        },
        {
          id: 'templeOfTheTides',
          name: 'Temple of the Tides Cathedral',
          shortDesc: 'Gothic cathedral with disturbing maritime carvings',
          npcs: ['priestTide'],
          hasDetails: true
        }
      ],
      keyNpcs: ['harborMaster', 'priestTide'],
      backgroundNpcs: [
        'dockMaster', 'fisherCaptain', 'desperateWidow', 'eccentricRecluse',
        'specialtyMerchant', 'oldWhaler', 'barkeeper', 'streetSweeper',
        'nightWatchman', 'ferryBoatman', 'corruptedNoble', 'squatterFamily', 
        'madScrivener', 'hermitBotanist', 'graveDigger', 'herbalist', 
        'fishMonger', 'lampLighter', 'customsClerk', 'formerOfficer', 
        'seamstress', 'ratCatcher', 'rumorMonger', 'bigTom'
      ],
      inhabitants: [
        'Desperate fishermen catching increasingly strange fish',
        'Eccentric recluses in decaying mansions',
        'Harbor master who refuses to discuss what he sees from his tower',
        'Priest struggling with congregation\'s growing madness',
        'Handful of merchants dealing in "specialty" goods',
        'small whaling crews harvesting diseased whales for alchemical trade'
      ],
      darkSecrets: [
        'several mansion owners have made pacts with Agog for extended life',
        'The whale oil in abandoned tanks has transformed into something else',
        'strange lights sometimes appear in the harbor on moonless nights',
        'Missing persons reports have increased dramatically in recent years',
        'Whaling crews are slowly transforming into fish-like creatures',
        'Black parasites from whale harvests are being exported to unknown buyers'
      ]
    },
    netherwick: {
      name: 'Netherwick',
      type: 'Fishing Village',
      population: '~150',
      description: 'What began as a whaling support town has devolved into desperate subsistence fishing. The village clings to life through increasingly meager catches, though locals whisper that the fish taste metallic and wrong.',

      layout: {
        structure: {
          main_area: 'Cottages arranged in defensive semicircle around central commons',
          docks: 'Weathered wooden piers extending into dark bay waters',
          work_areas: 'Net-mending sheds and fish-drying racks along the shore',
          shrine_area: 'small hill overlooking the bay with ancient fisherman\'s shrine',
          approach: 'single muddy road from inland, boat access from bay'
        },
        districts: [
          {
            name: 'The Commons',
            description: 'Central area with The Caught Cod tavern, well, and small market space',
            buildings: ['The Caught Cod tavern', 'Community well', 'Small market stalls (usually empty)', 'Message board']
          },
          {
            name: 'Cottage Row',
            description: 'semicircle of salt-stained fishing family homes',
            buildings: ['12 family cottages', 'Shared root cellar', 'Community smokehouse', 'Chicken coops']
          },
          {
            name: 'The Working Shore',
            description: 'Waterfront area with docks and work buildings',
            buildings: ['Main fishing docks', 'Net-mending sheds', 'Fish-drying racks', 'Boat storage', 'Bait house']
          },
          {
            name: 'Shrine Hill',
            description: 'small hill with the fisherman\'s shrine complex, elder\'s cottage, and village graveyard',
            buildings: ['The Fisherman\'s Shrine (Thessa, Astraea, Rhyssian, Akhetmon)', 'Elder\'s cottage', 'Village graveyard', 'Weather watching post', 'Old beacon tower (defunct)']
          }
        ]
      },

      notableLocations: [
        {
          id: 'caughtCod',
          name: 'The Caught Cod',
          shortDesc: 'Tavern filled with disturbing maritime scrimshaw',
          npcs: ['tavernKeeper'],
          hasDetails: true
        },
        {
          id: 'weatheredDocks',
          name: 'Weathered Docks',
          shortDesc: 'Docks extending into unnaturally dark water',
          npcs: ['dockWorker', 'youngFisherman'],
          hasDetails: false
        },
        {
          id: 'netSheds',
          name: 'Net-mending Sheds',
          shortDesc: 'sheds where strange sounds echo at night',
          npcs: ['netsMender'],
          hasDetails: false
        },
        {
          id: 'saltCottages',
          name: 'salt-stained Cottages',
          shortDesc: 'Cottages arranged in a defensive semicircle',
          npcs: ['fisherWife', 'sickmChild', 'desperateWidow'],
          hasDetails: false
        },
        {
          id: 'fishermanShrine',
          name: 'The Fisherman\'s Shrine',
          shortDesc: 'Offerings to ensure safe returns',
          npcs: ['villageElder'],
          hasDetails: true
        },
        {
          id: 'communityWell',
          name: 'The Community Well',
          shortDesc: 'Central gathering spot with increasingly brackish water',
          npcs: ['waterBearer'],
          hasDetails: true
        },
        {
          id: 'marketSpace',
          name: 'Market Commons',
          shortDesc: 'small area where what little trade occurs',
          npcs: ['fishmonger', 'tradingCaptain'],
          hasDetails: true
        },
        {
          id: 'baitHouse',
          name: 'The Bait House',
          shortDesc: 'storage for fishing supplies and bait',
          npcs: ['baitKeeper'],
          hasDetails: true
        }
      ],

      keyNpcs: ['tavernKeeper', 'villageElder', 'netsMender'],
      backgroundNpcs: ['dockWorker', 'youngFisherman', 'barnabyNetcast', 'meredithNetcast', 'fisherWife', 'sickmChild', 'mollyStormwind', 'benStormwind', 'desperateWidow', 'waterBearer', 'fishmonger', 'tradingCaptain', 'baitKeeper', 'rosieWormfinder', 'senileGrandfather', 'anxiousMother', 'willlemWaveworry', 'pennyWaveworry', 'skepticalFisherman'],

      inhabitants: [
        'Fishing families who\'ve lived here for generations',
        'Tavern keeper who collects increasingly disturbing scrimshaw',
        'Village elder who speaks in maritime riddles',
        'Nets-mender who claims to hear voices in the waves',
        'Young people planning desperate escapes to larger towns',
        'Whaling crew that returns with strange catches and stranger behavior'
      ],
      darkSecrets: [
        'Recent catches include fish with human-like eyes',
        'several fishermen have returned from trips speaking in unknown tongues',
        'The village elder performs midnight rituals at the water\'s edge',
        'strange barnacle-like growths have appeared on some residents',
        'Missing fishing boats found weeks later, crews gone but cargo intact',
        'Local whaling crew shows signs of physical transformation'
      ]
    },
    ashford: {
      name: 'Ashford',
      type: 'Company Town',
      population: '~200',
      description: 'Built by the Ashford Timber Company to process ironwood from the interior, this planned community now stands largely empty. Rows of identical worker housing sit vacant, while the massive sawmill contains half-processed ironwood logs that have begun to rot.',
      notableLocations: [
        {
          id: 'ashfordSawmill',
          name: 'Ashford Sawmill',
          shortDesc: 'Massive facility with rusted, silent machinery',
          npcs: ['maintenanceWorker'],
          hasDetails: false
        },
        {
          id: 'companyHousing',
          name: 'Company Housing',
          shortDesc: 'Rows of identical homes, most boarded up',
          npcs: [],
          hasDetails: false
        },
        {
          id: 'companyStore',
          name: 'The Company Store',
          shortDesc: 'still operating with a skeleton crew',
          npcs: ['storeClerk'],
          hasDetails: false
        },
        {
          id: 'lumberYards',
          name: 'Lumber Yards',
          shortDesc: 'Containing mysteriously rotting ironwood',
          npcs: [],
          hasDetails: false
        },
        {
          id: 'supervisorMansion',
          name: 'supervisor\'s Mansion',
          shortDesc: 'Overlooking the town from a hill',
          npcs: ['companySupervisor'],
          hasDetails: false
        }
      ],
      keyNpcs: ['companySupervisor', 'storeClerk', 'maintenanceWorker'],
      inhabitants: [
        'Company supervisor who refuses to abandon his post',
        'store clerk maintaining records of increasingly bizarre inventory',
        'Maintenance worker who claims the machines start themselves',
        'Families too poor to relocate living in condemned housing',
        'Drifters seeking temporary work that no longer exists'
      ],
      darkSecrets: [
        'The ironwood has been infected by something from the bay',
        'Workers who stayed too long developed strange physical changes',
        'The company supervisor hasn\'t aged visibly in twenty years',
        'Machinery operates sporadically without power or operators',
        'strange symbols have been carved into the rotting ironwood'
      ]
    },
    thornwick: {
      name: 'Thornwick Isle',
      type: 'Lord\'s Estate',
      population: '~50',
      description: 'The private island of an ancient aristocratic family, Thornwick Isle serves as both the lord\'s estate and home to the descendants of former servants. Scrimmholme Manor dominates the island\'s highest point, a Gothic fortress of black stone.',
      notableLocations: [
        {
          id: 'scrimmholmeManor',
          name: 'scrimmholme Manor',
          shortDesc: 'Imposing Gothic mansion with numerous towers',
          npcs: ['bayardScrimm'],
          hasDetails: false
        },
        {
          id: 'villageBelow',
          name: 'The Village Below',
          shortDesc: 'servants\' quarters and support buildings',
          npcs: ['groundskeeper'],
          hasDetails: false
        },
        {
          id: 'privateDocks',
          name: 'Private Docks',
          shortDesc: 'For the lord\'s personal vessels',
          npcs: ['boatman'],
          hasDetails: false
        },
        {
          id: 'familyCrypts',
          name: 'Family Crypts',
          shortDesc: 'Ancient burial grounds with disturbing statuary',
          npcs: [],
          hasDetails: false
        },
        {
          id: 'observatory',
          name: 'The Observatory',
          shortDesc: 'Tower where Lord Scrimm watches the stars',
          npcs: ['bayardScrimm'],
          hasDetails: false
        }
      ],
      keyNpcs: ['bayardScrimm', 'groundskeeper', 'boatman'],
      inhabitants: [
        'Lord Bayard Scrimm: Ancient aristocrat sustained by Agog\'s power',
        'Loyal servants whose families have served for generations',
        'Groundskeeper who tends the estate\'s twisted gardens',
        'Boatman who ferries visitors at the lord\'s discretion',
        'Village children who never seem to age past adolescence'
      ],
      darkSecrets: [
        'Lord Bayard Scrimm\'s body writhes with Agog\'s tentacled flesh',
        'The manor\'s basement connects to underwater tunnels leading to Agog\'s domain',
        'servants who displease the lord simply vanish',
        'strange ceremonies are conducted during astronomical events',
        'The island itself may be slowly sinking into the bay'
      ]
    },
    fenway: {
      name: 'Fenway',
      type: 'Canal Village',
      population: '~75',
      description: 'Once vital for navigation through the treacherous bogs, Fenway maintained the canal system and portage paths that brought ironwood from the deep forests. Now the canals have grown over with strange vegetation.',
      notableLocations: [
        {
          id: 'canalLocks',
          name: 'Abandoned Canal Locks',
          shortDesc: 'Overgrown with phosphorescent moss',
          npcs: ['canalKeeper'],
          hasDetails: false
        },
        {
          id: 'portageStation',
          name: 'The Portage Station',
          shortDesc: 'Empty warehouse for timber transfer',
          npcs: [],
          hasDetails: false
        },
        {
          id: 'fenwayInn',
          name: 'Fenway Inn',
          shortDesc: 'Last stop before entering the Boglands',
          npcs: ['innKeeper'],
          hasDetails: false
        },
        {
          id: 'bogRoad',
          name: 'Old Bog Road',
          shortDesc: 'Partially flooded path into the wetlands',
          npcs: ['bogGuide'],
          hasDetails: false
        },
        {
          id: 'watchtower',
          name: 'The Watchtower',
          shortDesc: 'Crumbling structure overlooking the approaches',
          npcs: [],
          hasDetails: false
        }
      ],
      keyNpcs: ['innKeeper', 'canalKeeper', 'bogGuide'],
      inhabitants: [
        'Inn keeper who warns travelers away from the bogs',
        'Canal keeper who maintains a few navigable passages',
        'Bog guide who charges exorbitant fees for safe passage',
        'Hermits living in abandoned lock houses',
        'Refugees from deeper bog settlements'
      ],
      darkSecrets: [
        'The bog waters have been poisoned by something ancient',
        'strange lights lead travelers astray in the wetlands',
        'Bog folk have made their own pacts with underwater entities',
        'The canal system connects to vast underwater caverns',
        'Missing persons from other towns often end up in the bogs'
      ]
    }
  },

  npcs: {
    bayardScrimm: {
      name: 'Lord Bayard Scrimm',
      location: 'Thornwick Isle',
      role: 'Aristocratic Lord & Primary Antagonist',
      description: 'Ancient aristocrat who has ruled Thornwick Isle for far longer than any mortal should. His body writhes with Agog\'s tentacled flesh, and he emerges only at night. Sustained by his pact with the Devil of the Deep.',
      secrets: ['Body filled with writhing tentacled flesh', 'Feeds on the living', 'Commands underwater horrors', 'Direct connection to Agog'],
      abilities: ['Vampire-like longevity', 'Night vision', 'Tentacled attacks', 'Command over sea creatures'],
      motivations: ['Serve Agog\'s will', 'Maintain control over the bay', 'Spread corruption'],
      relatedThreats: ['agog'],
      relatedLocations: ['scrimmholmeManor', 'observatory'],
      relatedEvents: ['lordInvitation']
    },
    harborMaster: {
      name: 'Silas Moorcock',
      location: 'Millhaven',
      role: 'Harbor Master & Lighthouse Keeper',
      description: 'Reclusive keeper of Harbor Master\'s Tower who refuses to discuss what he sees from his lighthouse during the dark hours. Has maintained his post for decades despite the town\'s decline.',
      secrets: ['Witnesses nightly horrors in the bay', 'May have made a minor pact for sight', 'Keeps detailed logs of strange events'],
      abilities: ['Enhanced night vision', 'Maritime knowledge', 'Lighthouse operations'],
      motivations: ['Warn ships away from danger', 'Document the corruption', 'Survive another night'],
      relatedThreats: ['agog'],
      relatedLocations: ['harborTower'],
      relatedEvents: ['strangeNews']
    },
    priestTide: {
      name: 'Father Cornelius Blackwater',
      location: 'Millhaven',
      role: 'Priest of the Temple of the Tides Cathedral',
      description: 'struggling priest whose congregation grows more mad and fewer in number each month. The maritime carvings in his church seem to move when he\'s not looking directly at them.',
      secrets: ['Questions his faith', 'Church carvings are becoming more disturbing', 'Parishioners confess impossible things'],
      abilities: ['Divine magic (weakening)', 'Exorcism', 'Religious knowledge'],
      motivations: ['Save his congregation', 'Understand the corruption', 'Maintain his faith']
    },
    tavernKeeper: {
      name: 'Marta Scrimshaw',
      location: 'Netherwick',
      role: 'Tavern Keeper & Scrimshaw Collector',
      description: 'Keeps The Caught Cod tavern and obsessively collects maritime scrimshaw. Her collection has become increasingly disturbing, with pieces that seem to move in peripheral vision.',
      secrets: ['Scrimshaw pieces are becoming animated', 'Related to an old whaling family', 'Knows more about the bay\'s history than she admits'],
      abilities: ['Local knowledge', 'Scrimshaw evaluation', 'Tavern management'],
      motivations: ['Preserve maritime heritage', 'Understand family history', 'Keep the tavern running']
    },
    villageElder: {
      name: 'Old Thaddeus Brine',
      location: 'Netherwick',
      role: 'Village Elder & Shrine Keeper',
      description: 'Ancient fisherman who speaks in maritime riddles and tends the Fisherman\'s Shrine. Performs mysterious midnight rituals at the water\'s edge.',
      secrets: ['Knows the true nature of the bay\'s corruption', 'Performs rituals to appease sea spirits', 'Has lived far longer than any normal human'],
      abilities: ['Maritime lore', 'Weather prediction', 'Ritual magic'],
      motivations: ['Protect the village', 'Maintain ancient pacts', 'Guide the young away from the sea'],
      relatedThreats: ['agog', 'corruptedWhales'],
      relatedLocations: ['fishermanShrine', 'weatheredDocks'],
      relatedEvents: ['whalingWitness', 'strangeNews']
    },
    netsMender: {
      name: 'silas Weaver',
      location: 'Netherwick',
      role: 'Net Mender & Sound Listener',
      description: 'skilled net mender who claims to hear voices in the waves. His fingers are becoming increasingly webbed.',
      secrets: ['Partially transformed by parasites', 'Can understand the voices in the waves', 'Secretly working with the whaling crews'],
      abilities: ['Net crafting', 'Wave interpretation', 'Fish-like swimming'],
      motivations: ['Hide his transformation', 'Understand the voices', 'Provide for his family'],
      relatedThreats: ['corruptedWhales', 'transformedCitizens', 'agog'],
      relatedLocations: ['netSheds', 'weatheredDocks'],
      relatedEvents: ['whalingWitness', 'strangeNews']
    },
    companySupervisor: {
      name: 'Cornelius Ashford III',
      location: 'Ashford',
      role: 'Company Supervisor',
      description: 'Last remaining member of the Ashford family, refuses to abandon the company town despite its obvious failure. Hasn\'t aged visibly in twenty years.',
      secrets: ['Made a pact for extended life', 'Knows the truth about the rotting ironwood', 'Guards company secrets about the corruption'],
      abilities: ['Business management', 'Ironwood expertise', 'Unnatural longevity'],
      motivations: ['Preserve family legacy', 'Maintain control', 'Hide the corruption'],
      relatedThreats: ['agog', 'ironwoodCorruption'],
      relatedLocations: ['supervisorMansion', 'ashfordSawmill'],
      relatedEvents: ['strangeNews']
    },
    storeClerk: {
      name: 'Martha Codwell',
      location: 'Ashford',
      role: 'Company Store Clerk',
      description: 'Meticulous clerk who maintains records of increasingly bizarre inventory. Obsessed with documenting every strange change.',
      secrets: ['Records show impossible inventory', 'Items appear and disappear mysteriously', 'May be slowly going mad from isolation'],
      abilities: ['Record keeping', 'Inventory management', 'Pattern recognition'],
      motivations: ['Maintain order', 'Document the truth', 'Survive until retirement']
    },
    maintenanceWorker: {
      name: 'Jakob Grimm',
      location: 'Ashford',
      role: 'Mill Maintenance Worker',
      description: 'Last maintenance worker who claims the machines start themselves. Shows signs of mechanical integration.',
      secrets: ['Machines are alive somehow', 'Has mechanical parts grafted to his body', 'Communicates with the mill machinery'],
      abilities: ['Machine repair', 'Mechanical intuition', 'Limited technomancy'],
      motivations: ['Keep the machines happy', 'Understand the mill\'s purpose', 'Protect others from the machinery']
    },
    groundskeeper: {
      name: 'Elias Thornwick',
      location: 'Thornwick Isle',
      role: 'Estate Groundskeeper',
      description: 'Descendant of the original island inhabitants, tends Lord Scrimm\'s twisted gardens. His family has served for generations.',
      secrets: ['Gardens grow things that shouldn\'t exist', 'Family bound by ancient oath', 'Children never age past adolescence'],
      abilities: ['Gardening', 'Plant lore', 'Hereditary loyalty'],
      motivations: ['Serve the lord', 'Protect his family', 'Maintain the estate']
    },
    boatman: {
      name: 'Ezekiel Ferry',
      location: 'Thornwick Isle',
      role: 'Lord\'s Boatman',
      description: 'silent boatman who ferries visitors to and from the island at Lord Scrimm\'s discretion. Never speaks above a whisper.',
      secrets: ['Knows who never returns from visits', 'Can navigate in complete darkness', 'May not be entirely human anymore'],
      abilities: ['Navigation', 'Silent movement', 'Boat handling'],
      motivations: ['Serve Lord Scrimm', 'Ferry only the worthy', 'Keep the island\'s secrets']
    },
    innKeeper: {
      name: 'Prudence Marsh',
      location: 'Fenway',
      role: 'Inn Keeper & Bog Warner',
      description: 'stern innkeeper who warns travelers away from the bogs. Lost her husband to the wetlands years ago.',
      secrets: ['Knows safe paths through the bogs', 'Husband didn\'t just get lost', 'Keeps maps of dangerous areas'],
      abilities: ['Hospitality', 'Bog knowledge', 'Warning signs interpretation'],
      motivations: ['Protect travelers', 'Prevent bog deaths', 'Keep the inn running']
    },
    canalKeeper: {
      name: 'Edgar Lockwood',
      location: 'Fenway',
      role: 'Canal Keeper',
      description: 'Maintains the few navigable canal passages despite the growing corruption. The phosphorescent moss responds to his touch.',
      secrets: ['Moss is not natural', 'Canals connect to underwater caverns', 'Something watches from the deep locks'],
      abilities: ['Water management', 'Lock operation', 'Moss cultivation'],
      motivations: ['Keep some trade flowing', 'Understand the moss', 'Prevent total isolation']
    },
    bogGuide: {
      name: 'Tobias Mudfoot',
      location: 'Fenway',
      role: 'Bog Guide & Creature Expert',
      description: 'Charges exorbitant fees for safe passage through the wetlands. Has extensive knowledge of bog creatures including Bogskaldr hunting patterns, Marsh Giant territories, and rumored Marshwalker Elf settlements. May know more about the bog\'s dangers than he admits.',
      secrets: ['Has made deals with bog entities', 'Knows location of lost settlements', 'Can sense safe paths supernaturally', 'Has encountered Marshwalker Elves and learned some of their signs', 'Knows which areas Bogskaldr frequent and Marsh Giant territories', 'Knows the rhyming call to summon Bettey Nettle and Clattershanks'],
      abilities: ['Bog navigation', 'Danger sensing', 'Wetland survival', 'Creature tracking', 'Basic knowledge of bog creature behavior'],
      motivations: ['Make money from desperate travelers', 'Avoid the deep bogs', 'Keep certain areas secret', 'Survive encounters with bog creatures'],
      knowledge: [
        { topic: 'Bogskaldr', info: 'Knows their ambush spots and feeding times' },
        { topic: 'Marsh Giants', info: 'Understands their territorial boundaries and tribute customs' },
        { topic: 'Marshwalker Elves', info: 'Has seen their signs and knows some safe-passage rituals' },
        { topic: 'Bettey Nettle & Clattershanks', info: 'Knows the summoning ritual and has traded with them before' }
      ],
      relatedThreats: ['bogCreatures', 'bogCorruption'],
      relatedLocations: ['bogRoad', 'canalLocks', 'watchtower'],
      relatedEvents: ['bogTravel', 'strangeNews', 'hagEncounter']
    },
    betteyNettle: {
      name: 'Bettey Nettle',
      location: 'The Boglands (Winter Court)',
      role: 'Bog Hag & Potion Maker',
      description: 'A very large and rotund hag who lives in the Winter Court of the Fae Realm but can be summoned to the bogs through a ritual involving blue flames. Despite her fearsome appearance, she\'s not necessarily hostile and trades in balms, potions, and magical boons.',
      secrets: ['Home is actually in the Winter Court', 'Connected to Queen Morrighan\'s domain', 'Can travel between planes through Gulpgrin', 'Knows ancient bog magic and fae contracts'],
      abilities: ['Hag magic', 'Potion brewing', 'Fae contracts', 'Planar travel', 'Bog plant knowledge'],
      motivations: ['Trade fairly for mutual benefit', 'Collect interesting ingredients', 'Maintain neutrality between fae courts', 'Preserve ancient bog traditions'],
      services: ['Healing balms and potions', 'Magical boons (for a price)', 'Information about the bogs', 'Fae realm guidance'],
      relatedThreats: ['bogCorruption'],
      relatedLocations: ['bogRoad', 'canalLocks'],
      relatedEvents: ['hagEncounter', 'bogTravel']
    },
    clattershanks: {
      name: 'Ol\' Clattershanks',
      location: 'The Boglands (Winter Court)',
      role: 'Bog Creature & Bettey\'s Husband',
      description: 'Tall and spindly with long limbs and fingers that move eerily as if there are more joints than there should be. Bettey Nettle\'s devoted husband who assists with her magical work and tends their otherworldly home.',
      secrets: ['Nature is unclear - fae, undead, or something else', 'Extremely devoted to Bettey', 'Can manipulate his limbs in impossible ways', 'Knows secrets of Winter Court politics'],
      abilities: ['Unnatural flexibility', 'Silent movement', 'Ingredient gathering', 'Fae realm navigation', 'Protective magic'],
      motivations: ['Serve and protect Bettey', 'Maintain their home', 'Gather rare ingredients', 'Keep fae realm secrets'],
      relatedThreats: ['bogCorruption'],
      relatedLocations: ['bogRoad'],
      relatedEvents: ['hagEncounter', 'bogTravel']
    },

    // Netherwick Background NPCs
    dockWorker: {
      name: 'Henrik Saltbeard',
      location: 'Netherwick',
      role: 'Dock Worker & Boat Maintenance',
      description: 'Gruff older man who maintains the docks and helps boats come and go. Missing two fingers from his left hand.',
      secrets: ['Lost fingers on left hand to something that "bit back" while fishing', 'Knows which boats return—and which linger when they shouldn\'t'],
      quick_info: ['Always chewing on dried fish', 'Speaks in grunts mostly', 'Charges small fees for dock use'],
      motivations: ['Keep the docks functional', 'Avoids the water himself', 'Warn newcomers subtly']
    },

    youngFisherman: {
      name: 'Tobias Netcast',
      location: 'Netherwick',
      role: 'Young Fisherman & Village Gossip',
      description: 'Eager young man in his early twenties, still optimistic despite the village\'s decline. Son of a fishing family.',
      secrets: ['Planning to leave for Millhaven soon', 'Sweet on the bait keeper\'s daughter'],
      quick_info: ['Chatty and friendly to strangers', 'Knows everyone\'s business', 'Still believes things will get better'],
      motivations: ['Make enough money to leave', 'Impress his crush', 'Help his aging parents']
    },

    barnabyNetcast: {
      name: 'Barnaby Netcast',
      location: 'Netherwick',
      role: 'Aging Fisherman & Tobias\'s Father',
      description: 'Older fisherman whose body is wearing down from decades at sea. Father to the optimistic young Tobias.',
      secrets: ['Knows his fishing days are numbered', 'Worried about son leaving the village'],
      quick_info: ['Weathered and tired', 'Proud of his son', 'Still skilled despite age'],
      motivations: ['Provide for family while he can', 'Pass on fishing knowledge', 'Keep son safe']
    },

    meredithNetcast: {
      name: 'Meredith Netcast',
      location: 'Netherwick',
      role: 'Net Mender & Tobias\'s Mother',
      description: 'skilled woman who mends nets for the village fishermen. Tobias\'s mother who worries about his plans to leave.',
      secrets: ['Secretly hopes Tobias will stay', 'Knows which families are planning to leave'],
      quick_info: ['Skilled with needlework', 'Gossips while working', 'Protective of her son'],
      motivations: ['Keep family together', 'Earn income through net repair', 'Support husband\'s fishing']
    },

    fisherWife: {
      name: 'Greta Stormwind',
      location: 'Netherwick',
      role: 'Fisher\'s Wife & Seamstress',
      description: 'Middle-aged woman whose husband, Garrett Stormwind, went missing at sea three months ago. Takes in sewing to survive.',
      secrets: ['Husband\'s boat was found with strange bite marks', 'Keeps his sea chest locked'],
      quick_info: ['Suspicious of strangers', 'Protective of her children', 'Skilled with needle and thread'],
      motivations: ['Protect her children', 'Find out what happened to her husband', 'Keep food on the table']
    },

    sickmChild: {
      name: 'Little Tam Stormwind',
      location: 'Netherwick',
      role: 'Greta\'s Sick Child',
      description: 'seven-year-old boy who\'s been ill since his father disappeared. Has strange marks on his arms.',
      secrets: ['Marks look like small barnacles growing under skin', 'Dreams of underwater cities'],
      quick_info: ['Quiet and withdrawn', 'Draws disturbing sea creatures', 'Afraid of the water now'],
      motivations: ['Understand his dreams', 'Find his father', 'Make the marks stop itching']
    },

    mollyStormwind: {
      name: 'Molly Stormwind',
      location: 'Netherwick',
      role: 'seamstress Helper & Greta\'s Daughter',
      description: 'Twelve-year-old girl who helps her mother Greta with sewing work. Mature for her age due to family hardship.',
      secrets: ['Remembers more about father\'s disappearance than she admits', 'Helps care for sick brother Tam'],
      quick_info: ['Serious and responsible', 'Good with needle and thread', 'Protective of little brother'],
      motivations: ['Help support the family', 'Protect her little brother', 'Learn about father\'s fate']
    },

    benStormwind: {
      name: 'Ben Stormwind',
      location: 'Netherwick',
      role: 'Child & Greta\'s Son',
      description: 'Nine-year-old boy who\'s been afraid of the water since his father disappeared. Brother to Tam and Molly.',
      secrets: ['Has nightmares about the water', 'Draws pictures of sea monsters'],
      quick_info: ['Afraid of the bay', 'Stays close to home', 'Imaginative but fearful'],
      motivations: ['Stay safe from the water', 'Help his sick brother', 'Understand what happened to father']
    },

    desperateWidow: {
      name: 'Vera Blackwater',
      location: 'Netherwick',
      role: 'Widow & Herb Gatherer',
      description: 'Elderly widow who knows which plants help with ailments. Lost three sons to the sea over the years, Marcus, Theron, and Edwin.',
      secrets: ['Grows plants that shouldn\'t exist in this climate', 'Makes remedies for the transforming villagers'],
      quick_info: ['Speaks to herself constantly', 'Always smells of strange herbs', 'Offers remedies for coin'],
      motivations: ['Help ease others\' suffering', 'Keep her garden secret', 'Remember her sons'],
      knowledge: [
        { topic: 'Eldest Son', info: 'Marcus Blackwater (lost 15 years ago, age 25 when disappeared)' },
        { topic: 'Middle Son', info: 'Theron Blackwater (lost 8 years ago, age 22 when disappeared)' },
        { topic: 'Youngest Son', info: 'Edwin Blackwater (lost 3 years ago, age 19 when disappeared)' }
      ]
    },

    waterBearer: {
      name: 'Young Sara Tidecaller',
      location: 'Netherwick',
      role: 'Water Bearer & Message Runner',
      description: 'Teenage girl who fetches water and carries messages between households. Fast and reliable.',
      secrets: ['Well water tastes saltier each day', 'Sees things in the water\'s reflection'],
      quick_info: ['Quick and energetic', 'Knows all the gossip', 'Wants to learn to read'],
      motivations: ['Help her community', 'Learn about the outside world', 'Understand the visions']
    },

    fishmonger: {
      name: 'Old Cobb Fishscale',
      location: 'Netherwick',
      role: 'Fish Seller & Former Sea Captain',
      description: 'Retired sea captain who now sells the daily catch. Has extensive knowledge of the bay\'s waters.',
      secrets: ['Knows the safe fishing spots', 'Refuses to eat the current catches himself'],
      quick_info: ['Missing left eye from whaling accident', 'Tells tall tales', 'Charges fair prices'],
      motivations: ['Help families sell their catch', 'Share maritime wisdom', 'Avoid starvation']
    },

    tradingCaptain: {
      name: 'Captain Mordecai Blackbrine',
      location: 'Netherwick',
      role: 'Visiting Trading Captain',
      description: 'Captain of a small trading vessel who occasionally stops in Netherwick. Seems nervous about something.',
      secrets: ['Transports black parasites from whaling crews', 'Has strange buyers in distant ports'],
      quick_info: ['Never stays more than a day', 'Pays well for certain "specimens"', 'Won\'t discuss his cargo'],
      motivations: ['Complete profitable trades', 'Avoid asking questions', 'Keep his crew safe']
    },

    baitKeeper: {
      name: 'Jebediah Wormfinder',
      location: 'Netherwick',
      role: 'Bait Supplier & Supply Manager',
      description: 'Man who manages fishing supplies and digs for bait. His daughter helps him sort hooks and line.',
      secrets: ['Some bait moves on its own', 'Finding things in the mud that shouldn\'t be there'],
      quick_info: ['Always dirty from digging', 'Quiet and methodical', 'Protective of his daughter'],
      motivations: ['Keep fishermen supplied', 'Protect his daughter', 'Understand the strange bait']
    },

    rosieWormfinder: {
      name: 'Rosie Wormfinder',
      location: 'Netherwick',
      role: 'supply Sorter & Jebediah\'s Daughter',
      description: 'sixteen-year-old girl who helps her father sort fishing supplies. Object of young Tobias\'s affection.',
      secrets: ['Knows Tobias likes her', 'Wants to learn to read and write', 'Finds strange things in the bait sometimes'],
      quick_info: ['Hardworking and practical', 'Dreams of life beyond the village', 'Kind but focused'],
      motivations: ['Help her father\'s business', 'Learn new skills', 'Decide between staying or leaving']
    },

    senileGrandfather: {
      name: 'Grandfather Ezra Saltwhiskers',
      location: 'Netherwick',
      role: 'Village Elder & Storyteller',
      description: 'Very old fisherman who sits by the docks and tells stories. Sometimes his tales seem prophetic.',
      secrets: ['Stories contain real warnings about the bay', 'Remembers when the corruption started'],
      quick_info: ['Speaks in riddles and stories', 'Feeds seagulls daily', 'Sometimes seems lucid'],
      motivations: ['Share important memories', 'Warn through stories', 'Feed the gulls']
    },

    anxiousMother: {
      name: 'Prudence Waveworry',
      location: 'Netherwick',
      role: 'Fisherman\'s Wife & Village Gossip',
      description: 'Nervous woman whose husband, Crispin Waveworry, is part of a whaling crew. Constantly worried about his changes.',
      secrets: ['Husband growing gills behind his ears', 'Considering taking children and fleeing'],
      quick_info: ['Jumpy and nervous', 'Asks lots of questions', 'Protective of her family'],
      motivations: ['Keep her family safe', 'Learn about husband\'s condition', 'Plan escape if needed']
    },

    willlemWaveworry: {
      name: 'Young Willem Waveworry',
      location: 'Netherwick',
      role: 'Child & Prudence\'s Son',
      description: 'Eight-year-old boy who doesn\'t understand why his mother is so worried about his father lately.',
      secrets: ['Notices father smells like fish more than usual', 'Heard parents arguing at night'],
      quick_info: ['Curious and energetic', 'Asks lots of questions', 'Loves his father'],
      motivations: ['Understand why everyone seems worried', 'Spend time with father', 'Play and explore']
    },

    pennyWaveworry: {
      name: 'Penny Waveworry',
      location: 'Netherwick',
      role: 'Young Child & Prudence\'s Daughter',
      description: 'Five-year-old girl who clings to her increasingly anxious mother. Too young to understand the family\'s situation.',
      secrets: ['Father\'s hugs feel different lately', 'Senses mother\'s fear'],
      quick_info: ['Clingy and sensitive', 'Picks up on emotions', 'Needs comfort'],
      motivations: ['Stay close to mother', 'Get attention from busy father', 'Feel safe']
    },

    skepticalFisherman: {
      name: 'Magnus Doubtcaster',
      location: 'Netherwick',
      role: 'Local Fisherman & Voice of Reason',
      description: 'Practical fisherman who dismisses supernatural explanations but can\'t explain what he\'s seeing.',
      secrets: ['Starting to believe the supernatural explanations', 'Caught something he can\'t identify'],
      quick_info: ['Stubborn and logical', 'Dismisses "superstition"', 'Good with nets and boats'],
      motivations: ['Find logical explanations', 'Keep fishing despite fears', 'Protect his reputation']
    },

    // Millhaven Background NPCs
    dockMaster: {
      name: 'Captain Jeremiah Saltwater',
      location: 'Millhaven - Harbor District',
      role: 'Dock Master & Port Authority',
      description: 'Former ship captain who now manages what little shipping traffic still comes to Millhaven. Has extensive knowledge of the bay\'s waters and notices when ships don\'t return.',
      secrets: ['Keeps records of missing vessels', 'Charges extra fees for nighttime departures', 'Knows which ships carry strange cargo'],
      abilities: ['Maritime navigation', 'Ship identification', 'Harbor regulations'],
      motivations: ['Keep the port functional', 'Warn ships about dangerous waters', 'Earn enough to eventually leave'],
      quick_info: ['Missing left leg from old whaling accident', 'Uses wooden crutch', 'Always smoking pipe'],
      knowledge: [
        { topic: 'Missing Ships', info: 'Tracks vessels that never return - pattern shows increasing disappearances near deep water' },
        { topic: 'Strange Cargo', info: 'Some ships transport jars of black, writhing substances and pay premium docking fees' }
      ]
    },

    fisherCaptain: {
      name: 'Captain Magnus Deepcast',
      location: 'Millhaven - Harbor District',
      role: 'Fishing Captain & Boat Owner',
      description: 'Owns one of the few remaining fishing boats that still operates from Millhaven. His crew is increasingly reluctant to venture into deeper waters.',
      secrets: ['Crew members show early signs of transformation', 'Has seen things in the deep water that he won\'t discuss'],
      abilities: ['Deep water fishing', 'Crew management', 'Weather prediction'],
      motivations: ['Keep his boat operational', 'Protect his crew', 'Avoid the deepest waters'],
      quick_info: ['Weathered face with kind eyes', 'Speaks softly but firmly', 'Protective of his men'],
      relatedThreats: ['corruptedWhales', 'agog']
    },

    nightWatchman: {
      name: 'Tobias Lantern',
      location: 'Millhaven - Harbor District',
      role: 'Night Watchman & Harbor Security',
      description: 'Patrols the harbor and docks during night hours. Has witnessed strange things rising from the water but questions his own sanity.',
      secrets: ['Sees tentacled shapes in the water', 'Drinks heavily to dull the visions', 'Keeps a detailed journal of sightings'],
      abilities: ['Night vision', 'Stealth movement', 'Combat training'],
      motivations: ['Keep the harbor safe', 'Prove he\'s not going mad', 'Earn his nightly wage'],
      quick_info: ['Carries multiple lanterns', 'Nervous and jumpy', 'Drinks from a hip flask'],
      relatedThreats: ['agog']
    },

    ferryBoatman: {
      name: 'Old Henrik Ferry',
      location: 'Millhaven - Harbor District',
      role: 'Ferry Operator & Water Taxi',
      description: 'Operates a small ferry between Millhaven and nearby settlements. Refuses to travel to certain areas of the bay.',
      secrets: ['Has a mental map of \'safe\' and \'dangerous\' waters', 'Charges different rates based on destination danger'],
      abilities: ['Small boat operation', 'Local water knowledge', 'Danger sensing'],
      motivations: ['Provide transport services', 'Avoid dangerous waters', 'Support his large family'],
      quick_info: ['Always wearing oilskin coat', 'Speaks in maritime terms', 'Extremely cautious'],
      services: ['Ferry transport to safe locations', 'Water taxi services', 'Maritime advice']
    },

    // Prosperity Row NPCs
    eccentricRecluse: {
      name: 'Lady Cordelia Grimwald',
      location: 'Millhaven - Prosperity Row',
      role: 'Eccentric Mansion Owner & Former Socialite',
      description: 'Elderly widow living alone in her decaying mansion, surrounded by the portraits of her dead family. Claims to receive visits from her departed husband.',
      secrets: ['Actually communes with spirits of the dead', 'Knows family secrets of other mansion owners', 'Has made a minor pact for extended life'],
      abilities: ['High society knowledge', 'Spirit communication', 'Historical memory'],
      motivations: ['Maintain family dignity', 'Communicate with dead husband', 'Protect family secrets'],
      quick_info: ['Grimwald Manor', 'Wears elaborate but outdated clothing', 'Talks to empty air', 'Lives surrounded by portraits'],
      knowledge: [
        { topic: 'Mansion Families', info: 'Knows the dark secrets and hidden sins of the old whaling families' },
        { topic: 'Spiritual Activity', info: 'Can identify which mansions are truly haunted versus merely abandoned' }
      ]
    },

    corruptedNoble: {
      name: 'Lord Aldric Blackwater',
      location: 'Millhaven - Prosperity Row',
      role: 'Corrupted Nobleman & Agog Cultist',
      description: 'Former whaling fortune heir who has made a pact with Agog to maintain his lifestyle. Appears younger than his years but shows subtle signs of corruption.',
      secrets: ['Direct servant of Agog', 'Hosts secret meetings in his mansion', 'Feeds information to Lord Scrimm'],
      abilities: ['Social manipulation', 'Minor eldritch powers', 'Wealth and influence'],
      motivations: ['Serve Agog\'s interests', 'Maintain his luxurious lifestyle', 'Recruit others to the cause'],
      quick_info: ['Leviathan House', 'Impeccably dressed', 'Unnaturally pale', 'Eyes reflect light strangely'],
      relatedThreats: ['agog'],
      relatedLocations: ['prosperityRow']
    },

    squatterFamily: {
      name: 'The Crowley Family (Squatters)',
      location: 'Millhaven - Prosperity Row',
      role: 'Squatter Family with Sick Children',
      description: 'Poor family led by Sarah Crowley and her three children (Tommy (11), Lily (9), and Ben (6)) who moved into the abandoned Blackthorne Estate. The children show signs of illness from the mansion\'s unhealthy conditions.',
      secrets: ['Children are developing strange symptoms', 'Found hidden valuables in the mansion', 'Desperately trying to find proper housing'],
      abilities: ['Survival skills', 'Scavenging', 'Child care'],
      motivations: ['Keep family together', 'Find safe housing', 'Treat sick children'],
      quick_info: ['Blackthorne Estate', 'Wear patched clothing', 'Children often coughing', 'Defensive about their living situation'],
      relatedLocations: ['prosperityRow']
    },

    hermitBotanist: {
      name: 'Dr. Gideon Mooncrest',
      location: 'Millhaven - Prosperity Row',
      role: 'Hermit Botanist & Plant Researcher', 
      description: 'Descendant of the shipping heiress, Adelaide Mooncrest, who has become obsessed with studying the carnivorous plant mutations in his family\'s gardens. Rarely leaves the greenhouse complex.',
      secrets: ['Plants respond to his commands', 'Developing antidotes to corruption', 'Slowly being consumed by plant symbiosis'],
      abilities: ['Botanical expertise', 'Plant cultivation', 'Alchemical knowledge'],
      motivations: ['Understand plant mutations', 'Develop cures for corruption', 'Protect his research'],
      quick_info: ['Mooncrest Villa', 'Covered in plant pollen and sap', 'Speaks to his plants', 'Shows signs of plant-human symbiosis'],
      relatedLocations: ['prosperityRow']
    },

    // Church Quarter NPCs
    graveDigger: {
      name: 'Silas Graveheart',
      location: 'Millhaven - Church Quarter',
      role: 'Gravedigger & Cemetery Keeper',
      description: 'Tends the church cemetery and has noticed that some graves don\'t stay properly buried. Works closely with Father Blackwater.',
      secrets: ['Some corpses show signs of transformation after burial', 'Keeps detailed records of grave disturbances'],
      abilities: ['Grave maintenance', 'Dead body handling', 'Cemetery security'],
      motivations: ['Maintain the cemetery', 'Help Father Blackwater', 'Keep the dead at rest'],
      quick_info: ['Always covered in grave dirt', 'Speaks quietly and respectfully', 'Carries blessed tools'],
      relatedLocations: ['templeOfTheTides']
    },

    madScrivener: {
      name: 'Erasmus Inkwell',
      location: 'Millhaven - Church Quarter',
      role: 'Former Town Clerk & Obsessive Record Keeper',
      description: 'Once maintained town records, now obsessively documents every strange occurrence. His papers contain valuable information but he\'s increasingly incoherent.',
      secrets: ['Has documented the timeline of corruption', 'Possesses pre-corruption town records', 'Shows early signs of madness'],
      abilities: ['Detailed record keeping', 'Local history knowledge', 'Pattern recognition'],
      motivations: ['Document the truth', 'Maintain historical records', 'Prove his theories'],
      quick_info: ['Ink-stained fingers', 'Mutters while writing', 'Carries stacks of papers'],
      knowledge: [
        { topic: 'Town History', info: 'Complete records of Millhaven from before the corruption began' },
        { topic: 'Strange Events', info: 'Detailed timeline showing escalation of supernatural activity' }
      ]
    },

    // Common Quarter NPCs
    barkeeper: {
      name: 'Molly Barrelwright',
      location: 'Millhaven - The Rendered Crown',
      role: 'Inn Keeper & Information Broker',
      description: 'Runs The Rendered Crown inn, providing cheap rooms and cheaper ale. Hears all the gossip and rumors in town.',
      secrets: ['Knows who has money and who doesn\'t', 'Keeps track of strangers and their business', 'Has connections to smugglers'],
      abilities: ['Information gathering', 'Inn management', 'Local networking'],
      motivations: ['Keep the inn profitable', 'Stay informed about local events', 'Help decent folks'],
      quick_info: ['Always wiping down tables', 'Good memory for faces', 'Protective of her customers'],
      services: ['Cheap rooms and meals', 'Local information', 'Message passing'],
      knowledge: [
        { topic: 'Local Gossip', info: 'Knows who\'s been acting strange, who has money problems, and who\'s planning to leave' },
        { topic: 'Travelers', info: 'Tracks who comes and goes from town, including suspicious visitors' }
      ]
    },

    desperateWidow: {
      name: 'Martha Weeping',
      location: 'Millhaven - Common Quarter',
      role: 'Seamstress & Desperate Mother',
      description: 'Widow whose husband was lost at sea. Struggles to feed her three children by taking in sewing work. Increasingly desperate for any source of income.',
      secrets: ['Considering accepting help from Lord Blackwater', 'One child shows signs of corruption exposure'],
      abilities: ['Expert seamstress', 'Clothing repair', 'Child care'],
      motivations: ['Feed her children', 'Keep her family together', 'Find stable income'],
      quick_info: ['Thin and worn down', 'Always mending clothes', 'Fiercely protective of children'],
      services: ['Clothing repair and alterations', 'Information about struggling families']
    },

    herbalist: {
      name: 'Grandmother Willow Brewbottle',
      location: 'Millhaven - Common Quarter',
      role: 'Herbalist & Folk Healer',
      description: 'Elderly woman who provides herbal remedies and folk medicine. Her knowledge includes treatments for \'unusual ailments\' that have been appearing.',
      secrets: ['Has developed remedies for early-stage corruption', 'Grows plants that shouldn\'t exist in this climate'],
      abilities: ['Herbal medicine', 'Plant cultivation', 'Folk healing'],
      motivations: ['Help the sick', 'Research new ailments', 'Preserve healing knowledge'],
      quick_info: ['Always smells of herbs', 'Keen eyes despite age', 'Gentle but firm manner'],
      services: ['Herbal remedies', 'Medical consultation', 'Corruption treatment (limited)'],
      knowledge: [
        { topic: 'Corruption Symptoms', info: 'Recognizes early signs of transformation and has some treatments' },
        { topic: 'Strange Illnesses', info: 'Has treated unusual ailments that don\'t respond to normal medicine' }
      ]
    },

    oldWhaler: {
      name: 'Captain Ezra Ironheart',
      location: 'Millhaven - Common Quarter',
      role: 'Retired Whaler & Storyteller',
      description: 'Ancient whaler who remembers the glory days and has stories about the change in whale behavior over the decades.',
      secrets: ['Knows when the whales first started acting strange', 'Has encountered things in the deep water', 'Possesses old whaling charts'],
      abilities: ['Whaling expertise', 'Sea lore', 'Weather prediction'],
      motivations: ['Share whaling knowledge', 'Warn young sailors', 'Remember better times'],
      quick_info: ['Missing right arm', 'Tells stories to anyone who\'ll listen', 'Always has rum breath'],
      knowledge: [
        { topic: 'Whale Behavior', info: 'Remembers exactly when whales started avoiding certain areas and showing signs of disease' },
        { topic: 'Deep Water Encounters', info: 'Has stories of strange sightings that predate the current corruption' }
      ]
    },

    specialtyMerchant: {
      name: 'Cornelius Strangewares',
      location: 'Millhaven - Common Quarter',
      role: 'Specialty Goods Merchant & Fence',
      description: 'Deals in \'unusual items\' and asks no questions about their origin. Has connections to buyers of strange materials.',
      secrets: ['Trades in corrupted whale products', 'Has buyers in distant cities', 'Knows about the parasite trade'],
      abilities: ['Item appraisal', 'Discrete trading', 'Contact network'],
      motivations: ['Profit from strange trades', 'Maintain discretion', 'Build his network'],
      quick_info: ['Well-dressed for a small town', 'Asks few questions', 'Always has coin'],
      services: ['Purchase of unusual items', 'Access to rare goods', 'Discrete transactions'],
      relatedThreats: ['corruptedWhales']
    },

    streetSweeper: {
      name: 'Simple Samuel',
      location: 'Millhaven - Common Quarter',
      role: 'Street Cleaner & Town Observer',
      description: 'Mentally simple man who cleans the streets and notices things others miss. His childlike observations often contain important insights.',
      secrets: ['Sees patterns others miss', 'Notices when people behave differently', 'Remembers every face'],
      abilities: ['Observational skills', 'Pattern recognition', 'Local knowledge'],
      motivations: ['Keep the town clean', 'Help people', 'Avoid trouble'],
      quick_info: ['Always carrying a broom', 'Speaks in simple sentences', 'Friendly to everyone'],
      knowledge: [
        { topic: 'Town Changes', info: 'Notices behavioral changes in townspeople before others do' },
        { topic: 'Street Activity', info: 'Sees who goes where and when, especially at unusual hours' }
      ]
    },

    lampLighter: {
      name: 'Timothy Flickwick',
      location: 'Millhaven - Common Quarter',
      role: 'Lamp Lighter & Evening Patrol',
      description: 'Responsible for lighting and maintaining the town\'s street lamps. Works during twilight hours and has noticed strange activity after dark.',
      secrets: ['Sees unusual movement in the harbor at night', 'Some lamps go out mysteriously', 'Carries blessed oil'],
      abilities: ['Night work', 'Lamp maintenance', 'Evening patrol'],
      motivations: ['Keep the streets lit', 'Maintain town safety', 'Complete his rounds'],
      quick_info: ['Always carries a long lighter pole', 'Works during dusk and dawn', 'Knows every street'],
      relatedThreats: ['agog']
    },

    // Cross-District NPCs
    fishMonger: {
      name: 'Brenda Catchwright',
      location: 'Millhaven - Common Quarter Market',
      role: 'Fish Seller & Market Trader',
      description: 'Sells the daily catch in the small market. Has noticed the fish have been getting stranger and some taste metallic.',
      secrets: ['Won\'t eat her own merchandise anymore', 'Some fish have unusual features', 'Customers getting sick'],
      abilities: ['Fish evaluation', 'Market trading', 'Customer service'],
      motivations: ['Make a living', 'Provide food for town', 'Avoid selling dangerous fish'],
      quick_info: ['Always smells of fish', 'Sharp eye for quality', 'Increasingly worried'],
      relatedThreats: ['corruptedWhales']
    },

    formerOfficer: {
      name: 'Sergeant Marcus Ironhand',
      location: 'Millhaven - Church Quarter',
      role: 'Former Town Guard & Veteran',
      description: 'Retired military officer who served as town guard during better times. Now provides security consulting and training.',
      secrets: ['Knows about hidden weapons caches', 'Has contacts in other settlements', 'Suspects organized conspiracy'],
      abilities: ['Combat training', 'Security knowledge', 'Leadership skills'],
      motivations: ['Protect the townspeople', 'Maintain order', 'Train others in self-defense'],
      quick_info: ['Military bearing', 'Carries weapons openly', 'Speaks with authority'],
      services: ['Security consultation', 'Combat training', 'Weapon maintenance']
    },

    rumorMonger: {
      name: 'Gossip Greta Tonguewagg',
      location: 'Millhaven - Common Quarter',
      role: 'Gossip & Information Spreader',
      description: 'Knows everyone\'s business and spreads rumors both true and false. Despite her unreliability, she often has genuine information.',
      secrets: ['Some rumors are deliberately planted', 'Has sources in every district', 'Knows more than she admits'],
      abilities: ['Information gathering', 'Social networking', 'Rumor spreading'],
      motivations: ['Stay informed', 'Be the center of attention', 'Trade information for favors'],
      quick_info: ['Talks constantly', 'Always has the latest news', 'Unreliable but connected']
    },

    customsClerk: {
      name: 'Percival Dustworth',
      location: 'Millhaven - Harbor Customs House',
      role: 'Customs Inspector & Record Keeper',
      description: 'Nervous bureaucrat who processes the few remaining shipping manifests. Has been accepting bribes to overlook suspicious cargo and is increasingly worried about his complicity.',
      secrets: ['Takes bribes to ignore certain shipments', 'Keeps copies of suspicious manifests', 'Plans to flee town soon'],
      abilities: ['Document forgery', 'Cargo evaluation', 'Legal knowledge'],
      motivations: ['Avoid trouble', 'Save enough money to leave', 'Cover his tracks'],
      quick_info: ['Always sweating despite cool weather', 'Jumps at loud noises', 'Counts money obsessively'],
      knowledge: [
        { topic: 'Suspicious Cargo', info: 'Knows which ships carry black parasites and other strange biological materials' },
        { topic: 'Corrupt Shipping', info: 'Has evidence of organized trade in corrupted materials' }
      ],
      relatedThreats: ['corruptedWhales', 'agog']
    },

    seamstress: {
      name: 'Agnes Threadbare',
      location: 'Millhaven - Common Quarter',
      role: 'Tailor & Clothing Repair',
      description: 'Skilled seamstress who mends clothing for the town\'s residents. Has noticed that some people\'s clothes need unusual alterations as their bodies change.',
      secrets: ['Has sewn special accommodations for transforming residents', 'Knows who is hiding physical changes'],
      abilities: ['Expert tailoring', 'Clothing design', 'Fabric evaluation'],
      motivations: ['Help people maintain dignity', 'Keep her business running', 'Avoid asking uncomfortable questions'],
      quick_info: ['Always has measuring tape around neck', 'Sharp eye for detail', 'Discreet about customers'],
      services: ['Clothing alterations', 'Repairs and patches', 'Custom garments', 'Discrete modifications for physical changes']
    },

    ratCatcher: {
      name: 'Grimm Squeakbane',
      location: 'Millhaven - All Districts',
      role: 'Pest Control & Urban Scavenger',
      description: 'Controls the rat population throughout Millhaven and has noticed the rodents behaving strangely - some avoiding certain areas entirely, others showing signs of mutation.',
      secrets: ['Rats lead him to sources of corruption', 'Has access to every building through pest control work', 'Finds valuable items in rat nests'],
      abilities: ['Animal handling', 'Urban navigation', 'Pest identification'],
      motivations: ['Keep the town free of vermin', 'Understand animal behavior changes', 'Find valuable scavenged items'],
      quick_info: ['Always accompanied by trained cats', 'Knows every back alley and basement', 'Speaks to his animals'],
      knowledge: [
        { topic: 'Urban Layout', info: 'Knows secret passages, basement connections, and hidden entrances throughout town' },
        { topic: 'Animal Behavior', info: 'Understands which areas animals avoid and why' }
      ]
    },

    bigTom: {
      name: 'Big Tom Heavylift',
      location: 'Millhaven - Harbor District',
      role: 'Dock Worker & Cargo Handler',
      description: 'Massive dock worker who handles heavy cargo and has worked the docks for decades. His strength makes him valuable, but he\'s seen too much strange cargo lately.',
      secrets: ['Has lifted containers that moved on their own', 'Knows which cargo the bosses want handled \'carefully\'', 'Scared of certain shipments'],
      abilities: ['Exceptional strength', 'Cargo handling', 'Maritime equipment operation'],
      motivations: ['Support his family', 'Keep his job', 'Avoid the dangerous cargo'],
      quick_info: ['Enormous and heavily muscled', 'Speaks softly despite size', 'Nervous around certain containers'],
      relatedThreats: ['corruptedWhales', 'agog']
    }
  },

  locations: {
    // Millhaven Background Locations
    renderedCrown: {
      id: 'renderedCrown',
      name: 'The Rendered Crown',
      settlement: 'millhaven',
      type: 'Inn & Flophouse',
      description: 'Once Millhaven\'s premier luxury inn, The Rendered Crown has been reduced to a flophouse for desperate sailors, fishermen, and other transients. The grand lobby still shows traces of its former glory - crystal chandeliers now missing half their pieces, faded velvet furnishings, and oil paintings of whaling scenes that seem to watch visitors. The building\'s three stories house a mix of permanent residents and temporary guests, all united by their desperate circumstances.',
      publicDescription: 'Former luxury inn, now a flophouse for desperate sailors',

      layout: {
        groups: [
          {
            title: 'Ground Floor',
            type: 'primary',
            items: [
              {
                name: 'Main Lobby',
                description: 'Once-grand entrance with faded luxury and maritime paintings',
                features: ['Partial crystal chandelier', 'Worn velvet furniture', 'Maritime oil paintings', 'Reception desk']
              },
              {
                name: 'Common Room',
                description: 'Gathering area with fireplace and communal seating',
                features: ['Large stone fireplace', 'Mismatched chairs and tables', 'Bar area', 'Notice board']
              },
              {
                name: 'Kitchen & Storage',
                description: 'Basic kitchen facilities for simple meals',
                features: ['Wood-burning stove', 'Food storage', 'Dishwashing area', 'Cellar access']
              }
            ]
          },
          {
            title: 'Upper Floors',
            type: 'secondary',
            items: [
              {
                name: 'Second Floor',
                description: 'Mix of private rooms and shared dormitory spaces',
                features: ['8 small private rooms', '2 dormitory rooms (4 beds each)', 'Shared washroom', 'Molly\'s quarters']
              },
              {
                name: 'Third Floor',
                description: 'Cheapest accommodations with leaky roof and poor ventilation',
                features: ['12 tiny rooms', '1 large dormitory (8 beds)', 'Bucket toilet', 'Storage for long-term residents']
              }
            ]
          }
        ]
      },

      npcs: ['barkeeper'],

      inventory: {
        drinks: [
          { item: 'Watered Ale', price: '2 cp', quality: 'Poor', description: 'Thin ale that\'s seen better days' },
          { item: 'Rum (cheap)', price: '4 cp', quality: 'Poor', description: 'Harsh rum that burns going down' },
          { item: 'Whale Oil Whiskey', price: '8 cp', quality: 'Decent', description: 'Local spirit with a distinctive oily aftertaste' },
          { item: 'Coffee (when available)', price: '1 cp', quality: 'Poor', description: 'Weak coffee made from reused grounds' }
        ],
        food: [
          { item: 'Fish Stew', price: '3 cp', description: 'Daily special made from whatever fish are available' },
          { item: 'Hardtack & Cheese', price: '2 cp', description: 'Sailor\'s bread with local cheese' },
          { item: 'Pickled Vegetables', price: '1 cp', description: 'Preserved vegetables from better times' },
          { item: 'Hot Porridge', price: '1 cp', description: 'Filling oatmeal, served mornings only' }
        ],
        services: [
          { service: 'Dormitory Bed', price: '1 cp', description: 'Shared room with 4-8 beds' },
          { service: 'Private Room (small)', price: '3 cp', description: 'Tiny room with bed and washbasin' },
          { service: 'Private Room (larger)', price: '5 cp', description: 'Better room with window and desk' },
          { service: 'Weekly Rate', price: '15 cp', description: 'Reduced rate for week-long stays' },
          { service: 'Message Service', price: '1 cp', description: 'Molly will deliver messages around town' },
          { service: 'Information', price: 'Free with drink', description: 'Local gossip and current events' }
        ]
      },

      secrets: {
        gmNotes: 'Molly keeps detailed mental notes on all guests and their activities. Some long-term residents have interesting backgrounds. The building has hidden areas from its luxury days.',
        hiddenItems: [
          {
            item: 'Guest Records',
            location: 'Molly\'s quarters, hidden under floorboard (Investigation DC 13)',
            description: 'Written records of notable guests, their activities, and suspicious behavior'
          },
          {
            item: 'Emergency Fund',
            location: 'Behind loose brick in lobby fireplace (Investigation DC 15)',
            description: '35 gold pieces saved for emergencies, plus valuable jewelry'
          },
          {
            item: 'Former Manager\'s Cache',
            location: 'Third floor storage room, false bottom in trunk (Perception DC 14)',
            description: 'Hidden supplies including fine liquor, silver items worth 45 gp, and old guest list from luxury days'
          }
        ],
        secretDoors: [
          'Staff passage between kitchen and second floor (behind pantry shelves, Investigation DC 12)',
          'Former luxury suite access (behind second floor bookshelf, Investigation DC 16)'
        ],
        observations: [
          'Some permanent residents seem to have more money than their circumstances suggest',
          'Conversations stop when strangers approach certain groups',
          'Molly remembers every face and detail about guests',
          'Late-night visitors come and go through side entrances',
          'Some rooms are rented but never seem occupied'
        ]
      },

      inhabitants: [
        'Molly Barrelwright (innkeeper)',
        'Desperate sailors between voyages',
        'Unemployed dock workers',
        'Traveling merchants of questionable goods',
        'Refugees from other declining settlements',
        'Local residents who lost their homes',
        'Occasional mysterious long-term guests'
      ],

      questHooks: [
        'Molly hires party to investigate suspicious long-term guests',
        'Information gathering about recent arrivals and their business',
        'Protection needed for valuable guests or cargo',
        'Investigation into why certain rooms are paid for but never occupied',
        'Help with debt collection from guests who can\'t pay'
      ],

      relatedThreats: ['agog', 'transformedCitizens'],
      relatedEvents: ['strangeNews']
    },

    townSquare: {
      id: 'townSquare',
      name: 'Memorial Square',
      settlement: 'millhaven',
      type: 'Public Square & Memorial',
      description: 'The town\'s central square, dominated by a weathered stone memorial to the lost whalers and sailors of Millhaven\'s golden age. The memorial fountain no longer works, filled instead with stagnant water and offerings from families of the missing. Surrounding the square are empty market stalls, a defunct town hall, and the ruins of what was once a thriving commercial district.',
      publicDescription: 'Central square with memorial to lost whalers, now mostly empty',

      layout: {
        areas: [
          {
            name: 'Central Memorial',
            description: 'Large stone monument with fountain basin, now filled with offerings',
            features: ['Stone memorial with carved whale', 'Non-functional fountain', 'Offering basin', 'Memorial plaques']
          },
          {
            name: 'Market Area',
            description: 'Empty stone stalls where merchants once sold goods',
            features: ['12 empty market stalls', 'Stone benches', 'Wooden bulletin board', 'Public well (brackish)']
          },
          {
            name: 'Town Hall Ruins',
            description: 'Partially collapsed government building',
            features: ['Damaged stone facade', 'Broken clock tower', 'Barred windows', 'Overgrown steps']
          }
        ]
      },

      npcs: ['madScrivener', 'rumorMonger', 'streetSweeper'],

      secrets: {
        gmNotes: 'The memorial fountain sometimes shows visions in its stagnant water. The town hall ruins contain important records. Families leave offerings that sometimes disappear overnight.',
        hiddenItems: [
          {
            item: 'Town Records',
            location: 'Town hall ruins, basement vault (requires clearing debris, Investigation DC 16)',
            description: 'Historical records showing the true timeline of economic decline and first reports of strange events'
          },
          {
            item: 'Memorial Offerings',
            location: 'Hidden compartment in memorial base (Religion DC 14)',
            description: 'Valuable items left by families: jewelry, coins, personal effects worth 75 gp total'
          }
        ],
        observations: [
          'Families gather here to remember lost loved ones',
          'The memorial fountain water sometimes shows strange reflections',
          'Erasmus can often be found here taking notes',
          'Offerings left at the memorial sometimes vanish by morning',
          'The town hall clock stopped at 11:47 and hasn\'t moved since'
        ]
      },

      questHooks: [
        'Investigate the disappearing memorial offerings',
        'Help Erasmus organize and protect the town records',
        'Research family histories using memorial plaques',
        'Explore the town hall ruins for valuable documents'
      ],

      relatedThreats: ['agog'],
      relatedEvents: ['strangeNews']
    },

    customsHouse: {
      id: 'customsHouse',
      name: 'Harbor Customs House',
      settlement: 'millhaven',
      type: 'Government Building',
      description: 'A weathered stone building near the docks that once processed the paperwork for Millhaven\'s bustling maritime trade. Now barely functional with a skeleton crew, it primarily serves to document the few ships that still visit and the increasingly strange cargo they carry.',
      publicDescription: 'Barely functioning customs office for harbor trade',

      layout: {
        areas: [
          {
            name: 'Main Office',
            description: 'Counter area for processing ship manifests and cargo declarations',
            features: ['Wooden counter with scales', 'Filing cabinets', 'Customs stamp collection', 'Port authority charts']
          },
          {
            name: 'Records Room',
            description: 'Storage for shipping manifests and trade documents',
            features: ['Floor-to-ceiling filing', 'Locked document safe', 'Map table', 'Seal and stamp storage']
          },
          {
            name: 'Inspection Area',
            description: 'Where suspicious cargo is examined',
            features: ['Examination tables', 'Weighing scales', 'Sample containers', 'Confiscated goods storage']
          }
        ]
      },

      npcs: ['customsClerk'],

      secrets: {
        gmNotes: 'Recent manifests show increasing shipments of mysterious biological specimens. The clerk has been paid to look the other way on certain cargo.',
        hiddenItems: [
          {
            item: 'Suspicious Manifests',
            location: 'Records room, locked safe (Thieves\' Tools DC 15)',
            description: 'Shipping documents for black parasite exports and other strange biological materials'
          },
          {
            item: 'Bribe Money',
            location: 'Main office, hidden in scales mechanism (Investigation DC 14)',
            description: '125 gold pieces paid to ignore certain cargo shipments'
          }
        ],
        observations: [
          'Clerk becomes nervous when asked about certain ships',
          'Some cargo manifests are deliberately vague',
          'Recent inspections have been suspiciously brief',
          'Strange smells linger in the inspection area'
        ]
      },

      questHooks: [
        'Investigation into suspicious shipping manifests',
        'Customs clerk requests protection from unknown threats',
        'Tracking illegal cargo exports'
      ],

      relatedThreats: ['corruptedWhales', 'agog'],
      relatedEvents: ['strangeNews']
    },

    fishMarket: {
      id: 'fishMarket',
      name: 'Harbor Fish Market',
      settlement: 'millhaven',
      type: 'Market & Trading Post',
      description: 'A small covered market area near the docks where the daily catch is sold. Business has declined dramatically as the fish have become increasingly strange and unappetizing. Most stalls now stand empty, with only a few hardy vendors still attempting to sell their questionable wares.',
      publicDescription: 'Small fish market with increasingly strange catches',

      layout: {
        areas: [
          {
            name: 'Market Stalls',
            description: 'Covered stone stalls for fish vendors',
            features: ['8 vendor stalls (3 active)', 'Stone cutting tables', 'Ice storage (empty)', 'Waste disposal']
          },
          {
            name: 'Storage Area',
            description: 'Cool storage for unsold fish',
            features: ['Stone cooling chambers', 'Salt barrels', 'Wooden fish boxes', 'Cleaning equipment']
          }
        ]
      },

      npcs: ['fishMonger', 'oldWhaler'],

      inventory: {
        food: [
          { item: 'Fresh Fish (normal)', price: '3 cp per lb', description: 'Increasingly rare normal fish' },
          { item: 'Strange Fish', price: '1 cp per lb', description: 'Fish with unusual features, metallic taste' },
          { item: 'Dried Fish', price: '2 cp per lb', description: 'Preserved fish from better catches' },
          { item: 'Fish Oil', price: '5 cp per bottle', description: 'Cooking oil rendered from fish' }
        ]
      },

      secrets: {
        gmNotes: 'Some fish display obvious mutations. Brenda refuses to sell the worst specimens. Strange fish sometimes move after being killed.',
        hiddenItems: [
          {
            item: 'Rejected Fish Samples',
            location: 'Storage area, hidden in salt barrels (Investigation DC 12)',
            description: 'Preserved specimens of the most mutated fish, too dangerous to sell'
          }
        ],
        observations: [
          'Fish quality has declined dramatically over recent months',
          'Some fish have unusual colors, extra fins, or strange eyes',
          'Customers increasingly refuse to buy certain catches',
          'Cats and seabirds won\'t eat some of the fish'
        ]
      },

      questHooks: [
        'Investigate the source of fish mutations',
        'Help Brenda dispose of dangerous specimens',
        'Research the timeline of fish quality decline'
      ],

      relatedThreats: ['corruptedWhales', 'agog'],
      relatedEvents: ['whalingWitness', 'strangeNews']
    },

    harbormasterOffice: {
      id: 'harbormasterOffice',
      name: 'Harbormaster\'s Administrative Office',
      settlement: 'millhaven',
      type: 'Maritime Administration',
      description: 'A separate administrative building from the lighthouse tower, housing the bureaucratic functions of port management. Contains records of ship arrivals, departures, and the increasingly troubling reports of vessels that never return.',
      publicDescription: 'Administrative office for harbor management and ship records',

      layout: {
        areas: [
          {
            name: 'Main Office',
            description: 'Captain Saltwater\'s workspace with maritime charts and schedules',
            features: ['Large desk with charts', 'Ship schedule board', 'Communication equipment', 'Port authority flag']
          },
          {
            name: 'Records Archive',
            description: 'Files of ship manifests, crew rosters, and incident reports',
            features: ['Filing cabinets', 'Ship registration books', 'Incident report files', 'Historical records']
          },
          {
            name: 'Meeting Room',
            description: 'Space for meetings with ship captains and port officials',
            features: ['Conference table', 'Harbor maps on walls', 'Chairs for visitors', 'Coffee service']
          }
        ]
      },

      npcs: ['dockMaster'],

      secrets: {
        gmNotes: 'Captain Saltwater maintains detailed records of missing ships and suspicious activities. Recent patterns show increasing disappearances in specific areas.',
        hiddenItems: [
          {
            item: 'Missing Vessel Reports',
            location: 'Records archive, locked filing cabinet (Thieves\' Tools DC 13)',
            description: 'Detailed reports on ships that never returned, showing disturbing patterns'
          },
          {
            item: 'Harbor Defense Plans',
            location: 'Main office, hidden compartment in desk (Investigation DC 15)',
            description: 'Emergency plans for harbor defense, including signal protocols and weapon locations'
          }
        ],
        observations: [
          'Captain Saltwater is increasingly worried about ship safety',
          'Recent reports show unusual concentrations of missing vessels',
          'Some ships return with reduced crews and no explanation',
          'Captains increasingly reluctant to venture into deep water'
        ]
      },

      questHooks: [
        'Investigate patterns in missing ship reports',
        'Help develop better harbor security measures',
        'Escort or investigate overdue vessels'
      ],

      relatedThreats: ['agog'],
      relatedEvents: ['strangeNews']
    },

    // Millhaven Locations
    harborTower: {
      id: 'harborTower',
      name: 'Harbor Master\'s Tower',
      settlement: 'millhaven',
      type: 'Lighthouse & Administrative Building',
      description: 'A tall stone lighthouse that serves as both a beacon for ships and the harbor master\'s residence. The tower offers commanding views of the entire bay and is one of the few structures in Millhaven that remains fully operational.',
      publicDescription: 'still functional lighthouse, manned by a reclusive keeper',

      layout: {
        groups: [
          {
            title: 'Floors',
            type: 'primary',
            items: [
              {
                name: 'Ground Floor',
                description: 'Harbor master\'s office with charts, logs, and maritime equipment',
                features: ['Large nautical charts on walls', 'Ship manifests and logs', 'Emergency supplies', 'Communication equipment']
              },
              {
                name: 'second Floor',
                description: 'silas\'s living quarters - simple but well-maintained',
                features: ['Bed and personal belongings', 'Small kitchen', 'Telescope by window', 'Personal journal (hidden)']
              },
              {
                name: 'Lighthouse Top',
                description: 'The lighthouse beacon and observation area',
                features: ['Powerful lighthouse beacon', '360-degree view of bay', 'Weather monitoring equipment', 'Emergency signal flags']
              }
            ]
          }
        ]
      },

      npcs: ['harborMaster'],

      secrets: {
        gmNotes: 'silas keeps detailed logs of strange sightings in the bay, hidden in a secret compartment',
        hiddenItems: [
          {
            item: 'strange Sightings Journal',
            location: 'second floor, hidden compartment behind bed (Investigation DC 15)',
            description: 'Contains detailed accounts of tentacled creatures, strange lights, and missing ships'
          },
          {
            item: 'Emergency Cache',
            location: 'Ground floor, concealed panel (Perception DC 12)',
            description: 'Contains emergency supplies, flares, and a loaded crossbow'
          }
        ],
        secretDoors: [],
        traps: [],
        observations: [
          'silas watches the bay obsessively, especially at night',
          'The lighthouse beacon sometimes flickers in patterns (warning signals)',
          'Charts show marked areas where ships have disappeared'
        ]
      },

      questHooks: [
        'silas requests help investigating strange bay phenomena',
        'Players need lighthouse access to signal ships or survey the area',
        'Hidden journal reveals pattern in disappearances'
      ],

      relatedThreats: ['agog'],
      relatedEvents: ['strangeNews']
    },

    templeOfTheTides: {
      id: 'templeOfTheTides',
      name: 'Temple of the Tides Cathedral',
      settlement: 'millhaven',
      type: 'Gothic Cathedral',
      description: 'A imposing Gothic cathedral dedicated to maritime traditions, traditionally devoted to Thessa, Astraea, and Kullah. The church features disturbing maritime carvings that seem to move in peripheral vision, and the congregation has been dwindling as madness spreads through Millhaven.',
      publicDescription: 'Gothic cathedral with disturbing maritime carvings',

      layout: {
        areas: [
          {
            name: 'Main Nave',
            description: 'Long hall with wooden pews and stained glass windows depicting sea scenes',
            features: ['Altar with ship\'s wheel', 'Disturbing maritime carvings', 'Stained glass showing whaling scenes', 'Collection box (mostly empty)']
          },
          {
            name: 'Confessional Booths',
            description: 'several confession booths where parishioners share impossible tales',
            features: ['Three confession booths', 'Worn kneelers', 'Speaking grilles', 'Privacy curtains']
          },
          {
            name: 'Priest\'s Quarters',
            description: 'Father Blackwater\'s private chambers behind the altar',
            features: ['Simple bed and desk', 'Religious texts', 'Personal journal', 'Prayer supplies']
          },
          {
            name: 'Bell Tower',
            description: 'Tower with church bells, accessible via narrow stairs',
            features: ['Large bronze bells', 'Rope pull mechanism', 'View of harbor', 'Bird nests']
          }
        ]
      },

      npcs: ['priestTide'],

      secrets: {
        gmNotes: 'The maritime carvings are slowly changing, becoming more disturbing. Father Blackwater keeps records of confessions revealing impossible events.',
        hiddenItems: [
          {
            item: 'Confession Records',
            location: 'Priest\'s quarters, locked drawer (Thieves\' Tools DC 13)',
            description: 'Detailed notes on parishioners\' confessions of underwater visions and transformations'
          },
          {
            item: 'Church Funds',
            location: 'Behind altar, hidden compartment (Religion DC 15)',
            description: '125 gold pieces in donations, kept for church maintenance'
          }
        ],
        secretDoors: [],
        traps: [],
        observations: [
          'Maritime carvings seem to shift when not directly observed',
          'Confessions reveal disturbing patterns of shared nightmares',
          'Attendance has dropped dramatically in recent months',
          'Father Blackwater shows signs of stress and sleep deprivation'
        ]
      },

      questHooks: [
        'Father Blackwater seeks help understanding his parishioners\' strange confessions',
        'Investigation into the changing carvings',
        'Blessing or consecration services for supernatural threats'
      ],

      relatedThreats: ['agog'],
      relatedEvents: ['strangeNews']
    },

    prosperityRow: {
      id: 'prosperityRow',
      name: 'Prosperity Row',
      settlement: 'millhaven',
      type: 'Abandoned Mansion District',
      description: 'Once the most prestigious street in Scrimshaw Bay, Prosperity Row stretches along the hillside overlooking the harbor. Grand Victorian mansions built by whaling captains and processing magnates now stand in various states of decay. Overgrown gardens conceal ornate fountains, while broken windows stare down like empty eyes. Some mansions show signs of recent habitation by desperate squatters or eccentric recluses who\'ve made pacts to sustain themselves in their former glory.',
      publicDescription: 'street of abandoned whaling captain mansions',

      layout: {
        groups: [
          {
            title: 'Mansions',
            type: 'primary',
            items: [
              {
                name: 'Grimwald Manor',
                description: 'A partially maintained mansion with commanding views',
                fields: {
                  owner: 'Former Captain Josiah Grimwald (deceased)',
                  condition: 'Partially maintained',
                  currentResident: 'Eccentric widow, Lady Cordelia Grimwald, who claims to speak with her dead husband'
                },
                features: ['Widow\'s walk with harbor view', 'Portrait gallery of sea captains', 'Basement wine cellar', 'Overgrown hedge maze']
              },
              {
                name: 'Blackthorne Estate',
                description: 'A once-grand estate now falling into disrepair',
                fields: {
                  owner: 'Former Captain Silas Blackthorne',
                  condition: 'structurally unsound',
                  currentResident: 'squatter family with sick children'
                },
                features: ['Grand staircase (partially collapsed)', 'Ballroom with water damage', 'Servant quarters', 'Carriage house']
              },
              {
                name: 'Leviathan House',
                description: 'A mysteriously well-preserved mansion with dark secrets',
                fields: {
                  owner: 'Lord Aldric Blackwater',
                  condition: 'Well preserved (suspiciously so)',
                  currentResident: 'Ageless gentleman who never emerges during daylight'
                },
                features: ['Library of maritime lore', 'Scrimshaw collection room', 'Secret passages', 'Underground tunnels to harbor']
              },
              {
                name: 'Meridian Mansion',
                description: 'An abandoned mansion with strange nocturnal activity',
                fields: {
                  owner: 'Former Captain Aldus Meridian',
                  condition: 'Completely abandoned',
                  currentResident: 'None (but strange lights reported at night)'
                },
                features: ['Astronomical observatory', 'Map room with sea charts', 'Hidden vault', 'Haunted master bedroom']
              },
              {
                name: 'Mooncrest Villa',
                description: 'A villa overrun by unnatural plant growth',
                fields: {
                  owner: 'Former Shipping Heiress Adelaide Mooncrest',
                  condition: 'Gardens overtaken by carnivorous plants',
                  currentResident: 'Hermit botanist studying the mutations'
                },
                features: ['Greenhouse complex', 'Formal gardens (now wild)', 'Conservatory', 'Plant nursery (corrupted)']
              }
            ]
          }
        ]
      },

      npcs: ['eccentricRecluse', 'squatterFamily', 'corruptedNoble', 'hermitBotanist'],

      secrets: {
        gmNotes: 'Each mansion holds different secrets and potential allies/enemies. The preserved mansion hides a vampire-like figure with Agog connections. Meridian Mansion contains ghost encounters and hidden treasure. The gardens contain mutated carnivorous plants influenced by bay corruption.',
        hiddenItems: [
          {
            item: 'Captain\'s Sea Chest',
            location: 'Meridian Mansion hidden vault (Investigation DC 18)',
            description: 'Contains 250 gold pieces, navigation instruments worth 150 gp, and a logbook describing encounters with "The Deep Ones"'
          },
          {
            item: 'Whaling Fortune Cache',
            location: 'Grimwald Manor basement (behind false wine rack, Perception DC 15)',
            description: 'Emergency fund of 400 gold pieces and jewelry worth 200 gp'
          },
          {
            item: 'Agog Corruption Evidence',
            location: 'Leviathan House secret passages (Religion DC 16 to understand)',
            description: 'Ritual chambers with tentacle symbols and preserved specimens showing transformation stages'
          },
          {
            item: 'Astronomical Records',
            location: 'Meridian Mansion observatory (Arcana DC 14)',
            description: 'star charts showing celestial events that correspond to increased supernatural activity in the bay'
          },
          {
            item: 'Botanical Research Notes',
            location: 'Mooncrest Villa greenhouse (Nature DC 13)',
            description: 'Detailed studies of plant mutations caused by bay corruption, including potential cures and applications'
          }
        ],
        secretDoors: [
          'Leviathan House: Secret passage to harbor tunnels (behind bookshelf, Investigation DC 16)',
          'Grimwald Manor: Hidden room behind portrait (family secret, Investigation DC 14)',
          'Blackthorne Estate: Servant\'s escape tunnel (in pantry, Perception DC 12)'
        ],
        traps: [
          'Mooncrest Villa: Carnivorous plants in greenhouse (Perception DC 15, Nature DC 13 to safely navigate)',
          'Meridian Mansion: Collapsing floor in master bedroom (Investigation DC 12 to detect weak boards)',
          'Blackthorne Estate: Rotten stairs (Acrobatics DC 13 or fall through, taking 1d6 damage)'
        ],
        observations: [
          'Leviathan House shows no signs of age despite being abandoned for decades',
          'strange lights move through Meridian Mansion on moonless nights',
          'Plants in Mooncrest Villa gardens sometimes move without wind',
          'servants\' gossip reveals several mansion owners lived far longer than natural',
          'Underground tunnels connect several mansions to the harbor district'
        ]
      },

      questHooks: [
        'Investigate reports of lights and sounds from supposedly empty mansions',
        'Help the squatter family in Blackthorne Estate find proper housing',
        'Research the botanical mutations in Mooncrest Villa for potential remedies',
        'Discover what happened to the missing mansion owners',
        'Explore the tunnel network connecting mansions to the harbor',
        'Confront the ageless resident of Leviathan House about his supernatural nature',
        'Investigate astronomical records for patterns in supernatural events'
      ],

      relatedThreats: ['agog'],
      relatedEvents: ['strangeNews']
    },

    boneYards: {
      id: 'boneYards',
      name: 'The Bone Yards',
      settlement: 'millhaven',
      type: 'Abandoned Whale Processing Complex',
      description: 'A massive industrial complex of interconnected buildings where whales were once processed into oil, bone products, and other valuable materials. The facility stretches along the waterfront like a series of Gothic cathedrals dedicated to maritime industry. Enormous rusted tryworks (oil rendering cauldrons) stand empty, their smokestacks reaching toward the sky. Bone cutting stations with massive saws sit silent, while storage warehouses contain the ghostly remnants of the whaling era. The entire complex reeks of old oil, decay, and something far worse that has taken residence in the abandoned whale oil tanks.',
      publicDescription: 'Whale processing facilities, now rusted monuments',

      layout: {
        groups: [
          {
            title: 'Buildings',
            type: 'primary',
            items: [
              {
                name: 'Main Processing Hall',
                description: 'Cavernous building with whale hoisting equipment and flensing stations',
                features: ['Massive winches and pulleys', 'Whale cutting platforms', 'Drainage channels (now stagnant)', 'Tool storage areas'],
                hazards: ['Unstable floor grates', 'Sharp rusty tools', 'Slippery surfaces']
              },
              {
                name: 'The Tryworks',
                description: 'Building housing enormous cauldrons for rendering whale blubber into oil',
                features: ['Six massive iron cauldrons', 'Furnace systems', 'Oil collection channels', 'Smokestacks'],
                hazards: ['Toxic fumes from old oil', 'Unstable catwalk systems', 'Furnace collapse risk']
              },
              {
                name: 'Bone Workshop',
                description: 'Facility for cutting and processing whale bones into corset stays, tools, and scrimshaw blanks',
                features: ['Bone cutting saws', 'Grinding wheels', 'Drying racks', 'Finished goods storage'],
                hazards: ['Sharp bone fragments', 'Unstable equipment', 'Bone dust inhalation']
              },
              {
                name: 'Oil Storage Warehouse',
                description: 'Massive warehouse with rows of whale oil storage tanks',
                features: ['100+ oil storage barrels', 'Loading equipment', 'Quality testing station', 'Shipping manifests'],
                hazards: ['Toxic vapors', 'Flammable residue', 'Corrupted oil transformations']
              },
              {
                name: 'spermaceti Chamber',
                description: 'Climate-controlled room for processing the valuable spermaceti from sperm whale heads',
                features: ['Cooling systems', 'Separation equipment', 'Purity testing area', 'Luxury storage vaults'],
                hazards: ['Chemical contamination', 'Preserved specimens', 'Strange crystalline formations']
              },
              {
                name: 'Administrative Offices',
                description: 'Multi-story building housing management offices, records, and worker facilities',
                features: ['Company records', 'Worker timesheets', 'Financial ledgers', 'Maps and shipping routes'],
                hazards: ['Structural instability', 'Mold and rot', 'Collapsed sections']
              }
            ]
          },
          {
            title: 'Underground Areas',
            type: 'secondary',
            items: [
              {
                name: 'steam Tunnels',
                description: 'steam tunnels connect all buildings for heating and power distribution'
              },
              {
                name: 'storage Vaults',
                description: 'Underground storage vaults for the most valuable products'
              },
              {
                name: 'Drainage System',
                description: 'Complex drainage system leads to harbor outflow pipes',
                hazards: ['Flooding during high tide', 'Toxic gas accumulation', 'Creature lairs']
              }
            ]
          }
        ]
      },

      npcs: [],

      inventory: {
        valuable_items: [
          { item: 'Antique Whaling Tools', location: 'Processing Hall tool storage', value: '50-200 gp per set', description: 'Well-crafted harpoons, flensing knives, and specialized equipment' },
          { item: 'Whale Bone Stock', location: 'Bone Workshop storage', value: '10-50 gp per piece', description: 'Raw whale bone suitable for carving or tool making' },
          { item: 'Quality Scrimshaw Blanks', location: 'Bone Workshop finishing area', value: '25-100 gp each', description: 'Prepared whale teeth and bone for scrimshaw art' },
          { item: 'spermaceti Reserves', location: 'spermaceti Chamber vaults', value: '100-500 gp per container', description: 'Preserved high-quality spermaceti, still valuable to perfumers' }
        ],
        corrupted_substances: [
          { item: 'Transformed Whale Oil', location: 'Oil Storage tanks', danger: 'High', description: 'Oil has become a dark, writhing substance that may be sentient' },
          { item: 'Crystallized Corruption', location: 'spermaceti Chamber', danger: 'Extreme', description: 'strange crystals formed from corrupted spermaceti, emanate psychic energy' },
          { item: 'Bone Dust Residue', location: 'Bone Workshop air vents', danger: 'Medium', description: 'Inhalation causes temporary transformation effects' }
        ]
      },

      secrets: {
        gmNotes: 'The whale oil tanks contain a collective consciousness formed from corrupted oil that may serve as a lesser avatar of Agog. The underground tunnels are home to transformed workers who couldn\'t escape when the corruption began. Company records reveal the true timeline of when the whales began showing signs of corruption - decades before the economic collapse.',
        hiddenItems: [
          {
            item: 'Master Production Records',
            location: 'Administrative offices, manager\'s vault (Thieves\' Tools DC 16)',
            description: 'Complete records showing decline in whale quality and first reports of "diseased" catches dating back 40 years'
          },
          {
            item: 'Emergency Company Funds',
            location: 'Administrative offices, hidden floor safe (Investigation DC 17)',
            description: '800 gold pieces intended for final worker payments, plus company seal and contracts'
          },
          {
            item: 'Experimental Corruption Samples',
            location: 'spermaceti Chamber, refrigerated vault (Arcana DC 15 to understand)',
            description: 'Preserved specimens showing progression of corruption in whale products'
          },
          {
            item: 'Workers\' Personal Effects',
            location: 'Underground tunnels, makeshift camps (Perception DC 13)',
            description: 'Belongings of workers who hid underground, including diaries describing transformation'
          },
          {
            item: 'Quality Control Equipment',
            location: 'Oil Storage, testing station (Investigation DC 12)',
            description: 'Alchemical equipment worth 300 gp, still functional for analyzing substances'
          }
        ],
        secretDoors: [
          'Oil Storage: Hidden passage to underground vaults (behind false tank panel, Investigation DC 15)',
          'Administrative offices: Manager\'s escape route to docks (behind filing cabinet, Perception DC 14)',
          'spermaceti Chamber: Emergency exit to steam tunnels (concealed floor hatch, Investigation DC 16)'
        ],
        traps: [
          'Oil Storage: Toxic vapor pockets (Constitution save DC 15 or poisoned condition)',
          'Tryworks: Unstable catwalk collapse (Dexterity save DC 14 or fall 20 feet)',
          'Underground: Flooding chambers during high tide (Athletics DC 13 to escape)',
          'Bone Workshop: Spinning blade trap (Investigation DC 15 to detect, Thieves\' Tools DC 16 to disarm)'
        ],
        observations: [
          'The whale oil in storage tanks moves and writhes as if alive',
          'strange sounds echo from the underground tunnel system',
          'Workers\' tools are arranged as if someone was just using them',
          'Company records show profits continued despite reported whale scarcity',
          'some storage areas show signs of recent habitation',
          'Corruption crystals pulse with faint light in rhythm with ocean tides'
        ]
      },

      inhabitants: [
        'Transformed workers living in the underground tunnels',
        'Oil collective consciousness in the storage tanks',
        'scavengers searching for valuable materials',
        'Corrupted rats and seabirds that feed on the residue'
      ],

      questHooks: [
        'Investigate the sentient whale oil and its connection to Agog',
        'Rescue or put to rest the transformed workers in the tunnels',
        'Recover valuable whaling equipment and materials for trade',
        'Research company records to understand the timeline of corruption',
        'safely extract and study corruption samples for potential remedies',
        'Clear the facility of dangers to allow possible renovation',
        'Track down what happened to the facility\'s management and workers',
        'Investigate the underground tunnel connections to other parts of town'
      ],

      relatedThreats: ['agog', 'corruptedWhales', 'transformedCitizens'],
      relatedEvents: ['strangeNews']
    },

    // Netherwick Locations
    caughtCod: {
      id: 'caughtCod',
      name: 'The Caught Cod',
      settlement: 'netherwick',
      type: 'Tavern & Scrimshaw Gallery',
      description: 'A weathered tavern that serves as Netherwick\'s social center. The walls are lined with an extensive collection of maritime scrimshaw that has become increasingly disturbing over time. The pieces seem to move in peripheral vision, depicting scenes that shift between beautiful maritime art and horrific underwater nightmares.',
      publicDescription: 'Tavern filled with disturbing maritime scrimshaw',

      layout: {
        groups: [
          {
            title: 'Areas',
            type: 'primary',
            items: [
              {
                name: 'Main Taproom',
                description: 'Common area with tables, bar, and scrimshaw displays',
                features: ['Long wooden bar', 'Tables for 20 patrons', 'Scrimshaw collection on walls', 'Iron stove for warmth']
              },
              {
                name: 'Private Rooms',
                description: 'Three small rooms for rent (rarely used)',
                features: ['Simple beds', 'Washbasins', 'Small windows', 'Lock boxes for valuables']
              },
              {
                name: 'Cellar',
                description: 'storage area for ale barrels and supplies',
                features: ['Ale and spirits storage', 'Food preservation', 'Hidden scrimshaw pieces', 'Stone walls']
              },
              {
                name: 'Marta\'s Quarters',
                description: 'Tavern keeper\'s private living space',
                features: ['Personal belongings', 'Scrimshaw tools', 'Locked chest', 'Window overlooking docks']
              }
            ]
          }
        ]
      },

      npcs: ['tavernKeeper'],

      inventory: {
        drinks: [
          { item: 'Ale', price: '4 cp', quality: 'Poor' },
          { item: 'Rum', price: '2 sp', quality: 'Decent' },
          { item: 'Whiskey', price: '5 sp', quality: 'Good' },
          { item: 'Fish Wine', price: '1 gp', quality: 'Local specialty (questionable)' }
        ],
        food: [
          { item: 'Fish Stew', price: '3 cp', description: 'Made from daily catch (tastes metallic)' },
          { item: 'Bread', price: '1 cp', description: 'Day-old but edible' },
          { item: 'Dried Fish', price: '2 cp', description: 'Preserved catch from better times' }
        ],
        services: [
          { service: 'Room for night', price: '5 sp', description: 'simple accommodation' },
          { service: 'scrimshaw appraisal', price: '1 gp', description: 'Marta evaluates maritime artifacts' }
        ]
      },

      secrets: {
        gmNotes: 'Marta\'s scrimshaw collection is becoming animated. Some pieces show scenes of current events before they happen. The basement contains the most disturbing pieces that she\'s hidden away.',
        hiddenItems: [
          {
            item: 'Prophetic Scrimshaw',
            location: 'Cellar, hidden behind ale barrels (Investigation DC 16)',
            description: 'Three scrimshaw pieces that show disturbing future events involving the party'
          },
          {
            item: 'Tavern Earnings',
            location: 'Marta\'s quarters, locked chest (Thieves\' Tools DC 15)',
            description: '47 gold pieces, silver jewelry worth 25 gp'
          },
          {
            item: 'Family Records',
            location: 'Marta\'s quarters, under floorboard (Perception DC 13)',
            description: 'Genealogy showing Scrimshaw family connection to original whaling fleet captains'
          }
        ],
        secretDoors: [],
        traps: [],
        observations: [
          'scrimshaw pieces appear to move when viewed peripherally',
          'Patrons avoid looking directly at certain pieces',
          'Marta talks to the scrimshaw when she thinks no one is listening',
          'New pieces appear without explanation'
        ]
      },

      questHooks: [
        'Marta offers scrimshaw pieces as payment for services',
        'Investigation into the moving artwork',
        'Prophetic scrimshaw reveals future dangers',
        'Family history research using genealogy records'
      ],

      relatedThreats: ['agog', 'corruptedWhales'],
      relatedEvents: ['whalingWitness', 'strangeNews']
    },

    // Netherwick Background Locations
    communityWell: {
      id: 'communityWell',
      name: 'The Community Well',
      settlement: 'netherwick',
      type: 'Village Infrastructure',
      description: 'The central gathering point of Netherwick, this stone-lined well has served the village for over a century. Lately, the water has taken on a distinctly brackish taste, and residents whisper that it sometimes reflects things that aren\'t there.',
      publicDescription: 'Central gathering spot with increasingly brackish water',
      npcs: ['waterBearer', 'anxiousMother'],
      secrets: {
        gmNotes: 'The well is being contaminated by seepage from the bay. Sometimes shows visions of underwater scenes in its reflection.',
        observations: ['Water tastes increasingly salty', 'Residents gather here for news', 'Young Sara draws water daily', 'Reflections sometimes show underwater scenes']
      },
      questHooks: ['Investigate the contaminated water source', 'Decode the visions in the well\'s reflection']
    },

    marketSpace: {
      id: 'marketSpace',
      name: 'Market Commons',
      settlement: 'netherwick',
      type: 'Trading Area',
      description: 'A small cleared area in the village center where what little trade occurs. Most days it\'s empty except for Old Cobb trying to sell the daily catch, but occasionally trading vessels stop by.',
      publicDescription: 'small area where what little trade occurs',
      npcs: ['fishmonger', 'tradingCaptain'],
      secrets: {
        gmNotes: 'Captain Blackbrine makes suspicious trades here, dealing in parasites and strange specimens from the whaling crews.',
        observations: ['Usually empty market stalls', 'Old Cobb sells fish daily', 'Occasional mysterious trading vessels', 'Transactions happen quietly']
      },
      questHooks: ['Investigate the mysterious trading captain', 'Follow the money trail of strange trades']
    },

    baitHouse: {
      id: 'baitHouse',
      name: 'The Bait House',
      settlement: 'netherwick',
      type: 'Fishing Supply Storage',
      description: 'A weathered wooden building where Jebediah stores fishing supplies and fresh bait. The smell is overwhelming, and lately, some of the bait seems to move on its own.',
      publicDescription: 'storage for fishing supplies and bait',
      npcs: ['baitKeeper'],
      secrets: {
        gmNotes: 'some of the bait is actually small corrupted creatures. Jebediah finds strange things while digging that he doesn\'t understand.',
        observations: ['Overwhelming smell of fish and rot', 'Some bait containers seem to writhe', 'Jebediah finds unusual things while digging', 'His daughter helps sort supplies']
      },
      questHooks: ['Investigate the moving bait', 'Examine strange objects found while digging']
    },

    fishermanShrine: {
      id: 'fishermanShrine',
      name: 'The Fisherman\'s Shrine',
      settlement: 'netherwick',
      type: 'Religious Complex',
      description: 'A weathered stone shrine complex on a small hill overlooking the bay, serving as the spiritual heart of Netherwick. The main shrine honors Thessa with a carved trident and storm motifs, while smaller alcoves hold offerings to Astraea (star charts carved in stone) and Rhyssian (a small pool fed by a hidden spring). A somber memorial area dedicated to Akhetmon contains simple stone markers for those lost at sea, where families leave flowers and personal effects for the drowned.',
      publicDescription: 'Offerings to ensure safe returns',

      layout: {
        groups: [
          {
            title: 'shrine Areas',
            type: 'primary',
            items: [
              {
                name: 'Main Shrine',
                description: 'Central stone altar with carved trident and wave patterns',
                fields: {
                  deity: 'Thessa'
                },
                offerings: ['Fish bones', 'Small coins', 'Carved ship models', 'Storm-worn shells']
              },
              {
                name: 'star Alcove',
                description: 'small alcove with stone star charts and navigation symbols',
                fields: {
                  deity: 'Astraea'
                },
                offerings: ['Polished stones', 'Compass roses drawn in sand', 'Dried flowers arranged in star patterns']
              },
              {
                name: 'spring Pool',
                description: 'Natural spring pool with smooth river stones arranged around the edge',
                fields: {
                  deity: 'Rhyssian'
                },
                offerings: ['Written secrets on parchment (dissolved in water)', 'Small keys', 'Knotted rope']
              },
              {
                name: 'Memorial Area',
                description: 'Quiet corner with simple stone markers and a small purple-misted brazier, adjacent to the village graveyard',
                fields: {
                  deity: 'Akhetmon'
                },
                offerings: ['Personal effects of the lost', 'Dried flowers', 'Small portraits', 'Letters to the dead']
              }
            ]
          },
          {
            title: 'Graveyard',
            type: 'secondary',
            items: [
              {
                name: 'Village Graveyard',
                description: 'small cemetery with weathered headstones overlooking the bay, adjacent to Akhetmon\'s memorial',
                features: ['Weathered stone headstones', 'Iron fence (partially rusted)', 'Older graves from whaling era', 'Recent graves with maritime symbols', 'Path connecting to Akhetmon memorial']
              }
            ]
          }
        ]
      },

      npcs: ['villageElder'],

      secrets: {
        gmNotes: 'Old Thaddeus performs midnight rituals here, combining elements from all four shrines. The spring pool sometimes shows visions of the drowned, and the memorial area is where families first notice if their lost loved ones are truly at peace.',
        hiddenItems: [
          {
            item: 'Ancient Ritual Instructions',
            location: 'Behind Thessa\'s altar (Religion DC 15)',
            description: 'Old stone tablet with maritime protection rituals, some crossed out and replaced with darker rites'
          },
          {
            item: 'Navigation Charts',
            location: 'Astraea\'s alcove, carved into stone (Investigation DC 12)',
            description: 'star charts showing safe passage routes, with recent additions marking dangerous areas'
          },
          {
            item: 'Memorial Records',
            location: 'Akhetmon\'s area, hidden under loose stones (Perception DC 13)',
            description: 'List of names and dates of those lost to the bay, with disturbing notes about "unrestful" spirits and cross-references to disturbed graves'
          },
          {
            item: 'Graveyard Caretaker\'s Notes',
            location: 'Village graveyard, hidden in old mausoleum (Investigation DC 14)',
            description: 'Record of grave disturbances, missing bodies, and strange sounds at night - suggests some of the drowned don\'t stay buried'
          }
        ],
        observations: [
          'The spring pool\'s water tastes pure despite the village well\'s corruption',
          'some memorial markers have been recently disturbed or moved',
          'Old Thaddeus visits at all hours, especially during new moons',
          'star charts show markings that don\'t match current celestial patterns',
          'Families often leave more offerings at Akhetmon\'s memorial than the other shrines',
          'The graveyard has many recent burials, but some graves appear to have been disturbed',
          'Families often hold vigil between the memorial and graveyard during funeral rites'
        ]
      },

      questHooks: [
        'Investigate Old Thaddeus\'s midnight rituals',
        'Decode the disturbing additions to ancient protection rites',
        'Research the increasing number of "unrestful" spirits',
        'Follow the star charts to discover safe vs. dangerous fishing areas',
        'Help families find peace with their lost loved ones',
        'Understand why the spring water remains pure',
        'Investigate the disturbed graves in the village cemetery',
        'Determine why some of the dead seem restless'
      ],

      relatedThreats: ['agog', 'corruptedWhales'],
      relatedEvents: ['strangeNews', 'whalingWitness']
    }
  },

  threats: {
    agog: {
      name: 'Agog, Devil of the Deep',
      type: 'Cosmic Horror - Titanic Aberration',
      description: 'Ancient titanic aberration dwelling in the deepest trenches of the Krivmansk Ocean. Offers warlock pacts to desperate souls and influences the region through psychic whispers and tentacled servants.',
      abilities: ['Tentacle attacks', 'Psychic whispers', 'Warlock patron', 'Regional corruption'],
      influence: ['Dark waters', 'Marine mutation', 'Madness', 'Parasitic infection'],
      stats: 'CR 26 (90,000 XP) - See Agog stat block',
      affectedNpcs: ['bayardScrimm', 'harborMaster', 'villageElder', 'companySupervisor'],
      affectedLocations: ['harborTower', 'scrimmholmeManor', 'fishermanShrine', 'canalLocks'],
      affectedSettlements: ['millhaven', 'netherwick', 'ashford', 'thornwick', 'fenway'],
      relatedEvents: ['whalingWitness', 'strangeNews', 'lordInvitation'],
      relatedThreats: ['corruptedWhales', 'transformedCitizens'],
      corruptionLevel: 'Extreme - Primary source of all regional corruption'
    },
    bayard: {
      name: 'Lord Bayard Scrimm',
      type: 'Corrupted Aristocrat - Cosmic Horror',
      description: 'Ancient aristocrat who has ruled Thornwick Isle for far longer than any mortal should. His body writhes with Agog\'s tentacled flesh, and he emerges only at night to feed on the living. Sustained by his pact with the Devil of the Deep.',
      abilities: ['Vampire-like longevity', 'Night vision', 'Tentacled attacks', 'Command over sea creatures', 'Feeding on the living'],
      influence: ['Controls Thornwick Isle', 'Commands corrupted servants', 'Spreads Agog\'s corruption', 'Feeds during nighttime raids'],
      stats: 'Use Vampire Lord stats with tentacled modifications - CR 15 (13,000 XP)',
      affectedNpcs: ['groundskeeper', 'boatman'],
      affectedLocations: ['scrimmholmeManor', 'privateDocks', 'observatory', 'villageBelow'],
      affectedSettlements: ['thornwick'],
      relatedEvents: ['lordInvitation'],
      relatedThreats: ['agog'],
      corruptionLevel: 'High - Direct servant of Agog with regional influence'
    },
    corruptedWhales: {
      name: 'Corrupted Whaling Operations',
      type: 'Body Horror - Environmental Threat',
      description: 'Diseased whales infected with black parasites that are harvested and sold to unknown buyers. The parasites gradually transform humanoids into fish-like creatures (Kuo-toa).',
      process: ['Harvest black parasites in jars', 'Lance growths for ichor', 'Export parasites to buyers', 'Crews slowly transform'],
      effects: ['Physical transformation', 'Mental corruption', 'Loss of humanity', 'Aquatic adaptation'],
      timeline: 'Transformation takes 2-6 months depending on exposure',
      affectedNpcs: ['netsMender', 'tavernKeeper', 'villageElder'],
      affectedLocations: ['boneYards', 'caughtCod', 'fishermanShrine'],
      affectedSettlements: ['millhaven', 'netherwick'],
      relatedEvents: ['whalingWitness', 'strangeNews'],
      relatedThreats: ['agog', 'transformedCitizens'],
      corruptionLevel: 'High - Direct vector for Agog\'s influence'
    },
    transformedCitizens: {
      name: 'Fish-Folk Transformation',
      type: 'Body Horror - Social Threat',
      description: 'Citizens infected by black parasites gradually transform into Kuo-toa. Early stages show webbed fingers and scales, while advanced cases become fully aquatic.',
      stages: [
        'stage 1: Webbed fingers, minor scales',
        'stage 2: Gills develop, speech changes',
        'stage 3: Full aquatic adaptation',
        'stage 4: Complete Kuo-toa transformation'
      ],
      gameStats: 'Use Kuo-toa stat blocks for fully transformed individuals',
      affectedNpcs: ['netsMender', 'maintenanceWorker', 'groundskeeper', 'boatman'],
      affectedLocations: ['netSheds', 'ashfordSawmill', 'villageBelow', 'privateDocks'],
      affectedSettlements: ['netherwick', 'ashford', 'thornwick'],
      relatedEvents: ['strangeNews', 'whalingWitness'],
      relatedThreats: ['agog', 'corruptedWhales'],
      corruptionLevel: 'Medium - Secondary effect of parasitic exposure'
    },
    ironwoodCorruption: {
      name: 'Rotting Ironwood',
      type: 'Environmental Horror - Industrial Threat',
      description: 'The legendary ironwood timber has begun rotting despite its natural durability, infected by something seeping from the bay waters.',
      effects: ['Structural failures', 'Economic collapse', 'Strange symbols appearing', 'Machinery malfunction'],
      timeline: 'Corruption spreads over months, accelerating near water',
      affectedNpcs: ['companySupervisor', 'storeClerk', 'maintenanceWorker'],
      affectedLocations: ['ashfordSawmill', 'lumberYards', 'companyStore'],
      affectedSettlements: ['ashford'],
      relatedEvents: ['strangeNews'],
      relatedThreats: ['agog'],
      corruptionLevel: 'Medium - Localized but economically devastating'
    },
    bogCorruption: {
      name: 'Poisoned Wetlands',
      type: 'Environmental Horror - Planar Threat',
      description: 'The bog waters have been poisoned by ancient entities, creating dangerous wetlands that lead travelers astray and harbor unnatural creatures.',
      effects: ['Travelers disappear', 'Strange lights', 'Phosphorescent growth', 'Reality distortion'],
      timeline: 'Ongoing corruption, worsening during certain moon phases',
      affectedNpcs: ['canalKeeper', 'bogGuide', 'innKeeper'],
      affectedLocations: ['canalLocks', 'bogRoad', 'fenwayInn'],
      affectedSettlements: ['fenway'],
      relatedEvents: ['strangeNews'],
      relatedThreats: ['agog'],
      corruptionLevel: 'Medium - Isolated but expanding'
    },
    bogCreatures: {
      name: 'Bog Creatures',
      type: 'Environmental Threat - Natural Hazards',
      description: 'The Boglands are home to dangerous amphibious creatures including Bogskaldr, occasional Marsh Giants, and elusive Marshwalker Elves. While not directly corrupted by Agog, they make bog travel extremely perilous.',
      creatures: [
        {
          name: 'Bogskaldr',
          cr: '3 (700 XP)',
          description: 'Large amphibious monstrosities with plant symbiosis, excellent at ambush tactics',
          abilities: ['Plant Camouflage', 'Symbiotic Respiration', 'Ambush attacks', 'Swampy Retaliation']
        },
        {
          name: 'Marsh Giant',
          cr: '6 (2,300 XP)',
          description: 'Huge giants with symbiotic marsh plant skin, nearly invisible when motionless',
          abilities: ['Symbiotic Skin Camouflage', 'Grasping Weeds', 'Marshland Retribution', 'Hold Breath 1 hour']
        },
        {
          name: 'Marshwalker Elf Archer',
          cr: '4 (1,100 XP)',
          description: 'Elusive elven archers adapted to wetland life with druidic magic',
          abilities: ['Marshland Stride', 'Heightened Senses', 'Lean Back Shot', 'Instinctive Aim']
        },
        {
          name: 'Marshwalker Elf Caster',
          cr: '5 (1,800 XP)',
          description: 'Elven druids with acid magic and marsh adaptation',
          abilities: ['Druid Spellcasting', 'Acid Arrow', 'Marshland Retaliation', 'Marshland Stride']
        }
      ],
      encounter_notes: [
        'Bogskaldr often hunt in pairs, using ambush tactics from murky water',
        'Marsh Giants are solitary and territorial, but not inherently hostile',
        'Marshwalker Elves are rarely seen and may aid or hinder travelers based on their intentions',
        'All bog creatures have advantage in their native wetland environment'
      ],
      affectedNpcs: ['bogGuide', 'canalKeeper', 'innKeeper'],
      affectedLocations: ['canalLocks', 'bogRoad', 'portageStation'],
      affectedSettlements: ['fenway'],
      relatedEvents: ['bogTravel', 'strangeNews'],
      relatedThreats: ['bogCorruption'],
      corruptionLevel: 'Low - Natural hazards rather than supernatural corruption'
    }
  },

  events: {
    harborIncident: {
      name: 'Strange Harbor Incident',
      description: 'A ship arrives in Millhaven harbor with its crew acting strangely - some show early signs of transformation, others speak in unknown tongues, and their cargo contains disturbing specimens.',
      trigger: 'Players are in Millhaven when a corrupted vessel arrives',
      outcomes: ['Investigation of the ship and crew', 'Discovery of corruption process', 'Confrontation with transformed sailors'],
      hooks: [
        'What happened to this crew during their voyage?',
        'How far has the transformation progressed?',
        'Who was expecting this cargo?'
      ],
      relatedNpcs: ['dockMaster', 'customsClerk', 'harborMaster', 'nightWatchman'],
      relatedLocations: ['harbormasterOffice', 'customsHouse', 'harborTower'],
      relatedThreats: ['corruptedWhales', 'transformedCitizens', 'agog']
    },

    prosperityRowHaunting: {
      name: 'Disturbances on Prosperity Row',
      description: 'Multiple residents of the mansion district report supernatural activity - moving shadows, ghostly voices, and belongings mysteriously rearranging themselves. Some claim to see the spirits of former whaling captains.',
      trigger: 'Players investigate reports of supernatural activity or stay overnight in the district',
      outcomes: ['Encounters with restless spirits', 'Discovery of mansion family secrets', 'Resolution of unfinished business'],
      hooks: [
        'Why are the spirits of whaling captains restless?',
        'What unfinished business keeps them tied to the material world?',
        'Are these actually ghosts or something more sinister?'
      ],
      relatedNpcs: ['eccentricRecluse', 'corruptedNoble'],
      relatedLocations: ['prosperityRow'],
      relatedThreats: ['agog']
    },

    churchCrisis: {
      name: 'Crisis of Faith at the Cathedral',
      description: 'Father Blackwater\'s congregation is dwindling as more parishioners succumb to madness or transformation. The maritime carvings in the church are becoming increasingly disturbing, and the priest himself begins to question his faith.',
      trigger: 'Players attend services or seek help from the church',
      outcomes: ['Spiritual counseling sessions with troubled parishioners', 'Investigation of changing church carvings', 'Supporting or challenging Father Blackwater\'s faith'],
      hooks: [
        'Can Father Blackwater\'s faith withstand the corruption around him?',
        'What is causing the church carvings to change?',
        'How can the remaining faithful be protected?'
      ],
      relatedNpcs: ['priestTide', 'graveDigger'],
      relatedLocations: ['templeOfTheTides'],
      relatedThreats: ['agog', 'transformedCitizens']
    },

    economicDesperation: {
      name: 'Desperate Measures',
      description: 'As conditions worsen, some residents of Millhaven consider increasingly desperate options - accepting help from Lord Blackwater, selling dangerous items to Cornelius Strangewares, or even leaving offerings for Agog in hopes of relief.',
      trigger: 'Economic pressure reaches critical point or players witness desperate actions',
      outcomes: ['Moral dilemmas about accepting corrupt help', 'Intervention to prevent dangerous pacts', 'Economic solutions to reduce desperation'],
      hooks: [
        'How far will desperate people go to survive?',
        'Can alternative solutions be found before people make dangerous pacts?',
        'What price are the corrupt powers demanding?'
      ],
      relatedNpcs: ['desperateWidow', 'corruptedNoble', 'specialtyMerchant'],
      relatedLocations: ['renderedCrown', 'townSquare'],
      relatedThreats: ['agog']
    },
    whalingWitness: {
      name: 'Witnessing Corrupted Whaling',
      description: 'Players observe a whaling operation where crews harvest black parasites from diseased whales and collect ichor from strange growths.',
      trigger: 'Traveling by sea or investigating fishing activities',
      outcomes: ['Horror at the process', 'Investigation of buyers', 'Confrontation with crews'],
      hooks: ['Who buys these parasites?', 'Why are the whales diseased?', 'What happened to missing crew members?'],
      relatedNpcs: ['netsMender', 'tavernKeeper', 'villageElder'],
      relatedLocations: ['weatheredDocks', 'caughtCod'],
      relatedThreats: ['agog', 'corruptedWhales', 'transformedCitizens']
    },
    strangeNews: {
      name: 'Reports of Missing Persons',
      description: 'Multiple settlements report citizens vanishing, with some later found transformed or speaking in unknown tongues.',
      trigger: 'speaking with locals in any settlement',
      outcomes: ['Investigation requests', 'Family pleas for help', 'Reward offers'],
      hooks: ['Pattern in disappearances', 'Connection to whaling', 'Underwater discoveries'],
      relatedNpcs: ['harborMaster', 'priestTide', 'innKeeper', 'companySupervisor'],
      relatedLocations: ['harborTower', 'templeOfTheTides', 'fenwayInn', 'supervisorMansion'],
      relatedThreats: ['agog', 'transformedCitizens', 'corruptedWhales']
    },
    bogTravel: {
      name: 'Dangerous Bog Passage',
      description: 'Players must traverse the treacherous Boglands, facing both supernatural corruption and natural predators including Bogskaldr ambushes, territorial Marsh Giants, and encounters with mysterious Marshwalker Elves.',
      trigger: 'Attempting to travel through the Boglands or following the Old Bog Road',
      outcomes: ['Creature encounters', 'Navigation challenges', 'Discovery of abandoned settlements', 'Marshwalker Elf contact'],
      hooks: ['What happened to the missing bog settlements?', 'Why do the Marshwalker Elves avoid outsiders?', 'What lies deeper in the corrupted wetlands?'],
      encounter_table: [
        '1-2: Bogskaldr ambush from murky water (1-2 creatures)',
        '3: Territorial Marsh Giant demands tribute or passage rites',
        '4: Marshwalker Elf Archer shadows the party, testing their intentions',
        '5: Marshwalker Elf Caster offers cryptic guidance or warnings',
        '6: Signs of larger, unknown bog creatures (tracks, territorial markings)'
      ],
      relatedNpcs: ['bogGuide', 'canalKeeper', 'innKeeper'],
      relatedLocations: ['bogRoad', 'canalLocks', 'portageStation'],
      relatedThreats: ['bogCreatures', 'bogCorruption']
    },
    lordInvitation: {
      name: 'Invitation to Scrimmholme',
      description: 'Lord Bayard Scrimm extends a rare invitation to visit his estate on Thornwick Isle, usually only given to those he wishes to evaluate or corrupt.',
      trigger: 'Players gain local reputation or possess something of interest',
      outcomes: ['Dinner invitation', 'Tour of estate', 'Revelation of true nature'],
      hooks: ['Why is he interested?', 'What does he want?', 'How to escape alive?'],
      relatedNpcs: ['bayardScrimm', 'groundskeeper', 'boatman'],
      relatedLocations: ['scrimmholmeManor', 'privateDocks', 'observatory'],
      relatedThreats: ['agog']
    },
    hagEncounter: {
      name: 'summoning Bettey Nettle',
      description: 'Players learn of the bog hag Bettey Nettle and her husband Ol\' Clattershanks, who can be summoned through a ritual involving blue flames in the bogs at night. Despite their fearsome appearance, they offer trades in potions, balms, and magical boons.',
      trigger: 'Asking locals about bog magic, potions, or supernatural aid',
      ritual_requirements: [
        'Travel the bogs at night',
        'search for a ring of blue flames (Investigation DC 15)',
        'Recite the rhyming call to Bettey Nettle and Clattershanks (Performance or Religion DC 12)',
        `<em>The Rhyming Call:</em><br>
        Bettey Nettle, Bettey Nettle!<br>
        Warm your hearth and set out your kettle!<br>
        Come out! Come out! For a deal this night.<br>
        Come out! Come out! We trade tonight!<br>
        <br>
        We call to you, Ol' Clattershanks!<br>
        With your wicked smile and crooked pranks.<br>
        Come out! Come out! For a deal this night.<br>
        Come out! Come out by the blue flame's light!<br>
        <br>
        For we have need of both your wares,<br>
        And we will pay with gold or prayers.<br>
        We know your price is filled with sin,<br>
        But we call to you, please send Gulpgrin!<br>
        <br>
        Come out! Come out! For a deal this night.<br>
        Come out! Come out! We trade tonight!<br>
        Come out! Come out! For a deal this night.<br>
        Come out! Come out! We TRADE TONIGHT!
        `,
        'Approach Gulpgrin when summoned (Courage check optional)'
      ],
      outcomes: ['Successful summoning of Gulpgrin', 'Discovery of the Winter Court portal', 'Trading session with the hag couple', 'Potential fae realm adventure'],
      hooks: ['What brought them to the Winter Court?', 'What prices do they demand for powerful boons?', 'How does their portal affect the bog\'s corruption?', 'What secrets do they know about Queen Morrighan?'],
      gulpgrin_details: {
        name: 'Gulpgrin',
        description: 'A massive frog creature that emerges from the muddy bog when properly summoned. Its cavernous mouth contains an ancient wooden door with a lantern, serving as a portal to Bettey and Clattershanks\' home in the Winter Court.',
        mechanics: 'Perception DC 10 to notice the light and door within its throat'
      },
      winter_court_clues: {
        observation: 'Looking out windows reveals an unrecognizable snowy landscape',
        arcana_check: 'DC 15 Arcana check reveals they are in the Winter Court of the Fae Realm',
        implications: 'Connection to Queen Morrighan\'s domain and fae politics'
      },
      relatedNpcs: ['betteyNettle', 'clattershanks', 'bogGuide'],
      relatedLocations: ['bogRoad', 'canalLocks'],
      relatedThreats: ['bogCorruption']
    }
  },

  lore: {
    whalingEra: {
      title: 'The Golden Age of Whaling',
      content: 'scrimshaw Bay was once the heart of a thriving whaling industry. Massive whales provided oil for lamps, bone for corsets and tools, and ambergris for perfumes. The wealth from whaling built the grand mansions and funded the elaborate processing facilities.',
      connections: ['Economic foundation', 'Social hierarchy', 'Current corruption']
    },
    ironwoodTrade: {
      title: 'Ironwood Commerce',
      content: 'The region served as the sole export point for ironwood timber from Timber Giant territories. This incredibly durable wood was essential for shipbuilding and fetched premium prices across the known world.',
      connections: ['Canal system', 'Economic prosperity', 'Current rot and decay']
    },
    decline: {
      title: 'The Great Decline',
      content: 'Overharvesting depleted whale populations while the opening of trade routes through Greylocke bypassed the bay entirely. The economic collapse led to mass emigration, leaving only the desperate and the strange.',
      connections: ['Current poverty', 'Desperation enabling corruption', 'Abandoned infrastructure']
    },
    agogInfluence: {
      title: 'The Deep Corruption',
      content: 'Agog\'s influence has been slowly seeping into the bay for decades. The remaining whales fled not just from overhunting but from the aberrant presence. Those who stayed have been gradually corrupted.',
      connections: ['Whale behavior changes', 'Marine mutations', 'Human transformations']
    }
  }
};

// Export for use in other files
// Export for ES modules
export { campaignData };