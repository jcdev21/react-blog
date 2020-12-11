import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDetail = (props) => {

    const { show, onHide } = props;
    const ref = useRef();

    useEffect(() => {
        ref.current = show;
    }, [show]);

    return (
        <Modal ref={ref} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default ModalDetail;