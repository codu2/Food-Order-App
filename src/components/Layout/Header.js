import React from 'react';

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage}  alt="A table full of delicious food!" />    
            </div>
        </React.Fragment>
    );
};

export default Header;

//header(빌트인된 태그 해더)와 header 밑 image(이미지를 가지고 있을 div)