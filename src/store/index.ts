import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import families from '../reducers/families.reducer';

export const store = createStore(families, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;