import React, { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItem}
            </span>
        </button>
    );
};

export default HeaderCartButton;

//text, icon, 카트 안에 들어있는 음식의 수량을 알려주는 뱃지
//react에 의해서 context가 바뀔 때마다 <HeaderCartButton />은 다시 계산됨