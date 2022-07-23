import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../page/walletSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
