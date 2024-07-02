"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DummyDataWithQuantity } from '@/types/DummyData';

interface CartContextProps {
    cart: DummyDataWithQuantity[];
    addToCart: (item: DummyDataWithQuantity) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<DummyDataWithQuantity[]>([]);

    const addToCart = (item: DummyDataWithQuantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(prevCartItem => prevCartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(prevCartItem => (
                    prevCartItem.id === item.id ? { ...prevCartItem, quantity: prevCartItem.quantity + item.quantity } : prevCartItem
                ))
            }

            return [...prevCart, item]
        })
    }

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(prevItem => prevItem.id !== id))
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};