# Scrimshaw Bay Campaign Guide

A modern, modular web application for managing the Scrimshaw Bay Gothic Horror campaign. Built with ES6 modules and component-based architecture for enhanced maintainability and user experience.

## Features

- **Quick Navigation**: Smooth section switching with keyboard support
- **Settlement System**: Interactive settlement cards with detailed views
- **NPC Database**: Complete character management with modal details
- **Threat Tracking**: Categorized threat display with corruption indicators
- **Event Management**: Rich event cards with encounters and adventure hooks
- **Location Details**: Comprehensive location pages with GM-only sections
- **Modal System**: Accessible, keyboard-navigable information popups
- **Responsive Design**: Mobile-friendly interface across all devices

## Architecture

The application uses a modern modular architecture with ES6 modules and follows clean architecture principles:

### Design Patterns
- **Component Pattern**: Self-contained UI components with their own logic and styles
- **Service Layer**: Singleton services for data access and modal management
- **Module Pattern**: ES6 modules with explicit imports/exports
- **Observer Pattern**: Event-driven architecture with proper cleanup
- **Singleton Pattern**: Centralized services (DataService, ModalService)

### Code Organization
- **Separation of Concerns**: UI, business logic, and data access are clearly separated
- **Single Responsibility**: Each component has a focused purpose
- **Dependency Injection**: Services are injected into components
- **Error Boundaries**: Comprehensive error handling throughout the application

```
scrimshaw-bay/
├── index.html                  # Main application entry point
├── src/                        # Modular source code
│   ├── components/             # Reusable UI components
│   │   ├── event-card/         # Event display component
│   │   ├── location-detail/    # Location detail component
│   │   ├── modal/              # Modal system with accessibility
│   │   ├── navigation/         # Navigation component
│   │   ├── npc-card/           # NPC display component
│   │   ├── settlement-card/    # Settlement display component
│   │   └── threat-card/        # Threat display component
│   ├── services/               # Business logic services
│   │   ├── data-service.js     # Centralized data access
│   │   └── modal-service.js    # Modal management
│   ├── styles/                 # Modular CSS architecture
│   │   ├── variables.css       # CSS custom properties
│   │   ├── base.css           # Base styles and reset
│   │   ├── layout.css         # Layout and grid systems
│   │   └── index.css          # Main CSS entry point
│   ├── utils/                  # Utility functions
│   │   └── dom-utils.js       # DOM manipulation helpers
│   ├── app.js                  # Main application orchestrator
│   └── index.js               # Application entry point
├── js/                         # Campaign data
│   └── data.js                # Campaign data structure (ES6 modules)
├── test/                       # Testing utilities
│   └── app-tests.js           # Component tests
└── jsconfig.json              # Path mapping configuration
```

## Getting Started

### Quick Start
1. **Start the development server**: `npm start` or `npm run dev`
2. **Open in browser**: Navigate to `http://localhost:8080`
3. **Navigate using the main menu**: Click section buttons to explore content
4. **Interactive elements**: Click on settlements, NPCs, or threat details for modal information
5. **Keyboard navigation**: Use Tab/Enter for accessibility support

### Available Scripts
- `npm start` - Start the local development server on port 8080
- `npm run dev` - Alias for start (development server)
- `npm test` - Run the Node.js-compatible test suite
- `npm run test:browser` - Instructions for running browser tests
- `npm run serve` - Alternative command to start the server
- `npm run validate` - Validate project structure and run tests
- `npm run lint` - Placeholder for future linting setup

### Architecture Migration
This application was recently refactored from a monolithic structure to a modular architecture. The migration preserved all original functionality while adding:
- **ES6 Module System**: Clean import/export structure with import maps
- **Component-Based Design**: Reusable, self-contained UI components
- **Service Layer**: Centralized business logic and data access
- **Modular CSS**: Component-specific styles with CSS custom properties
- **Enhanced Accessibility**: Keyboard navigation and ARIA support
- **Error Handling**: Comprehensive error boundaries and logging

Both the JavaScript and CSS architectures have been fully migrated to modern, modular patterns.

See `ARCHITECTURE_COMPLETE.md` for JavaScript migration details.
See `CSS_MIGRATION_COMPLETE.md` for CSS migration details.

## Development

