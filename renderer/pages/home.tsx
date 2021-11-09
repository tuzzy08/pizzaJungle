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

function Home() {

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
		// <OvenContext.Provider value={value} >
			<OrderTable />
		// </OvenContext.Provider>
	);
}

export default Home;
