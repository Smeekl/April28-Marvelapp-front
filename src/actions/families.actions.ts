import {FETCH_FAMILIES} from '../types';
import {AppDispatch} from '../store';

export const FetchFamilies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: FETCH_FAMILIES,
      payload: []
    });
  };
};