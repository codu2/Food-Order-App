import classes from './Input.module.css';

const Input = props => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input}/>
    </div>
};

export default Input;

//{...props.input}은 <Input />을 사용하는 파일에서 지정한 input prop의 값들이 그대로 들어온다.
//예를 들어 <Input label="Amount" input={{type: 'number', id:'amount'}}이면
//실제로는 <input type="number" id="amount">가 되는 것이다. 
//Input component를 재사용하면서도 밖에서 값을 조정할 수 있도록 하기 위함이다.