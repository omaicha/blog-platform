import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/posts/postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
