import './App.css';
import mainImage from './mainImage.png'
import mainLogo from './mainLogo.png'
import RectangularComponent from './RoundedComponent';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='firstGrid'>
      <img src={mainImage} className="mainImage" alt='mainImage'></img>
      <RectangularComponent 
      radius="10px"
      color="white"
      width="400px"
      height="300px"
      top="50px"
      gridC="4"
      gridR="1"
      ></RectangularComponent>
      <div className='logoContainer'>
      <img src={mainLogo} className="mainLogo" alt='mainImage'></img>
      <RectangularComponent 
        radius="10px"
        color="white"
        width="300px"
        height="500px"
        top="10px"
        // gridC= "5"
        // gridR= "2"
    ></RectangularComponent>
    </div>
      <RectangularComponent 
      radius="10px"
      color="white"
      width="200px"
      height="100px"
      gridC="1"
      gridR="2"
      ></RectangularComponent>
      <RectangularComponent 
      radius="10px"
      color="white"
      width="200px"
      height="100px"
      gridC="2"
      gridR="2"
      ></RectangularComponent>
      <RectangularComponent 
      radius="10px"
      color="white"
      width="200px"
      height="100px"
      gridC="3"
      gridR="2"
      ></RectangularComponent>
      <RectangularComponent 
      radius="10px"
      color="white"
      width="400px"
      height="300px"
      gridC="4"
      gridR="2"
      ></RectangularComponent>
    </div>
    </>
  );
}

export default App;
