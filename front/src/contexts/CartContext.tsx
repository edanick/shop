import { createContext, useEffect, useState } from "react";


type ContextType = {
  cartProducts: any[],
  addToCart: (_id: string) => void,
  removeFromCart: (_id: string) => void,
  isInCart: (_id: string) => boolean,
  totalProductsAmount: number
}

export const CartContext = createContext<ContextType>({
  cartProducts: [],
  addToCart: (_id: string) => { },
  removeFromCart: (_id: string) => { },
  isInCart: (_id: string) => { return false; },
  totalProductsAmount: 0
});

export const CartProvider = ({ children }: any) => {

  const [cartProducts, setCartProducts] = useState<any[]>(JSON.parse(localStorage.getItem("cart_products") ?? "[]")),
    getAmountOfProductsTotal = () => cartProducts.map((p: any) => p.amount).reduce((a: number, n: number) => a + n, 0),
    [totalProductsAmount, setTotalAmount] = useState<number>(getAmountOfProductsTotal());


  const addToCart = (_id: string) => {
    if (!cartProducts.find((c: any) => c._id == _id)) {

      cartProducts.push({
        _id: _id,
        amount: 1
      });

      localStorage.setItem("cart_products", JSON.stringify(cartProducts));
      setTotalAmount(getAmountOfProductsTotal());
      setCartProducts(cartProducts);

    }
  },
    removeFromCart = (_id: string) => {
      const updatedCartProducts = cartProducts.filter(c=> c._id != _id);
      localStorage.setItem("cart_products", JSON.stringify(updatedCartProducts));
      setTotalAmount(updatedCartProducts.map((p: any) => p.amount).reduce((a: number, n: number) => a + n, 0));
      setCartProducts(updatedCartProducts);
      
    },
    isInCart = (_id: string) => cartProducts.findIndex(p => p._id == _id) > -1;

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, isInCart, totalProductsAmount }}>
      {children}
    </CartContext.Provider>
  );
}