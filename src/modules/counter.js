import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_ASYNC = 'INCREASE_ASYNC'
const DECREASE_ASYNC = 'DECREASE_ASYNC'

// 액션 생성 함수
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })
export const increaseAsync = () => ({ type: INCREASE_ASYNC })
export const decreaseAsync = () => ({ type: DECREASE_ASYNC })

function* increaseSaga() {
  yield delay(1000) // 1초 딜레이
  yield put(increase()) // put은 특정 액션을 디스패치 해주는 함수이다.
}

function* decreaseSaga() {
  yield delay(1000)
  yield put(decrease())
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseAsync) // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseAsync) // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 초기 상태 값
const initialState = 0

// 리듀서
const counter = (state = initialState, action) => {
  switch(action.type) {
    case INCREASE:
      return state + 1
    case DECREASE:
      return state - 1
    default:
      return state
  }
}

export default counter;