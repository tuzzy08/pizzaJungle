export enum ACTIONS {
	ADD_TO_PROCESS = 'add-to-process',
	REMOVE_FROM_PROCESS = 'remove from-process',
	ADD_TO_OVEN = 'add-to-oven',
	REMOVE_FROM_OVEN = 'remove from-oven',
	ADD_TO_WAITLIST = 'add-to-waitlist',
	REMOVE_FROM_WAITLIST = 'remove-from-waitlist',
}

interface State {
	oven: Array<Order>;
	processing: Array<Order>;
	orders: Array<Order>;
	waitlist: Array<Order>;
}

type Order = {
	name: string;
	status: string;
	orderno: string;
	orderID: string;
};

function reducer(state: State, action) {
	let newState;
	switch (action.type) {
		case ACTIONS.ADD_TO_PROCESS:
			newState = { ...state };
			newState.processing = [...state.processing, action.payload];
			newState.orders = [...state.orders, action.payload];
			return newState;
		case ACTIONS.REMOVE_FROM_PROCESS:
			newState = { ...state };
			// Update process queue by removing the order
			console.log('Process - before');
			console.log(newState.processing);
			newState.processing.find((order, index) => {
				if (order.orderID === action.payload.orderID) {
					newState.processing.splice(index, 1);
				}
			});
			// const newProcessQueue = newState.processing.filter(
			// 	(order) => order.orderID !== action.payload.orderID
			// );
			// newState.processing = newProcessQueue;
			console.log('Process - after');
			console.log(newState.processing);
			// if (newState.oven.length < 3) {
			// 	if(newState.oven.includes(action.payload)) return
			// 	newState.oven.push(action.payload);
			// 	console.log('Process - oven');
			// 	console.log(newState.oven);
			// }

			// Update orders
			// newState.orders.find((order) => {
			// 	if (order.orderID === action.payload.orderID) {
			// 		order.status = 'In the oven';
			// 	}
			// });
			// // Fill empty spaces in process queue
			// if (newState.processing.length < 3) {
			// 	// Check number of empty spaces in processing
			// 	const emptySpaces = 3 - state.processing.length;
			// 	for (let i = emptySpaces; i > 0; i--) {
			// 		// Remove orders from waitlist and add to process queue
			// 		const nextOrder = newState.waitlist.shift();
			// 		nextOrder.status = 'In process';
			// 		newState.processing.push(nextOrder);
			// 	}
			// }
			return newState;
		case ACTIONS.REMOVE_FROM_WAITLIST:
			newState = { ...state };

			return newState;
		case ACTIONS.ADD_TO_WAITLIST:
			newState = { ...state };
			newState.waitlist = [...state.waitlist, action.payload];
			newState.orders = [...state.orders, action.payload];
			return newState;
	}
}

export default reducer;
