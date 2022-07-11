import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../StateProvider';
function Subtotal() {
    const [{basket}, dispatch] = useStateValue();

    const getBasketTotal = (basket) => basket?.reduce((total,item) => item.price + total, 0);
    return (


    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value) => (
            <>
                <p>
                    {/* Part of the homework */}
                    Subtotal ( {basket.length} items ): <strong>{`${value}`}</strong>
                </p>

                <small className='subtotal__gift'>
                    <input type='checkbox'/>This order contains a gift
                </small>
            </>

        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        //value={0}//part of the homework
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        />

        <button type="button" className='subtotal__button'>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal