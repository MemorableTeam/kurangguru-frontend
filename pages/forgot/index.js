import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";

const ForgotPassword = () => {
    return (
        <>
            <Header title="Forgot Password" />
            <Container fluid className="bg-blue-light bg-main">
                <Row>
                    <Col md={6} xs={12}>
                        <Image className='p-back' src="/icon/back-icon.svg" />
                        <Row className="justify-content-center align-items-center bg-main">
                            <Col md={6}>
                                <Image className='logo' src="/images/face1.png" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} className="bg-white kanit">
                        <Row className="justify-content-center align-items-center bg-main text-center">
                            <Col md={8}>
                                <h2 className='fw-bolder'>Reset Password</h2>
                                <p className='fw-bolder'>Enter your email address linked to this account</p>
                                <p className='mt-3 text-grey-dark mb-5 fwbold'>We will send you the verification code to reset your password</p>
                                <form>
                                    <div className="text-left">
                                        <label htmlFor="InputEmail1" className='form-label text-grey-dark bg-white label-top'>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control shadow-none border-radius-10 py-4"
                                            id="InputEmail1"
                                            aria-describedby="emailHelp"
                                        />
                                        <Button variant='none' className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit" size='lg'>
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
