"use client"
import React from 'react'
import { useGlobalContext } from './CartContext'

const Product = ({ product }) => {

  const { addToCart } = useGlobalContext()

  return (
    <div className="border rounded-lg p-8 shadow-md">
      <h2 className="text-lg text-gray-400  font-semibold">{product.name}</h2>
      <p className="text-gray-400">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        // disabled={isProductInCart}
        className={`mt-2 px-4 py-2 ${
          //   isProductInCart
          // ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          // :
          "bg-blue-500 text-white hover:bg-blue-600"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        Cart

        {/* {isProductInCart ? "Added to Cart" : "Add to Cart"} */}
      </button>
    </div>
  )
}

export default Product