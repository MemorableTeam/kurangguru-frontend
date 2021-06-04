import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { Header } from "../../components";
import style from '../../styles/auth.module.scss'

const Login = () => {
  //variable state untuk visible invisible password
  const [visible, setVisible] = useState(false)
  //variable state untuk set username & password
  const [data, setData] = useState({
    username : '-',
    password : '-'
  })

  //process login
  const processLogin = (e) =>{
    e.preventDefault()
    
    console.log(data)
  }

  //ketika tekan toogle ditekan
  useEffect(()=>{
    if(visible){
      document.getElementById('input-password').type='text'
    }else{
      document.getElementById('input-password').type='password'
    }
  }, [visible])

  return (
    <>
      <Header title="Login" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center">
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className="my-5 text-center kanit">Login</h1>
            <form onSubmit={(e)=>processLogin(e)}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label kanit">
                  Username or Email
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 py-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>{
                    setData({...data, username: e.target.value})
                  }}
                />
              </div>

              <div className="mb-1">
                <label htmlFor="input-password" className="form-label kanit">
                  Password
                </label>
                <div className={`input-group ${style.brnone}`}>
                  <input
                    type="password"
                    className={`form-control border-radius-10 py-4 ${style.rnone}`}
                    id="input-password"
                    onChange={(e)=>{setData({...data, password: e.target.value})}}
                  />
                  <div className={`px-2 input-group-append ${style.toogle}`}>
                    {(!visible)?(
                      <img src='./icon/open-eyes-icon.svg' onClick={()=>setVisible(true)}/>
                    ):(
                      <img src='./icon/close-eyes-icon.svg' onClick={()=>setVisible(false)}/>
                    )
                    }
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row-reverse bd-highlight mb-4">
                <span className="p-2 font-weight-bold robot">Forgot Password ?</span>
              </div>

              <div className="d-grid gap-2 mb-5">
                <Button
                  variant="none"
                  className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                  size="lg"
                  type='submit'
                >
                  Login
                </Button>
                <Button
                  variant="none"
                  className="border-radius-10 bg-grey w-100 text-black shadow-sm kanit"
                  size="lg"
                  >
                  <img src="icon/google-icon.svg" className={`mr-3 ${style.icon}`}></img>
                  <span>Login with google</span>
                </Button>
              </div>

              <div className='mt-5 text-center kanit'>
                <span>New user ?</span>
                <Link href='/register'>
                  <span className='text-blue-dark ml-2 font-weight-bold'> Register</span>
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
