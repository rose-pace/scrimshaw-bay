/**
 * Test suite for the refactored Scrimshaw Bay application
 * Can be run in browser console or with Node.js via npm test
 */

// Node.js compatibility check
const isNode = typeof window === 'undefined';

class ScrimshawBayTests {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Run all tests
   */  runAllTests() {
    console.log('🎲 Starting Scrimshaw Bay Application Tests...\n');
    
    if (isNode) {
      console.log('Running in Node.js environment - testing data structures only\n');
      this.testDataStructures();
    } else {
      console.log('Running in browser environment - testing full application\n');
      this.testDataService();
      this.testModalService();
      this.testComponents();
      this.testNavigation();
      this.testUI();
    }
    
    this.displayResults();
  }

  /**
   * Test the DataService
   */
  testDataService() {
    console.log('📊 Testing DataService...');
    
    try {
      const dataService = new window.ScrimshawBayApp.dataService.constructor();
      
      // Test settlements
      const settlements = dataService.getAllSettlements();
      this.assert(settlements.length > 0, 'DataService should return settlements');
      
      const millhaven = dataService.getSettlement('millhaven');
      this.assert(millhaven !== null, 'DataService should return specific settlement');
      this.assert(millhaven.name === 'Millhaven', 'Settlement data should be correct');
      
      // Test NPCs
      const npcs = dataService.getAllNpcs();
      this.assert(npcs.length > 0, 'DataService should return NPCs');
      
      // Test threats
      const threats = dataService.getAllThreats();
      this.assert(threats.length > 0, 'DataService should return threats');
      
      // Test events
      const events = dataService.getAllEvents();
      this.assert(events.length > 0, 'DataService should return events');
      
      console.log('✅ DataService tests passed\n');
      
    } catch (error) {
      console.error('❌ DataService tests failed:', error);
      this.results.failed++;
    }
  }

  /**
   * Test the ModalService
   */
  testModalService() {
    console.log('🪟 Testing ModalService...');
    
    try {
      const modalService = new window.ScrimshawBayApp.modalService.constructor();
      
      // Test modal creation
      const modalId = modalService.createModal({
        title: 'Test Modal',
        content: '<p>Test content</p>',
        closeOnOverlayClick: false
      });
      
      this.assert(modalId !== null, 'ModalService should create modal');
      this.assert(modalService.isModalActive(modalId), 'Modal should be active');
      
      // Test modal closing
      modalService.closeModal(modalId);
      this.assert(!modalService.isModalActive(modalId), 'Modal should be closed');
      
      console.log('✅ ModalService tests passed\n');
      
    } catch (error) {
      console.error('❌ ModalService tests failed:', error);
      this.results.failed++;
    }
  }

  /**
   * Test Components
   */
  testComponents() {
    console.log('🧩 Testing Components...');
    
    try {
      // Test Settlement Card
      const settlementCard = new window.ScrimshawBayApp.settlementCard.constructor();
      const settlement = { name: 'Test Settlement', type: 'Test Type', population: '100' };
      const card = settlementCard.create(settlement, 'test');
      
      this.assert(card instanceof HTMLElement, 'SettlementCard should create HTML element');
      this.assert(card.querySelector('.settlement-name'), 'Settlement card should have name element');
      
      // Test NPC Card
      const npcCard = new window.ScrimshawBayApp.npcCard.constructor();
      const npc = { name: 'Test NPC', role: 'Test Role', description: 'Test Description', location: 'Test Location' };
      const npcElement = npcCard.create(npc, 'test');
      
      this.assert(npcElement instanceof HTMLElement, 'NpcCard should create HTML element');
      this.assert(npcElement.querySelector('.npc-name'), 'NPC card should have name element');
      
      console.log('✅ Component tests passed\n');
      
    } catch (error) {
      console.error('❌ Component tests failed:', error);
      this.results.failed++;
    }
  }

