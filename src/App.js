import React, {Component} from 'react'
import Sticky from 'react-stickynode'
import Navbar from './components/Navbar/Navbar.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.domElement = this.props.domElement
    this.prompt = ( this.domElement.getAttribute("data-prompt") !== null && this.domElement.getAttribute("data-prompt") !== '' ) ? this.domElement.getAttribute("data-prompt") : 'Don\'t miss out. Get these recommended stock picks before the next market close.'
    this.btnText = ( this.domElement.getAttribute("data-btn-text") !== null && this.domElement.getAttribute("data-btn-text") !== '' ) ? this.domElement.getAttribute("data-btn-text") : 'Join Today'
    this.btnColor = ( this.domElement.getAttribute("data-btn-color") !== null && this.domElement.getAttribute("data-btn-color") !== '' ) ? this.domElement.getAttribute("data-btn-color") : '#5fa85d'
    this.btnHref = ( this.domElement.getAttribute("data-href") !== null && this.domElement.getAttribute("data-href") !== '' ) ? this.domElement.getAttribute("data-href") : '#order-form'

    this.showAfter = this.domElement.getAttribute("data-show-after")
  }

  // And pass them to the sticky navbar
  render() {
    const r = this
    const domElement = r.domElement

    if ( r.showAfter !== null ) {
      

      window.addEventListener('DOMContentLoaded', (event) => {
        r.triggerEl = document.querySelector(r.showAfter)
        
     
          window.addEventListener("scroll", function() {
            
            
            if ( typeof r.triggerEl === 'undefined' || r.triggerEl === null ) {
              return
            } else {
              
              let triggerPosition = r.triggerEl.offsetTop + r.triggerEl.clientHeight
        
              if ( window.pageYOffset > triggerPosition ) {
                
                domElement.classList.add('active')
                domElement.classList.remove('inactive')
              } else {
                domElement.classList.add('inactive')
                domElement.classList.remove('active')
              }
            }
          })
        

        

        
      });

      
    } else {
      domElement.style.display = 'block'
    }

    return (
      <Sticky>
        <Navbar prompt={this.prompt} btnText={this.btnText} btnColor={this.btnColor} btnHref={this.btnHref} />
      </Sticky>
    );
  }
}

export default App;
