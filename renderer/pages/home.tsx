import React, { useState, useReducer } from 'react';
import Pusher from 'pusher-js';
// Chakra imports
import {
  Flex,
  Center,
  Box,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import OrderTable from '../components/Tables/OrderTable'
import { Order, OvenContext } from '../contexts/OvenContext';

export enum ACTIONS {
	ADD_TO_PROCESS = 'add-to-process',
	REMOVE_FROM_PROCESS = 'remove from-process',
	ADD_TO_OVEN = 'add-to-oven',
	REMOVE_FROM_OVEN = 'remove from-oven',
	ADD_TO_WAITLIST = 'add-to-waitlist',
	REMOVE_FROM_WAITLIST = 'remove-from-waitlist',
}

interface State {
	oven: Array<Order>;
	processing: Array<Order>;
	orders: Array<Order>;
	waitlist: Array<Order>;
}

function Home() {
	function reducer(state: State, action) {
		let newState;
		switch (action.type) {
			case ACTIONS.ADD_TO_PROCESS:
				newState = { ...state };
				newState.processing = [...state.processing, action.payload];
				newState.orders = [...state.orders, action.payload];
				return newState;
			case ACTIONS.REMOVE_FROM_PROCESS:
				newState = { ...state };
				newState.processing = state.processing.filter(
					(order) => order.orderID !== action.payload.orderID
				);
				// Add to oven
				newState.oven.push(action.payload);
				// Update orders 
				newState.orders.find((order) => {
					if (order.orderID === action.payload.orderID) {
						order.status = 'In the oven'
					}
				})
				return newState;
			case ACTIONS.ADD_TO_WAITLIST:
				newState = { ...state };
				newState.waitlist = [...state.waitlist, action.payload];
				newState.orders = [...state.orders, action.payload];
				return newState;
		}
	}

	const initialState = {
		oven: [],
		processing: [],
		orders: [],
		waitlist: [],
	};

	// const [appContext, setAppContext] = useState({
	// 	oven: [],
	// 	processing: [],
	// 	orders: [],
	// 	waitlist: []
	// });

	const [state, dispatch] = useReducer(reducer, initialState)
	const value = {
		state,
		dispatch,
	};

	// const [oven, setOven] = useState([])
	// const [processing, setProcessing] = useState([]);
	// const [orders, setOrders] = useState([]);
	// const [waitlist, setWaitlist] = useState([]);
	// const value = {
	// 	oven,
	// 	setOven,
	// 	processing,
	// 	setProcessing,
	// 	orders,
	// 	setOrders,
	// 	waitlist,
	// 	setWaitlist,
	// };
	return (
		<OvenContext.Provider value={value} >
			<OrderTable appstate={ state } />
		</OvenContext.Provider>
	);
}

export default Home;
