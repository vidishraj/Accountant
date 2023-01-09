import axios from "axios";
import React from "react";
import config from "./config.json"

// export var refresher=function(){
//     axios.get(config.backendURL+"/refreshStocks")
//       .then((response) => {
//         console.log(response.data)
//         return response.data.Response;
//         }
//       )
//   }

//   export var updater=function updateStocks(stocksList){
//     console.log(stocksList)
//     axios.post(config.backendURL+"/updateStocks", stocksList).then((response)=>
//     console.log(response)).catch((err)=>console.log(err))
//   }