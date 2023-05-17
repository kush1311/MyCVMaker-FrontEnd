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
        <Modal.Header closeButton>
          <Modal.Title>You are not logged in</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login to save your changes</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={goToLoginPage}>
            Take me to login page
          </Button>
          <Button variant="primary" onClick={handleLoginLater}>
            I will do it later
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PleaseLoginModal;