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

function Tables() {
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
							{tablesTableData.map((row) => {
								return (
									<TablesTableRow
										name={row.name}
										email={row.email}
										subdomain={row.subdomain}
										domain={row.domain}
										status={row.status}
										date={row.date}
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
