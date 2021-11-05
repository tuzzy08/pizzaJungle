import React, { useState, useContext, useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import countdownUtil from '../../utils/countdownUtils';
import useInterval from '../../utils/useInterval';
import { OvenContext } from '../../contexts/OvenContext';

function CountdownTimer({ orderID }) {
  const textColor = useColorModeValue('gray.700', 'white');
  const context = useContext(OvenContext);
  const [remainingTime, setremainingTime] = useState(120);

	useInterval(() => {
		if (remainingTime > 0) {
			setremainingTime(remainingTime - 1);
    }
    // Processing time of 6 minutes has elapsed, order should be placed in oven
    // Getting current order
    // if (remainingTime === 70) {
    //   // let index = null;
    //   let order = null;
		// 	// ? Step 1: Remove the order from processing Queue
    //   // make copy of processing array
    //   const temp = context.processing;
    //   // find and set order 
    //   temp.find(async (el, idx) => {
    //     if (el.orderID === orderID) {
    //       // index = idx
    //       // Mutate copy of array while removing order
    //       console.log('Temp Processing queue before splicing');
		// 			console.log(temp);
    //       order = temp.splice(idx, 1);
    //       console.log('Temp Processing queue after splicing');
		// 			console.log(temp);
    //     }
    //   })
    //   if (order) {
    //       console.log('Processing queue before state update');
		// 			console.log(context.processing);
    //     // update processing queue in context
    //     context.setProcessing(temp);
        
    //       console.log('Processing queue after state update');
		// 			console.log(context.processing);
    //     // set order status
    //     order.status = 'In the oven';
    //     // Add to oven queue
    //       console.log('Oven queue before state update');
		// 			console.log(context.oven);
    //     context.setOven((ordersInOven) => [...ordersInOven, order]);
    //     console.log('Oven queue before state update');
		// 		console.log(context.oven);
    //     // update order status in orders array
    //     console.log('Orders queue before state update');
		// 		console.log(context.orders);
    //     context.setOrders((allOrders) => [...allOrders, order]);
    //     console.log('Orders queue before state update');
		// 		console.log(context.orders);

    //   }
    //   // const newProcessingQueue = context.processing.filter((order) => order.orderID !== orderID);


		// 	// context.processing.find(async (el, index) => {
		// 	// 	if (el.orderID === orderID) {
		// 	// 		// ? Step 1: Remove the order from processing Queue
		// 	// 		// ? Use array splice to remove it without leaving holes in the Queue
		// 	// 		const order = await context.processing.splice(index, 1)[0];
		// 	// 		// ? Step 2: Update it's status to "In the oven"
		// 	// 		order.status = 'In the oven';
		// 	// 		// ? Step 3: add it to Oven Queue
		// 	// 		context.addToOven(order);
		// 	// 		// ? Step 4: update it's status in Orders Queue
		// 	// 		console.log('orders - after');
		// 	// 		console.log(context.orders);
		// 	// 		context.orders.find((elem) => {
		// 	// 			if (elem.orderID === orderID) {
		// 	// 				elem.status = 'In the oven';
		// 	// 			}
		// 	// 		});
		// 	// 		// ? Step 5: Get the next order from "Waiting Queue" if any
		// 	// 		// if (context.waitList.length > 0) {
		// 	// 		//   const nextOrder = context.waitList.shift();
		// 	// 		//   // ? Step 6: Update its status to "In Process"
		// 	// 		//   nextOrder.status = 'In Process';
		// 	// 		// 	// ? Step 7: Add it to "Processing Queue"
		// 	// 		//   context.processing.push(nextOrder);
		// 	// 		//   // ? Step 8: Find the order in "Orders Queue"
		// 	// 		//   context.orders.find((element) => {
		// 	// 		//     if (element.orderID === nextOrder.orderID) {
		// 	// 		//       // ? Step 9: Update its status in "Orders Queue"
		// 	// 		//       element.status = 'In Process';
		// 	// 		//     }

		// 	// 		// console.log(context.orders);
		// 	// 		//   });
		// 	// 		// }
		// 	// 	}
		// 	// });
		// }
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