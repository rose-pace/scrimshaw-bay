# Accordion Components

A set of reusable, accessible accordion components for creating collapsible content sections. Built with Web Components and shadow DOM for encapsulation and performance.

## Components Overview

### 1. `accordion.js` - Accordion Wrapper
The main container that manages accordion behavior and item interactions.

### 2. `accordion-item.js` - Generic Accordion Item
A flexible accordion item component for any type of content.

## Basic Usage

### Simple Accordion

```html
<!-- Import the components -->
<script type="module">
  import './src/components/accordion/accordion.js';
  import './src/components/accordion/accordion-item.js';
</script>

<!-- Use in HTML -->
<accordion-wrapper>
  <accordion-item>
    <div slot="header">
      <h3>Section 1</h3>
    </div>
    <div slot="content">
      <p>Content for section 1 goes here...</p>
    </div>
  </accordion-item>
  
  <accordion-item>
    <div slot="header">
      <h3>Section 2</h3>
    </div>
    <div slot="content">
      <p>Content for section 2 goes here...</p>
    </div>
  </accordion-item>
</accordion-wrapper>
```

### Exclusive Mode (Only One Open at a Time)

```html
<accordion-wrapper exclusive>
  <accordion-item>
    <!-- content -->
  </accordion-item>
  <accordion-item>
    <!-- content -->
  </accordion-item>
</accordion-wrapper>
```

### Programmatic Usage

```javascript
// Import the components (this registers them and provides factory methods)
import { Accordion } from './src/components/accordion/accordion.js';
import { AccordionItem } from './src/components/accordion/accordion-item.js';

// Create accordion using factory method (recommended)
const accordion = Accordion.create();
accordion.setAttribute('exclusive', '');

// Create items using factory method
const item1 = AccordionItem.create();
item1.setHeader('Dynamic Header');
item1.setContent('Dynamic content');

accordion.appendChild(item1);
document.body.appendChild(accordion);

// Control accordion
accordion.expandAll();      // Expand all (if not exclusive)
accordion.collapseAll();    // Collapse all
accordion.getExpandedItems(); // Get currently expanded items
```

**Why use factory methods?**
- Eliminates brittle string dependencies on element tag names
- Provides a clear reason to import the component class
- Enables better IDE autocompletion and type checking
- Makes refactoring easier if tag names change

## NPC Accordion Usage

For specialized NPC accordion items, see the Background NPCs component documentation. The accordion components can be extended for domain-specific use cases:

```javascript
// Import base accordion components
import { Accordion } from './src/components/accordion/accordion.js';
import { AccordionItem } from './src/components/accordion/accordion-item.js';

// Import specialized NPC component from background-npcs
import { BackgroundNpcAccordionItem } from './src/components/background-npcs/background-npc-accordion-item.js';

// Create NPC accordion using factory methods
const npcAccordion = Accordion.create();

// Add NPC items using factory method
const npcItem = BackgroundNpcAccordionItem.create();
npcItem.setAttribute('npc-key', 'merchant_tom');

// Listen for NPC clicks
npcItem.addEventListener('npcClick', (event) => {
  console.log('NPC clicked:', event.detail.npc);
});

npcAccordion.appendChild(npcItem);
```

## Component Architecture

### Accordion Wrapper (`accordion.js`)

**Purpose**: Container that manages group behavior and coordination between accordion items.

**Key Features**:
- Exclusive vs multiple expansion modes
- Keyboard navigation (Arrow keys, Home, End)
- Event coordination between items
- Accessibility support

**Properties**:
- `exclusive` (boolean) - Only one item can be expanded at a time
- `allowMultiple` (boolean) - Inverse of exclusive

**Methods**:
- `expandAll()` - Expand all items (disabled in exclusive mode)
- `collapseAll()` - Collapse all items
- `getExpandedItems()` - Returns array of expanded items
- `closeOtherItems(exceptItem)` - Close all items except specified one
- `focusNextItem(currentItem, forward)` - Navigate between items

**Static Methods**:
- `Accordion.create()` - Factory method to create new accordion wrapper instances

**Events**:
- `accordion-change` - Fired when any item toggles
  ```javascript
  detail: { item, expanded, accordion }
  ```

### Accordion Item (`accordion-item.js`)

**Purpose**: Generic collapsible content container with full accessibility.

**Key Features**:
- Smooth expand/collapse animations
- Full ARIA support for screen readers
- Keyboard interaction (Enter, Space)
- Customizable content via slots

**Attributes**:
- `expanded` - Item starts expanded
- `disabled` - Item cannot be toggled

**Methods**:
- `toggle()` - Toggle expanded state
- `expand()` - Expand the item
- `collapse()` - Collapse the item
- `setHeader(content)` - Set header content programmatically
- `setContent(content)` - Set body content programmatically
- `focusHeader()` - Focus the header button

**Static Methods**:
- `AccordionItem.create()` - Factory method to create new accordion item instances

