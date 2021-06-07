import { Container, Row, Col, Button } from "react-bootstrap";
import { Header } from "../../components";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { globalPost } from '../../libs/fetcher'
import {useRouter} from 'next/router'

const Register = () => {
  const router = useRouter()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (visiblePassword) {
      document.getElementById('input-password').type = 'text'
    } else {
      document.getElementById('input-password').type = 'password'
    }

    if (visibleConfirm) {
      document.getElementById('input-confirm-password').type = 'text'
    } else {
      document.getElementById('input-confirm-password').type = 'password'
    }
  }, [visiblePassword, visibleConfirm]);

  const processRegister = async(data) =>{
      try{
        const result = await globalPost({
          url:`${process.env.API_URL}/auth/register`,
          data:{...data, acc : true}
        })
        console.log(result)
        router.replace({
          pathname: `/register/${result.data.token}`
        })
      }catch(err){

      }
  }

  return (
    <>
      <Header title="Register" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center">
          <Col md={{ span: 4, offset: 4 }} className='mb-5'>
            <h1 className="my-5 text-center kanit">Register</h1>
            <form onSubmit={handleSubmit(processRegister)}>
              <div className="mb-3">
                <label htmlFor="input-username" className="form-label text-grey-dark kanit label-top4">
                  Username
                </label>
                <input
                  {...register('username', { required: "Username can't be empty" })}
                  type="text"
                  className={`form-control border-radius-10 py-3 ${errors.username ? 'is-invalid' : ''}`}
                  id="input-username"
                  aria-describedby="emailHelp"
                />
                <small className='text-danger font-weight-bold mt-2 me-3'>{errors?.username?.message}</small>
              </div>

              <div className="mb-3">
                <label htmlFor="input-email" className="form-label text-grey-dark kanit label-top4">
                  Email
                </label>
                <input
                  {...register('email', { required: "Email can't be empty" })}
                  type="email"
                  className={`form-control border-radius-10 py-3 ${errors.email ? 'is-invalid' : ''}`}
                  id="input-email"
                  aria-describedby="emailHelp"
                />
                <small className='text-danger font-weight-bold mt-2 me-3'>{errors?.email?.message}</small>
              </div>

              <div className="mb-3">
                <label htmlFor="input-password" className="form-label text-grey-dark kanit label-top4">
                  Password
                </label>
                <div className='input-group'>
                  <input
                    {...register('password', { required: "Password can't be empty" })}
                    type="password"
                    className={`form-control shadow-none border-radius-10 py-3 r-none ${errors.password ? 'is-invalid' : ''}`}
                    id="input-password"
                  />
                  <div className='px-2 input-group-append toogle py-3'>
                    {(!visiblePassword) ? (
                      <img src='./icon/open-eyes-icon.svg' onClick={() => setVisiblePassword(true)} />
                    ) : (
                      <img src='./icon/close-eyes-icon.svg' onClick={() => setVisiblePassword(false)} />
                    )
                    }
                  </div>
                </div>
                <small className='text-danger font-weight-bold mt-2 me-3'>{errors?.password?.message}</small>
              </div>

              <div className="mb-5">
                <label htmlFor="input-confirm-password" className="form-label text-grey-dark kanit label-top4">
                  Confirm Password
                </label>
                <div className='input-group'>
                  <input
                    {...register('confirm_password', {required:"Re-password can;t be empty"})}
                    type="password"
                    className={`form-control shadow-none border-radius-10 py-3 r-none ${errors.confirm_password ? 'is-invalid' : ''}`}
                    id="input-confirm-password"
                  />
                  <div className={`px-2 input-group-append toogle py-3`}>
                    {(!visibleConfirm) ? (
                      <img src='./icon/open-eyes-icon.svg' onClick={() => setVisibleConfirm(true)} />
                    ) : (
                      <img src='./icon/close-eyes-icon.svg' onClick={() => setVisibleConfirm(false)} />
                    )
                    }
                  </div>
                </div>
                <small className='text-danger font-weight-bold mt-2 me-3'>{errors?.confirm_password?.message}</small>
              </div>
              <div className="d-grid gap-2">
                <Button
                  variant="none"
                  className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                  size="lg"
                  type='submit'
                >
                  Register
                </Button>
                <Button
                  variant="none"
                  className="border-radius-10 bg-grey w-100 text-black shadow-sm kanit"
                  size="lg"
                >
                  <img src="icon/google-icon.svg" className='me-3 icon'></img>
                  <small>Login with google</small>
                </Button>
              </div>

              <div className='mt-5 text-center kanit'>
                <span>Already have account?</span>
                <Link href='/login'>
                  <span className='text-blue-dark ms-2 font-weight-bold'> Login</span>
                </Link>
              </div>

            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
