import './header.scss'


const Header = ({rates, format}) => {
    console.log(rates)
    return (
        <header>
            {rates.map(obj =>
                <div key={obj.ccy} className="block">
                    <h2>{obj.ccy}</h2>
                    <div className="numbers">
                        {format(+obj.buy)} / {format(+obj.sale)}
                    </div>
                </div>
            )}

        </header>
    );
};

export default Header;