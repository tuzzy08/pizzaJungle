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
import TablesTableRow from '../components/Tables/TablesTableRow';
import { tablesTableData } from '../variables/general';

const pusher = new Pusher('98548e046f30ae61931d', {
	cluster: 'eu',
});

const channel = pusher.subscribe('pizza-jungle');

interface Order {
  name,
  item,
  status,
  time
}

function Tables() {
  const [orders, setOrders] = React.useState([{
    name: '',
    item: '',
    status: '',
    time: ''
  }]);

  channel.bind('new-order', order => {
		setOrders(order);
	});
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
								<Th pl='0px' color='gray.400'>
									Customer
								</Th>
								<Th color='gray.400'>Order item</Th>
								<Th color='gray.400'>Status</Th>
								<Th color='gray.400'>Remaining Time</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{orders.map((row) => {
								return (
									<TablesTableRow
										name={row.name}
										item={row.item}
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
