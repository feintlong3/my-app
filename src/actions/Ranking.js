import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import { replace } from 'react-router-redux';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPXVheTM3RFFpRU8wRyZzPWNvbnN1bWVyc2VjcmV0Jng9ZDc-';

// リクエスト開始
const startRequest = category => ({
  type: 'START_ REQUEST',
  payload: { category },
});
// レスポンス受信
const receiveData = (category, error, response) => ({
  type: 'RECEIVE_ DATA',
  payload: { category, error, response },
});
// リクエスト完了
const finishRequest = category => ({
  type: 'FINISH_ REQUEST',
  payload: { category },
});

// ランキングを取得する
export const fetchRanking = categoryId => {
  // redux-thunkを使った非同期処理
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));
    // 対応するデータがない場合はトップページへリダイレクト
    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });

    try {
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(category, null, data));
    } catch (err) {
      dispatch(receiveData(category, err));
    }
    dispatch(finishRequest(category));
  };
};