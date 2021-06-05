import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const processForgot = (data)=>{
      console.log(data)
  }
  return (
    <>
      <Header title="Forgot Password" />
      <Container fluid className="bg-blue-light bg-main">
        <Row>
          <Col md={6} xs={12} className='fg-left'>
            <Image className="p-back" src="/icon/back-icon.svg"/>
            <Row className="justify-content-center align-items-center bg-main mx-auto w-100">
              <Col md={6} xs={7} className="mx-auto">
                <Image className="logo mx-4" src="/images/face1.png" />
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12} className="fg-right bg-white kanit">
            <Row className="justify-content-center align-items-center bg-main text-center">
              <Col md={8} xs={10}>
                <h2 className="fw-bolder fgr-title">Reset Password</h2>
                <p className="fw-bolder">
                  Enter your email address linked to this account
                </p>
                <p className="mt-3 text-grey-dark mb-5 fw-bold">
                  We will send you the verification code to reset your password
                </p>
                <form onSubmit={handleSubmit(processForgot)}>
                  <div className="text-left">
                    <label
                      htmlFor="InputEmail1"
                      className="form-label text-grey-dark bg-white label-top2"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email can't be empty",
                      })}
                      type="email"
                      className={`form-control shadow-none border-radius-10 py-3 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="InputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <small className="text-danger font-weight-bold mt-2">
                      {errors?.email?.message}
                    </small>
                    <Button
                      variant="none"
                      className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                      size="lg"
                      type='submit'
                    >
                      Send
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

export default ForgotPassword;
