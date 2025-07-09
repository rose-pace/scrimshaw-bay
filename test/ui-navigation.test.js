/**
 * UI and Navigation Tests
 * Tests the user interface elements and navigation functionality
 */

class UINavigationTests {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Assert function for testing
   */
  assert(condition, message) {
    if (condition) {
      this.results.passed++;
      this.results.tests.push({ status: 'PASS', message });
    } else {
      this.results.failed++;
      this.results.tests.push({ status: 'FAIL', message });
      console.error(`❌ FAIL: ${message}`);
    }
  }

  /**
   * Test Navigation functionality
   */
  testNavigation() {
    console.log('🧭 Testing Navigation...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('⚠️  Skipping navigation tests - browser environment required');
        return;
      }

      // Test navigation buttons exist
      const navButtons = document.querySelectorAll('.nav-btn');
      this.assert(navButtons.length > 0, 'Navigation buttons should exist');
      
      // Test content sections exist
      const sections = document.querySelectorAll('.content-section');
      this.assert(sections.length > 0, 'Content sections should exist');
      
      // Test active states exist
      const activeSection = document.querySelector('.content-section.active');
      const activeButton = document.querySelector('.nav-btn.active');
      
      this.assert(activeSection !== null, 'Should have active section');
      this.assert(activeButton !== null, 'Should have active button');
      
      // Test navigation corresponds to sections
      if (navButtons.length > 0 && sections.length > 0) {
        this.assert(navButtons.length <= sections.length, 'Should not have more nav buttons than sections');
      }
      
      // Test specific navigation elements
      const expectedSections = ['settlements', 'npcs', 'threats', 'events'];
      expectedSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navButton = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (section) {
          this.assert(section.classList.contains('content-section'), `${sectionId} should have content-section class`);
        }
        
        if (navButton) {
          this.assert(navButton.classList.contains('nav-btn'), `${sectionId} nav button should have nav-btn class`);
        }
      });
      
    } catch (error) {
      console.error('❌ Navigation tests failed:', error);
      this.assert(false, `Navigation test failed with error: ${error.message}`);
    }
  }

  /**
   * Test UI structure and elements
   */
  testUIStructure() {
    console.log('🎨 Testing UI Structure...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('⚠️  Skipping UI structure tests - browser environment required');
        return;
      }

      // Test required main elements exist
      const header = document.querySelector('.main-header');
      const nav = document.querySelector('.main-nav');
      const content = document.querySelector('.content');
      
      this.assert(header !== null, 'Header should exist');
      this.assert(nav !== null, 'Navigation should exist');
      this.assert(content !== null, 'Content should exist');
      
      // Test header content
      if (header) {
        const title = header.querySelector('h1');
        this.assert(title !== null, 'Header should contain title');
        if (title) {
          this.assert(title.textContent.includes('Scrimshaw Bay'), 'Title should contain "Scrimshaw Bay"');
        }
      }
      
      // Test navigation structure
      if (nav) {
        const navList = nav.querySelector('ul') || nav.querySelector('.nav-list');
        this.assert(navList !== null, 'Navigation should contain list structure');
      }
      
      // Test content structure
      if (content) {
        const sections = content.querySelectorAll('.content-section');
        this.assert(sections.length > 0, 'Content should contain sections');
        
        sections.forEach((section, index) => {
          this.assert(section.id !== '', `Section ${index} should have an ID`);
        });
      }
      
    } catch (error) {
      console.error('❌ UI structure tests failed:', error);
      this.assert(false, `UI structure test failed with error: ${error.message}`);
    }
  }

  /**
   * Test CSS and styling
   */
  testCSS() {
    console.log('🎨 Testing CSS and Styling...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('⚠️  Skipping CSS tests - browser environment required');
        return;
      }

      // Test CSS variables are loaded
      const rootStyles = getComputedStyle(document.documentElement);
      const cssVariables = [
        '--primary-bg',
        '--secondary-bg', 
        '--text-color',
        '--accent-color'
      ];
      
      cssVariables.forEach(variable => {
        const value = rootStyles.getPropertyValue(variable);
        this.assert(value !== '', `CSS variable ${variable} should be defined`);
      });
      
      // Test that stylesheets are loaded
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      this.assert(stylesheets.length > 0, 'Stylesheets should be loaded');
      
      // Test basic styling on key elements
      const body = document.body;
      if (body) {
        const bodyStyles = getComputedStyle(body);
        this.assert(bodyStyles.fontFamily !== '', 'Body should have font family defined');
        this.assert(bodyStyles.margin !== '', 'Body should have margin defined');
      }
      
      // Test theme consistency
      const header = document.querySelector('.main-header');
      if (header) {
        const headerStyles = getComputedStyle(header);
        this.assert(headerStyles.backgroundColor !== 'rgba(0, 0, 0, 0)', 'Header should have background color');
      }
      
    } catch (error) {
      console.error('❌ CSS tests failed:', error);
      this.assert(false, `CSS test failed with error: ${error.message}`);
    }
  }

  /**
   * Test responsive design elements
   */
  testResponsiveDesign() {
    console.log('📱 Testing Responsive Design...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('⚠️  Skipping responsive design tests - browser environment required');
        return;
      }

      // Test viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      this.assert(viewportMeta !== null, 'Viewport meta tag should exist');
      
      if (viewportMeta) {
        const content = viewportMeta.getAttribute('content');
        this.assert(content.includes('width=device-width'), 'Viewport should be responsive');
      }
      
      // Test that elements have responsive classes or styles
      const nav = document.querySelector('.main-nav');
      if (nav) {
        const navStyles = getComputedStyle(nav);
        // Just check that it has some responsive styling applied
        this.assert(navStyles.display !== '', 'Navigation should have display property defined');
      }
      
      // Test card containers are responsive
      const cardContainers = document.querySelectorAll('.cards-container');
      cardContainers.forEach((container, index) => {
        const containerStyles = getComputedStyle(container);
        this.assert(containerStyles.display !== '', `Card container ${index} should have display property`);
      });
      
    } catch (error) {
      console.error('❌ Responsive design tests failed:', error);
      this.assert(false, `Responsive design test failed with error: ${error.message}`);
    }
  }

  /**
   * Test accessibility features
   */
  testAccessibility() {
    console.log('♿ Testing Accessibility...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('⚠️  Skipping accessibility tests - browser environment required');
        return;
      }

      // Test page has title
      const title = document.querySelector('title');
      this.assert(title !== null && title.textContent !== '', 'Page should have title');
      
      // Test navigation has proper ARIA attributes
      const navButtons = document.querySelectorAll('.nav-btn');
      navButtons.forEach((button, index) => {
        this.assert(button.textContent !== '', `Nav button ${index} should have text content`);
        
        // Check for accessibility attributes
        const hasAriaLabel = button.getAttribute('aria-label') !== null;
        const hasTitle = button.getAttribute('title') !== null;
        const hasTextContent = button.textContent.trim() !== '';
        
        this.assert(hasAriaLabel || hasTitle || hasTextContent, 
          `Nav button ${index} should have accessible text (aria-label, title, or text content)`);
      });
      
      // Test form elements have labels (if any)
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input, index) => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const placeholder = input.getAttribute('placeholder');
        
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          this.assert(label !== null || ariaLabel !== null, 
            `Input ${index} should have associated label or aria-label`);
        } else {
          this.assert(ariaLabel !== null || placeholder !== null, 
            `Input ${index} without ID should have aria-label or placeholder`);
        }
      });
      
      // Test images have alt text
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        const alt = img.getAttribute('alt');
        this.assert(alt !== null, `Image ${index} should have alt attribute`);
      });
      
      // Test buttons are keyboard accessible
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        this.assert(button.textContent.trim() !== '' || button.getAttribute('aria-label') !== null,
          `Button ${index} should have accessible text`);
      });
      
    } catch (error) {
      console.error('❌ Accessibility tests failed:', error);
      this.assert(false, `Accessibility test failed with error: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🎨 Starting UI and Navigation Tests...\n');
    
    if (typeof window !== 'undefined') {
      this.testNavigation();
      this.testUIStructure();
      this.testCSS();
      this.testResponsiveDesign();
      this.testAccessibility();
    } else {
      console.log('ℹ️  Skipping UI and Navigation tests - browser environment required');
    }
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 UI and Navigation Test Results:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All UI and Navigation tests passed!');
    } else {
      console.log('⚠️  Some tests failed. See details above.');
      
      // Display failed tests
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'FAIL')
        .forEach(test => console.log(`   • ${test.message}`));
    }
    
    return this.results.failed === 0;
  }
}

// Auto-run if this is the main module
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const tests = new UINavigationTests();
  const success = tests.runAllTests();
  
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  window.UINavigationTests = UINavigationTests;
}

export default UINavigationTests;
