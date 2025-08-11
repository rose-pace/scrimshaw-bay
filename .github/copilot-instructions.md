# GitHub Copilot Instructions

These instructions define how GitHub Copilot should assist with this project. The goal is to ensure consistent, high-quality code generation aligned with our conventions, stack, and best practices.

## Context
- **Project Type**: Web application for a tabletop RPG campaign guide to be used privately by a single user.
- **Tech Stack**: HTML, CSS, JavaScript, ES Modules
- **Primary Focus**: Enhancing user experience, maintaining a clean and responsive design, and ensuring accessibility.
- **Design Theme**: Gothic horror with a dark, muted color palette.
- **Architecture**: Modular / Clean Architecture

## Coding Standards
- Follow JavaScript ES6+ syntax and features
- Use `const` and `let` for variable declarations; avoid `var`
- Use arrow functions for concise function expressions
- Use template literals for string interpolation
- Use descriptive variable and function names
- Maintain consistent indentation (2 spaces)
- Use single quotes for strings, except when using template literals
- Use semicolons at the end of statements
- Use JSDoc comments for function documentation and type annotations
- Use inline type hints for variables with complex types or when typing is non obvious (e.g., `Array<string>`, `Record<string, any>`)

## Code Quality Rules
- Sort imports for readability
- Never use relative paths for imports; always use the paths defined in `jsconfig.json` or `tsconfig.json`
- Avoid global variables; encapsulate code in modules
- Use consistent naming:
  - camelCase: JavaScript variables/functions
  - PascalCase: Classes/Components
  - kebab-case: CSS classes, file names
  - SCREAMING_SNAKE_CASE: Constants
- Implement error boundaries and logging
- Clean up event listeners and subscriptions
- Maximum line length: 80 characters
- Document breaking changes
- If declaring more than 3 variables in a row sort alphabetically

## Accessibility Standards for Markup
- Always use appropriate aria attributes for all Markup
- Always use semantic HTML
- Use the label element for form controls
- Always provide alt text for images

## File Structure
Use this structure as a guide when creating or updating files:

```text
src/
  components/
    <componentName>/
      <componentName>.js
      <componentName>.css
  services/
  styles/
  utils/
  index.js
data/
images/
index.html
```

## Web Component Architecture

### Base Component Pattern
- All components must extend `ShadowComponent` from `src/components/base/shadow-component.js`
- Use factory `create()` methods instead of direct `document.createElement()` calls
- Leverage `safeSlotAssign()` for slot-based content management with deferred rendering support
- Always call `setupShadowDOM()` in component constructor to initialize shadow DOM and CSS

### Component Structure
```javascript
// Component class extending ShadowComponent
export class ComponentNameElement extends ShadowComponent {
  constructor() {
    super();
  }

  setupShadowDOM() {
    // Automatically loads CSS and sets up shadow DOM
    super.setupShadowDOM(import.meta.url);

    // Set up component structure
    this.innerHTML = `
      <div class="component-name">
        <slot name="content"></slot>
      </div>
    `;
  }
  
  // Use safeSlotAssign() for content management
  setData(data) {
    this.safeSlotAssign('content', data.content);
  }

  // Factory pattern for component creation
  static create() {
    return document.createElement('component-name');
  }
}

// Register the custom element
customElements.define('component-name', ComponentNameElement);
```

### CSS and Shadow DOM Integration
- CSS files are automatically imported and applied to shadow DOM via `setupShadowDOM(import.meta.url)`
- Use `:host` selector for component root styling
- Use `::slotted()` selectors to style slotted content
- Component CSS is automatically scoped and isolated within shadow DOM

### Responsive Design with CSS Variables
- Use CSS custom properties for values that change across screen sizes
- Define responsive variables in `src/styles/variables.css` that automatically adjust at breakpoints
- Example responsive grid pattern:
  ```css
  /* In variables.css - centralized responsive logic */
  :root {
    --grid-cols-4: 1fr; /* Mobile default */
  }
  
  @media (min-width: 640px) {
    :root {
      --grid-cols-4: repeat(2, 1fr); /* Tablet */
    }
  }
  
  @media (min-width: 1280px) {
    :root {
      --grid-cols-4: repeat(4, 1fr); /* Desktop */
    }
  }
  
  /* In component CSS - simple variable usage */
  .grid {
    grid-template-columns: var(--grid-cols-4); /* Automatically responsive */
  }
  ```
- Avoid media queries in component CSS; use responsive variables instead
- All responsive behavior should be centrally controlled from `variables.css`

### Event Handling and Lifecycle
- Use deferred rendering patterns when content depends on external data
- Clean up event listeners in component lifecycle methods
- Leverage shadow DOM encapsulation for event delegation
- Use custom events for component communication

## Commit Message Standards
- Use short and concise statements that start with an active verb
- Describe each change in a single statement ending in a semicolon (;)
- When necessary use actual names of edited files, functions, or modules