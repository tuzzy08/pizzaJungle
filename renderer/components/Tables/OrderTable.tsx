import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Pusher from 'pusher-js';
// Chakra imports
import {
	Flex,
	Center,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
// Custom components
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import TablesOrderRow from './TablesOrderRow';
import { Order, OvenContext } from '../../contexts/OvenContext';
import { addToProcess } from '../../store/slices';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

function Tables() {
	const state = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const pusher = new Pusher('fb2d17544b3e7440c96f', {
			cluster: 'eu',
		});
		const pusherChannel = pusher.subscribe('pizza-jungle');
		
		pusherChannel.bind('new-order', (order: Order) => {
			const newOrder = { ...order, orderID: uuidv4() };
			dispatch(addToProcess(newOrder));
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
							{state.orders.map((order) => {
								return (
									<>
										{order.status != null ? <TablesOrderRow order={order}	key={order.orderID}	timer={CountdownTimer} /> : null}
									</>
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
