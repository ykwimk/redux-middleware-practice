// 액션 타입
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

// 액션 생성 함수
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

// getState를 쓰지 않을거면, 굳이 파라미터롤 받아올 필요가 없다.
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000)
}
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000)
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