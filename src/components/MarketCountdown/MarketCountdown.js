import React from "react";
import Countdown from "react-countdown";
import "./MarketCountdown.css"

// look into using day.js
// https://day.js.org/docs/en/installation/node-js

const MarketCountdown = () => {
  const moment = require('moment-timezone');
  const start = moment.tz('America/New_York').set({ 'hour': 9, 'minute': 30, 'second': 0 });
  const end = moment.tz('America/New_York').set({ 'hour': 16, 'minute': 0, 'second': 0 });
  const friClose = moment.tz('America/New_York').day(5).hour(16)
  
  let countdown_target;
  
  function getNextMonday() {
    return moment().tz('America/New_York').day(1 + 7).startOf('day');
  }

  function getNextMarketClose(date) {
    let end_time;

    // If "today" is Fr/Sat/Sun, get closing time this coming Monday
    if ( moment.tz('America/New_York').day() < 1 || moment.tz('America/New_York').isAfter(friClose) || moment.tz('America/New_York').day() > 4 ) {
      end_time = getNextMonday();
      end_time.add({hours: 16, minutes: 0}).calendar();

    } else {
      
      if( moment().tz('America/New_York').isAfter( start ) && moment().tz('America/New_York').isBefore( end ) ) {
        // Before today's closing
        end_time = end;
  
      } else {
        // Get tomorrow's closing
        let startOfDay =  moment().tz('America/New_York').startOf('day');;
        let tomorrow = startOfDay.add({days: 1, hours: 16, minutes: 0});
        end_time = tomorrow;  
      }
    }

    return end_time;
  }
  
  countdown_target = getNextMarketClose();
  countdown_target = countdown_target.toDate();
  
  return <Countdown 
      date={countdown_target} 
      intervalDelay={0}
      precision={3} 
      renderer = {
        props => 
          <div className="countdown-render">
            
          {(props.days > 0 ) ? <div><div className="countdown__segment">{props.days.toString().padStart(2, '0')}</div>:</div> : '' }
            <div className="countdown__segment">{props.hours.toString().padStart(2, '0')}</div>:
            <div className="countdown__segment">{props.minutes.toString().padStart(2, '0')}</div>:
            <div className="countdown__segment">{props.seconds.toString().padStart(2, '0')}</div>:
            <div className="countdown__segment">{Math.trunc(props.milliseconds / 10)}</div>
          </div>
      } 
    /> 
}

export default MarketCountdown