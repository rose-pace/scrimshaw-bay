# Settlement Layout Components

This directory contains components for displaying settlement geographical layout information, including structure and district details.

## Components

### SettlementLayout
Main orchestrating component that displays complete settlement layout information.

**Usage:**
```javascript
const layout = SettlementLayout.create();
layout.setLayoutData(layoutData);
```

### StructureSection
Displays the geographical structure of a settlement (main areas, approach, etc.).

### DistrictCard
Individual district display with name, description, and buildings list.

### StructureItem
Atomic component for individual structure aspects (e.g., "main_area", "docks").

### BuildingsList
Displays list of buildings and landmarks within a district.

## Architecture

All components extend `ShadowComponent` and follow these patterns:

- **Factory Methods**: Use `ComponentName.create()` instead of `document.createElement()`
- **Slot Management**: Use `safeSlotAssign()` for slot content management
- **Deferred Rendering**: Components handle data before being connected to DOM
- **Event-Driven**: Components listen for `componentReady` events

## Data Structure

The components expect layout data in this format:

```javascript
{
  structure: {
    main_area: "Description of main area",
    docks: "Description of docks",
    work_areas: "Description of work areas",
    // ... other structure fields
  },
  districts: [
    {
      name: "District Name",
      description: "District description",
      buildings: [
        "Building 1",
        "Building 2",
        // ... more buildings
      ]
    }
    // ... more districts
  ]
}
```

## Integration

The Settlement Layout is automatically integrated into settlement detail views when layout data is available. It appears between the settlement description and other content sections.

## Accessibility

All components follow accessibility best practices:
- Proper semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly content structure
