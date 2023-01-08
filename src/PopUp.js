import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import './PopUp.css'
import editIcon from './editIcon.png'

const PopUpStruct=(props)=>{
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props)
    return (
      <>
        <div className='editButtonDiv'> <button className='editButton' onClick={handleShow}><img src={editIcon} className='editIcon'></img></button></div>
        <div className='modal'>
        <Modal  show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Stocks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Edit your old stocks.</div>
            {props.stocksData.map( element => <>
              <Modal.Dialog>
                <Form.Group className='editContainer' >
                <Form.Label className="itemName">Name: </Form.Label>
                <Form.Control type="text" onChange={handleChange} value={element.name} placeholder="name input"/>
                <Form.Label className="itemName">Price: </Form.Label>
                <Form.Control type="text" onChange={handleChange} value={element.buyingPrice} placeholder="name input"/>
                <Form.Label className="itemName">Quantity: </Form.Label>
                <Form.Control type="text" onChange={handleChange} value={element.quantity} placeholder="name input"/>
              </Form.Group>
              </Modal.Dialog>
         </>
         )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>)
}
    
export default PopUpStruct;