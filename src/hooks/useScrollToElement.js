// src/hooks/useScrollToElement.js
import { useCallback } from 'react';

const useScrollToElement = () => {
  const scrollToElement = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector(".navbar").clientHeight;
      const desiredOffset = element.offsetTop - navbarHeight - 30;
      window.scrollTo({
        top: desiredOffset,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollToElement;
};

export default useScrollToElement;
