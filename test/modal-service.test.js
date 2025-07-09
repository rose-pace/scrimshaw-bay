/**
 * Modal Service Tests
 * Tests the ModalService functionality for modal creation and management
 */

class ModalServiceTests {
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
   * Test the ModalService functionality
   */
  testModalService() {
    console.log('🪟 Testing ModalService...');
    
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping ModalService tests - browser environment required');
        return;
      }

      const modalService = window.ScrimshawBayApp.modalService;
      
      // Test modal creation
      const modalConfig = {
        title: 'Test Modal',
        content: '<p>Test content for modal testing</p>',
        closeOnOverlayClick: false
      };
      
      const modalId = modalService.createModal(modalConfig);
      this.assert(modalId !== null && modalId !== undefined, 'ModalService should create modal and return ID');
      
      // Test modal state
      this.assert(modalService.isModalActive(modalId), 'Modal should be active after creation');
      
      // Test modal element exists
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      this.assert(modalElement !== null, 'Modal element should exist in DOM');
      
      // Test modal content
      if (modalElement) {
        const titleElement = modalElement.querySelector('.modal-title');
        const contentElement = modalElement.querySelector('.modal-content');
        
        this.assert(titleElement !== null, 'Modal should have title element');
        this.assert(contentElement !== null, 'Modal should have content element');
        
        if (titleElement) {
          this.assert(titleElement.textContent.includes('Test Modal'), 'Modal title should be correct');
        }
        
        if (contentElement) {
          this.assert(contentElement.innerHTML.includes('Test content'), 'Modal content should be correct');
        }
      }
      
      // Test modal closing
      modalService.closeModal(modalId);
      this.assert(!modalService.isModalActive(modalId), 'Modal should be closed after closeModal call');
      
