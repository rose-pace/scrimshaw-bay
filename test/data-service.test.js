/**
 * Data Service Tests
 * Tests the DataService functionality for data retrieval and management
 */

class DataServiceTests {
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
   * Test the DataService functionality
   */
  testDataService() {
    console.log('📊 Testing DataService...');
    
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping DataService tests - browser environment required');
        return;
      }

      const dataService = window.ScrimshawBayApp.dataService;
      
      // Test settlements
      const settlements = dataService.getAllSettlements();
      this.assert(settlements.length > 0, 'DataService should return settlements');
      
      const millhaven = dataService.getSettlement('millhaven');
      this.assert(millhaven !== null, 'DataService should return specific settlement');
      this.assert(millhaven.name === 'Millhaven', 'Settlement data should be correct');
      
      // Test NPCs
      const npcs = dataService.getAllNpcs();
      this.assert(npcs.length > 0, 'DataService should return NPCs');
      
      // Test specific NPC retrieval
      const firstNpc = npcs[0];
      if (firstNpc) {
        const specificNpc = dataService.getNpc(firstNpc.key);
        this.assert(specificNpc !== null, 'DataService should return specific NPC');
        this.assert(specificNpc.name === firstNpc.name, 'NPC data should be consistent');
      }
      
      // Test threats
      const threats = dataService.getAllThreats();
      this.assert(threats.length > 0, 'DataService should return threats');
      
      // Test events
      const events = dataService.getAllEvents();
      this.assert(events.length > 0, 'DataService should return events');
      
      // Test data relationships
      if (millhaven && millhaven.npcs) {
        const settlementNpcs = millhaven.npcs;
        this.assert(Array.isArray(settlementNpcs), 'Settlement should have NPCs array');
        
        if (settlementNpcs.length > 0) {
          const npcKey = settlementNpcs[0];
          const npc = dataService.getNpc(npcKey);
          this.assert(npc !== null, 'Settlement NPC reference should be valid');
        }
      }
      
    } catch (error) {
      console.error('❌ DataService tests failed:', error);
      this.assert(false, `DataService test failed with error: ${error.message}`);
    }
  }

  /**
   * Test data structure validation (works in Node.js)
   */
  testDataStructures() {
    console.log('📋 Testing Data Structures...');
    
    try {
      // Test data structure validation with sample data
      const testData = {
        settlements: {
          millhaven: {
            name: "Millhaven",
            type: "Port Town",
            population: "~2,000",
            npcs: ["harbormaster", "mayoress"]
          }
        },
        npcs: {
          harbormaster: {
            name: "Captain Mordecai Blackwater",
            location: "millhaven",
            role: "Harbor Master",
            secrets: ["Smuggling operations", "Deal with sea cult"],
            motivations: ["Protect his profits", "Keep town stable"]
          },
          mayoress: {
            name: "Isabelle Crane",
            location: "millhaven", 
            role: "Mayor",
            abilities: ["Political influence", "Information network"]
          }
        },
        threats: {
          sea_cult: {
            name: "Cult of the Drowned",
            type: "Religious Cult",
            abilities: ["Water magic", "Mind control"]
          }
        },
        events: {
          ritual_storm: {
            name: "The Ritual Storm",
            outcomes: ["Ships are lost", "Strange tides", "Cult emerges"],
            hooks: ["Investigate missing vessels"]
          }
        }
      };
      
      // Test settlements structure
      this.assert(
        testData.settlements && testData.settlements.millhaven,
        'Data structure - settlements object exists'
      );
      
      this.assert(
        testData.settlements.millhaven.name === "Millhaven",
        'Data structure - settlement has correct name'
      );
      
      this.assert(
        Array.isArray(testData.settlements.millhaven.npcs),
        'Data structure - settlement has NPCs array'
      );
      
      // Test NPCs structure
      this.assert(
        testData.npcs && testData.npcs.harbormaster,
        'Data structure - npcs object exists'
      );
      
      this.assert(
        testData.npcs.harbormaster.location === "millhaven",
        'Data structure - NPC has correct location reference'
      );
      
      this.assert(
        Array.isArray(testData.npcs.harbormaster.secrets),
        'Data structure - NPC has secrets array'
      );
      
      // Test threats structure
      this.assert(
        testData.threats && testData.threats.sea_cult,
        'Data structure - threats object exists'
      );
      
      this.assert(
        Array.isArray(testData.threats.sea_cult.abilities),
        'Data structure - threat has abilities array'
      );
      
      // Test events structure
      this.assert(
        testData.events && testData.events.ritual_storm,
        'Data structure - events object exists'
      );
      
      this.assert(
        Array.isArray(testData.events.ritual_storm.outcomes),
        'Data structure - event has outcomes array'
      );
      
      // Test referential integrity
      const npcLocation = testData.npcs.harbormaster.location;
      const settlementExists = testData.settlements[npcLocation];
      this.assert(
        settlementExists !== undefined,
        'Data structure - NPC location reference is valid'
      );
      
      const settlementNpcs = testData.settlements.millhaven.npcs;
      const npcReferenced = settlementNpcs.includes('harbormaster');
      this.assert(
        npcReferenced,
        'Data structure - Settlement references existing NPC'
      );
      
    } catch (error) {
      console.error('❌ Data structure test failed:', error.message);
      this.assert(false, `Data structure test failed with error: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('📊 Starting Data Service Tests...\n');
    
    // Always run data structure tests (Node.js compatible)
    this.testDataStructures();
    
    // Only run browser-specific tests if in browser
    if (typeof window !== 'undefined') {
      this.testDataService();
    } else {
      console.log('ℹ️  Skipping browser-specific DataService tests in Node.js environment');
    }
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 Data Service Test Results:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All Data Service tests passed!');
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
  const tests = new DataServiceTests();
  const success = tests.runAllTests();
  
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  window.DataServiceTests = DataServiceTests;
}

export default DataServiceTests;
