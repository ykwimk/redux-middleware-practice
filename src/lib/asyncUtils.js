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

// 비동기 관련 액션들을 처리하는 리듀서를 만든다.
// type은 액션의 타입, key는 상태의 key (ex. posts, post).
export const handleAsyncActions = (type, key, keepData = false) => {
  const [ SUCCESS, ERROR ] =[`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    switch(action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}

// 특정 id를 처리하는 thunk 함수
const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
  type,
  promiseCreator,
  /*
    파라미터에서 id를 어떻게 선택할 지 정의하는 함수.
    기본값으로는 파라미터를 그대로 id로 사용한다.
    하지만 파라미터가 { id: 1, detail: true } 이런 객체 형태이면,
    idSelector를 param => param.id 이런 식으로 설정 해야 한다.
  */
 idSelector = defaultIdSelector
) => {
  const [ SUCCESS, ERROR ] = [`${type}_SUCCESS`, `${type}_ERROR`]

  return (param) => async (dispatch) => {
    const id = idSelector(param)
    dispatch({ type, meta: id })
    try {
      const payload = await promiseCreator(param)
      dispatch({ type: SUCCESS, payload, meta: id })
    } catch(error) {
      dispatch({ type: ERROR, error: true, payload: error, meta: id })
    }
  }
}

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [ SUCCESS, ERROR ] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    const id = action.meta
    switch(action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        };
      default:
        return state;
    }
  }
}