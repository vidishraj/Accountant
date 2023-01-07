import {React, useState, useEffect} from 'react';
import './stocksData.css'
import dropDown from './dropdown.png'
import stocksIcon from './stocksIcon.jpeg'
import refreshIcon from './refreshIcon.png'
import myData from './userInfo.json';
import axios from 'axios';
import stocksBackend from './services/stocksDataFetcher'
import config from "./services/config.json"



const StocksData = (props) => {
  let stocksName=[]
  for(let i=0;i<myData.StocksList.length;i++){
    stocksName.push(myData.StocksList[i].name)
  }

  const { radius, top, color, width, height, right, left, bottom, gridC, gridR, children } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState([]);

  function refreshStocks(){
    axios.get(config.backendURL+"/refreshStocks")
    .then((response) => {return response.data})
  }

  function updateStocks(stocksList){
    console.log(stocksList)
    axios.post(config.backendURL+"/updateStocks", stocksList).then((response)=>
    console.log(response)).catch((err)=>console.log(err))
  }
  
  function handleClick() {
    console.log(user)
    setIsVisible(!isVisible);
    console.log(myData)

  }
  useEffect(() => {
    updateStocks(stocksName);
  },[])
  
  const style = {
    width:"100%",
    display:"flex",
    flexDirection:"column",
    borderRadius: "10px",
    backgroundColor: "white",
  };

  return (
    <>
    <div className="headerContainer">
        <img src={stocksIcon} className="stocksIcon"></img>
        {/* <button className="refreshIcon"><img src={refreshIcon} className="refreshIcon"></img></button> */}
    </div>
  
   {myData.StocksList.map( element => <>
      <div className="StockContainer" onClick={handleClick}>
        <div className='stockName'>{element.name}</div>
        <div className='stockPrice'>{element.price}</div>
        <div className='gainsLoss'>{}</div>
        {/* <img className='dropDown' src={dropDown}></img> */}
        {isVisible && (
            <div>This element is now visible!</div>)}
      </div>
         </>
         )}
    </>
  );
};

export default StocksData;
