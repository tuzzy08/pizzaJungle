import React, { useState } from 'react';
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
import { OvenContext } from '../contexts/OvenContext';


function Home() {
	// const [orders, setOrders] = useState([{

	// }])
	const value = {
		oven: [],
		addToOven: function (order) {
			this.oven.push(order);
		},
		removeFromOven: function () {},
		countOrdersInOven: function () {
			return this.oven.length;
		},
		processing: [],
		updateProcessingQueue: function (cb) {
			try {
				return cb();
			} catch (error) {
				throw new Error(error);
			}
		},

		orders: [],
		addOrder: function (order) {
			this.orders.push(order);
		},
		waitList: [],
		updateWaitlist: function (cb) {
			try {
				return cb();
			} catch (error) {
				throw new Error(error);
			}
		},
	};
	return (
		<OvenContext.Provider value={value} >
			<OrderTable />
		</OvenContext.Provider>
	);
}

export default Home;
