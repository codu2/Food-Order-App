import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`;
    //항상 2개의 소숫점을 렌더링해줌 - toFixed(2)

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm />
        </div>
    </li>
};

export default MealItem;