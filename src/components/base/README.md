# ShadowComponent Base Class

The `ShadowComponent` base class provides a standardized way to create web components with shadow DOM and deferred rendering capabilities.

## Key Features

- **Deferred Rendering**: Components can have their display methods called before being connected to the DOM
- **Safe DOM Manipulation**: Built-in methods that only execute when the component is ready
- **Lifecycle Management**: Proper handling of connection/disconnection events
- **CSS Module Support**: Easy integration with CSS modules via `adoptedStyleSheets`

## Usage

### Basic Implementation

```javascript
import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './my-component.css' with { type: 'css' };

export class MyComponent extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   * Called automatically when component is connected
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="my-component">
        <h3>My Component</h3>
        <slot name="content"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   * Called automatically after setupShadowDOM if pendingData exists
   */
  processPendingData() {
    if (this.pendingData) {
      this.displayData(this.pendingData);
    }
  }

  /**
   * Display data - supports deferred rendering
   */
  displayData(data) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(data);
      return;
    }

    // Create and populate content
    const content = document.createElement('div');
    content.textContent = data.text;
    
    // Safe slot assignment
    this.safeSlotAssign('content', content);
  }
}
```

### Register Component

```javascript
// Register the component
customElements.define('my-component', MyComponent);
```

### Use in HTML

```html
<my-component></my-component>
```

## Base Class Methods

### Required Methods (must be implemented by subclasses)

- `setupShadowDOM()` - Setup shadow DOM structure and styles
- `processPendingData()` - Process data stored before connection (optional)

### Available Methods

- `isReady()` - Check if component is ready for DOM manipulation
- `storePendingData(data)` - Store data for processing after connection
- `applyStyles(styles)` - Apply CSS stylesheets to shadow DOM
- `safeQuerySelector(selector)` - Safe query selector that checks readiness
- `safeQuerySelectorAll(selector)` - Safe query selector all that checks readiness
- `safeSlotAssign(slotName, nodes)` - Safe slot assignment that checks readiness

### Lifecycle Methods

- `connectedCallback()` - Called when component is added to DOM
- `disconnectedCallback()` - Called when component is removed from DOM

## Important Notes

- **Property Naming**: The base class uses `_shadowRoot` and `_isComponentReady` as private properties to avoid conflicts with native DOM properties like `shadowRoot` and `isConnected`.
- **Direct Access**: If you need direct access to the shadow root, use `this._shadowRoot` instead of `this.shadowRoot` in your component methods.
- **Ready State**: Use `this.isReady()` to check if the component is ready for DOM operations rather than checking properties directly.

## Best Practices

1. **Always call `super()` in constructor**
2. **Use `isReady()` checks in display methods**
3. **Use `storePendingData()` when component isn't ready**
4. **Use safe methods (`safeQuerySelector`, `safeSlotAssign`) for DOM operations**
5. **Apply styles via `applyStyles()` method in `setupShadowDOM()`**

## Example Components

- `BackgroundNpcs` - Displays NPC data with deferred rendering
- `ShrineLayout` - Displays shrine layout with slot assignment
- `EnhancedInventory` - Displays inventory with multiple sections
- `VillageLayout` - Displays village structure and districts
- `GmSectionItem` - Displays GM section content with title and content slots
- `LocationDetailModal` - Modal component for detailed location information

## Migration Guide

To migrate existing components:

1. Replace `extends HTMLElement` with `extends ShadowComponent`
2. Move shadow DOM setup from `connectedCallback()` to `setupShadowDOM()`
3. Replace direct shadow DOM queries with safe methods
4. Implement deferred rendering pattern in display methods
5. Use `processPendingData()` for initialization after connection
