# Responsive Grid Component

A flexible grid component that automatically adjusts column count based on screen size and maximum column configuration.

## Usage

```javascript
import { ResponsiveGrid } from '@/components/responsive-grid/responsive-grid.js';

// Create grid with 4 column maximum
const grid = ResponsiveGrid.create(4);
grid.setGridData(itemsArray, 4);

// Or create with default 4 columns
const grid = ResponsiveGrid.create();
grid.setGridData(itemsArray);
```

## Column Configurations

The grid supports 2-8 maximum columns with intelligent responsive breakpoints:

### 2 Columns Max
- **Mobile (< 768px)**: 1 column
- **Medium+ (≥ 768px)**: 2 columns

### 3 Columns Max  
- **Mobile (< 640px)**: 1 column
- **Small (≥ 640px)**: 2 columns
- **Large+ (≥ 1024px)**: 3 columns

### 4 Columns Max (Default)
- **Mobile (< 640px)**: 1 column
- **Small (≥ 640px)**: 2 columns  
- **Large (≥ 1024px)**: 3 columns
- **Extra Large+ (≥ 1280px)**: 4 columns

### 5-8 Columns Max
Progressively add more columns at larger breakpoints, always maintaining usability on smaller screens.

## Features

- **Responsive Design**: Automatically adjusts to screen size
- **Flexible Column Count**: 2-8 maximum columns supported
- **Accessibility**: Proper ARIA roles and focus management
- **Empty State**: Graceful handling when no items provided
- **Component Integration**: Works with any HTML elements or web components

## API

### Methods

- `setGridData(items, maxColumns)` - Set grid items and column configuration
- `addItem(item)` - Add single item to existing grid
- `clearItems()` - Remove all items from grid
- `static create(maxColumns)` - Factory method to create new grid

### Properties

- `maxColumns` - Maximum number of columns (2-8)
- `gridItems` - Array of current grid items

## CSS Custom Properties

The component uses standard CSS variables for spacing, colors, and transitions defined in the project's design system.
