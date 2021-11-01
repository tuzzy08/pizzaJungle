import React, { useState, useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import countdownUtil from '../../utils/countdownUtils';
import useInterval from '../../utils/useInterval';

function CountdownTimer() {
  const textColor = useColorModeValue('gray.700', 'white');

  const [remainingTime, setremainingTime] = useState(120);

  useInterval(() => {
    if (remainingTime > 0) {
      setremainingTime(remainingTime - 1);
    }    
  }, 1000)

  // Function to update the time every second
  // function updateTime() {
	// 	// countdownUtil();
  //   // const temp = (remainingTime - 1);
  //   setremainingTime(remainingTime - 1);
  //   console.log(remainingTime);

	// }
  // Useffect to setup the interval and clear the interval
  // useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		updateTime();
	// 	}, 1000);
	// 	return () => clearInterval(intervalId);
	// }, []);
  
  return (
		<span>
			<Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
				{remainingTime > 0 ? `${Math.ceil(remainingTime / 60)} min` : '--'}
			</Text>
		</span>
	);
}

export default CountdownTimer;