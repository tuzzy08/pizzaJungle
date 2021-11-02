import React, { useContext } from 'react';
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
import { order, OvenContext } from '../../contexts/OvenContext';

const pusher = new Pusher('fb2d17544b3e7440c96f', {
	cluster: 'eu',
});

const channel = pusher.subscribe('pizza-jungle');



function Tables() {
	const value = useContext(OvenContext);
	const [orders, setOrders] = React.useState(value.orders);
	
	React.useEffect(() => {
		channel.bind('new-order', (order: order) => {
			// Add order ID to the order
			const newOrder = { ...order, orderID: uuidv4() };
			/**
			 * Check if processing queue has space,
			 * If it does add to it and update orders list
			 * and status of the order
			 */
			if (value.processing.length < 3) {
				value.updateProcessingQueue(() => {
					// update order status
					newOrder.status = 'In Process'
					// Add to processing queue
					value.processing.push(newOrder);
					// Add to orders List
					value.addOrder(newOrder);
					// Update state
					setOrders((orders) => [...orders, newOrder]);
				});
			} else {
				/**
				 * Check if processing queue is full,
				 * if it is add the new order to waiting list
				 */
				value.updateWaitlist(() => {
					// update order status
					newOrder.status = 'Waiting';
					value.waitList.push(newOrder);
					console.log('wait list');
					console.log(value.waitList);
					// Add to orders List
					value.addOrder(newOrder);
					// Update state
					setOrders((orders) => [...orders, newOrder]);	
				});
			}	
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
							{ value.orders.map((row) => {
								return (
									<TablesOrderRow
										orderno={row.orderno}
										orderID={row.orderID}
										name={row.name}
										status={row.status}
										key={row.orderID}
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
