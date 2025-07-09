/**
 * Modal Component Tests
 * Tests the Modal component functionality for displaying detailed information
 */

class ModalComponentTests {
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
   * Test NPC Details Modal
   */
  testNpcDetailsModal() {
    console.log('👤 Testing NPC Details Modal...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping NPC details modal tests - browser environment required');
        return;
      }

      const modal = window.ScrimshawBayApp.modal;
      const dataService = window.ScrimshawBayApp.dataService;
      
      if (!modal || !dataService) {
        console.log('ℹ️  Modal component or data service not available for testing');
        return;
      }
      
      // Get first available NPC
      const npcs = dataService.getAllNpcs();
      if (npcs.length === 0) {
        this.assert(false, 'No NPCs available for testing');
        return;
      }
      
      const testNpc = npcs[0];
      
      // Test showNpcDetails method exists
      this.assert(typeof modal.showNpcDetails === 'function', 'Modal should have showNpcDetails method');
      
      // Test showing NPC details
      const modalId = modal.showNpcDetails(testNpc.key);
      this.assert(modalId !== null && modalId !== undefined, 'showNpcDetails should return modal ID');
      
      // Check if modal was created
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      this.assert(modalElement !== null, 'NPC details modal should be created in DOM');
      
      if (modalElement) {
        // Test modal has NPC content
        const npcName = modalElement.querySelector('h2');
        if (npcName) {
          this.assert(npcName.textContent.includes(testNpc.name), 'Modal should display NPC name');
        }
        
        // Test GM sections exist if NPC has secrets/motivations/abilities
        if (testNpc.secrets && testNpc.secrets.length > 0) {
          const secretsSection = modalElement.querySelector('.npc-secrets');
          this.assert(secretsSection !== null, 'Modal should have secrets section for NPC with secrets');
        }
        
        if (testNpc.motivations && testNpc.motivations.length > 0) {
          const motivationsSection = modalElement.querySelector('.npc-motivations');
          this.assert(motivationsSection !== null, 'Modal should have motivations section for NPC with motivations');
        }
        
        if (testNpc.abilities && testNpc.abilities.length > 0) {
          const abilitiesSection = modalElement.querySelector('.npc-abilities');
          this.assert(abilitiesSection !== null, 'Modal should have abilities section for NPC with abilities');
        }
        
        // Clean up
        modal.modalService.closeModal(modalId);
      }
      
