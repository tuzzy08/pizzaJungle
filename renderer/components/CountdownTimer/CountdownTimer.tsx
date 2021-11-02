import React, { useState, useContext, useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import countdownUtil from '../../utils/countdownUtils';
import useInterval from '../../utils/useInterval';
import { OvenContext } from '../../contexts/OvenContext';

function CountdownTimer({ orderID }) {
  const textColor = useColorModeValue('gray.700', 'white');
  const context = useContext(OvenContext);

	const [remainingTime, setremainingTime] = useState(600);

	useInterval(() => {
		if (remainingTime > 0) {
			setremainingTime(remainingTime - 1);
    }
    // Processing time of 6 minutes has elapsed, order should be placed in oven
    // Getting current order
    if (remainingTime === 360) {
      context.processing.find((el, index) => {
				if (el.orderID === orderID) {
					// ? Step 1: Remove the order from processing Queue
					// ? Use array splice to remove it without leaving holes in the Queue
          const order = context.processing.splice(index, 1);
          // ? Step 2: Update it's status to "In the oven"
          order[0].status = 'In the oven';
          // ? Step 3: add it to Oven Queue
          context.addToOven(order[0]);
          // ? Step 4: update it's status in Orders Queue
          context.orders.find((elem, index) => {
            if (elem.orderID === orderID) {
              elem.status = 'In the oven';
            }
          })
          // ? Step 5: Get the next order from "Waiting Queue" if any
          if (context.waitList.length > 0) {
            const nextOrder = context.waitList.shift();
            // ? Step 6: Update its status to "In Process"
            nextOrder.status = 'In Process';
						// ? Step 7: Add it to "Processing Queue"
            context.processing.push(nextOrder);
            // ? Step 8: Find the order in "Orders Queue"
            context.orders.find((element) => {
              if (element.orderID === nextOrder.orderID) {
                // ? Step 9: Update its status in "Orders Queue"
                element.status = 'In Process';
              }
            });
          }
          
				}
				

			})
    }
	}, 1000);

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