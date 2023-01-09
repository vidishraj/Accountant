import {React, useState, useEffect} from 'react';
import './stocksData.css'
import stocksIcon from './stocksIcon.jpeg'
import refreshIcon from './refreshIcon.png'
import myData from './userInfo.json';
import axios from 'axios';
import config from "./services/config.json"
import './PopUp.css'
import PopUpStruct from './PopUp';
import editIcon from './editIcon.png'
import addIcon from './addIcon.png';
// import {refresher, updater} from './services/stocksDataFetcher';

const StocksData = (props) => {
  let stocksName=[]
  for(let i=0;i<myData.StocksList.length;i++){
    stocksName.push(myData.StocksList[i].symbol)
  }
  const [colorList,setColorList]=useState(new Array(myData.StocksList.length).fill('white'))
  const [backendData, setBackendData]=useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  function refreshStocks(){
    axios.get(config.backendURL+"/refreshStocks")
      .then((response) => {
        setBackendData(response.data.Response);
        return response.data.Response;
        }
      )
  }
  function calculateGains(){
    backendData.forEach((element,index) => {
      let currentPrice=element.price;
      let profit=(currentPrice-myData.StocksList[index].buyingPrice)*myData.StocksList[index].quantity;
      if(profit<0){
        colorList[index]="red";
      }
      else{
        colorList[index]="greenyellow"
      }
      myData.StocksList[index].gains=Math.abs(profit).toPrecision(6);
    });
  }
  function updateStocks(stocksList){
    axios.post(config.backendURL+"/updateStocks", stocksList).then((response)=>
    console.log(response)).catch((err)=>console.log(err))
  }
  
  function handleClick() {
    console.log(user)
    setIsVisible(!isVisible);
    console.log(myData)

  }
  useEffect(() => {
    refreshStocks();
    calculateGains();
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
        <button className="refreshIcon" onClick={refreshStocks}><img src={refreshIcon} className="refreshIcon"></img></button>
    </div>
  
   {myData.StocksList.map( (element, index) => <>
      <div className="StockContainer" onClick={handleClick}>
        <div className='stockName'>{element.name}</div>
        <div className='stockPrice'>{typeof(backendData)!=='undefined'&&backendData.length!==0
        ?backendData[index].price:"..."}</div>
        <div style={{color:colorList[index]}}className='gainsLoss'>Rs {element.gains}</div>
        <div className='quantity'>{element.quantity}</div>
        {/* <img className='dropDown' src={dropDown}></img> */}
        {isVisible && (
            <div>Hidden div is not visible.</div>)}
      </div>
         </>
         )}
    <PopUpStruct stocksData={myData.StocksList}></PopUpStruct>
    <div className='buttonContainer'>
    <div className='editButtonDiv'> <button className='editButton' onClick={handleShow}><img src={editIcon} className='Icon'></img></button></div>
    <div className='editButtonDiv'> <button className='addButton' onClick={handleShow}><img src={addIcon} className='Icon'></img></button></div>
    </div>
    </>
  );
};

export default StocksData;
