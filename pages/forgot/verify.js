import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const CodeVerify = () => {
  const router = useRouter()
  const { data: auth } = useSWR('../api/users/getSession')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    var nextState = e.srcElement || e.target
    let data = e.target.value
    if (data.length == 1) {
      while (nextState = nextState.nextElementSibling) {
        if (nextState == null)
          break;
        if (nextState.tagName.toLowerCase() === "input") {
          nextState.focus();
          break;
        }
      }
    } else if (data.length < 1) {
      while (nextState = nextState.previousElementSibling) {
        if (nextState == null)
          break;
        if (nextState.tagName.toLowerCase() === "input") {
          nextState.focus();
          break;
        }
      }
    }
  }

  const processVerify = (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (auth?.user && auth !== undefined) router.push('/')
  }, [auth])

  return (
    <>
      <Header title="Reset Password" url="./images/face1.png" />
      <Container fluid className="bg-blue-light bg-main">
        <Row>
          <Col md={6} xs={12} className="float-left d-none d-md-block">
            <Row className="justify-content-center align-items-center bg-main">
              <Col md={6} xs={7} className="mx-auto">
                <Image className="logo mx-4" src="/images/face2.png" />
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12} className="float-right d-block bg-white kanit">
            <Row className="justify-content-center align-items-center bg-main text-center">
              <Col md={8} xs={12}>
                <h2 className="fw-bolder fgr-title">Reset Password</h2>
                <h5 className="mt-5 fw-bolder">
                  Enter verification code we just sent to your email address
                </h5>
                <form onSubmit={handleSubmit(processVerify)}>
                  <div className='mx-auto'>
                    <div className="d-flex text-center">
                      <input
                        {...register('code1', { required: "Field can't be empty" })}
                        type="number"
                        className="mt-2 text-center form-control border-top-0 border-dark shadow-none py-4 b-bottom"
                        id="InputCode"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        min={0}
                        onChange={(e) => handleChange(e)}
                      />
                      <input
                        {...register('code2', { required: "Field can't be empty" })}
                        type="number"
                        className="mt-2 text-center form-control border-top-0 border-dark shadow-none py-4 b-bottom"
                        id="InputCode"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        min={0}
                        onChange={(e) => handleChange(e)}
                      />
                      <input
                        {...register('code3', { required: "Field can't be empty" })}
                        type="number"
                        className="mt-2 text-center form-control border-top-0 border-dark shadow-none py-4 b-bottom"
                        id="InputCode"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        min={0}
                        onChange={(e) => handleChange(e)}
                      />
                      <input
                        {...register('code4', { required: "Field can't be empty" })}
                        type="number"
                        className="mt-2 text-center form-control border-top-0 border-dark shadow-none py-4 b-bottom"
                        id="InputCode"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        min={0}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <p className="text-grey-dark mt-3 mb-5 fw-bolder">
                      Didn't receive a code?
                      <Link href="#">
                        <a className="text-blue-dark fw-bolder"> Resend</a>
                      </Link>
                    </p>
                    <Button
                      id='btn-submit'
                      variant="none"
                      className="btn-verify btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                      size="lg"
                      type='submit'
                    >
                      Verify
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CodeVerify;
