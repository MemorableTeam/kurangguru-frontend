import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";
import Link from 'next/link'
import style from '../../styles/forgot-p.module.scss'

const CodeVerify = () => {
    return (
        <>
            <Header title="Reset Password" />
            <Container fluid className="bg-blue-light bg-main">
                <Row>
                    <Col md={6} xs={12}>
                        <Row className="justify-content-center align-items-center bg-main">
                            <Col md={6}>
                                <Image className={`${style.logo}`} src="/images/face2.png" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} className="bg-white kanit">
                        <Row className="justify-content-center align-items-center bg-main text-center">
                            <Col md={8}>
                                <h2 className={`${style.fwbolder}`}>Reset Password</h2>
                                <h5 className={`mt-5 ${style.fwbolder}`}>Enter verification code we just sent to your email address</h5>
                                <form>
                                    <div>
                                        <div className="d-flex text-center">
                                            <input
                                                type="number"
                                                className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 ${style.bbottom}`}
                                                id="InputCode"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                                }}
                                                min={0}
                                            />
                                            <input
                                                type="number"
                                                className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 ${style.bbottom}`}
                                                id="InputCode"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                                }}
                                                min={0}
                                            />
                                            <input
                                                type="number"
                                                className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 ${style.bbottom}`}
                                                id="InputCode"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                                }}
                                                min={0}
                                            />
                                            <input
                                                type="number"
                                                className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 ${style.bbottom}`}
                                                id="InputCode"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                                }}
                                                min={0}
                                            />
                                        </div>
                                        <p className={`text-grey-dark mt-3 mb-5 ${style.fwbolder}`}>Didn't receive a code?
                                            <Link href="#">
                                                <a className={`text-blue-dark ${style.fwbolder}`}> Resend</a>
                                            </Link>
                                        </p>
                                        <Button variant='none' className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit" size='lg'>
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
