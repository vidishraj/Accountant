import './App.css';
import React,{useState} from "react"
import {Login} from "./Login"
import {Register} from "./Register"

function App() {
  const [currentForm,setCurrentForm] =useState('login');
  
  const toggleForm =(formName) => { //This function gets sent as props to Login and Register page so that setCurrentForm gets called to set currentForm
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        currentForm === "login"? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>

      }
      
      
    </div>
  );
}

export default App;
