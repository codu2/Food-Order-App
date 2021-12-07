import { useReducer } from "react";

import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartProvider = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        //지난 상태 스냅샷에서 totalAmount를 가져오고 새로운 값을 더해줌
        //cart에 아이템을 추가할 때 항상 먼저 updateTotalAmount를 계산
        //그리고는 updatedItems 전에 해당 아이템이 이미 카트에 있는지 여부를 확인해야 함

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        //items 중 하나인 item의 id가 우리가 추가하고자 하는 action.item의 id와 같다면 이미 카트에 해당 아이템이 존재하는 것
        //그러면 추가하고자 하나 카트에 이미 존재하는 아이템의 인덱스를 얻을 수 있음

        const existingCartItem = state.items[existingCartItemIndex];
        //그 인덱스를 가지고 state.items에서 해당 아이템을 인덱스로 찾을 수 있음

        let updatedItems;

        if(existingCartItem) {
            //만약 existingCartItem이 있다면 
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
                //기존에 카트에 존재했던 해당 아이템의 정보를 그대로 불러오고 대신 amount를 수정해줘야 함
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
            //updatedItems에 기존에 카트에 있던 아이템들을 모두 담고
            //그중 인덱스가 existingCartItem인 아이템을 새로 amount를 업데이트한 updateItem과 같게 만들면서
            //최종적으로 이미 존재하던 아이템의 추가된 amount를 표시함
        } else {
            //카트에 처음 추가되는 아이템일 경우
            updatedItems = state.items.concat(action.item);
            //concat()함수는 push()함수와는 다른게 기존 배열을 건들이지 않고 새 아이템을 추가한 새로운 배열을 반환함
            //push()를 사용하면 이전상태 스냅샷인 state가, 즉 메모리가 react도 모르는 채로 변경되므로 사용해서는 안됨
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        //items 중 하나인 item의 id와 삭제하려고 누른 아이템의 id가 같다면 해당 아이템의 인덱스를 existingItemIndex에 저장함
        //existingItem에 state.items에서 해당 인덱스를 가져다 찾은 아이템을 저장하고
        // 최신 상태의 스냅샷인 state의 totalAmount에서 삭제할 아이템의 가격을 빼줌

        let updatedItems;
        
        if(existingItem.amount === 1) {
            //만약 해당 아이템이 1개만 있다면 
            updatedItems = state.items.filter(item => item.id !== action.id);
            //state.items 중에서 item의 id가 삭제할 아이템의 id와 같지 않은 아이템들
            //즉 삭제할 아이템을 제외한 다른 아이템들을 모아 새로운 배열로 반환해줌
        } else {
            //해당 아이템의 갯수가 2개 이상이라면 
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            //updatedItem에 삭제할 아이템의 정보를 담아주고 amount를 -1 해줌
            //마이너스 버튼이 한번 눌릴 때마다 -1씩 되게 때문
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    
    if(action.type === 'CREAR') {
        return defaultCartState;
    }

    return defaultCartState;
};
//이 함수는 CartProvider에서 아무것도 필요로 하지 않으므로 component 밖에서 정의
//또한 component가 재계산될 때마다 매번 재생성되어서는 안되므로

//초기 값은 defalutCartState에 저장하고 useReducer에는 (state, action)으로 이루어진 함수와 초기 값이 인자로 들어간다. 
//그리고 그 함수에는 dispatch된 action에 따른 return 값을 지정해준다. 

//그리고 해당 action이 일어나는 jsx 코드에 함수를 입력해준다. () => dispatchCartAction() 
//바로 useReducer에서 지정해준 dispatch 함수를 사용하는데 값은 주로 {} 객체이며 type prop을 많이 사용한다. {type: ''} 
//이 타입은 (state, action)을 인자로 가진 cartProvider에서 action에 따른 return 값을 지정하는데 action.type === '' 으로 많이 사용된다.

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartProvider, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    //추가할 아이템을 전달하기 위해 item prop에 인자로 들여온 item을 전달해줌

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };
    
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CREAR'})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;

//context를 관리하기 위한 js, context의 데이터도 여기서 관리할 수 있음
//카트에 아이템을 넣기 위해서는 CartProvider에서 cart 데이터를 최종적으로 관리하기 때문에 CartProvider에서 해야함
//addItemToCartHandler가 호출될 때마다 우리는 카트에 추가되어야 할 item을 얻음
//그리고 기본적으로 그 item이 이미 카트에 있는지 확인함. 존재한다면 이미 카트에 있는 그 아이템을 업데이트함
//그 경우가 아니라면 새 아이템을 추가함
//복잡하므로 useState가 아닌 useReducer 사용
