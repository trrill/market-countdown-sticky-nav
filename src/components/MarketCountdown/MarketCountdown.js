import React from "react";
import Countdown from "react-countdown";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import "./MarketCountdown.css";

dayjs.extend(utc);
dayjs.extend(timezone);

// Utility functions for time calculations
const getNYTime = () => dayjs().tz('America/New_York');

const getMarketStart = () => getNYTime().hour(9).minute(30).second(0);
const getMarketEnd = () => getNYTime().hour(16).minute(0).second(0);
const getFridayClose = () => getNYTime().day(5).hour(16).minute(0).second(0);
const getNextMonday = () => getNYTime().day(1 + 7).startOf('day').hour(16);

function getNextMarketClose() {
  const now = getNYTime();
  let end_time;

  if (now.day() === 0 || now.day() === 6 || now.isAfter(getFridayClose())) {
    // If it's a weekend or right after Friday close
    end_time = getNextMonday();
  } else if (now.isAfter(getMarketStart()) && now.isBefore(getMarketEnd())) {
    // If within market hours
    end_time = getMarketEnd();
  } else {
    // If before market hours
    end_time = now.hour() >= 16 ? getNextMonday() : getMarketStart();
  }

  return end_time;
}

const MarketCountdown = () => {
  const countdown_target = getNextMarketClose().toDate();

  return (
    <Countdown
      date={countdown_target}
      intervalDelay={0}
      precision={3}
      renderer={({ days, hours, minutes, seconds, milliseconds }) => (
        <div className="countdown-render">
          {days > 0 && (
            <span className="countdown__segment">{String(days).padStart(2, '0')}:</span>
          )}
          <span className="countdown__segment">{String(hours).padStart(2, '0')}:</span>
          <span className="countdown__segment">{String(minutes).padStart(2, '0')}:</span>
          <span className="countdown__segment">{String(seconds).padStart(2, '0')}:</span>
          <span className="countdown__segment">{String(Math.trunc(milliseconds / 10))}</span>
        </div>
      )}
    />
  );
};

export default MarketCountdown;
