import { useEffect, useState } from 'react';

export default function withAutoIndicator(ProgressBar) {

function AutoIndicator( props ) {
  console.log("render");
    const { refresh = 100} = props;
    let [percentage, setPercentage] = useState(0);

    useEffect(() => {
      console.log("inside effect");
      const interval = setInterval(() => {
        setPercentage((prevPercentage) => 
          ++prevPercentage % 100
        );
        console.log("inside setInterval");
      }, refresh)
      return () => clearInterval(interval);
    }, [refresh]);

    return <ProgressBar percent={percentage} />
  }

  return AutoIndicator;
}