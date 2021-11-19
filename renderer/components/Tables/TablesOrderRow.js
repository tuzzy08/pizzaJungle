import { Badge, Flex, Td, Text, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import CountdownTimer from '../CountdownTimer/CountdownTimer';

function TablesOrderRow({ order, timer }) {
	const orderStatusColor = {
		'In process': 'blue.400',
		'In the oven': 'green.100',
		Ready: 'green.400',
		Waiting: 'pink.400',
	};
	const textColor = useColorModeValue('gray.700', 'white');
	// const bgStatus = useColorModeValue('yellow.400', '#1a202c');
	const colorStatus = useColorModeValue('white', 'gray.400');
	return (
		<Tr>
			<Td>
				<Flex direction='column'>
					<Text fontSize='md' color='gray.400' fontWeight='normal'>
						{order.orderno}
					</Text>
				</Flex>
			</Td>
			<Td minWidth={{ sm: '250px' }} pl='0px'>
				{/* <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'> */}
				{/* <Avatar src={logo} w='50px' borderRadius='12px' me='18px' /> */}
				<Flex direction='column'>
					<Text
						fontSize='md'
						color={textColor}
						fontWeight='bold'
						minWidth='100%'
					>
						{order.name}
					</Text>
				</Flex>
				{/* </Flex> */}
			</Td>
			<Td>
				<Badge
					bg={orderStatusColor[order.status]}
					color='white'
					fontSize='16px'
					p='3px 10px'
					borderRadius='8px'
				>
					{order.status}
				</Badge>
			</Td>
			<Td>
				{order.status !== 'Waiting' ? <CountdownTimer order={order} /> : null}

				{/* <Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
					{time}
					mins
				</Text> */}
			</Td>
		</Tr>
	);
}

export default TablesOrderRow;
