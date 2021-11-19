import React, { useState, useContext, useEffect } from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';
import useInterval from '../../utils/useInterval';
import { useAppSelector, useAppDispatch} from '../../store/hooks';
import { addToOven, removeFromOven, removeOrder } from '../../store/slices'

function CountdownTimer({ order }) {
	const textColor = useColorModeValue('gray.700', 'white');
	const dispatch = useAppDispatch()
	const state = useAppSelector((state) => state);
	const [remainingTime, setremainingTime] = useState(660);
	console.log(state)

	useInterval(() => {
		if (remainingTime > 0) {
			setremainingTime(remainingTime - 1);
    }
    // Processing time of 6 minutes has elapsed, order should be placed in oven
    // Getting current order

    if (remainingTime === 360) {
			dispatch(addToOven(order));
		}
		// Counter has elapsed, remove order from oven
		if (remainingTime === 240) {
			dispatch(removeFromOven(order));
		}
		if (remainingTime === 0) {
			dispatch(removeOrder(order));
		}
	}, 1000);
	return (
		<span>
			<Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
				{remainingTime > 0 ? `${Math.ceil(remainingTime / 60)} min` : '--'}
			</Text>
		</span>
	);
}

export default CountdownTimer;