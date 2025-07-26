# Layout Components

A standardized system for displaying location layouts consisting of three components that work together to render buildings, mansions, floors, shrine areas, and other layout types.

## Components

### layout-wrapper
Main container component that holds layout groups.

**Usage:**
```javascript
const layoutWrapper = LayoutWrapper.create();
layoutWrapper.setLayoutData(layoutData);
```

### layout-group  
Groups related layout items under a common title.

**Usage:**
```javascript
const layoutGroup = LayoutGroup.create();
layoutGroup.setGroupData(groupData);
```

### layout-item
Individual layout items like buildings, floors, or shrine areas.

**Usage:**
```javascript
const layoutItem = LayoutItem.create();
layoutItem.setItemData(itemData);
```

## Data Structure

All layouts now use the standardized format:

```javascript
layout: {
  groups: [
    {
      title: "Buildings",           // Group title
      type: "primary|secondary",    // Styling type
      items: [
        {
          name: "Building Name",
          description: "Description text",
          fields: {                 // Custom fields (owner, condition, deity, etc.)
            owner: "...",
            condition: "...",
            deity: "..."
          },
          features: ["feature1", "feature2"],  // Optional
          hazards: ["hazard1"],                // Optional, styled in red
          offerings: ["offering1"]             // Optional, for shrines
        }
      ]
    }
  ]
}
```

## Examples

### Buildings (like Bone Yards)
```javascript
layout: {
  groups: [
    {
      title: "Buildings",
      type: "primary",
      items: [
        {
          name: "Main Processing Hall",
          description: "Cavernous building with whale equipment",
          features: ["Massive winches", "Whale cutting platforms"],
          hazards: ["Unstable floor grates", "Sharp rusty tools"]
        }
      ]
    },
    {
      title: "Underground Areas", 
      type: "secondary",
      items: [...]
    }
  ]
}
```

### Mansions (like Prosperity Row)
```javascript
layout: {
  groups: [
    {
      title: "Mansions",
      type: "primary", 
      items: [
        {
          name: "Grimwald Manor",
          description: "A partially maintained mansion",
          fields: {
            owner: "Former Captain Josiah Grimwald",
            condition: "Partially maintained",
            currentResident: "Eccentric widow"
          },
          features: ["Widow's walk", "Portrait gallery"]
        }
      ]
    }
  ]
}
```

### Shrine Areas (like Fisherman's Shrine)
```javascript
layout: {
  groups: [
    {
      title: "Shrine Areas",
      type: "primary",
      items: [
        {
          name: "Main Shrine", 
          description: "Central stone altar with wave patterns",
          fields: {
            deity: "Thessa"
          },
          offerings: ["Fish bones", "Small coins", "Ship models"]
        }
      ]
    }
  ]
}
```

## Styling

- **Primary groups**: Larger, more prominent titles
- **Secondary groups**: Smaller, italic titles  
- **Hazards**: Automatically styled in red (#d32f2f)
- **Offerings**: Styled in accent color, italic
- **Fields**: Custom key-value pairs with formatted labels
- **Responsive**: Automatically adjusts to screen size

## Integration

The `LocationDetailModal` automatically detects the new format and uses these components. Legacy village layouts continue to use the existing `VillageLayout` component.
