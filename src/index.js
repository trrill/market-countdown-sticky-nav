import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StickyMarketCountdownWidget from './StickyMarketCountdownWidget'; // assuming you've renamed App.js to StickyMarketCountdownWidget.js

// Use camelCase for variable names
const widgetDivs = document.querySelectorAll('.sticky-market-countdown');

widgetDivs.forEach(div => {
  // Check if 'div' is truly a DOM element
  if (div instanceof HTMLElement) {
    ReactDOM.render(
      <React.StrictMode>
        <StickyMarketCountdownWidget domElement={div} />
      </React.StrictMode>,
      div
    );
  } else {
    // Handle the case where the div is not an HTMLElement (optional)
    console.error('Invalid element passed to StickyMarketCountdownWidget:', div);
  }
});
