# Scrimshaw Bay Campaign Guide

A web application for managing the Scrimshaw Bay Gothic Horror campaign.

## Features

- **Quick Navigation**: Easy access to all campaign information
- **Settlement Details**: Comprehensive information for each location
- **NPC Database**: Character details, motivations, and secrets
- **Threat Tracking**: Information on cosmic horrors and corrupted entities
- **Event Management**: Strange events and adventure hooks
- **Lore Repository**: Background information and world-building

## Structure

```
scrimshaw-bay/
├── index.html          # Main application file
├── css/
│   └── styles.css      # Gothic horror themed styling
├── js/
│   ├── data.js         # Campaign data structure
│   └── app.js          # Application logic and interactions
└── data/               # Reserved for future data files
```

## Getting Started

1. Open `index.html` in a web browser
2. Navigate using the main menu buttons
3. Click on settlements or NPCs for detailed information
4. Use the threat details buttons for expanded information

## Adding Content

### Adding New Settlements
Edit `js/data.js` and add new settlement objects to the `settlements` section:

```javascript
newSettlement: {
    name: "Settlement Name",
    type: "Settlement Type", 
    population: "~XXX",
    description: "Description text...",
    notableLocations: ["Location 1", "Location 2"],
    inhabitants: ["Inhabitant 1", "Inhabitant 2"],
    darkSecrets: ["Secret 1", "Secret 2"]
}
```

### Adding New NPCs
Add NPC objects to the `npcs` section:

```javascript
npcKey: {
    name: "NPC Name",
    location: "Settlement Name",
    role: "Role/Title",
    description: "Character description...",
    secrets: ["Secret 1", "Secret 2"],
    abilities: ["Ability 1", "Ability 2"],
    motivations: ["Motivation 1", "Motivation 2"]
}
```

### Adding New Threats
Add threat objects to the `threats` section:

```javascript
threatKey: {
    name: "Threat Name",
    type: "Threat Category",
    description: "Threat description...",
    abilities: ["Ability 1", "Ability 2"],
    influence: ["Effect 1", "Effect 2"],
    stats: "Game mechanical information"
}
```

### Adding New Events
Add event objects to the `events` section:

```javascript
eventKey: {
    name: "Event Name",
    description: "Event description...",
    trigger: "What triggers this event",
    outcomes: ["Outcome 1", "Outcome 2"],
    hooks: ["Hook 1", "Hook 2"]
}
```

### Adding New Lore
Add lore objects to the `lore` section:

```javascript
loreKey: {
    title: "Lore Title",
    content: "Lore content...",
    connections: ["Connection 1", "Connection 2"]
}
```

## Customization

### Styling
- Edit `css/styles.css` to modify the Gothic horror theme
- CSS variables at the top of the file control colors and fonts
- The design uses a dark theme with muted colors

### Functionality
- `js/app.js` contains all interactive behavior
- Modal system for detailed threat information
- Responsive navigation between sections
- Settlement detail rendering system

## Browser Compatibility

- Works in all modern browsers
- No external dependencies required
- Uses ES6+ features (const, arrow functions, template literals)
- Responsive design for mobile and desktop

## New Features

### NPC Integration
- **Clickable NPC Links**: NPCs appear as buttons in their associated locations
- **NPC Modals**: Click any NPC for detailed popup with secrets, abilities, and motivations
- **Key NPCs Section**: Important NPCs highlighted separately in each settlement
- **Cross-Reference**: Easy navigation between locations and characters

### Location System ✅ COMPLETED
- **Detailed Location Pages**: Comprehensive location modals with layout, inventory, and GM information
- **GM-Only Sections**: Special red-themed sections with hidden items, secrets, and observations
- **Interactive Elements**: Clickable location details and NPC links
- **Business Inventories**: Full pricing and service information for taverns and shops
- **Area Layouts**: Floor-by-floor or area-by-area descriptions with features
- **Network Connections**: Links to related NPCs, threats, and events

### Enhanced Settlement Pages
- **Better Organization**: Clear separation between locations, NPCs, and secrets
- **Interactive Elements**: Clickable NPCs and location detail buttons (marked with 📄)
- **Visual Hierarchy**: Improved layout with better information grouping
- **Detail Indicators**: Locations with full detail pages show a 📄 icon

### Completed Location Details
Currently implemented detailed location pages:
- **Harbor Master's Tower** (Millhaven) - Complete with lighthouse layout and GM secrets
- **St. Leviathan's Church** (Millhaven) - Gothic cathedral with disturbing carvings
- **The Caught Cod** (Netherwick) - Tavern with full inventory and scrimshaw gallery

### Adding Location Details
To add a new detailed location page:

1. **Update the settlement data**: Change `hasDetails: false` to `hasDetails: true` for the location
2. **Add to locations section in `js/data.js`**:
```javascript
locationId: {
    id: "locationId",
    name: "Location Name",
    settlement: "settlementName",
    type: "Location Type",
    description: "Detailed description for players...",
    publicDescription: "Short description shown in settlement list",
    
    layout: {
        floors: [ // or areas: [
            {
                name: "Area Name",
                description: "Area description...",
                features: ["Feature 1", "Feature 2"]
            }
        ]
    },
    
    inventory: { // For businesses like taverns, shops
        drinks: [
            {item: "Ale", price: "4 cp", quality: "Poor"}
        ],
        food: [
            {item: "Stew", price: "3 cp", description: "Made from daily catch"}
        ],
        services: [
            {service: "Room for night", price: "5 sp", description: "Simple accommodation"}
        ]
    },
    
    npcs: ["npcKey1", "npcKey2"],
    
    secrets: {
        gmNotes: "GM-only information about the location...",
        hiddenItems: [
            {
                item: "Hidden Treasure",
                location: "Behind bookshelf (Investigation DC 15)",
                description: "What the item contains or does"
            }
        ],
        observations: [
            "GM observation 1",
            "GM observation 2"
        ]
    },
    
    questHooks: [
        "Adventure hook 1",
        "Adventure hook 2"
    ],
    
    relatedThreats: ["threatKey1"],
    relatedEvents: ["eventKey1"]
}
```

### Location Features
- **Layout System**: Support for both `floors` (multi-story buildings) and `areas` (single-level locations)
- **Business Inventory**: Complete pricing for drinks, food, and services
- **GM Secrets**: Hidden items with skill check requirements and descriptions
- **Network Integration**: Automatic linking to NPCs, threats, and events
- **Visual Styling**: GM sections have distinct red styling to differentiate from player content

### Linking NPCs to Locations
NPCs are automatically linked to locations through the `npcs` array in each location object. When you:
- Add an NPC key to a location's `npcs` array, they'll appear as a clickable link
- Add NPCs to a settlement's `keyNpcs` array, they'll show in the Key NPCs section
- Click any NPC link, it opens a detailed modal with their information

## Future Enhancements

- Session notes tracking
- Player character management
- Timeline tracking
- Random encounter tables
- Weather and mood generators
- Map integration

## Campaign Themes

The application supports the following Gothic Horror themes:
- Cosmic horror (Lovecraftian elements)
- Body horror (transformation and corruption)
- Gothic decay (crumbling aristocracy and infrastructure)
- Maritime horror (sea-based threats and folklore)
- Psychological horror (madness and paranoia)