import {
  FETCH_LIST_LOAD,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  errorMsg: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_LIST_LOAD:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_LIST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: [...action.payload.currencies],
    };
  case FETCH_LIST_ERROR:
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
