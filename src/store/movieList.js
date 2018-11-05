import { put, call, take, select } from 'redux-saga/effects';
import axios from 'axios';

const RESET = 'movie-list/movieList/RESET';

const DELETE_LIST_REQUEST = 'movie-list/movieList/DELETE_LIST_REQUEST';
const DELETE_LIST_SUCCESS = 'movie-list/movieList/DELETE_LIST_SUCCESS';
const DELETE_LIST_FAILURE = 'movie-list/movieList/DELETE_LIST_FAILURE';

const initialState = {
  movies: [],
  title: '',
  fetching: false,
  error: null,
  done: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        done: true
      };
    case DELETE_LIST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case RESET:
        return { ...initialState };
    default:
      return state;
  }
}

export function reset() {
	  return { type: RESET };
	}

export function deleteListRequest() {
  return { type: DELETE_LIST_REQUEST };
}

export function deleteListSuccess() {
  return { type: DELETE_LIST_SUCCESS };
}

export function deleteListFailure(error) {
  return { type: DELETE_LIST_FAILURE, error };
}

export function* deleteListSaga() {
  try {
    const title = yield select(state => state.listBuilder.title);
    const movies = yield select(state => state.listBuilder.movies);
    const data = {
      title,
      movies: movies.map(movie => movie.id)
    };
    yield axios.post('/api/movie-lists', data);
    yield put(deleteListSuccess());
    yield put(reset());
  } catch (error) {
    yield put(deleteListRequest(error));
  }
}

export function* watchDeleteListSaga() {
  while(true) {
    yield take(DELETE_LIST_REQUEST);
    yield call(deleteListSaga);
  }
}