### Quick Start for Developers
1. **Clone and Setup**: No dependencies to install - pure ES6 modules
2. **Start Development**: `npm start` (starts server on http://localhost:8080)
3. **Run Tests**: `npm test` (Node.js data structure validation)
4. **Validate Project**: `npm run validate` (full project validation)

### Modern Architecture
The application uses a modern ES6 module architecture with:
- **Component-based design**: Each UI element is self-contained
- **Service layer**: Centralized business logic and data access
- **Modular CSS**: CSS custom properties and component-specific styles
- **Utility functions**: Shared DOM manipulation and helper functions
- **Error handling**: Comprehensive error boundaries and logging
- **Import Maps**: Clean, absolute-style imports using `@/` prefix paths

### Import Map System
The application uses browser-native import maps for clean import paths:
- `@/` - Maps to `./src/` (e.g., `@/app.js`)
- `@/components/` - Maps to `./src/components/` (e.g., `@/components/modal/modal.js`)
- `@/services/` - Maps to `./src/services/` (e.g., `@/services/data-service.js`)
- `@/utils/` - Maps to `./src/utils/` (e.g., `@/utils/dom-utils.js`)
- `@/styles/` - Maps to `./src/styles/` (e.g., `@/styles/variables.css`)
- `data` - Maps to `./js/data.js` (campaign data)

### Component Architecture
The application uses a modular component system where each UI element is self-contained:

- **Components**: Located in `src/components/`, each has its own JS and CSS files
- **Services**: Business logic in `src/services/` for data access and modal management
- **Utilities**: Shared functions in `src/utils/` for DOM manipulation and helpers
- **Styles**: Modular CSS with variables in `src/styles/`

### Adding New Components
1. Create component directory: `src/components/component-name/`
2. Add `component-name.js` and `component-name.css`
3. Implement component class with consistent naming conventions
4. Import in main app: `import { ComponentName } from '@/components/component-name/component-name.js'`
5. Add CSS import to `src/styles/index.css`
6. Use clean import paths with `@/` prefix for all internal imports

### Development Workflow
- **Local Development**: Use `npm start` to run the development server
- **Module System**: ES6 imports/exports with import maps for clean paths
- **Import Paths**: Use `@/` prefix for clean imports (e.g., `@/services/data-service.js`)
- **Testing**: 
  - Run `npm test` for Node.js-compatible data structure tests
  - Open browser and check console for full component tests
  - Use `npm run test:browser` for browser testing instructions
- **Error Handling**: Built-in error boundaries and console logging
- **Accessibility**: Keyboard navigation and ARIA support throughout

### Code Quality Standards
- **ES6+ Syntax**: Modern JavaScript features throughout
- **Consistent Naming**: camelCase for variables/functions, PascalCase for classes
- **JSDoc Documentation**: Function documentation and type annotations
- **Error Handling**: Try-catch blocks and graceful degradation
- **Event Cleanup**: Proper event listener management and memory cleanup
- **Accessibility**: ARIA attributes and keyboard navigation support

## Adding Content

### Adding New Settlements
Edit `js/data.js` and add new settlement objects to the `settlements` section:

```javascript
newSettlement: {
    name: "Settlement Name",
    type: "Settlement Type", 
    population: "~XXX",
    description: "Description text...",
    notableLocations: [
        {
            id: "locationId",
            name: "Location Name",
            shortDesc: "Brief description",
            hasDetails: true, // Set to true for detailed location pages
            npcs: ["npcKey1", "npcKey2"]
        }
    ],
    keyNpcs: ["importantNpcKey1", "importantNpcKey2"],
    darkSecrets: ["Secret 1", "Secret 2"]
}
```

### Adding New NPCs
Add NPC objects to the `npcs` section:

```javascript
npcKey: {
    name: "NPC Name",
    location: "settlementKey",
    role: "Role/Title",
    description: "Character description...",
    services: ["Service 1", "Service 2"], // Optional
    knowledge: [ // Optional
        {
            topic: "Knowledge Topic",
            info: "What they know about this topic"
        }
    ],
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
    type: "Threat Category", // e.g., "Cosmic Horror", "Body Horror"
    description: "Threat description...",
    abilities: ["Ability 1", "Ability 2"],
    influence: ["Regional Effect 1", "Regional Effect 2"],
    weaknesses: ["Weakness 1", "Weakness 2"], // Optional
    stats: "Game mechanical information", // Optional
    corruptionLevel: "Low" // Optional: "Low", "Medium", "High", "Extreme"
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
- Edit `src/styles/variables.css` to modify the Gothic horror theme
- CSS custom properties control colors, fonts, and spacing
- Component-specific styles in `src/components/*/component-name.css`
- The design uses a dark theme with muted colors and Gothic elements

### Functionality
- `src/app.js` orchestrates the main application behavior
- Component-specific logic in `src/components/*/component-name.js`
- Service layer in `src/services/` for data access and modal management
- Utility functions in `src/utils/` for DOM manipulation and helpers

## Browser Compatibility

- Works in all modern browsers with ES6 module support
- No external dependencies or build tools required
- Uses ES6+ features (modules, const, arrow functions, template literals)
- Responsive design for mobile and desktop
- Requires local server for development (ES6 modules don't work with file:// protocol)

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

### Architecture Improvements
- **Webpack bundling**: Optimize for production deployment
- **TypeScript**: Add type safety and better IDE support
- **Testing framework**: Comprehensive unit and integration tests
- **Build pipeline**: Automated testing and deployment

### Feature Additions
- Session notes tracking
- Player character management
- Timeline tracking
- Random encounter tables
- Weather and mood generators
- Map integration
- Campaign journal system
- Initiative tracker

## Troubleshooting

### Common Issues
- **Blank page**: Ensure you're using `npm start` (not file:// protocol) for ES6 modules
- **Import errors**: Check that all file paths in imports are correct and use proper extensions
- **Console errors**: Open browser developer tools to see detailed error messages
- **Missing styles**: Verify that `src/styles/index.css` imports all component stylesheets

### Development Tips
- Use `npm start` for consistent development server setup
- Use browser developer tools to debug component behavior
- Check the console for detailed error messages with stack traces
- Test changes incrementally to isolate issues
- Use `npm test` to run the test suite for component validation

## Project Files

### Legacy Files (Preserved)
- `js/app.js` - Original monolithic application (unused)
- `css/styles.css` - Original stylesheet (unused)
- These files are preserved for reference but not used in the current architecture

## Campaign Themes

The application supports the following Gothic Horror themes:
- Cosmic horror (Lovecraftian elements)
- Body horror (transformation and corruption)
- Gothic decay (crumbling aristocracy and infrastructure)
- Maritime horror (sea-based threats and folklore)
- Psychological horror (madness and paranoia)