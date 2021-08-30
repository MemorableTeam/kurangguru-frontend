const modalMessage = (props) =>{
    return(
        <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter"
        centered onHide={(e) => props.cb(false)}>
        <Modal.Body>
            <span className='text-blue-dark'>{props.message}</span>
        </Modal.Body>
      </Modal>
    )
}

export {modalMessage}