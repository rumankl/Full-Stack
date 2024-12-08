import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { base } from '../../data/apis';
import { removeCart, setCarts } from './cartSlice';
import { ShowDialog } from '../../ui/ShowDialog';
import { Button } from '@material-tailwind/react';


const CartPage = () => {
  const [open, setOpen] = useState(false);


  const { carts } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();
  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);




  return (
    <div className='p-5'>
      {carts.length === 0 ? <h1>list is empty add some</h1> :
        <div>

          <div >
            {carts.map((cart, i) => {
              return <div className='grid grid-cols-4 gap-12 space-y-5' key={cart.product}>
                <img className='w-full h-36 mb-3' src={`${base}/${cart.image}`} alt="" />
                <div>
                  <select defaultValue={cart.qty} name="qty" id="" onChange={(e) => {
                    dispatch(setCarts({ ...cart, qty: Number(e.target.value) }));
                  }}>
                    {[...Array(cart.stock).keys()].map((c) => {
                      return <option key={c + 1} value={c + 1}>{c + 1}</option>
                    })}
                  </select>
                </div>
                <h1>Rs.{cart.price}</h1>
                <div>
                  <Button onClick={() => dispatch(removeCart(i))} size='sm' >Remove</Button>
                </div>

              </div>
            })}

          </div>

          <div className='flex justify-between'>
            <h1>Total</h1>
            <p>{total}</p>
          </div>

          <ShowDialog totalAmount={total} orderItems={carts} />
        </div>}

    </div>
  )
}

export default CartPage