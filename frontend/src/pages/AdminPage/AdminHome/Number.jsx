import React, { useState, useEffect } from 'react';
import { Statistic } from 'antd';

const Number = ({ title, value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 100);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(start));
    }, 40);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <Statistic title={title} value={displayValue} valueStyle={{ fontSize: '20px' }} />;
};

export default Number;