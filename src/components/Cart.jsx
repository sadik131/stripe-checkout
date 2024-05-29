"use client"
import React from 'react'
import { useGlobalContext } from './CartContext'

function Cart() {
    const { cart, increaseQuantity, decreaseQuantity } = useGlobalContext()

    const calculateTotalAmount = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((product) => (
                        <li
                            key={product.id}
                            className="flex justify-between items-center mb-2"
                        >
                            <div>
                                <p className="font-semibold text-white">{product.name}</p>
                                <p className="text-gray-400">
                                    ${product.price.toFixed(2)} x {product.quantity}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => decreaseQuantity(product.id)}
                                    className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 w-8 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => increaseQuantity(product.id)}
                                    className="px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 w-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 0 && (
                <>
                    <div className="mt-4">
                        <p className="text-lg text-white font-semibold">
                            Total Amount: ${calculateTotalAmount()}
                        </p>
                    </div>

                    <button
                        // onClick={checkout}
                        className="mt-4 px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Buy Now
                    </button>
                </>
            )}
        </div>
    )
}

export default Cart