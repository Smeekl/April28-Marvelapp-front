import {FETCH_FAMILIES} from '../types';

export interface Family {
  id: number;
}

export interface Action {
  type: string;

  [key: string]: any;
}

const families = (state: Family[] = [], action: Action) => {
  switch (action.type) {
    case FETCH_FAMILIES:
      return action.payload;
    default:
      return state;
  }
};

export default families;