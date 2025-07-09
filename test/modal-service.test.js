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
   * Test modal service error handling
   */
  testModalErrorHandling() {
    console.log('🛡️ Testing Modal Error Handling...');
    
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
   * Run all tests
   */
  runAllTests() {
    console.log('🪟 Starting Modal Service Tests...\n');
    
    if (typeof window !== 'undefined') {
      this.testModalService();
      this.testModalConfiguration();
      this.testModalErrorHandling();
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
