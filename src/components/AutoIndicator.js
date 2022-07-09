import { useEffect, useState } from 'react';

export default function withAutoIndicator(ProgressBar) {

  function AutoIndicator( props ) {
    const { refresh = 100} = props;
    let [percentage, setPercentage] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setPercentage(++percentage > 100 ? 0 : percentage);
      }, refresh)
      return () => clearInterval(interval);
    }, [percentage, refresh]);

    return <ProgressBar percent={percentage} />
  }

  return AutoIndicator;
}