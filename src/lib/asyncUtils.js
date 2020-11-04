// Promise에 기반한 thunk를 만들어주는 함수이다.
export const createPromiseThunk = (type, promiseCreator) => {
  const [ SUCCESS, ERROR ] = [`${type}_SUCCESS`, `${type}_ERROR`]

  /*
    이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었다.
    만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 된다.
    ex) writeComments({ postId: 1, text: '댓글 내용' })
  */
  return (param) => async (dispatch) => {
    dispatch({ type, param }) // 요청 시작
    try {
      const payload = await promiseCreator(param)
      dispatch({ type: SUCCESS, payload }) // 성공
    } catch(error) {
      dispatch({ type: ERROR, payload: error, error: true }) // 실패
    }
  }
}

export const reducerUtils = {
  // 초기 상태, 초기 data 값은 기본적으로 null 이지만, 바꿀 수도 있다.
  initial: (initialData = null) => ({
    isLoading: false,
    data: initialData,
    error: null
  }),
  // 로딩중 상태, prevState의 경우엔 기본값 null 이지만, 따로 값을 지정하면 null로 바꾸지 않고 다른 값을 유지시킬 수 있다.
  loading: (prevState = null) => ({
    isLoading: true,
    data: prevState,
    error: null
  }),

  // 성공 상태
  success: (payload) => ({
    isLoading: false,
    data: payload,
    error: null
  }),

  // 실패 상태
  error: (error) => ({
    isLoading: false,
    data: null,
    error: error
  })
}