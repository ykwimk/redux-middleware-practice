import * as postsAPI from '../api/post';
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById } from '../lib/asyncUtils'

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS' // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST'

/*
  thunk를 사용할 때, 꼭 모든 액션들에 대하여 액션 생성 함수를 만들 필요가 없다.
  그냥 thunk함수에서 바로 액션 객체를 만들어줘도 상관없다.
*/
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
}

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/')
}

const posts = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post', true)(state, action)
    default:
      return state
  }
}

export default posts;