      // Test modal cleanup
      setTimeout(() => {
        const modalElementAfterClose = document.querySelector(`[data-modal-id="${modalId}"]`);
        this.assert(modalElementAfterClose === null, 'Modal element should be removed from DOM after closing');
      }, 100);
      
    } catch (error) {
      console.error('❌ ModalService tests failed:', error);
      this.assert(false, `ModalService test failed with error: ${error.message}`);
    }
  }

  /**
   * Test modal service configuration and options
   */
  testModalConfiguration() {
    console.log('⚙️ Testing Modal Configuration...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping modal configuration tests - browser environment required');
        return;
      }

      const modalService = window.ScrimshawBayApp.modalService;
      
      // Test modal with different configurations
      const configs = [
        {
          title: 'No Close Button Modal',
          content: '<p>This modal has no close button</p>',
          showCloseButton: false
        },
        {
          title: 'Click Outside to Close',
          content: '<p>Click outside to close this modal</p>',
          closeOnOverlayClick: true
        },
        {
          title: 'Custom Classes Modal',
          content: '<p>This modal has custom CSS classes</p>',
          customClass: 'test-modal-class'
        }
      ];
      
      const modalIds = [];
      
      configs.forEach((config, index) => {
        const modalId = modalService.createModal(config);
        modalIds.push(modalId);
        
        this.assert(modalId !== null, `Configuration test ${index + 1} - Modal should be created`);
        this.assert(modalService.isModalActive(modalId), `Configuration test ${index + 1} - Modal should be active`);
        
        const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
        if (modalElement) {
          // Test close button visibility
          if (config.showCloseButton === false) {
            const closeButton = modalElement.querySelector('.modal-close');
            this.assert(closeButton === null || closeButton.style.display === 'none', 
              `Configuration test ${index + 1} - Close button should be hidden`);
          }
          
          // Test custom classes
          if (config.customClass) {
            this.assert(modalElement.classList.contains(config.customClass), 
              `Configuration test ${index + 1} - Modal should have custom class`);
          }
        }
      });
      
      // Clean up test modals
      modalIds.forEach(id => {
        if (modalService.isModalActive(id)) {
          modalService.closeModal(id);
        }
      });
      
    } catch (error) {
      console.error('❌ Modal configuration tests failed:', error);
      this.assert(false, `Modal configuration test failed with error: ${error.message}`);
    }
  }

  /**
   * Test modal service error handling and event propagation
   */
  testModalErrorHandling() {
    console.log('🛡️ Testing Modal Error Handling and Event Propagation...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping modal error handling tests - browser environment required');
        return;
      }

      const modalService = window.ScrimshawBayApp.modalService;
      
      // Test closing non-existent modal
      const fakeModalId = 'non-existent-modal-id';
      try {
        modalService.closeModal(fakeModalId);
        this.assert(true, 'Should handle closing non-existent modal gracefully');
      } catch (error) {
        this.assert(false, 'Should not throw error when closing non-existent modal');
      }
      
      // Test checking status of non-existent modal
      const isActive = modalService.isModalActive(fakeModalId);
      this.assert(isActive === false, 'Non-existent modal should not be active');
      
      // Test creating modal with minimal config
      const minimalModal = modalService.createModal({});
      this.assert(minimalModal !== null, 'Should create modal with empty config');
      
      if (minimalModal) {
        modalService.closeModal(minimalModal);
      }
      
      // Test event propagation for network links
      const modalWithLinks = modalService.createModal({
        title: 'Network Links Test',
        content: `
          <div class="test-content">
            <button class="network-link npc-link" data-npc="test-npc">Test NPC</button>
            <button class="network-link threat-link" data-threat="test-threat">Test Threat</button>
            <button class="network-link event-link" data-event="test-event">Test Event</button>
            <button class="regular-button">Regular Button</button>
            <a href="#" class="test-link">Test Link</a>
            <p class="regular-content">Regular content</p>
          </div>
        `
      });
      
      this.assert(modalWithLinks !== null, 'Should create modal with network links');
      
      if (modalWithLinks) {
        const modalElement = document.querySelector(`[data-modal-id="${modalWithLinks}"]`);
        if (modalElement) {
          // Test that network links exist
          const networkLinks = modalElement.querySelectorAll('.network-link');
          this.assert(networkLinks.length === 3, 'Modal should contain network links');
          
          // Test data attributes
          const npcLink = modalElement.querySelector('[data-npc="test-npc"]');
          const threatLink = modalElement.querySelector('[data-threat="test-threat"]');
          const eventLink = modalElement.querySelector('[data-event="test-event"]');
          const regularButton = modalElement.querySelector('.regular-button');
          const testLink = modalElement.querySelector('.test-link');
          
          this.assert(npcLink !== null, 'NPC link should exist with correct data attribute');
          this.assert(threatLink !== null, 'Threat link should exist with correct data attribute');
          this.assert(eventLink !== null, 'Event link should exist with correct data attribute');
          this.assert(regularButton !== null, 'Regular button should exist');
          this.assert(testLink !== null, 'Test link should exist');
          
          // Test click event propagation (simulate clicks and check they don't close modal)
          let clickEventsPropagated = 0;
          const clickHandler = (e) => {
            if (e.target.closest('.network-link') || 
                e.target.closest('button:not(.close-btn)') || 
                e.target.closest('a')) {
              clickEventsPropagated++;
            }
          };
          
          // Add temporary event listener to test propagation
          document.addEventListener('click', clickHandler);
          
          // Simulate clicks on interactive elements
          if (npcLink) npcLink.click();
          if (threatLink) threatLink.click();
          if (eventLink) eventLink.click();
          if (regularButton) regularButton.click();
          if (testLink) {
            testLink.preventDefault = () => {}; // Prevent navigation
            testLink.click();
          }
          
          // Clean up event listener
          document.removeEventListener('click', clickHandler);
          
          this.assert(clickEventsPropagated >= 3, 'Interactive elements should allow click events to propagate');
          
          // Verify modal is still active after clicks
          this.assert(modalService.isModalActive(modalWithLinks), 'Modal should remain active after interactive element clicks');
        }
        
        modalService.closeModal(modalWithLinks);
      }
      
      // Test creating modal with null/undefined
      try {
        const nullModal = modalService.createModal(null);
        this.assert(nullModal !== null, 'Should handle null config gracefully');
        if (nullModal) {
          modalService.closeModal(nullModal);
        }
      } catch (error) {
        this.assert(true, 'Acceptable to throw error with null config');
      }
      
    } catch (error) {
      console.error('❌ Modal error handling tests failed:', error);
      this.assert(false, `Modal error handling test failed with error: ${error.message}`);
    }
  }

  /**
   * Test modal click handling and event propagation behavior
   */
  testModalClickHandling() {
    console.log('🖱️ Testing Modal Click Handling...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping modal click handling tests - browser environment required');
        return;
      }

      const modalService = window.ScrimshawBayApp.modalService;
      
      // Create modal with various interactive elements
      const testModal = modalService.createModal({
        title: 'Click Handling Test',
        content: `
          <div class="test-content">
            <h3>Interactive Elements</h3>
            <button class="network-link" data-npc="sample-npc">NPC Link</button>
            <button class="network-link" data-threat="sample-threat">Threat Link</button>
            <button class="network-link" data-event="sample-event">Event Link</button>
            <button class="network-link" data-location="sample-location">Location Link</button>
            <button class="network-link" data-settlement="sample-settlement">Settlement Link</button>
            <a href="#test" class="test-anchor">Test Anchor</a>
            <button class="regular-btn" type="button">Regular Button</button>
            <div class="non-interactive">Non-interactive content</div>
          </div>
        `,
        closeOnOverlayClick: true
      });
      
      this.assert(testModal !== null, 'Should create test modal for click handling');
      
      if (testModal) {
        const modalElement = document.querySelector(`[data-modal-id="${testModal}"]`);
        const modalContent = modalElement?.querySelector('.modal-content');
        
        this.assert(modalElement !== null, 'Modal element should exist');
        this.assert(modalContent !== null, 'Modal content should exist');
        
        if (modalElement && modalContent) {
          // Test all interactive elements exist
          const npcLink = modalContent.querySelector('[data-npc="sample-npc"]');
          const threatLink = modalContent.querySelector('[data-threat="sample-threat"]');
          const eventLink = modalContent.querySelector('[data-event="sample-event"]');
          const locationLink = modalContent.querySelector('[data-location="sample-location"]');
          const settlementLink = modalContent.querySelector('[data-settlement="sample-settlement"]');
          const anchor = modalContent.querySelector('.test-anchor');
          const regularBtn = modalContent.querySelector('.regular-btn');
          const nonInteractive = modalContent.querySelector('.non-interactive');
          
          this.assert(npcLink !== null, 'NPC link should exist');
          this.assert(threatLink !== null, 'Threat link should exist');
          this.assert(eventLink !== null, 'Event link should exist');
          this.assert(locationLink !== null, 'Location link should exist');
          this.assert(settlementLink !== null, 'Settlement link should exist');
          this.assert(anchor !== null, 'Anchor should exist');
          this.assert(regularBtn !== null, 'Regular button should exist');
          this.assert(nonInteractive !== null, 'Non-interactive content should exist');
          
          // Test that clicking interactive elements doesn't close the modal
          let interactiveClicks = 0;
          const clickTracker = () => interactiveClicks++;
          
          // Add event listeners to track clicks
          [npcLink, threatLink, eventLink, locationLink, settlementLink, anchor, regularBtn].forEach(element => {
            if (element) {
              element.addEventListener('click', clickTracker);
            }
          });
          
          // Simulate clicks on interactive elements
          [npcLink, threatLink, eventLink, locationLink, settlementLink, regularBtn].forEach(element => {
            if (element) {
              element.click();
              // Verify modal is still active after each click
              this.assert(modalService.isModalActive(testModal), 
                `Modal should remain active after clicking ${element.className}`);
            }
          });
          
          // Special handling for anchor to prevent navigation
          if (anchor) {
            const originalPreventDefault = Event.prototype.preventDefault;
            anchor.addEventListener('click', (e) => e.preventDefault());
            anchor.click();
            this.assert(modalService.isModalActive(testModal), 
              'Modal should remain active after clicking anchor');
          }
          
          this.assert(interactiveClicks >= 6, 'Should have tracked clicks on interactive elements');
          
          // Clean up event listeners
          [npcLink, threatLink, eventLink, locationLink, settlementLink, anchor, regularBtn].forEach(element => {
            if (element) {
              element.removeEventListener('click', clickTracker);
            }
          });
        }
        
        modalService.closeModal(testModal);
      }
      
    } catch (error) {
      console.error('❌ Modal click handling tests failed:', error);
      this.assert(false, `Modal click handling test failed with error: ${error.message}`);
    }
  }

  /**
   * Test modal content event stopping behavior
   */
  testModalContentEventStopping() {
    console.log('🛑 Testing Modal Content Event Stopping...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping modal content event stopping tests - browser environment required');
        return;
      }

      const modalService = window.ScrimshawBayApp.modalService;
      
      // Create modal with non-interactive content
      const testModal = modalService.createModal({
        title: 'Event Stopping Test',
        content: `
          <div class="test-content">
            <p class="text-content">Click this text should not close modal</p>
            <div class="background-area" style="padding: 20px; background: rgba(255,255,255,0.1);">
              Background area
              <span class="inner-text">Inner text content</span>
            </div>
          </div>
        `,
        closeOnOverlayClick: true
      });
      
      this.assert(testModal !== null, 'Should create test modal for event stopping');
      
      if (testModal) {
        const modalElement = document.querySelector(`[data-modal-id="${testModal}"]`);
        const modalContent = modalElement?.querySelector('.modal-content');
        
        this.assert(modalElement !== null, 'Modal element should exist');
        this.assert(modalContent !== null, 'Modal content should exist');
        
        if (modalElement && modalContent) {
          const textContent = modalContent.querySelector('.text-content');
          const backgroundArea = modalContent.querySelector('.background-area');
          const innerText = modalContent.querySelector('.inner-text');
          
          this.assert(textContent !== null, 'Text content should exist');
          this.assert(backgroundArea !== null, 'Background area should exist');
          this.assert(innerText !== null, 'Inner text should exist');
          
          // Test that clicking non-interactive content doesn't close modal
          if (textContent) {
            textContent.click();
            this.assert(modalService.isModalActive(testModal), 
              'Modal should remain active after clicking text content');
          }
          
          if (backgroundArea) {
            backgroundArea.click();
            this.assert(modalService.isModalActive(testModal), 
              'Modal should remain active after clicking background area');
          }
          
          if (innerText) {
            innerText.click();
            this.assert(modalService.isModalActive(testModal), 
              'Modal should remain active after clicking inner text');
          }
          
          // Test that clicking the modal content wrapper doesn't close modal
          modalContent.click();
          this.assert(modalService.isModalActive(testModal), 
            'Modal should remain active after clicking modal content wrapper');
          
          // Test that clicking the overlay DOES close the modal
          modalElement.click();
          this.assert(!modalService.isModalActive(testModal), 
            'Modal should close after clicking modal overlay');
        }
      }
      
    } catch (error) {
      console.error('❌ Modal content event stopping tests failed:', error);
      this.assert(false, `Modal content event stopping test failed with error: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🪟 Starting Modal Service Tests...\n');
    
    if (typeof window !== 'undefined') {
      this.testModalService();
      this.testModalConfiguration();
      this.testModalErrorHandling();
      this.testModalClickHandling();
      this.testModalContentEventStopping();
    } else {
      console.log('ℹ️  Skipping ModalService tests - browser environment required');
    }
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 Modal Service Test Results:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All Modal Service tests passed!');
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
  const tests = new ModalServiceTests();
  const success = tests.runAllTests();
  
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  window.ModalServiceTests = ModalServiceTests;
}

export default ModalServiceTests;
