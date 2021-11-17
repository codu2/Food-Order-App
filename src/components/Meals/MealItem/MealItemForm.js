import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        //value 값은 항상 string 문자열이므로 숫자로 바꿔줘야 함. +표시를 추가함으로써 숫자라고 명시해줄 수 있음
        const enteredAmountNumber = +enteredAmount;

        //만약 값이 입력되지 않았다면 아무것도 반환하지 않음
        //에러 메시지를 보여주기 위해 폼의 유효성을 판단하기 위한 useState 사용
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef} 
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;

//custom component에서는 ref를 그냥 사용할 수 없음
//ref를 받는 custom component에 가서 (여기서는 Input)
//해당 함수를 React.forwardRef로 감싸줘야 함
//그리고 그 함수에서 두번째 매개변수 ref를 추가해주는데 
// <input />에 ref={ref}를 참조할 수 있도록 함
