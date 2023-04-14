import { fetchListCoins, fetchExchangeRates } from '../../services/fetchAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const FETCH_LOAD = 'FETCH_LOAD';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

const fetchListLoad = () => ({
  type: FETCH_LOAD,
});

const fetchListError = (error) => ({
  type: FETCH_ERROR,
  payload: error,
});

const fetchListSuccess = (currencies) => ({
  type: FETCH_LIST_SUCCESS,
  payload: { currencies },
});

export const actionFetchListCoint = () => async (dispatch) => {
  dispatch(fetchListLoad());
  try {
    const list = await fetchListCoins();
    dispatch(fetchListSuccess(list));
  } catch (error) {
    dispatch(fetchListError(error));
  }
};
export const ADD_EXPENSE = 'ADD_EXPENSE';

const addExpense = (expenses) => (
  { type: ADD_EXPENSE, payload: { expenses } });

export const fetchAddExpense = (expense) => async (dispatch) => {
  dispatch(fetchListLoad());
  try {
    const exchangeRates = await fetchExchangeRates();
    const newExpense = {
      ...expense,
      exchangeRates,
    };
    dispatch(addExpense(newExpense));
  } catch (error) {
    dispatch(fetchListError(error));
  }
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: {
    id,
  },
});
