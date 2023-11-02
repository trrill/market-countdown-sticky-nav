import React from "react";
import styles from "./Navbar.css";
import MarketCountdown from '../MarketCountdown/MarketCountdown.js';
import useScrollToElement from '../../hooks/useScrollToElement.js';

const Navbar = ({ prompt, btnText, btnColor, btnHref, isVisible }) => {
  const scrollToElement = useScrollToElement();

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
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__content}>
          <div className={styles.navbar__msg}>
            {prompt}
          </div>
          <div className={styles.navbar__countdown}>
            <MarketCountdown />
            <div className={styles.navbar__countdownMsg}>
              Until Market Close
            </div>
          </div>
        </div>  
        <a href={btnHref} className={styles.navbar__btn} style={{ backgroundColor: btnColor }} onClick={handleBtnClick}>
          {btnText}
        </a>
      </div>
    </nav>
  );
};

// Doesn't hurt to set default props again.
Navbar.defaultProps = {
  prompt: "Don't miss out. Get these recommended stock picks before the next market close.",
  btnText: "Join Today",
  btnColor: "#5fa85d",
  btnHref: "#",
  isVisible: false
};

export default React.memo(Navbar);
