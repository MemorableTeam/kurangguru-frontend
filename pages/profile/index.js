import Sidebar from "../../components/sidebar"
import { Col, Row, Image, Button, Modal, InputGroup, FormControl } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useUser } from "../api/users/useUser";
import { actionUser } from "../api/users/actionUser";
import useSWR from "swr";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter()
  const { data: auth } = useSWR('api/users/getSession')
  const { user, errUser, mutateUser, loadUser } = useUser(auth?.user?.user_id)
  const [showPhone, setShowPhone] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: phone, handleSubmit: phoneSubmit, formState: { errors: phoneErr } } = useForm();
  const { register: username, handleSubmit: usernameSubmit, formState: { errors: usernameErr } } = useForm();
  const [img, setImg] = useState(null)

  const handleClosePhone = () => setShowPhone(false),
    handleShowPhone = () => setShowPhone(true),
    handleCloseChange = () => setShowChange(false),
    handleShowChange = () => setShowChange(true)

  useEffect(() => {
    if (showChange) {
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

  const processUpdate = (data) => {
    const formData = new FormData()
    user?.id ? formData.append('id', user?.id || undefined) : ''
    data.email ? formData.append('email', data.email || undefined) : ''
    data.username ? formData.append('username', data.username || undefined) : ''
    data.phone ? formData.append('phone', data.phone || undefined) : ''
    data.password ? formData.append('password', data.password || undefined) : ''
    data.confirm_password ? formData.append('confirm_password', data.confirm_password || undefined) : ''
    img ? formData.append('photo', img || undefined) : ''

    mutateUser(actionUser.updateUser(formData))
    setDisabled(true)
  }

  useEffect(() => {
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  return (
    <>
      <Header title="Profile" url="./images/face1.png" />
      <div className='container-fluid bg-blue-light bg-main sm-bg'>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Sidebar activeTabs={1} />
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2'>
              <Col xs={12} className='bg-banner top-profile w-100 sm-hidden' style={{ height: '35%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                {disabled ? '' : <h5 className='p-3 position-absolute text-white' onClick={usernameSubmit(processUpdate)}>Save</h5>}
                <Row className="justify-content-center align-items-center w-100" style={{ height: '100%' }}>
                  <Col md={2} xs={6} className="mx-auto my-auto">
                    <label className='ps-content mx-auto rounded-circle'>
                      <input type="file" name="photo" accept="image" onChange={(e) => setImg(e.target.files[0])} className='d-none' disabled={disabled} />
                      {/* <img width='130px' height='130px' className='rounded-circle' src={(user.photo) ? `${process.env.REACT_APP_API_IMG_URL}${user.photo}` : `${process.env.PUBLIC_URL}/logo/no-photo.png`} alt='profile' /> */}
                      <Image className="rounded-circle" src={user?.photo && user?.photo != 'null' ? `${process.env.API_URL_IMG}${user?.photo}` : './images/photo_profile.png'} style={{ height: '100%', width: '100%' }} />
                    </label>
                    <Button className="edit bg-transparent border-0 mt-3" onClick={() => setDisabled(!disabled)}>
                      <Image className="ps-content mx-4" src="/icon/edit-icon.svg" style={{ height: '30%', width: '30%' }} />
                    </Button>
                    {/* <h4 className="text-white text-center ms-4 mt-3 fw-700">{user?.username}</h4> */}
                  </Col>
                  <div className='w-100'>
                    <form>
                      <input
                        disabled={disabled}
                        type='text'
                        name='username'
                        className='text-white text-center w-100 fw-700 bg-transparent border-0'
                        defaultValue={user?.username}
                        style={{ fontSize: '26px' }}
                        {...username("username")}
                      />
                    </form>
                  </div>
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
          <form onSubmit={phoneSubmit(processUpdate)}>
            <InputGroup className="mb-2">
              <InputGroup.Text className="bg-blue-dark text-white">+62</InputGroup.Text>
              <FormControl id="inlineFormInputGroup" defaultValue={user?.phone} {...phone("phone")} />
            </InputGroup>
            <Button className="btn-blue-dark py-0 shadow-none" onClick={phoneSubmit(processUpdate)}>
              Save Changes
            </Button>
          </form>
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
            <Button className="btn-blue-dark py-0" onClick={handleSubmit(processUpdate)}>
              Save Changes
            </Button>
          </form>
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