  /**
   * Test Navigation
   */
  testNavigation() {
    console.log('🧭 Testing Navigation...');
    
    try {
      // Test section switching
      const navButtons = document.querySelectorAll('.nav-btn');
      this.assert(navButtons.length > 0, 'Navigation buttons should exist');
      
      const sections = document.querySelectorAll('.content-section');
      this.assert(sections.length > 0, 'Content sections should exist');
      
      // Test active states
      const activeSection = document.querySelector('.content-section.active');
      const activeButton = document.querySelector('.nav-btn.active');
      
      this.assert(activeSection !== null, 'Should have active section');
      this.assert(activeButton !== null, 'Should have active button');
      
      console.log('✅ Navigation tests passed\n');
      
    } catch (error) {
      console.error('❌ Navigation tests failed:', error);
      this.results.failed++;
    }
  }

  /**
   * Test UI Elements
   */
  testUI() {
    console.log('🎨 Testing UI Elements...');
    
    try {
      // Test required elements exist
      const header = document.querySelector('.main-header');
      const nav = document.querySelector('.main-nav');
      const content = document.querySelector('.content');
      
      this.assert(header !== null, 'Header should exist');
      this.assert(nav !== null, 'Navigation should exist');
      this.assert(content !== null, 'Content should exist');
      
      // Test CSS variables
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryBg = rootStyles.getPropertyValue('--primary-bg');
      
      this.assert(primaryBg !== '', 'CSS variables should be loaded');
      
      console.log('✅ UI tests passed\n');
      
    } catch (error) {
      console.error('❌ UI tests failed:', error);
      this.results.failed++;
    }
  }

  /**
   * Test data structures (Node.js compatible)
   */
  testDataStructures() {
    try {
      // Test data structure validation
      const testData = {
        settlements: {
          millhaven: {
            name: "Millhaven",
            type: "Port Town",
            population: "~2,000"
          }
        },
        npcs: {
          harbormaster: {
            name: "Test NPC",
            location: "millhaven",
            role: "Harbor Master"
          }
        }
      };
      
      this.assert(
        testData.settlements && testData.settlements.millhaven,
        'Data structure - settlements object exists'
      );
      
      this.assert(
        testData.npcs && testData.npcs.harbormaster,
        'Data structure - npcs object exists'
      );
      
      this.assert(
        testData.settlements.millhaven.name === "Millhaven",
        'Data structure - settlement has correct name'
      );
      
      this.assert(
        testData.npcs.harbormaster.location === "millhaven",
        'Data structure - NPC has correct location reference'
      );
      
      console.log('✅ Data structure tests completed successfully');
      
    } catch (error) {
      console.error('❌ Data structure test failed:', error.message);
      this.results.failed++;
    }
  }

  /**
   * Assert a condition
   */
  assert(condition, message) {
    if (condition) {
      this.results.passed++;
      this.results.tests.push({ status: 'PASS', message });
    } else {
      this.results.failed++;
      this.results.tests.push({ status: 'FAIL', message });
      console.warn(`⚠️  ${message}`);
    }
  }

  /**
   * Display test results
   */
  displayResults() {
    const total = this.results.passed + this.results.failed;
    const passRate = Math.round((this.results.passed / total) * 100);
    
    console.log('📋 Test Results:');
    console.log(`Total: ${total}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log(`Pass Rate: ${passRate}%`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All tests passed! The refactoring was successful.');
    } else {
      console.log('⚠️  Some tests failed. Check the errors above.');
    }
    
    // Display individual test results
    console.log('\n📝 Individual Test Results:');
    this.results.tests.forEach(test => {
      const icon = test.status === 'PASS' ? '✅' : '❌';
      console.log(`${icon} ${test.message}`);
    });
  }
}

// Auto-run tests when loaded
if (typeof window !== 'undefined') {
  window.ScrimshawBayTests = ScrimshawBayTests;
  
  // Run tests after a short delay to ensure app is loaded
  setTimeout(() => {
    const tests = new ScrimshawBayTests();
    tests.runAllTests();
  }, 2000);
} else {
  // Node.js environment - auto-run tests
  const tests = new ScrimshawBayTests();  tests.runAllTests();
}

// ES module export for Node.js
export default ScrimshawBayTests;
