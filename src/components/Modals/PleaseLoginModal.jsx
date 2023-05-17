import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../GlobalContextApi/GlobalContextApi';
import { LOGIN_ROUTE } from '../../constants/routes';

function PleaseLoginModal() {
  const [show, setShow] = useState(true);
  const history = useHistory();
  const globalState = useContext(Context);
  const handleClose = () => setShow(false);
  function savePleaseLoginModalShowedInLocalStorage () {
    localStorage.setItem('pleaseloginmodalshowed', 'yes');
  }
  const goToLoginPage = () => {
    savePleaseLoginModalShowedInLocalStorage();
    history.push(LOGIN_ROUTE);
  }
  const handleLoginLater = () => {
    setShow(false);
    savePleaseLoginModalShowedInLocalStorage();
    globalState.handlePleaseLoginModalShowed(true);
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-sky-600' closeButton>
          <Modal.Title className='text-white'>You are not logged in</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login to save your changes</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='bg-green-600 hover:bg-green-700' onClick={goToLoginPage}>
            Take me to login page
          </Button>
          <Button variant="primary" className='bg-cyan-600 hover:bg-cyan-700' onClick={handleLoginLater}>
            I will do it later
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default PleaseLoginModal;