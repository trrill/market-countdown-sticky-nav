import React, {useRef} from "react"
import "./Navbar.css"
import MarketCountdown from '../MarketCountdown/MarketCountdown.js';

const Navbar = ({prompt, btnText, btnColor, btnHref}) => {
	const navBarRef = useRef(null)

	function handleBtnClick(e) {
		let btn = e.target;
		let href = btn.getAttribute('href');
		if ( href.startsWith('#') ) {
			let id = href.split('#')
			let el = document.getElementById(id[1])
			if ( el !== null ) {
				// We're attempting to anchor to a existing page element.
				e.preventDefault();
				
				let navbarHeight = navBarRef.current.clientHeight;
				window.scroll({ top: (el.offsetTop - navbarHeight - 30), left: 0, behavior: 'smooth' });
			}
		}
	}


	

	return (
		<nav className="navbar" ref={navBarRef}>
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
				<a href={btnHref} className="navbar__btn" style={{backgroundColor: btnColor}} onClick={handleBtnClick}>
					{btnText}
				</a>
			</div>
		</nav>
	);
};

export default Navbar
