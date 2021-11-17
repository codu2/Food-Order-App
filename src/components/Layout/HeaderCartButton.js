const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItem = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    //useState를 사용하여 btnIsHighlighted가 true일 때만 classes.bump가 추가되도록 하고 false일 때는 빈 문자열, 즉 아무 클래스도 추가되지 않도록 함
    //또한 btnIsHighlighted의 기본 값은 false인데 useEffect를 사용하여 cartCtx.items가 변할 때마다 true로 바뀌도록 설정함
    //그러나 이때 items가 하나도 없다면 아무것도 return하지 않도록 함
    //그리고 useEffect 안에서 setTimeout()를 사용하여 bump 애니메이션이 작동하는 시간이 300ms 마다 
    //btnIsHighlighted가 false로 돌아가게 만들어 items가 변할 때마다 에니메이션이 다시 작동할 수 있도록 했음
    //또한 clearTimeout()이 실행되도록 하는데 이는 우리가 빠르게 items을 추가하게 될 때에도 지난 timer를 초기화시키고 새로운 timer가 설정되어서
    //추가되면 btnIsHighlighted가 true가 되었다가 다시 빠르게 items가 추가되기 전 
    //btnIsHighlighted를 false로 되돌려 true가 될 수 있는 상태를 만들기 위해서임

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
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

//카트의 항목 양이 변할 때마다 애니메이션 효과를 주고자 함(버튼이 튀어나오고 크기가 바뀌게 하는 효과)
