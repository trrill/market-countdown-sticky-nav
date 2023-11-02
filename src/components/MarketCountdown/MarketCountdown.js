import React from "react";
import Countdown from "react-countdown";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Use the desired locale
// css
import "./MarketCountdown.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('en');

const MarketCountdown = () => {
  //.set({ 'hour': 9, 'minute': 30, 'second': 0 });
  const start = dayjs().tz('America/New_York').hour(9).minute(30).second(0);
  //.set({ 'hour': 16, 'minute': 0, 'second': 0 });
  const end = dayjs().tz('America/New_York').hour(16).minute(0).second(0);
  //.day(5).hour(16);
  const friClose = dayjs().tz('America/New_York').day(5).hour(16).minute(0).second(0);
  
  console.log('start', start.format('dddd, MMMM D, YYYY, h:mm:ss a'))
  console.log('now', dayjs().tz('America/New_York').format('dddd, MMMM D, YYYY, h:mm:ss a'));

  function calculateNextMonday() {
    return dayjs().tz('America/New_York').day(1 + 7).startOf('day');
  }

  function getNextMarketClose() {
    console.log('getNextMarketClose');
    let end_time;

    if (
      // If it's a weekend
      dayjs().tz('America/New_York').day() < 1 ||
      dayjs().tz('America/New_York').isAfter(friClose)
      //  || dayjs().tz('America/New_York').day() > 4
    ) {
      end_time = calculateNextMonday();

      console.log('next monday', end_time.format('dddd, MMMM D, YYYY'));

      end_time = end_time.add({ hours: 16, minutes: 0 }).calendar();
    } else {

      if (
        dayjs().tz('America/New_York').isAfter(start) &&
        dayjs().tz('America/New_York').isBefore(end)
      ) {
        console.log('start', start.format('dddd, MMMM D, YYYY'));
        end_time = end;
      } else {
        //console.log('tomorrow', tomorrow.format('dddd, MMMM D, YYYY')
        let startOfDay = dayjs().tz('America/New_York').startOf('day');
        let tomorrow = startOfDay.add({ days: 1, hours: 16, minutes: 0 });
        end_time = tomorrow;
      }
    }

    return end_time;
  }

  let countdown_target = getNextMarketClose();
  countdown_target = countdown_target.toDate();

  return (
    <Countdown
      date={countdown_target}
      intervalDelay={0}
      precision={3}
      renderer={(props) => (
        <div className="countdown-render">
          {props.days > 0 && (
            <div>
              <div className="countdown__segment">
                {String(props.days).padStart(2, '0')}
              </div>
              :
            </div>
          )}
          <div className="countdown__segment">
            {String(props.hours).padStart(2, '0')}
          </div>
          :
          <div className="countdown__segment">
            {String(props.minutes).padStart(2, '0')}
          </div>
          :
          <div className="countdown__segment">
            {String(props.seconds).padStart(2, '0')}
          </div>
          :
          <div className="countdown__segment">
            {String(Math.trunc(props.milliseconds / 10))}
          </div>
        </div>

      )}
    />
  );
};

export default MarketCountdown;
