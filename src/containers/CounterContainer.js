import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { increaseAsync, decreaseAsync } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const onIncrease = () => {
    dispatch(increaseAsync())
  }

  const onDecrease = () => {
    dispatch(decreaseAsync())
  }

  return (
    <Counter
      number={number}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  )
}

export default CounterContainer;