import React, { useState, useReducer } from 'react';
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
import OrderTable from '../components/Tables/OrderTable';

function Home() {
	return (
		<OrderTable />
	);
}

export default Home;
