// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './icecreamSlice';

export const IcecreamView = () => {

    const [value, setValue] =  useState(1);
    const numOfIcecream = useSelector((state) => state.icecream.numOfIcecream);
    const dispatch = useDispatch();

    return (
    <div>
      <h2>Number of Icecream = {numOfIcecream}</h2>
      <button onClick={() => dispatch(ordered())}>Buy Icecream</button>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(restocked(value))}>Restock Icecream</button>
    </div>
  );
}