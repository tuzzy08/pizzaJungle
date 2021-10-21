import {
	Avatar,
	Badge,
	Button,
	Flex,
	Td,
	Text,
	Tr,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

function TablesOrderRow(props) {
	const { orderno, name, status, time } = props;
	const textColor = useColorModeValue('gray.700', 'white');
	const bgStatus = useColorModeValue('yellow.400', '#1a202c');
	const colorStatus = useColorModeValue('white', 'gray.400');
	const statusColor = {};

	return (
		<Tr>
			<Td>
				<Flex direction='column'>
					<Text fontSize='md' color='gray.400' fontWeight='normal'>
						{orderno}
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
						{name}
					</Text>
				</Flex>
				{/* </Flex> */}
			</Td>
			<Td>
				<Badge
					bg={status === 'In the Oven' ? 'green.400' : 'yellow.300'}
					color={status === 'Online' ? 'white' : colorStatus}
					fontSize='16px'
					p='3px 10px'
					borderRadius='8px'
				>
					{status}
				</Badge>
			</Td>
			<Td>
				<Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
					{time}
					{` mins`}
				</Text>
			</Td>
		</Tr>
	);
}

export default TablesOrderRow;
