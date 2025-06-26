import { configureStore } from '@reduxjs/toolkit';

// Placeholder root reducer (add feature reducers here)
const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 