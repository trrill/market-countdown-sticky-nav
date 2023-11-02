import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import Navbar from './components/Navbar/Navbar';

function App(props) {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const domElement = props.domElement;
    const showAfterSelector = domElement.getAttribute('data-show-after');
    const triggerElement = document.querySelector(showAfterSelector);
  
    // Here, we wrap handleScroll with the debounce function
    const debouncedHandleScroll = debounce(() => {
      if (triggerElement) {
        const triggerPosition = triggerElement.getBoundingClientRect().top + window.pageYOffset;
        const shouldShowNavbar = window.pageYOffset > triggerPosition;
        setShowNavbar(shouldShowNavbar);
      }
    }, 50); // Debounce with a 100ms delay
  
    window.addEventListener('scroll', debouncedHandleScroll);
  
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [props.domElement]);
  

  return (
    <Sticky>
      <Navbar
        prompt={props.domElement.getAttribute('data-prompt') || 'Don\'t miss out. Get these recommended stock picks before the next market close.'}
        btnText={props.domElement.getAttribute('data-btn-text') || 'Join Today'}
        btnColor={props.domElement.getAttribute('data-btn-color') || '#5fa85d'}
        btnHref={props.domElement.getAttribute('data-href') || '#order-form'}
        isVisible={showNavbar}
      />
    </Sticky>
  );
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default App;
