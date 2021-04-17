import * as actionTypes from '../action-types';
import { user_info } from '../../api/user';

export const getUserInfo = dispatch => {
  return token => {
    return new Promise(async (resolve, reject) => {
      try {
        const _userInfo = await user_info();
        dispatch(setUserInfo(_userInfo.data));
        resolve(_userInfo.data);
      } catch (error) {

        reject(error);
      }
    });
  };
};

export const setUserInfo = userInfo => ({
  type: actionTypes.SET_USER_INFO,
  payload: userInfo,
});
