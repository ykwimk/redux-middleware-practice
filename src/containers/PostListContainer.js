import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../modules/posts';
import PostList from '../components/PostList';

const PostListContainer = () => {
  const { data, loading, error } = useSelector(state => state.posts.posts)
  const dispatch = useDispatch()

  // 컴포넌트 마운드 후 포스트 목록 요청
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (loading && !data) return <div>로딩중...</div> // 로딩중이면서, 데이터가 없을 때에만 표시
  if (error) return <div>에러 발생!</div>
  if (!data) return null
  return <PostList posts={data} />
}

export default PostListContainer;