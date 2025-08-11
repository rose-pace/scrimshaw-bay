// Mock browser APIs that don't exist in Node
global.customElements = {
  define: vi.fn(),
  get: vi.fn(),
  whenDefined: vi.fn(() => Promise.resolve()),
};

// Mock CSS imports
vi.mock('@/styles/reset.css', () => ({ default: {} }));

// Mock CSS with type imports
vi.mock('*.css', () => ({ default: new CSSStyleSheet() }));
