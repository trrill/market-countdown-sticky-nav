import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/* Rather than a single #root div,
* we want the ability to place multiple instances of our 
* widget "app" on the page and pass them customizable data attributes.
*/
const WidgetDivs = document.querySelectorAll('.sticky-market-countdown')

// Inject our React App into each
WidgetDivs.forEach(Div => {
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div
  );
})
