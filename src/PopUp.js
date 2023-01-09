import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import './PopUp.css'
import userEvent from '@testing-library/user-event';

const PopUpStruct=(props)=>{
  const [show, setShow] = useState(false);
  const [stocksData, setStocksData] = useState(props.stocksData);
  let EditArray=new Array(props.stocksData.length).fill(false)
  const [editArray, seteditArray] = useState(EditArray);

  const handleChange = (e, index, value) => stocksData[index][value]=e.target.value;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function calculateGains(){
    return;

  }
  function enableButton(index){
      if(editArray[index]){
        EditArray[index]=false;
      }
      else{
        EditArray[index]=true;
      }
      seteditArray(EditArray);
  }
    return (
      <>
        <div className='modal'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Edit Stocks</Modal.Title>
          </Modal.Header>
          <Modal.Body  style={{backgroundColor:"white", borderRadius:'10px'}}>
          <Form.Text size='lg'>Turn switch to edit.</Form.Text>
            {stocksData.map( (element,index) => <>
              <Modal.Dialog className='editContainer'>
                <Form.Group style={{backgroundColor:"white"}}>
                  <Form.Label  className='itemName'>{element.name}</Form.Label>
                  <Form.Control disabled={!editArray[index]} type="number" className="priceValue" onChange={(e)=>handleChange(e, index, "buyingPrice")} defaultValue={element.buyingPrice} placeholder="price"/>
                  <Form.Control disabled={!editArray[index]} type="number" className="quantityValue" onChange={(e)=>handleChange(e, index, "quantity")} defaultValue={element.quantity} placeholder="quantity"/>
                  <Form.Switch onChange={()=>enableButton(index)}></Form.Switch>
                </Form.Group>
              </Modal.Dialog>
         </>
         )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>)
}
    
export default PopUpStruct;