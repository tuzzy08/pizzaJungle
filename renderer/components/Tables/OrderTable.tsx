import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
// Custom components
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import TablesOrderRow from '../Tables/TablesOrderRow';
import { Order, OvenContext } from '../../contexts/OvenContext';
import { ACTIONS } from '../../pages/home'

const pusher = new Pusher('fb2d17544b3e7440c96f', {
	cluster: 'eu',
});
const channel = pusher.subscribe('pizza-jungle');

function Tables({ appstate }) {
	const context = useContext(OvenContext);
	let count = 0;

	React.useEffect(() => {
		console.log('Orders')
		console.log(context.state.orders.length)
		console.log('processing');
		console.log(context.state.processing.length);
	})
		
	React.useEffect(() => {
		channel.bind('new-order', async (order: Order) => {
			// Add order ID to the order
			const newOrder = { ...order, orderID: uuidv4() };
			/**
			 * Check if processing queue has space,
			 * If it does add to it and update orders list
			 * and status of the order
			 */
			if (count < 3) {
				// update order status
				newOrder.status = 'In Process';
				// Add to processing queue
				context.dispatch({ type: ACTIONS.ADD_TO_PROCESS, payload: newOrder });
				count = count + 1;
			} else {
				/**
				 * Processing queue is full,
				 * add the new order to waiting list
				 */
				// update order status
				newOrder.status = 'Waiting';
				// Add to waitList
				context.dispatch({ type: ACTIONS.ADD_TO_WAITLIST, payload: newOrder });
			}
			console.log(count);
		});
  }, []);
  
  

	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Flex direction='column' p='10' ml='10'>
			{/* <Container> */}
			<Card>
				<CardHeader>
					<Text fontSize='xl' color={textColor} fontWeight='bold' pb='50'>
						<Center>CURRENT ORDERS</Center>
					</Text>
				</CardHeader>
				<CardBody>
					<Table variant='simple' color={textColor}>
						<Thead>
							<Tr my='.8rem' pl='0px' color='gray.400'>
								<Th fontSize='20px' color='gray.400'>
									Order no
								</Th>
								<Th fontSize='20px' pl='0px' color='gray.400'>
									Name
								</Th>
								<Th fontSize='20px' color='gray.400'>
									Status
								</Th>
								<Th fontSize='20px' color='gray.400'>
									Ready In
								</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{ context.state.orders.map((order) => {
								return (
									<TablesOrderRow
										order={order}
										key={order.orderID}
									/>
								);
							})}
						</Tbody>
					</Table>
				</CardBody>
			</Card>
			{/* </Container> */}
		</Flex>
	);
}

export default Tables;
