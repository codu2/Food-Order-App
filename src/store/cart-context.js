import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
})

export default CartContext;

//여기서 id는 삭제할 아이템을 확인하기 위한 파라미터