**Events**:
- `accordion-item-toggle` - Fired when item toggles
  ```javascript
  detail: { item, expanded }
  ```
- `accordion-item-keydown` - Fired for navigation keys
  ```javascript
  detail: { key, item }
  ```

**Slots**:
- `header` - Content for the clickable header
- `content` - Content for the collapsible body

## Extending Accordion Items

The accordion system is designed to be extended for specialized use cases. For example, the Background NPCs component includes a specialized `background-npc-accordion-item` that extends the base `accordion-item`:

```javascript
// Extending accordion item
class CustomAccordionItem extends AccordionItem {
  constructor() {
    super();
    // Custom initialization
  }
  
  setupShadowDOM() {
    super.setupShadowDOM();
    // Additional setup for custom content
  }
  
  renderCustomContent() {
    // Custom content rendering logic
    const header = document.createElement('div');
    header.textContent = 'Custom Header';
    this.setHeader(header);
    
    const content = document.createElement('div');
    content.textContent = 'Custom Content';
    this.setContent(content);
  }
  
  // Add factory method for consistency
  static create() {
    return document.createElement('custom-accordion-item');
  }
}

// Register the custom element
customElements.define('custom-accordion-item', CustomAccordionItem);
```

## Styling and Theming

### CSS Custom Properties

The components use CSS custom properties for theming:

```css
:root {
  /* Colors */
  --color-surface: #2a2a2a;
  --color-surface-hover: rgba(255, 255, 255, 0.05);
  --color-text: #e0e0e0;
  --color-accent: #8b4513;
  --color-border: #3a3a3a;
  
  /* Transitions */
  --transition-duration: 0.25s;
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Custom Styling

```css
/* Style the accordion wrapper */
accordion-wrapper {
  --accordion-gap: 0.5rem;
}

/* Style accordion items */
accordion-item {
  --item-border-radius: 4px;
  --item-padding: 1rem;
}

/* Style custom accordion items */
custom-accordion-item {
  --custom-header-color: #8b4513;
  --custom-content-padding: 1.5rem;
}
```

## Accessibility Features

### ARIA Support
- `role="group"` on accordion wrapper
- `role="button"` on accordion headers
- `aria-expanded` on header buttons
- `aria-controls` linking headers to content
- `aria-labelledby` linking content to headers

### Keyboard Navigation
- **Tab** - Focus accordion headers
- **Enter/Space** - Toggle focused item
- **Arrow Up/Down** - Navigate between items
- **Home** - Focus first item
- **End** - Focus last item

### Screen Reader Support
- Proper semantic markup
- Descriptive labels and relationships
- State announcements for expand/collapse

## Performance Considerations

### Shadow DOM
All components use shadow DOM for:
- Style encapsulation
- DOM isolation
- Performance optimization

### Event Delegation
- Events bubble up through the component hierarchy
- Efficient handling with minimal listeners

### Lazy Content
- Content rendering is deferred until component is ready
- Custom accordion items can implement their own lazy loading strategies

## Maintenance Guidelines

### Adding New Features

1. **New Accordion Types**: Extend `AccordionItem` class (see "Extending Accordion Items" section)
2. **New Behaviors**: Add methods to `Accordion` class
3. **Styling**: Use CSS custom properties for themeable values

### Common Patterns

```javascript
// Extending accordion item
class CustomAccordionItem extends AccordionItem {
  constructor() {
    super();
    // Custom initialization
  }
  
  setupShadowDOM() {
    super.setupShadowDOM();
    // Additional setup
  }
  
  // Add factory method for consistency
  static create() {
    return document.createElement('custom-accordion-item');
  }
}

// Adding custom behaviors to accordion wrapper
class CustomAccordion extends Accordion {
  constructor() {
    super();
    // Custom accordion behaviors
  }
  
  customMethod() {
    // Custom functionality
  }
  
  // Add factory method for consistency
  static create() {
    return document.createElement('custom-accordion');
  }
}
```

### Testing Considerations

- Test keyboard navigation thoroughly
- Verify ARIA attributes with screen readers
- Test with various content sizes
- Validate event propagation
- Check performance with many items

### Browser Support

- Modern browsers with Web Components support
- Requires ES6+ features (classes, modules, shadow DOM)
- Graceful degradation for older browsers

## Dependencies

- `ShadowComponent` base class (from `@/components/base/shadow-component.js`)
- CSS custom properties support

**Note**: Specialized implementations may have additional dependencies. For example, the Background NPCs component includes a `background-npc-accordion-item` that also depends on `DataService`.

## File Structure

```
src/components/accordion/
├── README.md                          # This file
├── accordion.js                       # Main wrapper component
├── accordion.css                      # Wrapper styles
├── accordion-item.js                  # Generic item component
└── accordion-item.css                 # Item styles
```

**Specialized Implementations**:
- `src/components/background-npcs/background-npc-accordion-item.js` - NPC-specific accordion item
- `src/components/background-npcs/background-npc-accordion-item.css` - NPC-specific styles
