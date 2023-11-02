import React from "react";
import "./Navbar.css";
import MarketCountdown from '../MarketCountdown/MarketCountdown.js';

const Navbar = ({ prompt = "Don't miss out. Get these recommended stock picks before the next market close.", btnText = "Join Today", btnColor = "#5fa85d", btnHref, isVisible = false }) => {
  
  function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el !== null) {
      const navbarHeight = document.querySelector(".navbar").clientHeight;
      window.scroll({ top: el.offsetTop - navbarHeight - 30, left: 0, behavior: 'smooth' });
    }
  }

  function handleBtnClick(e) {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToElement(href.slice(1));
    }
  }

  if (!isVisible) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">
          <div className="navbar__msg">
            {prompt}
          </div>
          <div className="navbar__countdown">
            <MarketCountdown />
            <div className="navbar__countdown-msg">
              Until Market Close
            </div>
          </div>
        </div>	
        <a href={btnHref} className="navbar__btn" style={{ backgroundColor: btnColor }} onClick={handleBtnClick}>
          {btnText}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
