import { Container, Row, Col, Button } from "react-bootstrap";
import { Header } from "../../components";
import Link from "next/link";
import {useState,useEffect} from 'react'

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirm, setVisibleConfirm] = useState(false)

  useEffect(()=>{
    if(visiblePassword){
      document.getElementById('input-password').type='text'
    }else{
      document.getElementById('input-password').type='password'
    }

    if(visibleConfirm){
      document.getElementById('input-confirm-password').type='text'
    }else{
      document.getElementById('input-confirm-password').type='password'
    }
  }, [visiblePassword, visibleConfirm]);

  return (
    <>
      <Header title="Register" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center">
          <Col md={{ span: 4, offset: 4 }} className='mb-5'>
            <h1 className="my-5 text-center kanit">Register</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="input-password" className="form-label text-grey-dark kanit label-top">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 py-4"
                  id="input-username"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="input-email" className="form-label text-grey-dark kanit label-top">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control border-radius-10 py-4"
                  id="input-email"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="input-password" className="form-label text-grey-dark kanit label-top">
                  Password
                </label>
                <div className='input-group'>
                  <input
                    type="password"
                    className='form-control shadow-none border-radius-10 py-4 r-none'
                    id="input-password"
                  />
                  <div className='px-2 input-group-append toogle'>
                    {(!visiblePassword)?(
                      <img src='./icon/open-eyes-icon.svg' onClick={()=>setVisiblePassword(true)}/>
                    ):(
                      <img src='./icon/close-eyes-icon.svg' onClick={()=>setVisiblePassword(false)}/>
                    )
                    }
                  </div>
                </div>

              </div>

              <div className="mb-5">
                <label htmlFor="input-confirm-password" className="form-label text-grey-dark kanit label-top">
                  Confirm Password
                </label>
                <div className='input-group'>
                  <input
                    type="password"
                    className='form-control shadow-none border-radius-10 py-4 r-none'
                    id="input-confirm-password"
                  />
                  <div className={`px-2 input-group-append toogle`}>
                    {(!visibleConfirm)?(
                      <img src='./icon/open-eyes-icon.svg' onClick={()=>setVisibleConfirm(true)}/>
                    ):(
                      <img src='./icon/close-eyes-icon.svg' onClick={()=>setVisibleConfirm(false)}/>
                    )
                    }
                  </div>
                </div>

              </div>
              <div className="d-grid gap-2">
                <Button
                  variant="none"
                  className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                  size="lg"
                >
                  Register
                </Button>
                <Button
                  variant="none"
                  className="border-radius-10 bg-grey w-100 text-black shadow-sm kanit"
                  size="lg"
                >
                  <img src="icon/google-icon.svg" class='mr-3 icon'></img>
                  <small>Login with google</small>
                </Button>
              </div>

              <div className='mt-5 text-center kanit'>
                <span>Already have account?</span>
                <Link href='/login'>
                  <span className='text-blue-dark ml-2 font-weight-bold'> Login</span>
                </Link>
              </div>

            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
