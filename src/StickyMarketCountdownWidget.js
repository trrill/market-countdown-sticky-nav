import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import Navbar from './components/Navbar/Navbar';
import useDebounce from './hooks/useDebounce';

// Default values as constants
const DEFAULT_PROMPT = 'Don\'t miss out. Get these recommended stock picks before the next market close.';
const DEFAULT_BTN_TEXT = 'Join Today';
const DEFAULT_BTN_COLOR = '#5fa85d';
const DEFAULT_BTN_HREF = '#order-form';

function StickyMarketCountdownWidget(props) {
  const [showNavbar, setShowNavbar] = useState(false);
  
  // Get attributes or use defaults
  const prompt = props.domElement.getAttribute('data-prompt') || DEFAULT_PROMPT;
  const btnText = props.domElement.getAttribute('data-btn-text') || DEFAULT_BTN_TEXT;
  const btnColor = props.domElement.getAttribute('data-btn-color') || DEFAULT_BTN_COLOR;
  const btnHref = props.domElement.getAttribute('data-href') || DEFAULT_BTN_HREF;

  // Show navbar? Depends...
  const debouncedShowNavbar = useDebounce(showNavbar, 50);

  useEffect(() => {
    const showAfterSelector = props.domElement.getAttribute('data-show-after');
    const triggerElement = document.querySelector(showAfterSelector);

    const handleScroll = () => {
      if (triggerElement) {
        const triggerPosition = triggerElement.getBoundingClientRect().top + window.pageYOffset;
        const shouldShowNavbar = window.pageYOffset > triggerPosition;
        setShowNavbar(shouldShowNavbar);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [props.domElement, debouncedShowNavbar]);

  return (
    <Sticky>
      <Navbar
        prompt={prompt}
        btnText={btnText}
        btnColor={btnColor}
        btnHref={btnHref}
        isVisible={debouncedShowNavbar} 
      />
    </Sticky>
  );
}

export default StickyMarketCountdownWidget;
