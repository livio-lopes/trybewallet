import {
  FETCH_ERROR,
  FETCH_LOAD,
  FETCH_LIST_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE } from '../actions';

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
  case FETCH_LOAD:
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
  case FETCH_ERROR:
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isLoading: false,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload.id,
      editor: true,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((exp) => {
        let swtichExp = exp;
        if (exp.id === action.payload.index) {
          swtichExp = action.payload.expenses;
        }
        return swtichExp;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
