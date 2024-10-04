import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom' /* open another page */

const Home = () => {

const {allCoin, currency} = useContext(CoinContext); /* get the data from API */
const [ displayCoin, setDisplayCoin ] = useState([]); /* allows the page to display the data */
const [ input, setInput] = useState('');

const inputHandler = (event) => {
    setInput(event.target.value); /* anything added to input field will be added here, stored as 'input' */
    if(event.target.value === "") { /* once search bar is empty, this will return back to top10 display */
        setDisplayCoin(allCoin);
    }
}

const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => { /* here we using the 'allCoin' object which has all the coin data and filtering as per the search input */
        return item.name.toLowerCase().includes(input.toLowerCase())
    })

    setDisplayCoin(coins); /* this will display the data based on the filtered search item stored as 'coin' */
}


useEffect(() => { /* this hook gets the data from usecontext above and then displays using the usestate hook above */
    setDisplayCoin(allCoin);
}, [allCoin])

  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/> Crpyto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos</p>   
            <form onSubmit={searchHandler}>
                <input onChange={inputHandler} value={input} list='coinlist' type="text" placeholder='Search crypto...' required/>

                <datalist id='coinlist' className="scrollable-list">
                    {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
                </datalist>

                <button type='submit'>Search</button>
            </form>
        </div>
        <div className='crypto-table'>
            <div className='table-layout'>
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>23H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0, 10).map((item, index) => (
                    <div to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="coin-image" />
                            <p className="coin-image_name">{item.name + "-" + item.symbol}</p>
                        </div>
                        <p>
                            {currency.symbol} {item.current_price.toLocaleString()}
                        </p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red" }>
                            {Math.floor(item.price_change_percentage_24h*100)/100}
                        </p>
                        <p className='market-cap'>
                            {currency.symbol} {item.market_cap.toLocaleString()}
                        </p>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default Home


/* toLocaleString() - add commas in the number format */
/* in the datalist part of the input section in form, this allows the user to view a list of the cryptocoins available if they didnt want to type or just wanted to pick one */
/* Link section on table items either before or after search,  the to=..... part opens up coin page to display the data on that page */
/* line 58, changing div to Link will go to coin pages */