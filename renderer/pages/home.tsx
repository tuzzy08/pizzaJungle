import React from 'react';
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
  Container,
} from '@chakra-ui/react';
// Custom components
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
import TablesOrderRow from '../components/Tables/TablesOrderRow';
import { tablesTableData } from '../variables/general';

const pusher = new Pusher('fb2d17544b3e7440c96f', {
	cluster: 'eu',
});

const channel = pusher.subscribe('pizza-jungle');

interface Order {
	orderno: string;
	name: string;
	item: string;
	status: string;
	time: string;
}

function Tables() {
	const [orders, setOrders] = React.useState([]);
	
	React.useEffect(() => {
		channel.bind('new-order', (order) => {
			setOrders((orders) => [...orders, order]);});
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
							{orders.map((row) => {
								return (
									<TablesOrderRow
										orderno={row.orderno}
										name={row.name}
										status={row.status}
										time={row.time}
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
