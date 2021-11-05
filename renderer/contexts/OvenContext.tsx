import { createContext } from 'react';

export type Order = {
	name: string;
	status: string;
	orderno: string;
	orderID: string;
};


interface State {
	oven: Array<Order>;
	processing: Array<Order>;
	orders: Array<Order>;
	waitlist: Array<Order>;
}

// interface OvenInterface {
// 	oven: Array<object>;
// 	// addToOven: (order: order) => void;
// 	// removeFromOven: Function;
// 	// countOrdersInOven: Function;
// 	setOven: Function;
// 	orders: Array<Order>;
// 	setOrders: Function;
// 	processing: Array<Order>;
// 	setProcessing: Function;
// 	waitlist: Array<Order>;
// 	setWaitlist: Function);
// }

interface OvenInterface {
	state: State;
	dispatch: Function;
}

const OvenContext = createContext<OvenInterface | null>(null);

export { OvenContext }