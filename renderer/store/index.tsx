import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {orders: ordersReducer, processing: processingReducer, oven: ovenReducer}
export type AppDispatch = typeof store.dispatch

export default store;