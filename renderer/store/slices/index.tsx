import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../contexts/OvenContext';

// Define a type for the slice state
interface storeState {
	orders: Array<Order>;
	processing: Array<Order>;
	oven: Array<Order>;
	waitlist: Array<Order>;
}

enum Status {
	ready = 'Ready',
	process = 'In process',
	oven = 'In the oven',
	waiting = 'Waiting'
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
		addToProcess: (state, action: PayloadAction<Order>) => {
			if (state.processing.length < 3) {
				const order = { ...action.payload };
				order.status = Status.process;
				state.processing.push(order);
				// Add order to orders array
				state.orders.push(order);
			} else {
				// Add to waiting array
				storeSlice.caseReducers.addToWaitingQueue(state, action);
			}
		},
		removeFromProcess: (state, action: PayloadAction<Order>) => {
			console.log('Process');
			console.log(state.processing);
			const newProcessingQueue = [
				...state.processing.filter(
					(order) => order.orderID !== action.payload.orderID
				),
			];
			// Set state to point to new array
			state.processing = newProcessingQueue;
			// -------------------------------------------------------------
			storeSlice.caseReducers.updateWaitingQueue(state, action);
		},
		updateProcessingQueue: (state, action: PayloadAction<Order>) => {
			if (state.processing.length > 0) {
				const newProcessingQueue = state.processing;
				const nextOrder = newProcessingQueue.shift();
				nextOrder.status = Status.oven;
				state.oven.push(nextOrder);
				action.payload = nextOrder;
				storeSlice.caseReducers.toggleOrders(state, action);
				storeSlice.caseReducers.updateWaitingQueue(state, action);
			}
		},
		removeFromOrders: (state, action) => {
			if (state.processing.length >= 3) {
				action.payload.status = 'Waiting';
				state.orders.push(action.payload);
			}
			state.orders.push(action.payload);
		},
		toggleOrders: (state, action: PayloadAction<Order>) => {
			const result = state.orders.find(
				(order) => order.orderID === action.payload.orderID
			);
			if (result) result.status = action.payload.status;
		},
		addToOven: (state, action: PayloadAction<Order>) => {
			if (state.oven.length < 3) {
				// -----------------------------------------------------------------------
				// Change order status & add to oven queue
				const order = { ...action.payload };
				order.status = Status.oven;
				state.oven.push(order);
				// Fetch and update order status in Orders list
				action.payload = order;
				storeSlice.caseReducers.toggleOrders(state, action);
				// ........................................................................
				// Remove order from processing queue
				storeSlice.caseReducers.removeFromProcess(state, action);
			}
		},
		removeFromOven: (state, action: PayloadAction<Order>) => {
			/**
			 * Modify Oven Queue
			 * Remove the order from list of orders in the oven
			 * Update its status in the list of all orders
			 */
			//
			if (state.oven.length > 0) {
				const newOvenQueue = [
					...state.oven.filter(
						(order) => order.orderID !== action.payload.orderID
					),
				];
				// Set state to new oven queue
				state.oven = newOvenQueue;
				//-----------------------------------------
				const order = { ...action.payload };
				order.status = Status.ready;
				action.payload = order;
				storeSlice.caseReducers.toggleOrders(state, action);
			}
		},
		addToWaitingQueue: (state, action: PayloadAction<Order>) => {
			const order = { ...action.payload };
			order.status = Status.waiting;
			state.waitlist.push(order);
			state.orders.push(order);
		},
		updateWaitingQueue: (state, action: PayloadAction<Order>) => {
			if (state.waitlist.length > 0) {
				const newWaitingQueue = state.waitlist;
				// Get next order from waiting array
				const nextOrder = newWaitingQueue.shift();
				state.waitlist = newWaitingQueue;
				state.processing.push(nextOrder);
				nextOrder.status = Status.process;

				action.payload = nextOrder;
				storeSlice.caseReducers.toggleOrders(state, action);
			}
		},
		removeOrder: (state, action: PayloadAction<Order>) => {
			const order = { ...action.payload };
			order.status = null;
			action.payload = order;
			storeSlice.caseReducers.toggleOrders(state, action);
		},
	},
});

// Export auto-generated actions
// ------------------------------
export const { addToProcess, toggleOrders, addToOven, removeFromOven, removeOrder } =
	storeSlice.actions;
// Export combined reducer
// -----------------------
export default storeSlice.reducer;