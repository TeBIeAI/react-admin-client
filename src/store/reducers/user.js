import * as actionTypes from '../action-types';

const initUserState = {
  username: '',
  createdAt: '',
  id: null,
  roles: []
};

export default function reducer(state = initUserState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
}
