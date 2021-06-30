import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from '../modules/counter';
export const Counter = () => {
  const counter = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log(increment);
  console.log(increment());
  const addCounter = () => {
    dispatch(increment());
  }
  const subCounter = () => {
    dispatch(decrement());
  }
  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={addCounter}>(+1)</button>
      <button onClick={subCounter}>(-1)</button>
    </div>
  )
}