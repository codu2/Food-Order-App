import CartContext from "./cart-context"

const CartProvider = props => {
    const addItemToCartHandler = item => {};

    const removeItemFromCartHandler = id => {};

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;

//context를 관리하기 위한 js, context의 데이터도 여기서 관리할 수 있음