      // Test with non-existent NPC
      try {
        modal.showNpcDetails('non-existent-npc');
        this.assert(false, 'Should not create modal for non-existent NPC');
      } catch (error) {
        // This should either return null or log an error, not crash
        this.assert(true, 'Should handle non-existent NPC gracefully');
      }
      
    } catch (error) {
      console.error('❌ NPC details modal tests failed:', error);
      this.assert(false, `NPC details modal test failed with error: ${error.message}`);
    }
  }

  /**
   * Test Threat Details Modal
   */
  testThreatDetailsModal() {
    console.log('⚠️ Testing Threat Details Modal...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping threat details modal tests - browser environment required');
        return;
      }

      const modal = window.ScrimshawBayApp.modal;
      const dataService = window.ScrimshawBayApp.dataService;
      
      if (!modal || !dataService) {
        console.log('ℹ️  Modal component or data service not available for testing');
        return;
      }
      
      // Get first available threat
      const threats = dataService.getAllThreats();
      if (threats.length === 0) {
        this.assert(false, 'No threats available for testing');
        return;
      }
      
      const testThreat = threats[0];
      
      // Test showThreatDetails method exists
      this.assert(typeof modal.showThreatDetails === 'function', 'Modal should have showThreatDetails method');
      
      // Test showing threat details
      const modalId = modal.showThreatDetails(testThreat.key);
      this.assert(modalId !== null && modalId !== undefined, 'showThreatDetails should return modal ID');
      
      // Check if modal was created
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      this.assert(modalElement !== null, 'Threat details modal should be created in DOM');
      
      if (modalElement) {
        // Test modal has threat content
        const threatName = modalElement.querySelector('h2');
        if (threatName) {
          this.assert(threatName.textContent.includes(testThreat.name), 'Modal should display threat name');
        }
        
        // Test network sections exist if threat has related entities
        if (testThreat.relatedEvents && testThreat.relatedEvents.length > 0) {
          const eventLinks = modalElement.querySelectorAll('.event-link');
          this.assert(eventLinks.length > 0, 'Modal should have event links for threat with related events');
        }
        
        // Clean up
        modal.modalService.closeModal(modalId);
      }
      
    } catch (error) {
      console.error('❌ Threat details modal tests failed:', error);
      this.assert(false, `Threat details modal test failed with error: ${error.message}`);
    }
  }

  /**
   * Test Event Details Modal
   */
  testEventDetailsModal() {
    console.log('📅 Testing Event Details Modal...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping event details modal tests - browser environment required');
        return;
      }

      const modal = window.ScrimshawBayApp.modal;
      const dataService = window.ScrimshawBayApp.dataService;
      
      if (!modal || !dataService) {
        console.log('ℹ️  Modal component or data service not available for testing');
        return;
      }
      
      // Get first available event
      const events = dataService.getAllEvents();
      if (events.length === 0) {
        this.assert(false, 'No events available for testing');
        return;
      }
      
      const testEvent = events[0];
      
      // Test showEventDetails method exists
      this.assert(typeof modal.showEventDetails === 'function', 'Modal should have showEventDetails method');
      
      // Test showing event details
      const modalId = modal.showEventDetails(testEvent.key);
      this.assert(modalId !== null && modalId !== undefined, 'showEventDetails should return modal ID');
      
      // Check if modal was created
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      this.assert(modalElement !== null, 'Event details modal should be created in DOM');
      
      if (modalElement) {
        // Test modal has event content
        const eventName = modalElement.querySelector('h2');
        if (eventName) {
          this.assert(eventName.textContent.includes(testEvent.name), 'Modal should display event name');
        }
        
        // Test event-specific sections
        if (testEvent.trigger) {
          const triggerSection = modalElement.querySelector('.event-section');
          this.assert(triggerSection !== null, 'Modal should have event sections');
        }
        
        // Test network links exist if event has related entities
        if (testEvent.relatedNpcs && testEvent.relatedNpcs.length > 0) {
          const npcLinks = modalElement.querySelectorAll('.npc-link');
          this.assert(npcLinks.length > 0, 'Modal should have NPC links for event with related NPCs');
        }
        
        if (testEvent.relatedThreats && testEvent.relatedThreats.length > 0) {
          const threatLinks = modalElement.querySelectorAll('.threat-link');
          this.assert(threatLinks.length > 0, 'Modal should have threat links for event with related threats');
        }
        
        // Clean up
        modal.modalService.closeModal(modalId);
      }
      
    } catch (error) {
      console.error('❌ Event details modal tests failed:', error);
      this.assert(false, `Event details modal test failed with error: ${error.message}`);
    }
  }

  /**
   * Test Network Link Functionality
   */
  testNetworkLinkFunctionality() {
    console.log('🔗 Testing Network Link Functionality...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping network link tests - browser environment required');
        return;
      }

      const modal = window.ScrimshawBayApp.modal;
      
      if (!modal) {
        console.log('ℹ️  Modal component not available for testing');
        return;
      }
      
      // Create a test modal with network links
      const testContent = `
        <div class="test-network">
          <button class="network-link npc-link" data-npc="bayardScrimm">Lord Bayard Scrimm</button>
          <button class="network-link threat-link" data-threat="agog">Agog</button>
          <button class="network-link event-link" data-event="strangeNews">Strange News</button>
        </div>
      `;
      
      const modalId = modal.modalService.createModal({
        title: 'Network Link Test',
        content: testContent
      });
      
      this.assert(modalId !== null, 'Should create test modal with network links');
      
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      if (modalElement) {
        // Test that network links have correct attributes
        const npcLink = modalElement.querySelector('.npc-link');
        const threatLink = modalElement.querySelector('.threat-link');
        const eventLink = modalElement.querySelector('.event-link');
        
        this.assert(npcLink !== null, 'Modal should contain NPC link');
        this.assert(threatLink !== null, 'Modal should contain threat link');
        this.assert(eventLink !== null, 'Modal should contain event link');
        
        if (npcLink) {
          this.assert(npcLink.getAttribute('data-npc') === 'bayardScrimm', 'NPC link should have correct data attribute');
          this.assert(npcLink.classList.contains('network-link'), 'NPC link should have network-link class');
        }
        
        if (threatLink) {
          this.assert(threatLink.getAttribute('data-threat') === 'agog', 'Threat link should have correct data attribute');
          this.assert(threatLink.classList.contains('network-link'), 'Threat link should have network-link class');
        }
        
        if (eventLink) {
          this.assert(eventLink.getAttribute('data-event') === 'strangeNews', 'Event link should have correct data attribute');
          this.assert(eventLink.classList.contains('network-link'), 'Event link should have network-link class');
        }
        
        // Clean up
        modal.modalService.closeModal(modalId);
      }
      
    } catch (error) {
      console.error('❌ Network link functionality tests failed:', error);
      this.assert(false, `Network link functionality test failed with error: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🪟 Starting Modal Component Tests...\n');
    
    if (typeof window !== 'undefined') {
      this.testNpcDetailsModal();
      this.testThreatDetailsModal();
      this.testEventDetailsModal();
      this.testNetworkLinkFunctionality();
    } else {
      console.log('ℹ️  Skipping Modal Component tests - browser environment required');
    }
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 Modal Component Test Results:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All Modal Component tests passed!');
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
  const tests = new ModalComponentTests();
  const success = tests.runAllTests();
  
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  window.ModalComponentTests = ModalComponentTests;
}

export default ModalComponentTests;
