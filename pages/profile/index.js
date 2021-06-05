import Sidebar from "../../components/sidebar"
import { Col, Row, Image, Button, Modal, InputGroup, FormControl } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'

const Profile = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showChange, setShowChange] = useState(false);

  const handleClosePhone = () => setShowPhone(false);
  const handleShowPhone = () => setShowPhone(true);
  const handleCloseChange = () => setShowChange(false);
  const handleShowChange = () => setShowChange(true);


  return (
    <>
      <Header title="Profile" />
      <div className='container-fluid bg-blue-light bg-main sm-bg'>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Sidebar activeTabs={1} />
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2'>
              <Col xs={12} className='bg-banner top-profile w-100 sm-hidden' style={{ height: '35%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <Row className="justify-content-center align-items-center w-100" style={{ height: '100%' }}>
                  <Col md={2} xs={6} className="mx-auto my-auto">
                    <Image className="ps-content mx-4" src="/images/photo_profile.png" style={{ height: '80%', width: '80%' }} />
                    <Button className="edit bg-transparent border-0">
                      <Image className="ps-content mx-4" src="/icon/edit-icon.svg" style={{ height: '30%', width: '30%' }} />
                    </Button>
                    <h6 className="text-white ms-4 mt-3 fw-700">Emir Kharisma</h6>
                  </Col>
                </Row>
              </Col>

              <Col xs={12} className='bg-white w-100' style={{ height: '65%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
                <Row className="ms-2">
                  <Col md={12}>
                    <h5 className="mt-3 mb-1 fw-700 sm-hidden">Profile Settings</h5>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn" onClick={handleShowPhone}>
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/phone-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 pb-0 fw-700 text-black">Phone Numbers</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn" onClick={handleShowChange}>
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/pin-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 fw-700 text-black">Change Password</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn">
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/chat-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 fw-700 text-black">Chat Settings</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn">
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/notif-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 fw-700 text-black">Push Notifications</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn">
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/security-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 fw-700 text-black">Privacy and Security</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                    <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 w-100 h-btn">
                      <div className="d-flex align-items-center w-max">
                        <Image className="py-1" src="/icon/storage-icon.svg" style={{ height: '10%', width: '10%' }} />
                        <p className="ms-3 pt-3 fw-700 text-black">Data and storage</p>
                      </div>
                      <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                    </Button>

                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Modal show={showPhone} onHide={handleClosePhone} animation={false}>
        <Modal.Header className="bg-blue-dark text-white kanit">
          <Modal.Title>Phone Numbers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2">
            <InputGroup.Text className="bg-blue-dark text-white">+62</InputGroup.Text>
            <FormControl id="inlineFormInputGroup" defaultValue="83334444333" />
          </InputGroup>
          <Button className="btn-blue-dark py-0">
            Save Changes
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePhone}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChange} onHide={handleCloseChange} animation={false}>
        <Modal.Header className="bg-blue-dark text-white kanit">
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Button className="btn-blue-dark py-0">
            Save Changes
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChange}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile
