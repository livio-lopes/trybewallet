import { fetchListCoins } from '../../services/fetchAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const FETCH_LIST_LOAD = 'FETCH_LIST_LOAD';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR';

const fetchListLoad = () => ({
  type: FETCH_LIST_LOAD,
});

const fetchListError = (error) => ({
  type: FETCH_LIST_ERROR,
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
