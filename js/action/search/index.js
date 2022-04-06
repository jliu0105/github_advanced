import Types from '../types';
import {_projectModels, doCallBack, handleData} from '../ActionUtil';
import ArrayUtil from '../../util/ArrayUtil';
import Utils from '../../util/Utils';

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS = [];

/**
 * start searching
 * @param inputKey 
 * @param pageSize
 * @param token 
 * @param favoriteDao
 * @param popularKeys
 * @param callBack
 * @returns {function(*=)}
 */
export function onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH});
        fetch(genFetchUrl(inputKey)).then(response => {// if mission is cancelled, don't do anything
            return hasCancel(token) ? null : response.json();
        }).then(responseData => {
            if (hasCancel(token, true)) {
                console.log('user cancel');
                return;
            }
            if (!responseData || !responseData.items || responseData.items.length === 0) {
                dispatch({type: Types.SEARCH_FAIL, message: `cannot find${inputKey}`});
                doCallBack(callBack, `cannot find${inputKey}`);
                return;
            }
            let items = responseData.items;
            handleData(Types.SEARCH_REFRESH_SUCCESS, dispatch, '', {data: items}, pageSize, favoriteDao, {
                showBottomButton: !Utils.checkKeyIsExist(popularKeys, inputKey),
                inputKey,
            });
        }).catch(e => {
            console.log(e);
            dispatch({type: Types.SEARCH_FAIL, error: e});
        });
    };
}

/**
 * cancel an async mission
 * @param token
 * @returns {function(*)}
 */
export function onSearchCancel(token) {
    return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
    };
}

/**
 * load more
 * @param pageIndex 
 * @param pageSize 
 * @param dataArray original data
 * @param favoriteDao
 * @param callBack 
 * @returns {function(*)}
 */
export function onLoadMoreSearch(pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {// simulate network request
            if ((pageIndex - 1) * pageSize >= dataArray.length) {// load all data
                if (typeof callBack === 'function') {
                    callBack('no more');
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more',
                    pageIndex: --pageIndex,
                });
            } else {
                // max loading number
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, data => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: data,
                    });
                });
            }
        }, 500);
    };
}

function genFetchUrl(key) {
    return API_URL + key + QUERY_STR;
}

/**
 * check if the token is cancelled
 * @param token
 * @param isRemove
 * @returns {boolean}
 */
function hasCancel(token, isRemove) {
    if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
        return true;
    }
    return false;
}


