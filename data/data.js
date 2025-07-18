// Campaign Data Structure
const campaignData = {
    settlements: {
        millhaven: {
            name: "Millhaven",
            type: "Former Regional Hub",
            population: "~800",
            description: "Once the crown jewel of Scrimshaw Bay, Millhaven's grand harbor now hosts more ghost ships than active vessels. Massive whale oil processing plants stand like industrial cathedrals, their empty windows staring blindly over the bay.",
            notableLocations: [
                {
                    id: "renderedCrown",
                    name: "The Rendered Crown",
                    shortDesc: "Former luxury inn, now a flophouse for desperate sailors",
                    npcs: [],
                    hasDetails: false
                },
                {
                    id: "prosperityRow",
                    name: "Prosperity Row",
                    shortDesc: "Street of abandoned whaling captain mansions",
                    npcs: [],
                    hasDetails: true
                },
                {
                    id: "boneYards",
                    name: "The Bone Yards",
                    shortDesc: "Whale processing facilities, now rusted monuments",
                    npcs: [],
                    hasDetails: true
                },
                {
                    id: "harborTower",
                    name: "Harbor Master's Tower",
                    shortDesc: "Still functional lighthouse, manned by a reclusive keeper",
                    npcs: ["harborMaster"],
                    hasDetails: true
                },
                {
                    id: "stLeviathan",
                    name: "St. Leviathan's Church",
                    shortDesc: "Gothic cathedral with disturbing maritime carvings",
                    npcs: ["priestLeviathan"],
                    hasDetails: true
                }
            ],
            keyNpcs: ["harborMaster", "priestLeviathan"],
            inhabitants: [
                "Desperate fishermen catching increasingly strange fish",
                "Eccentric recluses in decaying mansions",
                "Harbor master who refuses to discuss what he sees from his tower",
                "Priest struggling with congregation's growing madness",
                "Handful of merchants dealing in 'specialty' goods",
                "Small whaling crews harvesting diseased whales for alchemical trade"
            ],
            darkSecrets: [
                "Several mansion owners have made pacts with Agog for extended life",
                "The whale oil in abandoned tanks has transformed into something else",
                "Strange lights sometimes appear in the harbor on moonless nights",
                "Missing persons reports have increased dramatically in recent years",
                "Whaling crews are slowly transforming into fish-like creatures",
                "Black parasites from whale harvests are being exported to unknown buyers"
            ]
        },
        netherwick: {
            name: "Netherwick",
            type: "Fishing Village",
            population: "~150",
            description: "What began as a whaling support town has devolved into desperate subsistence fishing. The village clings to life through increasingly meager catches, though locals whisper that the fish taste metallic and wrong.",
            
            layout: {
                village_structure: {
                    main_area: "Cottages arranged in defensive semicircle around central commons",
                    docks: "Weathered wooden piers extending into dark bay waters",
                    work_areas: "Net-mending sheds and fish-drying racks along the shore",
                    shrine_area: "Small hill overlooking the bay with ancient fisherman's shrine",
                    approach: "Single muddy road from inland, boat access from bay"
                },
                districts: [
                    {
                        name: "The Commons",
                        description: "Central area with The Caught Cod tavern, well, and small market space",
                        buildings: ["The Caught Cod tavern", "Community well", "Small market stalls (usually empty)", "Message board"]
                    },
                    {
                        name: "Cottage Row",
                        description: "Semicircle of salt-stained fishing family homes",
                        buildings: ["12 family cottages", "Shared root cellar", "Community smokehouse", "Chicken coops"]
                    },
                    {
                        name: "The Working Shore",
                        description: "Waterfront area with docks and work buildings",
                        buildings: ["Main fishing docks", "Net-mending sheds", "Fish-drying racks", "Boat storage", "Bait house"]
                    },
                    {
                        name: "Shrine Hill",
                        description: "Small hill with the fisherman's shrine complex, elder's cottage, and village graveyard",
                        buildings: ["The Fisherman's Shrine (Thessa, Astraea, Rhyssian, Akhetmon)", "Elder's cottage", "Village graveyard", "Weather watching post", "Old beacon tower (defunct)"]
                    }
                ]
            },
            
            notableLocations: [
                {
                    id: "caughtCod",
                    name: "The Caught Cod",
                    shortDesc: "Tavern filled with disturbing maritime scrimshaw",
                    npcs: ["tavernKeeper"],
                    hasDetails: true
                },
                {
                    id: "weatheredDocks",
                    name: "Weathered Docks",
                    shortDesc: "Docks extending into unnaturally dark water",
                    npcs: ["dockWorker", "youngFisherman"],
                    hasDetails: false
                },
                {
                    id: "netSheds",
                    name: "Net-mending Sheds",
                    shortDesc: "Sheds where strange sounds echo at night",
                    npcs: ["netsMender"],
                    hasDetails: false
                },
                {
                    id: "saltCottages",
                    name: "Salt-stained Cottages",
                    shortDesc: "Cottages arranged in a defensive semicircle",
                    npcs: ["fisherWife", "sickmChild", "desperateWidow"],
                    hasDetails: false
                },
                {
                    id: "fishermanShrine",
                    name: "The Fisherman's Shrine",
                    shortDesc: "Offerings to ensure safe returns",
                    npcs: ["villageElder"],
                    hasDetails: true
                },
                {
                    id: "communityWell",
                    name: "The Community Well",
                    shortDesc: "Central gathering spot with increasingly brackish water",
                    npcs: ["waterBearer"],
                    hasDetails: false
                },
                {
                    id: "marketSpace",
                    name: "Market Commons",
                    shortDesc: "Small area where what little trade occurs",
                    npcs: ["fishmonger", "tradingCaptain"],
                    hasDetails: false
                },
                {
                    id: "baitHouse",
                    name: "The Bait House",
                    shortDesc: "Storage for fishing supplies and bait",
                    npcs: ["baitKeeper"],
                    hasDetails: false
                }
            ],
            
            keyNpcs: ["tavernKeeper", "villageElder", "netsMender"],
            backgroundNpcs: ["dockWorker", "youngFisherman", "fisherWife", "sickmChild", "desperateWidow", "waterBearer", "fishmonger", "tradingCaptain", "baitKeeper", "senileGrandfather", "anxiousMother", "skepticalFisherman"],
            
            inhabitants: [
                "Fishing families who've lived here for generations",
                "Tavern keeper who collects increasingly disturbing scrimshaw",
                "Village elder who speaks in maritime riddles",
                "Nets-mender who claims to hear voices in the waves",
                "Young people planning desperate escapes to larger towns",
                "Whaling crew that returns with strange catches and stranger behavior"
            ],
            darkSecrets: [
                "Recent catches include fish with human-like eyes",
                "Several fishermen have returned from trips speaking in unknown tongues",
                "The village elder performs midnight rituals at the water's edge",
                "Strange barnacle-like growths have appeared on some residents",
                "Missing fishing boats found weeks later, crews gone but cargo intact",
                "Local whaling crew shows signs of physical transformation"
            ]
        },
        ashford: {
            name: "Ashford",
            type: "Company Town",
            population: "~200",
            description: "Built by the Ashford Timber Company to process ironwood from the interior, this planned community now stands largely empty. Rows of identical worker housing sit vacant, while the massive sawmill contains half-processed ironwood logs that have begun to rot.",
            notableLocations: [
                {
                    id: "ashfordSawmill",
                    name: "Ashford Sawmill",
                    shortDesc: "Massive facility with rusted, silent machinery",
                    npcs: ["maintenanceWorker"],
                    hasDetails: false
                },
                {
                    id: "companyHousing",
                    name: "Company Housing",
                    shortDesc: "Rows of identical homes, most boarded up",
                    npcs: [],
                    hasDetails: false
                },
                {
                    id: "companyStore",
                    name: "The Company Store",
                    shortDesc: "Still operating with a skeleton crew",
                    npcs: ["storeClerk"],
                    hasDetails: false
                },
                {
                    id: "lumberYards",
                    name: "Lumber Yards",
                    shortDesc: "Containing mysteriously rotting ironwood",
                    npcs: [],
                    hasDetails: false
                },
                {
                    id: "supervisorMansion",
                    name: "Supervisor's Mansion",
                    shortDesc: "Overlooking the town from a hill",
                    npcs: ["companySupervisor"],
                    hasDetails: false
                }
            ],
            keyNpcs: ["companySupervisor", "storeClerk", "maintenanceWorker"],
            inhabitants: [
                "Company supervisor who refuses to abandon his post",
                "Store clerk maintaining records of increasingly bizarre inventory",
                "Maintenance worker who claims the machines start themselves",
                "Families too poor to relocate living in condemned housing",
                "Drifters seeking temporary work that no longer exists"
            ],
            darkSecrets: [
                "The ironwood has been infected by something from the bay",
                "Workers who stayed too long developed strange physical changes",
                "The company supervisor hasn't aged visibly in twenty years",
                "Machinery operates sporadically without power or operators",
                "Strange symbols have been carved into the rotting ironwood"
            ]
        },
        thornwick: {
            name: "Thornwick Isle",
            type: "Lord's Estate",
            population: "~50",
            description: "The private island of an ancient aristocratic family, Thornwick Isle serves as both the lord's estate and home to the descendants of former servants. Scrimmholme Manor dominates the island's highest point, a Gothic fortress of black stone.",
            notableLocations: [
                {
                    id: "scrimmholmeManor",
                    name: "Scrimmholme Manor",
                    shortDesc: "Imposing Gothic mansion with numerous towers",
                    npcs: ["bayardScrimm"],
                    hasDetails: false
                },
                {
                    id: "villageBelow",
                    name: "The Village Below",
                    shortDesc: "Servants' quarters and support buildings",
                    npcs: ["groundskeeper"],
                    hasDetails: false
                },
                {
                    id: "privateDocks",
                    name: "Private Docks",
                    shortDesc: "For the lord's personal vessels",
                    npcs: ["boatman"],
                    hasDetails: false
                },
                {
                    id: "familyCrypts",
                    name: "Family Crypts",
                    shortDesc: "Ancient burial grounds with disturbing statuary",
                    npcs: [],
                    hasDetails: false
                },
                {
                    id: "observatory",
                    name: "The Observatory",
                    shortDesc: "Tower where Lord Scrimm watches the stars",
                    npcs: ["bayardScrimm"],
                    hasDetails: false
                }
            ],
            keyNpcs: ["bayardScrimm", "groundskeeper", "boatman"],
            inhabitants: [
                "Lord Bayard Scrimm: Ancient aristocrat sustained by Agog's power",
                "Loyal servants whose families have served for generations",
                "Groundskeeper who tends the estate's twisted gardens",
                "Boatman who ferries visitors at the lord's discretion",
                "Village children who never seem to age past adolescence"
            ],
            darkSecrets: [
                "Lord Bayard Scrimm's body writhes with Agog's tentacled flesh",
                "The manor's basement connects to underwater tunnels leading to Agog's domain",
                "Servants who displease the lord simply vanish",
                "Strange ceremonies are conducted during astronomical events",
                "The island itself may be slowly sinking into the bay"
            ]
        },
        fenway: {
            name: "Fenway",
            type: "Canal Village",
            population: "~75",
            description: "Once vital for navigation through the treacherous bogs, Fenway maintained the canal system and portage paths that brought ironwood from the deep forests. Now the canals have grown over with strange vegetation.",
            notableLocations: [
                {
                    id: "canalLocks",
                    name: "Abandoned Canal Locks",
                    shortDesc: "Overgrown with phosphorescent moss",
                    npcs: ["canalKeeper"],
                    hasDetails: false
                },
                {
                    id: "portageStation",
                    name: "The Portage Station",
                    shortDesc: "Empty warehouse for timber transfer",
                    npcs: [],
                    hasDetails: false
                },
                {
                    id: "fenwayInn",
                    name: "Fenway Inn",
                    shortDesc: "Last stop before entering the Boglands",
                    npcs: ["innKeeper"],
                    hasDetails: false
                },
                {
                    id: "bogRoad",
                    name: "Old Bog Road",
                    shortDesc: "Partially flooded path into the wetlands",
                    npcs: ["bogGuide"],
                    hasDetails: false
                },
                {
                    id: "watchtower",
                    name: "The Watchtower",
                    shortDesc: "Crumbling structure overlooking the approaches",
                    npcs: [],
                    hasDetails: false
                }
            ],
            keyNpcs: ["innKeeper", "canalKeeper", "bogGuide"],
            inhabitants: [
                "Inn keeper who warns travelers away from the bogs",
                "Canal keeper who maintains a few navigable passages",
                "Bog guide who charges exorbitant fees for safe passage",
                "Hermits living in abandoned lock houses",
                "Refugees from deeper bog settlements"
            ],
            darkSecrets: [
                "The bog waters have been poisoned by something ancient",
                "Strange lights lead travelers astray in the wetlands",
                "Bog folk have made their own pacts with underwater entities",
                "The canal system connects to vast underwater caverns",
                "Missing persons from other towns often end up in the bogs"
            ]
        }
    },

    npcs: {
        bayardScrimm: {
            name: "Lord Bayard Scrimm",
            location: "Thornwick Isle",
            role: "Aristocratic Lord & Primary Antagonist",
            description: "Ancient aristocrat who has ruled Thornwick Isle for far longer than any mortal should. His body writhes with Agog's tentacled flesh, and he emerges only at night. Sustained by his pact with the Devil of the Deep.",
            secrets: ["Body filled with writhing tentacled flesh", "Feeds on the living", "Commands underwater horrors", "Direct connection to Agog"],
            abilities: ["Vampire-like longevity", "Night vision", "Tentacled attacks", "Command over sea creatures"],
            motivations: ["Serve Agog's will", "Maintain control over the bay", "Spread corruption"],
            relatedThreats: ["agog"],
            relatedLocations: ["scrimmholmeManor", "observatory"],
            relatedEvents: ["lordInvitation"]
        },
        harborMaster: {
            name: "Silas Moorcock",
            location: "Millhaven",
            role: "Harbor Master & Lighthouse Keeper",
            description: "Reclusive keeper of Harbor Master's Tower who refuses to discuss what he sees from his lighthouse during the dark hours. Has maintained his post for decades despite the town's decline.",
            secrets: ["Witnesses nightly horrors in the bay", "May have made a minor pact for sight", "Keeps detailed logs of strange events"],
            abilities: ["Enhanced night vision", "Maritime knowledge", "Lighthouse operations"],
            motivations: ["Warn ships away from danger", "Document the corruption", "Survive another night"],
            relatedThreats: ["agog"],
            relatedLocations: ["harborTower"],
            relatedEvents: ["strangeNews"]
        },
        priestLeviathan: {
            name: "Father Cornelius Blackwater",
            location: "Millhaven",
            role: "Priest of St. Leviathan's Church",
            description: "Struggling priest whose congregation grows more mad and fewer in number each month. The maritime carvings in his church seem to move when he's not looking directly at them.",
            secrets: ["Questions his faith", "Church carvings are becoming more disturbing", "Parishioners confess impossible things"],
            abilities: ["Divine magic (weakening)", "Exorcism", "Religious knowledge"],
            motivations: ["Save his congregation", "Understand the corruption", "Maintain his faith"]
        },
        tavernKeeper: {
            name: "Marta Scrimshaw",
            location: "Netherwick",
            role: "Tavern Keeper & Scrimshaw Collector",
            description: "Keeps The Caught Cod tavern and obsessively collects maritime scrimshaw. Her collection has become increasingly disturbing, with pieces that seem to move in peripheral vision.",
            secrets: ["Scrimshaw pieces are becoming animated", "Related to an old whaling family", "Knows more about the bay's history than she admits"],
            abilities: ["Local knowledge", "Scrimshaw evaluation", "Tavern management"],
            motivations: ["Preserve maritime heritage", "Understand family history", "Keep the tavern running"]
        },
        villageElder: {
            name: "Old Thaddeus Brine",
            location: "Netherwick",
            role: "Village Elder & Shrine Keeper",
            description: "Ancient fisherman who speaks in maritime riddles and tends the Fisherman's Shrine. Performs mysterious midnight rituals at the water's edge.",
            secrets: ["Knows the true nature of the bay's corruption", "Performs rituals to appease sea spirits", "Has lived far longer than any normal human"],
            abilities: ["Maritime lore", "Weather prediction", "Ritual magic"],
            motivations: ["Protect the village", "Maintain ancient pacts", "Guide the young away from the sea"],
            relatedThreats: ["agog", "corruptedWhales"],
            relatedLocations: ["fishermanShrine", "weatheredDocks"],
            relatedEvents: ["whalingWitness", "strangeNews"]
        },
        netsMender: {
            name: "Silas Weaver",
            location: "Netherwick",
            role: "Net Mender & Sound Listener",
            description: "Skilled net mender who claims to hear voices in the waves. His fingers are becoming increasingly webbed.",
            secrets: ["Partially transformed by parasites", "Can understand the voices in the waves", "Secretly working with the whaling crews"],
            abilities: ["Net crafting", "Wave interpretation", "Fish-like swimming"],
            motivations: ["Hide his transformation", "Understand the voices", "Provide for his family"],
            relatedThreats: ["corruptedWhales", "transformedCitizens", "agog"],
            relatedLocations: ["netSheds", "weatheredDocks"],
            relatedEvents: ["whalingWitness", "strangeNews"]
        },
        companySupervisor: {
            name: "Cornelius Ashford III",
            location: "Ashford",
            role: "Company Supervisor",
            description: "Last remaining member of the Ashford family, refuses to abandon the company town despite its obvious failure. Hasn't aged visibly in twenty years.",
            secrets: ["Made a pact for extended life", "Knows the truth about the rotting ironwood", "Guards company secrets about the corruption"],
            abilities: ["Business management", "Ironwood expertise", "Unnatural longevity"],
            motivations: ["Preserve family legacy", "Maintain control", "Hide the corruption"],
            relatedThreats: ["agog", "ironwoodCorruption"],
            relatedLocations: ["supervisorMansion", "ashfordSawmill"],
            relatedEvents: ["strangeNews"]
        },
        storeClerk: {
            name: "Martha Codwell",
            location: "Ashford",
            role: "Company Store Clerk",
            description: "Meticulous clerk who maintains records of increasingly bizarre inventory. Obsessed with documenting every strange change.",
            secrets: ["Records show impossible inventory", "Items appear and disappear mysteriously", "May be slowly going mad from isolation"],
            abilities: ["Record keeping", "Inventory management", "Pattern recognition"],
            motivations: ["Maintain order", "Document the truth", "Survive until retirement"]
        },
        maintenanceWorker: {
            name: "Jakob Grimm",
            location: "Ashford",
            role: "Mill Maintenance Worker",
            description: "Last maintenance worker who claims the machines start themselves. Shows signs of mechanical integration.",
            secrets: ["Machines are alive somehow", "Has mechanical parts grafted to his body", "Communicates with the mill machinery"],
            abilities: ["Machine repair", "Mechanical intuition", "Limited technomancy"],
            motivations: ["Keep the machines happy", "Understand the mill's purpose", "Protect others from the machinery"]
        },
        groundskeeper: {
            name: "Elias Thornwick",
            location: "Thornwick Isle",
            role: "Estate Groundskeeper",
            description: "Descendant of the original island inhabitants, tends Lord Scrimm's twisted gardens. His family has served for generations.",
            secrets: ["Gardens grow things that shouldn't exist", "Family bound by ancient oath", "Children never age past adolescence"],
            abilities: ["Gardening", "Plant lore", "Hereditary loyalty"],
            motivations: ["Serve the lord", "Protect his family", "Maintain the estate"]
        },
        boatman: {
            name: "Ezekiel Ferry",
            location: "Thornwick Isle",
            role: "Lord's Boatman",
            description: "Silent boatman who ferries visitors to and from the island at Lord Scrimm's discretion. Never speaks above a whisper.",
            secrets: ["Knows who never returns from visits", "Can navigate in complete darkness", "May not be entirely human anymore"],
            abilities: ["Navigation", "Silent movement", "Boat handling"],
            motivations: ["Serve Lord Scrimm", "Ferry only the worthy", "Keep the island's secrets"]
        },
        innKeeper: {
            name: "Prudence Marsh",
            location: "Fenway",
            role: "Inn Keeper & Bog Warner",
            description: "Stern innkeeper who warns travelers away from the bogs. Lost her husband to the wetlands years ago.",
            secrets: ["Knows safe paths through the bogs", "Husband didn't just get lost", "Keeps maps of dangerous areas"],
            abilities: ["Hospitality", "Bog knowledge", "Warning signs interpretation"],
            motivations: ["Protect travelers", "Prevent bog deaths", "Keep the inn running"]
        },
        canalKeeper: {
            name: "Edgar Lockwood",
            location: "Fenway",
            role: "Canal Keeper",
            description: "Maintains the few navigable canal passages despite the growing corruption. The phosphorescent moss responds to his touch.",
            secrets: ["Moss is not natural", "Canals connect to underwater caverns", "Something watches from the deep locks"],
            abilities: ["Water management", "Lock operation", "Moss cultivation"],
            motivations: ["Keep some trade flowing", "Understand the moss", "Prevent total isolation"]
        },
        bogGuide: {
            name: "Tobias Mudfoot",
            location: "Fenway",
            role: "Bog Guide & Creature Expert",
            description: "Charges exorbitant fees for safe passage through the wetlands. Has extensive knowledge of bog creatures including Bogskaldr hunting patterns, Marsh Giant territories, and rumored Marshwalker Elf settlements. May know more about the bog's dangers than he admits.",
            secrets: ["Has made deals with bog entities", "Knows location of lost settlements", "Can sense safe paths supernaturally", "Has encountered Marshwalker Elves and learned some of their signs", "Knows which areas Bogskaldr frequent and Marsh Giant territories", "Knows the rhyming call to summon Bettey Nettle and Clattershanks"],
            abilities: ["Bog navigation", "Danger sensing", "Wetland survival", "Creature tracking", "Basic knowledge of bog creature behavior"],
            motivations: ["Make money from desperate travelers", "Avoid the deep bogs", "Keep certain areas secret", "Survive encounters with bog creatures"],
            creature_knowledge: {
                "Bogskaldr": "Knows their ambush spots and feeding times",
                "Marsh Giants": "Understands their territorial boundaries and tribute customs", 
                "Marshwalker Elves": "Has seen their signs and knows some safe-passage rituals",
                "Bettey Nettle & Clattershanks": "Knows the summoning ritual and has traded with them before"
            },
            relatedThreats: ["bogCreatures", "bogCorruption"],
            relatedLocations: ["bogRoad", "canalLocks", "watchtower"],
            relatedEvents: ["bogTravel", "strangeNews", "hagEncounter"]
        },
        betteyNettle: {
            name: "Bettey Nettle",
            location: "The Boglands (Winter Court)",
            role: "Bog Hag & Potion Maker",
            description: "A very large and rotund hag who lives in the Winter Court of the Fae Realm but can be summoned to the bogs through a ritual involving blue flames. Despite her fearsome appearance, she's not necessarily hostile and trades in balms, potions, and magical boons.",
            secrets: ["Home is actually in the Winter Court", "Connected to Queen Morrighan's domain", "Can travel between planes through Gulpgrin", "Knows ancient bog magic and fae contracts"],
            abilities: ["Hag magic", "Potion brewing", "Fae contracts", "Planar travel", "Bog plant knowledge"],
            motivations: ["Trade fairly for mutual benefit", "Collect interesting ingredients", "Maintain neutrality between fae courts", "Preserve ancient bog traditions"],
            services: ["Healing balms and potions", "Magical boons (for a price)", "Information about the bogs", "Fae realm guidance"],
            relatedThreats: ["bogCorruption"],
            relatedLocations: ["bogRoad", "canalLocks"],
            relatedEvents: ["hagEncounter", "bogTravel"]
        },
        clattershanks: {
            name: "Ol' Clattershanks",
            location: "The Boglands (Winter Court)",
            role: "Bog Creature & Bettey's Husband",
            description: "Tall and spindly with long limbs and fingers that move eerily as if there are more joints than there should be. Bettey Nettle's devoted husband who assists with her magical work and tends their otherworldly home.",
            secrets: ["Nature is unclear - fae, undead, or something else", "Extremely devoted to Bettey", "Can manipulate his limbs in impossible ways", "Knows secrets of Winter Court politics"],
            abilities: ["Unnatural flexibility", "Silent movement", "Ingredient gathering", "Fae realm navigation", "Protective magic"],
            motivations: ["Serve and protect Bettey", "Maintain their home", "Gather rare ingredients", "Keep fae realm secrets"],
            relatedThreats: ["bogCorruption"],
            relatedLocations: ["bogRoad"],
            relatedEvents: ["hagEncounter", "bogTravel"]
        },
        
        // Netherwick Background NPCs
        dockWorker: {
            name: "Henrik Saltbeard",
            location: "Netherwick",
            role: "Dock Worker & Boat Maintenance",
            description: "Gruff older man who maintains the docks and helps boats come and go. Missing two fingers from his left hand.",
            secrets: ["Lost fingers to something that 'bit back' while fishing", "Knows which boats never return"],
            quick_info: ["Always chewing on dried fish", "Speaks in grunts mostly", "Charges small fees for dock use"],
            motivations: ["Keep the docks functional", "Avoid the water himself", "Warn newcomers subtly"]
        },
        
        youngFisherman: {
            name: "Tobias Netcast",
            location: "Netherwick", 
            role: "Young Fisherman & Village Gossip",
            description: "Eager young man in his early twenties, still optimistic despite the village's decline. Son of a fishing family.",
            secrets: ["Planning to leave for Millhaven soon", "Sweet on the bait keeper's daughter"],
            quick_info: ["Chatty and friendly to strangers", "Knows everyone's business", "Still believes things will get better"],
            motivations: ["Make enough money to leave", "Impress his crush", "Help his aging parents"]
        },
        
        fisherWife: {
            name: "Greta Stormwind",
            location: "Netherwick",
            role: "Fisher's Wife & Seamstress",
            description: "Middle-aged woman whose husband went missing at sea three months ago. Takes in sewing to survive.",
            secrets: ["Husband's boat was found with strange bite marks", "Keeps his sea chest locked"],
            quick_info: ["Suspicious of strangers", "Protective of her children", "Skilled with needle and thread"],
            motivations: ["Protect her children", "Find out what happened to her husband", "Keep food on the table"]
        },
        
        sickmChild: {
            name: "Little Tam Stormwind",
            location: "Netherwick",
            role: "Greta's Sick Child",
            description: "Seven-year-old boy who's been ill since his father disappeared. Has strange marks on his arms.",
            secrets: ["Marks look like small barnacles growing under skin", "Dreams of underwater cities"],
            quick_info: ["Quiet and withdrawn", "Draws disturbing sea creatures", "Afraid of the water now"],
            motivations: ["Understand his dreams", "Find his father", "Make the marks stop itching"]
        },
        
        desperateWidow: {
            name: "Vera Blackwater",
            location: "Netherwick",
            role: "Widow & Herb Gatherer",
            description: "Elderly widow who knows which plants help with ailments. Lost three sons to the sea over the years.",
            secrets: ["Grows plants that shouldn't exist in this climate", "Makes remedies for the transforming villagers"],
            quick_info: ["Speaks to herself constantly", "Always smells of strange herbs", "Offers remedies for coin"],
            motivations: ["Help ease others' suffering", "Keep her garden secret", "Remember her sons"]
        },
        
        waterBearer: {
            name: "Young Sara Tidecaller",
            location: "Netherwick",
            role: "Water Bearer & Message Runner",
            description: "Teenage girl who fetches water and carries messages between households. Fast and reliable.",
            secrets: ["Well water tastes saltier each day", "Sees things in the water's reflection"],
            quick_info: ["Quick and energetic", "Knows all the gossip", "Wants to learn to read"],
            motivations: ["Help her community", "Learn about the outside world", "Understand the visions"]
        },
        
        fishmonger: {
            name: "Old Cobb Fishscale",
            location: "Netherwick",
            role: "Fish Seller & Former Sea Captain",
            description: "Retired sea captain who now sells the daily catch. Has extensive knowledge of the bay's waters.",
            secrets: ["Knows the safe fishing spots", "Refuses to eat the current catches himself"],
            quick_info: ["Missing left eye from whaling accident", "Tells tall tales", "Charges fair prices"],
            motivations: ["Help families sell their catch", "Share maritime wisdom", "Avoid starvation"]
        },
        
        tradingCaptain: {
            name: "Captain Mordecai Blackbrine",
            location: "Netherwick",
            role: "Visiting Trading Captain",
            description: "Captain of a small trading vessel who occasionally stops in Netherwick. Seems nervous about something.",
            secrets: ["Transports black parasites from whaling crews", "Has strange buyers in distant ports"],
            quick_info: ["Never stays more than a day", "Pays well for certain 'specimens'", "Won't discuss his cargo"],
            motivations: ["Complete profitable trades", "Avoid asking questions", "Keep his crew safe"]
        },
        
        baitKeeper: {
            name: "Jebediah Wormfinder",
            location: "Netherwick",
            role: "Bait Supplier & Supply Manager",
            description: "Man who manages fishing supplies and digs for bait. His daughter helps him sort hooks and line.",
            secrets: ["Some bait moves on its own", "Finding things in the mud that shouldn't be there"],
            quick_info: ["Always dirty from digging", "Quiet and methodical", "Protective of his daughter"],
            motivations: ["Keep fishermen supplied", "Protect his daughter", "Understand the strange bait"]
        },
        
        senileGrandfather: {
            name: "Grandfather Ezra Saltwhiskers",
            location: "Netherwick",
            role: "Village Elder & Storyteller",
            description: "Very old fisherman who sits by the docks and tells stories. Sometimes his tales seem prophetic.",
            secrets: ["Stories contain real warnings about the bay", "Remembers when the corruption started"],
            quick_info: ["Speaks in riddles and stories", "Feeds seagulls daily", "Sometimes seems lucid"],
            motivations: ["Share important memories", "Warn through stories", "Feed the gulls"]
        },
        
        anxiousMother: {
            name: "Prudence Waveworry",
            location: "Netherwick",
            role: "Fisherman's Wife & Village Gossip",
            description: "Nervous woman whose husband is part of the whaling crew. Constantly worried about his changes.",
            secrets: ["Husband growing gills behind his ears", "Considering taking children and fleeing"],
            quick_info: ["Jumpy and nervous", "Asks lots of questions", "Protective of her family"],
            motivations: ["Keep her family safe", "Learn about husband's condition", "Plan escape if needed"]
        },
        
        skepticalFisherman: {
            name: "Magnus Doubtcaster",
            location: "Netherwick",
            role: "Local Fisherman & Voice of Reason",
            description: "Practical fisherman who dismisses supernatural explanations but can't explain what he's seeing.",
            secrets: ["Starting to believe the supernatural explanations", "Caught something he can't identify"],
            quick_info: ["Stubborn and logical", "Dismisses 'superstition'", "Good with nets and boats"],
            motivations: ["Find logical explanations", "Keep fishing despite fears", "Protect his reputation"]
        }
    },

    locations: {
        // Netherwick Background Locations
        communityWell: {
            id: "communityWell",
            name: "The Community Well",
            settlement: "netherwick",
            type: "Village Infrastructure",
            description: "The central gathering point of Netherwick, this stone-lined well has served the village for over a century. Lately, the water has taken on a distinctly brackish taste, and residents whisper that it sometimes reflects things that aren't there.",
            publicDescription: "Central gathering spot with increasingly brackish water",
            npcs: ["waterBearer", "anxiousMother"],
            secrets: {
                gmNotes: "The well is being contaminated by seepage from the bay. Sometimes shows visions of underwater scenes in its reflection.",
                observations: ["Water tastes increasingly salty", "Residents gather here for news", "Young Sara draws water daily", "Reflections sometimes show underwater scenes"]
            },
            questHooks: ["Investigate the contaminated water source", "Decode the visions in the well's reflection"]
        },
        
        marketSpace: {
            id: "marketSpace",
            name: "Market Commons", 
            settlement: "netherwick",
            type: "Trading Area",
            description: "A small cleared area in the village center where what little trade occurs. Most days it's empty except for Old Cobb trying to sell the daily catch, but occasionally trading vessels stop by.",
            publicDescription: "Small area where what little trade occurs",
            npcs: ["fishmonger", "tradingCaptain"],
            secrets: {
                gmNotes: "Captain Blackbrine makes suspicious trades here, dealing in parasites and strange specimens from the whaling crews.",
                observations: ["Usually empty market stalls", "Old Cobb sells fish daily", "Occasional mysterious trading vessels", "Transactions happen quietly"]
            },
            questHooks: ["Investigate the mysterious trading captain", "Follow the money trail of strange trades"]
        },
        
        baitHouse: {
            id: "baitHouse",
            name: "The Bait House",
            settlement: "netherwick",
            type: "Fishing Supply Storage",
            description: "A weathered wooden building where Jebediah stores fishing supplies and fresh bait. The smell is overwhelming, and lately, some of the bait seems to move on its own.",
            publicDescription: "Storage for fishing supplies and bait",
            npcs: ["baitKeeper"],
            secrets: {
                gmNotes: "Some of the bait is actually small corrupted creatures. Jebediah finds strange things while digging that he doesn't understand.",
                observations: ["Overwhelming smell of fish and rot", "Some bait containers seem to writhe", "Jebediah finds unusual things while digging", "His daughter helps sort supplies"]
            },
            questHooks: ["Investigate the moving bait", "Examine strange objects found while digging"]
        },
        
        fishermanShrine: {
            id: "fishermanShrine",
            name: "The Fisherman's Shrine",
            settlement: "netherwick",
            type: "Religious Complex",
            description: "A weathered stone shrine complex on a small hill overlooking the bay, serving as the spiritual heart of Netherwick. The main shrine honors Thessa with a carved trident and storm motifs, while smaller alcoves hold offerings to Astraea (star charts carved in stone) and Rhyssian (a small pool fed by a hidden spring). A somber memorial area dedicated to Akhetmon contains simple stone markers for those lost at sea, where families leave flowers and personal effects for the drowned.",
            publicDescription: "Offerings to ensure safe returns",
            
            layout: {
                main_shrine: {
                    deity: "Thessa",
                    description: "Central stone altar with carved trident and wave patterns",
                    offerings: ["Fish bones", "Small coins", "Carved ship models", "Storm-worn shells"]
                },
                star_alcove: {
                    deity: "Astraea",
                    description: "Small alcove with stone star charts and navigation symbols",
                    offerings: ["Polished stones", "Compass roses drawn in sand", "Dried flowers arranged in star patterns"]
                },
                spring_pool: {
                    deity: "Rhyssian",
                    description: "Natural spring pool with smooth river stones arranged around the edge",
                    offerings: ["Written secrets on parchment (dissolved in water)", "Small keys", "Knotted rope"]
                },
                memorial_area: {
                    deity: "Akhetmon",
                    description: "Quiet corner with simple stone markers and a small purple-misted brazier, adjacent to the village graveyard",
                    offerings: ["Personal effects of the lost", "Dried flowers", "Small portraits", "Letters to the dead"]
                },
                village_graveyard: {
                    description: "Small cemetery with weathered headstones overlooking the bay, adjacent to Akhetmon's memorial",
                    features: ["Weathered stone headstones", "Iron fence (partially rusted)", "Older graves from whaling era", "Recent graves with maritime symbols", "Path connecting to Akhetmon memorial"]
                }
            },
            
            npcs: ["villageElder"],
            
            secrets: {
                gmNotes: "Old Thaddeus performs midnight rituals here, combining elements from all four shrines. The spring pool sometimes shows visions of the drowned, and the memorial area is where families first notice if their lost loved ones are truly at peace.",
                hiddenItems: [
                    {
                        item: "Ancient Ritual Instructions",
                        location: "Behind Thessa's altar (Religion DC 15)",
                        description: "Old stone tablet with maritime protection rituals, some crossed out and replaced with darker rites"
                    },
                    {
                        item: "Navigation Charts",
                        location: "Astraea's alcove, carved into stone (Investigation DC 12)",
                        description: "Star charts showing safe passage routes, with recent additions marking dangerous areas"
                    },
                    {
                        item: "Memorial Records",
                        location: "Akhetmon's area, hidden under loose stones (Perception DC 13)",
                        description: "List of names and dates of those lost to the bay, with disturbing notes about 'unrestful' spirits and cross-references to disturbed graves"
                    },
                    {
                        item: "Graveyard Caretaker's Notes",
                        location: "Village graveyard, hidden in old mausoleum (Investigation DC 14)",
                        description: "Record of grave disturbances, missing bodies, and strange sounds at night - suggests some of the drowned don't stay buried"
                    }
                ],
                observations: [
                    "The spring pool's water tastes pure despite the village well's corruption",
                    "Some memorial markers have been recently disturbed or moved",
                    "Old Thaddeus visits at all hours, especially during new moons",
                    "Star charts show markings that don't match current celestial patterns",
                    "Families often leave more offerings at Akhetmon's memorial than the other shrines",
                    "The graveyard has many recent burials, but some graves appear to have been disturbed",
                    "Families often hold vigil between the memorial and graveyard during funeral rites"
                ]
            },
            
            questHooks: [
                "Investigate Old Thaddeus's midnight rituals",
                "Decode the disturbing additions to ancient protection rites",
                "Research the increasing number of 'unrestful' spirits",
                "Follow the star charts to discover safe vs. dangerous fishing areas",
                "Help families find peace with their lost loved ones",
                "Understand why the spring water remains pure",
                "Investigate the disturbed graves in the village cemetery",
                "Determine why some of the dead seem restless"
            ],
            
            relatedThreats: ["agog", "corruptedWhales"],
            relatedEvents: ["strangeNews", "whalingWitness"]
        },
        
        // Millhaven Locations
        harborTower: {
            id: "harborTower",
            name: "Harbor Master's Tower",
            settlement: "millhaven",
            type: "Lighthouse & Administrative Building",
            description: "A tall stone lighthouse that serves as both a beacon for ships and the harbor master's residence. The tower offers commanding views of the entire bay and is one of the few structures in Millhaven that remains fully operational.",
            publicDescription: "Still functional lighthouse, manned by a reclusive keeper",
            
            layout: {
                floors: [
                    {
                        name: "Ground Floor",
                        description: "Harbor master's office with charts, logs, and maritime equipment",
                        features: ["Large nautical charts on walls", "Ship manifests and logs", "Emergency supplies", "Communication equipment"]
                    },
                    {
                        name: "Second Floor",
                        description: "Silas's living quarters - simple but well-maintained",
                        features: ["Bed and personal belongings", "Small kitchen", "Telescope by window", "Personal journal (hidden)"]
                    },
                    {
                        name: "Lighthouse Top",
                        description: "The lighthouse beacon and observation area",
                        features: ["Powerful lighthouse beacon", "360-degree view of bay", "Weather monitoring equipment", "Emergency signal flags"]
                    }
                ]
            },
            
            npcs: ["harborMaster"],
            
            secrets: {
                gmNotes: "Silas keeps detailed logs of strange sightings in the bay, hidden in a secret compartment",
                hiddenItems: [
                    {
                        item: "Strange Sightings Journal",
                        location: "Second floor, hidden compartment behind bed (Investigation DC 15)",
                        description: "Contains detailed accounts of tentacled creatures, strange lights, and missing ships"
                    },
                    {
                        item: "Emergency Cache",
                        location: "Ground floor, concealed panel (Perception DC 12)",
                        description: "Contains emergency supplies, flares, and a loaded crossbow"
                    }
                ],
                secretDoors: [],
                traps: [],
                observations: [
                    "Silas watches the bay obsessively, especially at night",
                    "The lighthouse beacon sometimes flickers in patterns (warning signals)",
                    "Charts show marked areas where ships have disappeared"
                ]
            },
            
            questHooks: [
                "Silas requests help investigating strange bay phenomena",
                "Players need lighthouse access to signal ships or survey the area",
                "Hidden journal reveals pattern in disappearances"
            ],
            
            relatedThreats: ["agog"],
            relatedEvents: ["strangeNews"]
        },
        
        stLeviathan: {
            id: "stLeviathan",
            name: "St. Leviathan's Church",
            settlement: "millhaven",
            type: "Gothic Cathedral",
            description: "A imposing Gothic cathedral dedicated to maritime traditions. The church features disturbing maritime carvings that seem to move in peripheral vision, and the congregation has been dwindling as madness spreads through Millhaven.",
            publicDescription: "Gothic cathedral with disturbing maritime carvings",
            
            layout: {
                areas: [
                    {
                        name: "Main Nave",
                        description: "Long hall with wooden pews and stained glass windows depicting sea scenes",
                        features: ["Altar with ship's wheel", "Disturbing maritime carvings", "Stained glass showing whaling scenes", "Collection box (mostly empty)"]
                    },
                    {
                        name: "Confessional Booths",
                        description: "Several confession booths where parishioners share impossible tales",
                        features: ["Three confession booths", "Worn kneelers", "Speaking grilles", "Privacy curtains"]
                    },
                    {
                        name: "Priest's Quarters",
                        description: "Father Blackwater's private chambers behind the altar",
                        features: ["Simple bed and desk", "Religious texts", "Personal journal", "Prayer supplies"]
                    },
                    {
                        name: "Bell Tower",
                        description: "Tower with church bells, accessible via narrow stairs",
                        features: ["Large bronze bells", "Rope pull mechanism", "View of harbor", "Bird nests"]
                    }
                ]
            },
            
            npcs: ["priestLeviathan"],
            
            secrets: {
                gmNotes: "The maritime carvings are slowly changing, becoming more disturbing. Father Blackwater keeps records of confessions revealing impossible events.",
                hiddenItems: [
                    {
                        item: "Confession Records",
                        location: "Priest's quarters, locked drawer (Thieves' Tools DC 13)",
                        description: "Detailed notes on parishioners' confessions of underwater visions and transformations"
                    },
                    {
                        item: "Church Funds",
                        location: "Behind altar, hidden compartment (Religion DC 15)",
                        description: "125 gold pieces in donations, kept for church maintenance"
                    }
                ],
                secretDoors: [],
                traps: [],
                observations: [
                    "Maritime carvings seem to shift when not directly observed",
                    "Confessions reveal disturbing patterns of shared nightmares",
                    "Attendance has dropped dramatically in recent months",
                    "Father Blackwater shows signs of stress and sleep deprivation"
                ]
            },
            
            questHooks: [
                "Father Blackwater seeks help understanding his parishioners' strange confessions",
                "Investigation into the changing carvings",
                "Blessing or consecration services for supernatural threats"
            ],
            
            relatedThreats: ["agog"],
            relatedEvents: ["strangeNews"]
        },
        
        prosperityRow: {
            id: "prosperityRow",
            name: "Prosperity Row",
            settlement: "millhaven",
            type: "Abandoned Mansion District",
            description: "Once the most prestigious street in Scrimshaw Bay, Prosperity Row stretches along the hillside overlooking the harbor. Grand Victorian mansions built by whaling captains and processing magnates now stand in various states of decay. Overgrown gardens conceal ornate fountains, while broken windows stare down like empty eyes. Some mansions show signs of recent habitation by desperate squatters or eccentric recluses who've made pacts to sustain themselves in their former glory.",
            publicDescription: "Street of abandoned whaling captain mansions",
            
            layout: {
                mansions: [
                    {
                        name: "Grimwald Manor",
                        owner: "Former Captain Josiah Grimwald",
                        condition: "Partially maintained",
                        current_resident: "Eccentric widow who claims to speak with her dead husband",
                        features: ["Widow's walk with harbor view", "Portrait gallery of sea captains", "Basement wine cellar", "Overgrown hedge maze"]
                    },
                    {
                        name: "Blackthorne Estate",
                        owner: "Former Captain Silas Blackthorne",
                        condition: "Structurally unsound",
                        current_resident: "Squatter family with sick children",
                        features: ["Grand staircase (partially collapsed)", "Ballroom with water damage", "Servant quarters", "Carriage house"]
                    },
                    {
                        name: "Leviathan House",
                        owner: "Former Processing Magnate Cornelius Whale",
                        condition: "Well preserved (suspiciously so)",
                        current_resident: "Ageless gentleman who never emerges during daylight",
                        features: ["Library of maritime lore", "Scrimshaw collection room", "Secret passages", "Underground tunnels to harbor"]
                    },
                    {
                        name: "Meridian Mansion",
                        owner: "Former Captain Thaddeus Meridian",
                        condition: "Completely abandoned",
                        current_resident: "None (but strange lights reported at night)",
                        features: ["Astronomical observatory", "Map room with sea charts", "Hidden vault", "Haunted master bedroom"]
                    },
                    {
                        name: "Mooncrest Villa",
                        owner: "Former Shipping Heiress Adelaide Mooncrest",
                        condition: "Gardens overtaken by carnivorous plants",
                        current_resident: "Hermit botanist studying the mutations",
                        features: ["Greenhouse complex", "Formal gardens (now wild)", "Conservatory", "Plant nursery (corrupted)"]
                    }
                ]
            },
            
            npcs: [],
            
            secrets: {
                gmNotes: "Each mansion holds different secrets and potential allies/enemies. The preserved mansion hides a vampire-like figure with Agog connections. Meridian Mansion contains ghost encounters and hidden treasure. The gardens contain mutated carnivorous plants influenced by bay corruption.",
                hiddenItems: [
                    {
                        item: "Captain's Sea Chest",
                        location: "Meridian Mansion hidden vault (Investigation DC 18)",
                        description: "Contains 250 gold pieces, navigation instruments worth 150 gp, and a logbook describing encounters with 'the Deep Ones'"
                    },
                    {
                        item: "Whaling Fortune Cache",
                        location: "Grimwald Manor basement (behind false wine rack, Perception DC 15)",
                        description: "Emergency fund of 400 gold pieces and jewelry worth 200 gp"
                    },
                    {
                        item: "Agog Corruption Evidence",
                        location: "Leviathan House secret passages (Religion DC 16 to understand)",
                        description: "Ritual chambers with tentacle symbols and preserved specimens showing transformation stages"
                    },
                    {
                        item: "Astronomical Records",
                        location: "Meridian Mansion observatory (Arcana DC 14)",
                        description: "Star charts showing celestial events that correspond to increased supernatural activity in the bay"
                    },
                    {
                        item: "Botanical Research Notes",
                        location: "Mooncrest Villa greenhouse (Nature DC 13)",
                        description: "Detailed studies of plant mutations caused by bay corruption, including potential cures and applications"
                    }
                ],
                secretDoors: [
                    "Leviathan House: Secret passage to harbor tunnels (behind bookshelf, Investigation DC 16)",
                    "Grimwald Manor: Hidden room behind portrait (family secret, Investigation DC 14)",
                    "Blackthorne Estate: Servant's escape tunnel (in pantry, Perception DC 12)"
                ],
                traps: [
                    "Mooncrest Villa: Carnivorous plants in greenhouse (Perception DC 15, Nature DC 13 to safely navigate)",
                    "Meridian Mansion: Collapsing floor in master bedroom (Investigation DC 12 to detect weak boards)",
                    "Blackthorne Estate: Rotten stairs (Acrobatics DC 13 or fall through, taking 1d6 damage)"
                ],
                observations: [
                    "Leviathan House shows no signs of age despite being abandoned for decades",
                    "Strange lights move through Meridian Mansion on moonless nights",
                    "Plants in Mooncrest Villa gardens sometimes move without wind",
                    "Servants' gossip reveals several mansion owners lived far longer than natural",
                    "Underground tunnels connect several mansions to the harbor district"
                ]
            },
            
            questHooks: [
                "Investigate reports of lights and sounds from supposedly empty mansions",
                "Help the squatter family in Blackthorne Estate find proper housing",
                "Research the botanical mutations in Mooncrest Villa for potential remedies",
                "Discover what happened to the missing mansion owners",
                "Explore the tunnel network connecting mansions to the harbor",
                "Confront the ageless resident of Leviathan House about his supernatural nature",
                "Investigate astronomical records for patterns in supernatural events"
            ],
            
            relatedThreats: ["agog"],
            relatedEvents: ["strangeNews"]
        },
        
        boneYards: {
            id: "boneYards",
            name: "The Bone Yards",
            settlement: "millhaven",
            type: "Abandoned Whale Processing Complex",
            description: "A massive industrial complex of interconnected buildings where whales were once processed into oil, bone products, and other valuable materials. The facility stretches along the waterfront like a series of Gothic cathedrals dedicated to maritime industry. Enormous rusted tryworks (oil rendering cauldrons) stand empty, their smokestacks reaching toward the sky. Bone cutting stations with massive saws sit silent, while storage warehouses contain the ghostly remnants of the whaling era. The entire complex reeks of old oil, decay, and something far worse that has taken residence in the abandoned whale oil tanks.",
            publicDescription: "Whale processing facilities, now rusted monuments",
            
            layout: {
                buildings: [
                    {
                        name: "Main Processing Hall",
                        description: "Cavernous building with whale hoisting equipment and flensing stations",
                        features: ["Massive winches and pulleys", "Whale cutting platforms", "Drainage channels (now stagnant)", "Tool storage areas"],
                        hazards: ["Unstable floor grates", "Sharp rusty tools", "Slippery surfaces"]
                    },
                    {
                        name: "The Tryworks",
                        description: "Building housing enormous cauldrons for rendering whale blubber into oil",
                        features: ["Six massive iron cauldrons", "Furnace systems", "Oil collection channels", "Smokestacks"],
                        hazards: ["Toxic fumes from old oil", "Unstable catwalk systems", "Furnace collapse risk"]
                    },
                    {
                        name: "Bone Workshop",
                        description: "Facility for cutting and processing whale bones into corset stays, tools, and scrimshaw blanks",
                        features: ["Bone cutting saws", "Grinding wheels", "Drying racks", "Finished goods storage"],
                        hazards: ["Sharp bone fragments", "Unstable equipment", "Bone dust inhalation"]
                    },
                    {
                        name: "Oil Storage Warehouse",
                        description: "Massive warehouse with rows of whale oil storage tanks",
                        features: ["100+ oil storage barrels", "Loading equipment", "Quality testing station", "Shipping manifests"],
                        hazards: ["Toxic vapors", "Flammable residue", "Corrupted oil transformations"]
                    },
                    {
                        name: "Spermaceti Chamber",
                        description: "Climate-controlled room for processing the valuable spermaceti from sperm whale heads",
                        features: ["Cooling systems", "Separation equipment", "Purity testing area", "Luxury storage vaults"],
                        hazards: ["Chemical contamination", "Preserved specimens", "Strange crystalline formations"]
                    },
                    {
                        name: "Administrative Offices",
                        description: "Multi-story building housing management offices, records, and worker facilities",
                        features: ["Company records", "Worker timesheets", "Financial ledgers", "Maps and shipping routes"],
                        hazards: ["Structural instability", "Mold and rot", "Collapsed sections"]
                    }
                ],
                underground: {
                    tunnels: "Steam tunnels connect all buildings for heating and power distribution",
                    chambers: "Underground storage vaults for the most valuable products",
                    drainage: "Complex drainage system leads to harbor outflow pipes",
                    hazards: ["Flooding during high tide", "Toxic gas accumulation", "Creature lairs"]
                }
            },
            
            npcs: [],
            
            inventory: {
                valuable_items: [
                    {item: "Antique Whaling Tools", location: "Processing Hall tool storage", value: "50-200 gp per set", description: "Well-crafted harpoons, flensing knives, and specialized equipment"},
                    {item: "Whale Bone Stock", location: "Bone Workshop storage", value: "10-50 gp per piece", description: "Raw whale bone suitable for carving or tool making"},
                    {item: "Quality Scrimshaw Blanks", location: "Bone Workshop finishing area", value: "25-100 gp each", description: "Prepared whale teeth and bone for scrimshaw art"},
                    {item: "Spermaceti Reserves", location: "Spermaceti Chamber vaults", value: "100-500 gp per container", description: "Preserved high-quality spermaceti, still valuable to perfumers"}
                ],
                corrupted_substances: [
                    {item: "Transformed Whale Oil", location: "Oil Storage tanks", danger: "High", description: "Oil has become a dark, writhing substance that may be sentient"},
                    {item: "Crystallized Corruption", location: "Spermaceti Chamber", danger: "Extreme", description: "Strange crystals formed from corrupted spermaceti, emanate psychic energy"},
                    {item: "Bone Dust Residue", location: "Bone Workshop air vents", danger: "Medium", description: "Inhalation causes temporary transformation effects"}
                ]
            },
            
            secrets: {
                gmNotes: "The whale oil tanks contain a collective consciousness formed from corrupted oil that may serve as a lesser avatar of Agog. The underground tunnels are home to transformed workers who couldn't escape when the corruption began. Company records reveal the true timeline of when the whales began showing signs of corruption - decades before the economic collapse.",
                hiddenItems: [
                    {
                        item: "Master Production Records",
                        location: "Administrative offices, manager's vault (Thieves' Tools DC 16)",
                        description: "Complete records showing decline in whale quality and first reports of 'diseased' catches dating back 40 years"
                    },
                    {
                        item: "Emergency Company Funds",
                        location: "Administrative offices, hidden floor safe (Investigation DC 17)",
                        description: "800 gold pieces intended for final worker payments, plus company seal and contracts"
                    },
                    {
                        item: "Experimental Corruption Samples",
                        location: "Spermaceti Chamber, refrigerated vault (Arcana DC 15 to understand)",
                        description: "Preserved specimens showing progression of corruption in whale products"
                    },
                    {
                        item: "Workers' Personal Effects",
                        location: "Underground tunnels, makeshift camps (Perception DC 13)",
                        description: "Belongings of workers who hid underground, including diaries describing transformation"
                    },
                    {
                        item: "Quality Control Equipment",
                        location: "Oil Storage, testing station (Investigation DC 12)",
                        description: "Alchemical equipment worth 300 gp, still functional for analyzing substances"
                    }
                ],
                secretDoors: [
                    "Oil Storage: Hidden passage to underground vaults (behind false tank panel, Investigation DC 15)",
                    "Administrative offices: Manager's escape route to docks (behind filing cabinet, Perception DC 14)",
                    "Spermaceti Chamber: Emergency exit to steam tunnels (concealed floor hatch, Investigation DC 16)"
                ],
                traps: [
                    "Oil Storage: Toxic vapor pockets (Constitution save DC 15 or poisoned condition)",
                    "Tryworks: Unstable catwalk collapse (Dexterity save DC 14 or fall 20 feet)",
                    "Underground: Flooding chambers during high tide (Athletics DC 13 to escape)",
                    "Bone Workshop: Spinning blade trap (Investigation DC 15 to detect, Thieves' Tools DC 16 to disarm)"
                ],
                observations: [
                    "The whale oil in storage tanks moves and writhes as if alive",
                    "Strange sounds echo from the underground tunnel system",
                    "Workers' tools are arranged as if someone was just using them",
                    "Company records show profits continued despite reported whale scarcity",
                    "Some storage areas show signs of recent habitation",
                    "Corruption crystals pulse with faint light in rhythm with ocean tides"
                ]
            },
            
            inhabitants: [
                "Transformed workers living in the underground tunnels",
                "Oil collective consciousness in the storage tanks",
                "Scavengers searching for valuable materials",
                "Corrupted rats and seabirds that feed on the residue"
            ],
            
            questHooks: [
                "Investigate the sentient whale oil and its connection to Agog",
                "Rescue or put to rest the transformed workers in the tunnels",
                "Recover valuable whaling equipment and materials for trade",
                "Research company records to understand the timeline of corruption",
                "Safely extract and study corruption samples for potential remedies",
                "Clear the facility of dangers to allow possible renovation",
                "Track down what happened to the facility's management and workers",
                "Investigate the underground tunnel connections to other parts of town"
            ],
            
            relatedThreats: ["agog", "corruptedWhales", "transformedCitizens"],
            relatedEvents: ["strangeNews"]
        },
        
        // Netherwick Locations
        caughtCod: {
            id: "caughtCod",
            name: "The Caught Cod",
            settlement: "netherwick",
            type: "Tavern & Scrimshaw Gallery",
            description: "A weathered tavern that serves as Netherwick's social center. The walls are lined with an extensive collection of maritime scrimshaw that has become increasingly disturbing over time. The pieces seem to move in peripheral vision, depicting scenes that shift between beautiful maritime art and horrific underwater nightmares.",
            publicDescription: "Tavern filled with disturbing maritime scrimshaw",
            
            layout: {
                areas: [
                    {
                        name: "Main Taproom",
                        description: "Common area with tables, bar, and scrimshaw displays",
                        features: ["Long wooden bar", "Tables for 20 patrons", "Scrimshaw collection on walls", "Fireplace (rarely lit)"]
                    },
                    {
                        name: "Private Rooms",
                        description: "Three small rooms for rent (rarely used)",
                        features: ["Simple beds", "Washbasins", "Small windows", "Lock boxes for valuables"]
                    },
                    {
                        name: "Cellar",
                        description: "Storage area for ale barrels and supplies",
                        features: ["Ale and spirits storage", "Food preservation", "Hidden scrimshaw pieces", "Stone walls"]
                    },
                    {
                        name: "Marta's Quarters",
                        description: "Tavern keeper's private living space",
                        features: ["Personal belongings", "Scrimshaw tools", "Locked chest", "Window overlooking docks"]
                    }
                ]
            },
            
            npcs: ["tavernKeeper"],
            
            inventory: {
                drinks: [
                    {item: "Ale", price: "4 cp", quality: "Poor"},
                    {item: "Rum", price: "2 sp", quality: "Decent"},
                    {item: "Whiskey", price: "5 sp", quality: "Good"},
                    {item: "Fish Wine", price: "1 gp", quality: "Local specialty (questionable)"}
                ],
                food: [
                    {item: "Fish Stew", price: "3 cp", description: "Made from daily catch (tastes metallic)"},
                    {item: "Bread", price: "1 cp", description: "Day-old but edible"},
                    {item: "Dried Fish", price: "2 cp", description: "Preserved catch from better times"}
                ],
                services: [
                    {service: "Room for night", price: "5 sp", description: "Simple accommodation"},
                    {service: "Scrimshaw appraisal", price: "1 gp", description: "Marta evaluates maritime artifacts"}
                ]
            },
            
            secrets: {
                gmNotes: "Marta's scrimshaw collection is becoming animated. Some pieces show scenes of current events before they happen. The basement contains the most disturbing pieces that she's hidden away.",
                hiddenItems: [
                    {
                        item: "Prophetic Scrimshaw",
                        location: "Cellar, hidden behind ale barrels (Investigation DC 16)",
                        description: "Three scrimshaw pieces that show disturbing future events involving the party"
                    },
                    {
                        item: "Tavern Earnings",
                        location: "Marta's quarters, locked chest (Thieves' Tools DC 15)",
                        description: "47 gold pieces, silver jewelry worth 25 gp"
                    },
                    {
                        item: "Family Records",
                        location: "Marta's quarters, under floorboard (Perception DC 13)",
                        description: "Genealogy showing Scrimshaw family connection to original whaling fleet captains"
                    }
                ],
                secretDoors: [],
                traps: [],
                observations: [
                    "Scrimshaw pieces appear to move when viewed peripherally",
                    "Patrons avoid looking directly at certain pieces",
                    "Marta talks to the scrimshaw when she thinks no one is listening",
                    "New pieces appear without explanation"
                ]
            },
            
            questHooks: [
                "Marta offers scrimshaw pieces as payment for services",
                "Investigation into the moving artwork",
                "Prophetic scrimshaw reveals future dangers",
                "Family history research using genealogy records"
            ],
            
            relatedThreats: ["agog", "corruptedWhales"],
            relatedEvents: ["whalingWitness", "strangeNews"]
        }
    },

    threats: {
        agog: {
            name: "Agog, Devil of the Deep",
            type: "Cosmic Horror - Titanic Aberration",
            description: "Ancient titanic aberration dwelling in the deepest trenches of the Krivmansk Ocean. Offers warlock pacts to desperate souls and influences the region through psychic whispers and tentacled servants.",
            abilities: ["Tentacle attacks", "Psychic whispers", "Warlock patron", "Regional corruption"],
            influence: ["Dark waters", "Marine mutation", "Madness", "Parasitic infection"],
            stats: "CR 26 (90,000 XP) - See Agog stat block",
            affectedNpcs: ["bayardScrimm", "harborMaster", "villageElder", "companySupervisor"],
            affectedLocations: ["harborTower", "scrimmholmeManor", "fishermanShrine", "canalLocks"],
            affectedSettlements: ["millhaven", "netherwick", "ashford", "thornwick", "fenway"],
            relatedEvents: ["whalingWitness", "strangeNews", "lordInvitation"],
            relatedThreats: ["corruptedWhales", "transformedCitizens"],
            corruptionLevel: "Extreme - Primary source of all regional corruption"
        },
        bayard: {
            name: "Lord Bayard Scrimm",
            type: "Corrupted Aristocrat - Cosmic Horror",
            description: "Ancient aristocrat who has ruled Thornwick Isle for far longer than any mortal should. His body writhes with Agog's tentacled flesh, and he emerges only at night to feed on the living. Sustained by his pact with the Devil of the Deep.",
            abilities: ["Vampire-like longevity", "Night vision", "Tentacled attacks", "Command over sea creatures", "Feeding on the living"],
            influence: ["Controls Thornwick Isle", "Commands corrupted servants", "Spreads Agog's corruption", "Feeds during nighttime raids"],
            stats: "Use Vampire Lord stats with tentacled modifications - CR 15 (13,000 XP)",
            affectedNpcs: ["groundskeeper", "boatman"],
            affectedLocations: ["scrimmholmeManor", "privateDocks", "observatory", "villageBelow"],
            affectedSettlements: ["thornwick"],
            relatedEvents: ["lordInvitation"],
            relatedThreats: ["agog"],
            corruptionLevel: "High - Direct servant of Agog with regional influence"
        },
        corruptedWhales: {
            name: "Corrupted Whaling Operations",
            type: "Body Horror - Environmental Threat",
            description: "Diseased whales infected with black parasites that are harvested and sold to unknown buyers. The parasites gradually transform humanoids into fish-like creatures (Kuo-toa).",
            process: ["Harvest black parasites in jars", "Lance growths for ichor", "Export parasites to buyers", "Crews slowly transform"],
            effects: ["Physical transformation", "Mental corruption", "Loss of humanity", "Aquatic adaptation"],
            timeline: "Transformation takes 2-6 months depending on exposure",
            affectedNpcs: ["netsMender", "tavernKeeper", "villageElder"],
            affectedLocations: ["weatheredDocks", "caughtCod", "fishermanShrine"],
            affectedSettlements: ["millhaven", "netherwick"],
            relatedEvents: ["whalingWitness", "strangeNews"],
            relatedThreats: ["agog", "transformedCitizens"],
            corruptionLevel: "High - Direct vector for Agog's influence"
        },
        transformedCitizens: {
            name: "Fish-Folk Transformation",
            type: "Body Horror - Social Threat",
            description: "Citizens infected by black parasites gradually transform into Kuo-toa. Early stages show webbed fingers and scales, while advanced cases become fully aquatic.",
            stages: [
                "Stage 1: Webbed fingers, minor scales",
                "Stage 2: Gills develop, speech changes",
                "Stage 3: Full aquatic adaptation",
                "Stage 4: Complete Kuo-toa transformation"
            ],
            gameStats: "Use Kuo-toa stat blocks for fully transformed individuals",
            affectedNpcs: ["netsMender", "maintenanceWorker", "groundskeeper", "boatman"],
            affectedLocations: ["netSheds", "ashfordSawmill", "villageBelow", "privateDocks"],
            affectedSettlements: ["netherwick", "ashford", "thornwick"],
            relatedEvents: ["strangeNews", "whalingWitness"],
            relatedThreats: ["agog", "corruptedWhales"],
            corruptionLevel: "Medium - Secondary effect of parasitic exposure"
        },
        ironwoodCorruption: {
            name: "Rotting Ironwood",
            type: "Environmental Horror - Industrial Threat",
            description: "The legendary ironwood timber has begun rotting despite its natural durability, infected by something seeping from the bay waters.",
            effects: ["Structural failures", "Economic collapse", "Strange symbols appearing", "Machinery malfunction"],
            timeline: "Corruption spreads over months, accelerating near water",
            affectedNpcs: ["companySupervisor", "storeClerk", "maintenanceWorker"],
            affectedLocations: ["ashfordSawmill", "lumberYards", "companyStore"],
            affectedSettlements: ["ashford"],
            relatedEvents: ["strangeNews"],
            relatedThreats: ["agog"],
            corruptionLevel: "Medium - Localized but economically devastating"
        },
        bogCorruption: {
            name: "Poisoned Wetlands",
            type: "Environmental Horror - Planar Threat",
            description: "The bog waters have been poisoned by ancient entities, creating dangerous wetlands that lead travelers astray and harbor unnatural creatures.",
            effects: ["Travelers disappear", "Strange lights", "Phosphorescent growth", "Reality distortion"],
            timeline: "Ongoing corruption, worsening during certain moon phases",
            affectedNpcs: ["canalKeeper", "bogGuide", "innKeeper"],
            affectedLocations: ["canalLocks", "bogRoad", "fenwayInn"],
            affectedSettlements: ["fenway"],
            relatedEvents: ["strangeNews"],
            relatedThreats: ["agog"],
            corruptionLevel: "Medium - Isolated but expanding"
        },
        bogCreatures: {
            name: "Bog Creatures",
            type: "Environmental Threat - Natural Hazards",
            description: "The Boglands are home to dangerous amphibious creatures including Bogskaldr, occasional Marsh Giants, and elusive Marshwalker Elves. While not directly corrupted by Agog, they make bog travel extremely perilous.",
            creatures: [
                {
                    name: "Bogskaldr",
                    cr: "3 (700 XP)",
                    description: "Large amphibious monstrosities with plant symbiosis, excellent at ambush tactics",
                    abilities: ["Plant Camouflage", "Symbiotic Respiration", "Ambush attacks", "Swampy Retaliation"]
                },
                {
                    name: "Marsh Giant",
                    cr: "6 (2,300 XP)", 
                    description: "Huge giants with symbiotic marsh plant skin, nearly invisible when motionless",
                    abilities: ["Symbiotic Skin Camouflage", "Grasping Weeds", "Marshland Retribution", "Hold Breath 1 hour"]
                },
                {
                    name: "Marshwalker Elf Archer",
                    cr: "4 (1,100 XP)",
                    description: "Elusive elven archers adapted to wetland life with druidic magic",
                    abilities: ["Marshland Stride", "Heightened Senses", "Lean Back Shot", "Instinctive Aim"]
                },
                {
                    name: "Marshwalker Elf Caster",
                    cr: "5 (1,800 XP)",
                    description: "Elven druids with acid magic and marsh adaptation",
                    abilities: ["Druid Spellcasting", "Acid Arrow", "Marshland Retaliation", "Marshland Stride"]
                }
            ],
            encounter_notes: [
                "Bogskaldr often hunt in pairs, using ambush tactics from murky water",
                "Marsh Giants are solitary and territorial, but not inherently hostile",
                "Marshwalker Elves are rarely seen and may aid or hinder travelers based on their intentions",
                "All bog creatures have advantage in their native wetland environment"
            ],
            affectedNpcs: ["bogGuide", "canalKeeper", "innKeeper"],
            affectedLocations: ["canalLocks", "bogRoad", "portageStation"],
            affectedSettlements: ["fenway"],
            relatedEvents: ["bogTravel", "strangeNews"],
            relatedThreats: ["bogCorruption"],
            corruptionLevel: "Low - Natural hazards rather than supernatural corruption"
        }
    },

    events: {
        whalingWitness: {
            name: "Witnessing Corrupted Whaling",
            description: "Players observe a whaling operation where crews harvest black parasites from diseased whales and collect ichor from strange growths.",
            trigger: "Traveling by sea or investigating fishing activities",
            outcomes: ["Horror at the process", "Investigation of buyers", "Confrontation with crews"],
            hooks: ["Who buys these parasites?", "Why are the whales diseased?", "What happened to missing crew members?"],
            relatedNpcs: ["netsMender", "tavernKeeper", "villageElder"],
            relatedLocations: ["weatheredDocks", "caughtCod"],
            relatedThreats: ["agog", "corruptedWhales", "transformedCitizens"]
        },
        strangeNews: {
            name: "Reports of Missing Persons",
            description: "Multiple settlements report citizens vanishing, with some later found transformed or speaking in unknown tongues.",
            trigger: "Speaking with locals in any settlement",
            outcomes: ["Investigation requests", "Family pleas for help", "Reward offers"],
            hooks: ["Pattern in disappearances", "Connection to whaling", "Underwater discoveries"],
            relatedNpcs: ["harborMaster", "priestLeviathan", "innKeeper", "companySupervisor"],
            relatedLocations: ["harborTower", "stLeviathan", "fenwayInn", "supervisorMansion"],
            relatedThreats: ["agog", "transformedCitizens", "corruptedWhales"]
        },
        bogTravel: {
            name: "Dangerous Bog Passage",
            description: "Players must traverse the treacherous Boglands, facing both supernatural corruption and natural predators including Bogskaldr ambushes, territorial Marsh Giants, and encounters with mysterious Marshwalker Elves.",
            trigger: "Attempting to travel through the Boglands or following the Old Bog Road",
            outcomes: ["Creature encounters", "Navigation challenges", "Discovery of abandoned settlements", "Marshwalker Elf contact"],
            hooks: ["What happened to the missing bog settlements?", "Why do the Marshwalker Elves avoid outsiders?", "What lies deeper in the corrupted wetlands?"],
            encounter_table: [
                "1-2: Bogskaldr ambush from murky water (1-2 creatures)",
                "3: Territorial Marsh Giant demands tribute or passage rites",
                "4: Marshwalker Elf Archer shadows the party, testing their intentions",
                "5: Marshwalker Elf Caster offers cryptic guidance or warnings",
                "6: Signs of larger, unknown bog creatures (tracks, territorial markings)"
            ],
            relatedNpcs: ["bogGuide", "canalKeeper", "innKeeper"],
            relatedLocations: ["bogRoad", "canalLocks", "portageStation"],
            relatedThreats: ["bogCreatures", "bogCorruption"]
        },
        lordInvitation: {
            name: "Invitation to Scrimmholme",
            description: "Lord Bayard Scrimm extends a rare invitation to visit his estate on Thornwick Isle, usually only given to those he wishes to evaluate or corrupt.",
            trigger: "Players gain local reputation or possess something of interest",
            outcomes: ["Dinner invitation", "Tour of estate", "Revelation of true nature"],
            hooks: ["Why is he interested?", "What does he want?", "How to escape alive?"],
            relatedNpcs: ["bayardScrimm", "groundskeeper", "boatman"],
            relatedLocations: ["scrimmholmeManor", "privateDocks", "observatory"],
            relatedThreats: ["agog"]
        },
        hagEncounter: {
            name: "Summoning Bettey Nettle",
            description: "Players learn of the bog hag Bettey Nettle and her husband Ol' Clattershanks, who can be summoned through a ritual involving blue flames in the bogs at night. Despite their fearsome appearance, they offer trades in potions, balms, and magical boons.",
            trigger: "Asking locals about bog magic, potions, or supernatural aid",
            ritual_requirements: [
                "Travel the bogs at night",
                "Search for a ring of blue flames (Investigation DC 15)",
                "Recite the rhyming call to Bettey Nettle and Clattershanks (Performance or Religion DC 12)",
                "Approach Gulpgrin when summoned (Courage check optional)"
            ],
            outcomes: ["Successful summoning of Gulpgrin", "Discovery of the Winter Court portal", "Trading session with the hag couple", "Potential fae realm adventure"],
            hooks: ["What brought them to the Winter Court?", "What prices do they demand for powerful boons?", "How does their portal affect the bog's corruption?", "What secrets do they know about Queen Morrighan?"],
            gulpgrin_details: {
                name: "Gulpgrin",
                description: "A massive frog creature that emerges from the muddy bog when properly summoned. Its cavernous mouth contains an ancient wooden door with a lantern, serving as a portal to Bettey and Clattershanks' home in the Winter Court.",
                mechanics: "Perception DC 10 to notice the light and door within its throat"
            },
            winter_court_clues: {
                observation: "Looking out windows reveals an unrecognizable snowy landscape",
                arcana_check: "DC 15 Arcana check reveals they are in the Winter Court of the Fae Realm",
                implications: "Connection to Queen Morrighan's domain and fae politics"
            },
            relatedNpcs: ["betteyNettle", "clattershanks", "bogGuide"],
            relatedLocations: ["bogRoad", "canalLocks"],
            relatedThreats: ["bogCorruption"]
        }
    },

    lore: {
        whalingEra: {
            title: "The Golden Age of Whaling",
            content: "Scrimshaw Bay was once the heart of a thriving whaling industry. Massive whales provided oil for lamps, bone for corsets and tools, and ambergris for perfumes. The wealth from whaling built the grand mansions and funded the elaborate processing facilities.",
            connections: ["Economic foundation", "Social hierarchy", "Current corruption"]
        },
        ironwoodTrade: {
            title: "Ironwood Commerce",
            content: "The region served as the sole export point for ironwood timber from Timber Giant territories. This incredibly durable wood was essential for shipbuilding and fetched premium prices across the known world.",
            connections: ["Canal system", "Economic prosperity", "Current rot and decay"]
        },
        decline: {
            title: "The Great Decline",
            content: "Overharvesting depleted whale populations while the opening of trade routes through Greylocke bypassed the bay entirely. The economic collapse led to mass emigration, leaving only the desperate and the strange.",
            connections: ["Current poverty", "Desperation enabling corruption", "Abandoned infrastructure"]
        },
        agogInfluence: {
            title: "The Deep Corruption",
            content: "Agog's influence has been slowly seeping into the bay for decades. The remaining whales fled not just from overhunting but from the aberrant presence. Those who stayed have been gradually corrupted.",
            connections: ["Whale behavior changes", "Marine mutations", "Human transformations"]
        }
    }
};

// Export for use in other files
// Export for ES modules
export { campaignData };