import { put, takeEvery } from 'redux-saga/effects'
import { initList } from './actions'
import axios from 'axios'

function* getInitList() {
  try {
    const res = yield axios.get('http://rap2.taobao.org:38080/app/mock/251195/list/1234')
    yield put(initList(res.data.array))
  } catch (error) {
    console.log(error)
  }
}

function* todoSagas() {
  yield takeEvery('get_init_list', getInitList);
}

export default todoSagas;