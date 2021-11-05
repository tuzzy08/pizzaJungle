import { Badge, Flex, Td, Text, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import CountdownTimer from '../CountdownTimer/CountdownTimer';

function TablesOrderRow({ order }) {
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
					bg={order.status === 'Ready' ? 'green.400' : 'yellow.300'}
					color='white'
					fontSize='16px'
					p='3px 10px'
					borderRadius='8px'
				>
					{order.status}
				</Badge>
			</Td>
			<Td>
				<CountdownTimer order={order} />
				{/* <Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
					{time}
					mins
				</Text> */}
			</Td>
		</Tr>
	);
}

export default TablesOrderRow;
