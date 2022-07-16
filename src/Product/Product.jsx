import React from 'react'
import { useStateValue } from '../StateProvider'
import './Product.css'


function Product({id,title,image,price,rating}) {
  const [{basket},dispatch] = useStateValue();
  console.table('this is the basket >>>', basket);
  const addToBasket = () => {
      //dispatch the item into the data layer
      dispatch({
          type: 'ADD_TO_BASKET',
          item:{
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          }
      });
  };

  return (
    <div className='product'>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
            {Array(rating).fill().map((_,index) => (

            <p key={index}>⭐️</p>
            ))}
            
        </div> 
      </div>

      <img src={image} alt="product pic "/>
    
      <button type='button' onClick={addToBasket} >Add to Basket</button>
    </div>
  )
}

export default Product