import Sidebar from "../../components/sidebar"
import { Col, Row, Image, Button, Modal, InputGroup, FormControl } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useUser } from "../api/users/useUser";

const Profile = () => {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const { user, errUser, mutateUser, loadUser } = useUser(1)
  const [showPhone, setShowPhone] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const handleClosePhone = () => setShowPhone(false),
    handleShowPhone = () => setShowPhone(true),
    handleCloseChange = () => setShowChange(false),
    handleShowChange = () => setShowChange(true)

  useEffect(() => {
    if(showChange){
      if (visiblePassword) {
        document.getElementById("input-password").type = "text";
      } else {
        document.getElementById("input-password").type = "password";
      }
  
      if (visibleConfirm) {
        document.getElementById("input-confirm-password").type = "text";
      } else {
        document.getElementById("input-confirm-password").type = "password";
      }
    }
  }, [visiblePassword, visibleConfirm]);

  const processUpdate = (data) =>{
    console.log(data)
  }


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
                    <Image className="ps-content mx-4 rounded-circle" src={user?.photo ? `${process.env.API_URL_IMG}${user?.photo}` : './images/photo_profile.png'} style={{ height: '80%', width: '80%' }} />
                    <Button className="edit bg-transparent border-0">
                      <Image className="ps-content mx-4" src="/icon/edit-icon.svg" style={{ height: '30%', width: '30%' }} />
                    </Button>
                    <h6 className="text-white text-center ms-4 mt-3 fw-700">{user?.username}</h6>
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
            <FormControl id="inlineFormInputGroup" defaultValue={user?.phone} />
          </InputGroup>
          <Button className="btn-blue-dark py-0 shadow-none">
            Save Changes
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePhone}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChange} onHide={handleCloseChange} animation={false} id="show">
        <Modal.Header className="bg-blue-dark text-white kanit">
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(processUpdate)}>
            <div className="text-left">
              <div className="mt-5 mb-1">
                <label
                  htmlFor="input-password"
                  className="form-label text-grey-dark bg-white kanit label-top"
                >
                  Password
                      </label>
                <div className="input-group">
                  <input
                    {...register("password", {
                      required: "Password can't be empty ! ",
                    })}
                    type="password"
                    className={`form-control shadow-none border-radius-10 py-3 r-none ${errors.password ? "is-invalid" : ""
                      }`}
                    id="input-password"
                  />
                  <div className="px-2 input-group-append toogle py-3">
                    {!visiblePassword ? (
                      <img
                        src="/icon/open-eyes-icon.svg"
                        onClick={() => setVisiblePassword(true)}
                      />
                    ) : (
                      <img
                        src="/icon/close-eyes-icon.svg"
                        onClick={() => setVisiblePassword(false)}
                      />
                    )}
                  </div>
                </div>
                <small className="text-danger font-weight-bold mt-2 mr-3">
                  {errors?.password?.message}
                </small>
              </div>
              <div className="mt-5 mb-5">
                <label
                  htmlFor="input-confirm-password"
                  className="form-label text-grey-dark bg-white kanit label-top"
                >
                  Confirm Password
                      </label>
                <div className="input-group">
                  <input
                    {...register("confirm_password", {
                      required: "Confirm password can't be empty ! ",
                    })}
                    type="password"
                    className={`form-control shadow-none border-radius-10 py-3 r-none ${errors.confirm_password ? "is-invalid" : ""
                      }`}
                    id="input-confirm-password"
                  />
                  <div className="px-2 input-group-append toogle py-3">
                    {!visibleConfirm ? (
                      <img
                        src="/icon/open-eyes-icon.svg"
                        onClick={() => setVisibleConfirm(true)}
                      />
                    ) : (
                      <img
                        src="/icon/close-eyes-icon.svg"
                        onClick={() => setVisibleConfirm(false)}
                      />
                    )}
                  </div>
                </div>
                <small className="text-danger font-weight-bold mt-2 mr-3">
                  {errors?.confirm_password?.message}
                </small>
              </div>
            </div>
          </form>
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
