import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../contexts/OvenContext';

// Define a type for the slice state
interface storeState {
	orders: Array<Order>;
	processing: Array<Order>;
	oven: Array<Order>;
	waitlist: Array<Order>;
}

// Define the initial state using that type
const initialState: storeState = {
	orders: [],
	processing: [],
	oven: [],
	waitlist: [],
};

const storeSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		addToProcess: (state, action) => {
			if (state.processing.length < 3) {
				state.processing.push(action.payload);
				state.orders.push(action.payload);
			} else {
				action.payload.status = 'Waiting';
				state.waitlist.push(action.payload);
				state.orders.push(action.payload);
			}	
		},
		// removeFromProcess: (state, action: PayloadAction<Order>) => {
		// 	state.processing = state.processing.filter(
		// 		(order) => order.orderID !== action.payload.orderID
		// 	);
		// },
		// addToOrders: (state, action) => {
		// 	if (state.processing.length >= 3) {
		// 		action.payload.status = 'Waiting';
		// 		state.orders.push(action.payload);
		// 	}
		// 	state.orders.push(action.payload);
		// },
		toggleOrders: (state, action) => {
			const result = state.orders.find((order) => order.orderID === action.payload.orderID)
			if(result) result.status = action.payload.status
		},
		addToOven: (state, action) => {
			if (state.oven.length < 3) {
				state.processing = state.processing.filter(
					(order) => order.orderID !== action.payload.orderID
				);
				const nextOrder = state.waitlist.shift();
				if (nextOrder) state.processing.push(nextOrder);
				action.payload.status = 'In the oven';
				state.oven.push(action.payload);
				const result = state.orders.find((order) => order.orderID === action.payload.orderID)
				if (result) result.status = 'In the oven';
			}
		},
		removeFromOven: (state, action: PayloadAction<Order>) => {
			state.oven = state.oven.filter((order) => order.orderID !== action.payload.orderID);
			const result = state.orders.find(
				(order) => order.orderID === action.payload.orderID
			);
			if (result) result.status = 'Ready';
		},
		// addToWaitlist: (state, action) => {
		// 	if (state.length < 3) state.push(action.payload);
		// },
		// removeFromWaitlist: (state, action: PayloadAction<Order>) => {
		// 	state.waitlist = state.waitlist.filter((order) => order.orderID !== action.payload.orderID);
		// 	if (state.processing.length < 3) {
		// 		state.processing.push(action.payload);
		// 		state.orders.push(action.payload);
		// 	}
		// 	action.payload.status = 'Waiting';
		// 	state.waitlist.push(action.payload);
		// 	state.orders.push(action.payload);
		// },
	},
});

// Export auto-generated actions
// ------------------------------
export const { addToProcess, toggleOrders, addToOven, removeFromOven } =
	storeSlice.actions;
// Export combined reducer
// -----------------------
export default storeSlice.reducer;