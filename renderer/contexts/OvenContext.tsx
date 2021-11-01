import { createContext } from 'react';

export type order = {
	name: string;
	status: string;
	orderno: string;
	orderID: string;
};

interface OvenInterface {
	oven: Array<object>;
	addToOven: Function;
	removeFromOven: Function;
	countOrdersInOven: Function;
	// setOven: Function;
	orders: Array<order>;
	addOrder: Function;
	processing: Array<order>;
	updateProcessingQueue: (cb: Function) => {};
	waitList: Array<order>;
	updateWaitlist: (cb: Function) => {};
}

const OvenContext = createContext<OvenInterface | null>(null);

export { OvenContext }