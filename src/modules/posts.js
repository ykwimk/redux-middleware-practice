import * as postsAPI from '../api/post';
import { createPromiseThunk, reducerUtils } from '../lib/asyncUtils'

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS' // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

/*
  thunk를 사용할 때, 꼭 모든 액션들에 대하여 액션 생성 함수를 만들 필요가 없다.
  그냥 thunk함수에서 바로 액션 객체를 만들어줘도 상관없다.
*/
/*
  export const getPosts = () => (dispatch) => {
    dispatch({ type: GET_POSTS }) // 요청 시작
    try {
      const posts = await postsAPI.getPosts() // API 호출
      dispatch({ type: GET_POSTS_SUCCESS, posts }) // 요청 성공
    } catch(error) {
      dispatch({ type: GET_POST_ERROR, error }) // 요청 실패
    }
  }

  // thunk함수에서도 파라미터를 받아와서 사용할 수 있다.
  export const getPost = (id) => async (dispatch) => {
    dispatch({ type: GET_POST })
    try {
      const post = await postsAPI.getPostById(id)
      dispatch({ type: GET_POST_SUCCESS, post })
    } catch(error) {
      dispatch({ type: GET_POST_ERROR, error })
    }
  }

  const initialState = {
    posts: {
      isLoading: false,
      data: null,
      error: null
    },
    post: {
      isLoading: false,
      data: null,
      error: null
    }
  }
*/

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts())
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById())

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
}

export const posts = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        // posts: {
        //   isLoading: true,
        //   data: null,
        //   error: null
        // }
        posts: reducerUtils.loading()
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        // posts: {
        //   isLoading: false,
        //   data: action.posts,
        //   error: null
        // }
        posts: reducerUtils.success(action.payload)
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        // posts: {
        //   isLoading: false,
        //   data: null,
        //   error: action.error
        // }
        posts: reducerUtils.error(action.error)
      }
    case GET_POST:
      return {
        ...state,
        // post: {
        //   isLoading: true,
        //   data: null,
        //   error: null
        // }
        post: reducerUtils.loading()
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        // post: {
        //   isLoading: false,
        //   data: action.post,
        //   error: null
        // }
        post: reducerUtils.success(action.payload)
      }
    case GET_POST_ERROR:
      return {
        ...state,
        // post: {
        //   isLoading: false,
        //   data: null,
        //   error: action.error
        // }
        post: reducerUtils.error(action.error)
      }
    default:
      return state
  }
}