import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";
import { useState, useEffect } from 'react'

const CreateNew = () => {
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)

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

    return (
        <>
            <Header title="Craete New Password" />
            <Container fluid className="bg-blue-light bg-main">
                <Row className='g-0'>
                    <Col md={6} xs={12}>
                        <Row className="justify-content-center align-items-center bg-main">
                            <Col md={6}>
                                <Image className='logo' src="/images/face1.png" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} xs={12} className="bg-white kanit">
                        <Row className="justify-content-center align-items-center bg-main text-center">
                            <Col md={8}>
                                <h2 className='fw-bolder'>Create New Password</h2>
                                <p className='mt-5 fw-bolder'>Your new password must be different from previous used password!</p>
                                <form>
                                    <div className="text-left">
                                        <div className="mt-5 mb-1">
                                            <label htmlFor="input-password" className='form-label text-grey-dark bg-white kanit label-top'>
                                                Password
                                            </label>
                                            <div className='input-group'>
                                                <input
                                                    type="password"
                                                    className='form-control shadow-none border-radius-10 py-4 r-none'
                                                    id="input-password"
                                                />
                                                <div className='px-2 input-group-append toogle'>
                                                    {(!visiblePassword) ? (
                                                        <img src='/icon/open-eyes-icon.svg' onClick={() => setVisiblePassword(true)} />
                                                    ) : (
                                                        <img src='/icon/close-eyes-icon.svg' onClick={() => setVisiblePassword(false)} />
                                                    )
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-5 mb-5">
                                            <label htmlFor="input-confirm-password" className='form-label text-grey-dark bg-white kanit label-top'>
                                                Confirm Password
                                            </label>
                                            <div className='input-group'>
                                                <input
                                                    type="password"
                                                    className='form-control shadow-none border-radius-10 py-4 r-none'
                                                    id="input-confirm-password"
                                                />
                                                <div className='px-2 input-group-append toogle'>
                                                    {(!visibleConfirm) ? (
                                                        <img src='/icon/open-eyes-icon.svg' onClick={() => setVisibleConfirm(true)} />
                                                    ) : (
                                                        <img src='/icon/close-eyes-icon.svg' onClick={() => setVisibleConfirm(false)} />
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant='none' className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit" size='lg'>
                                            Create
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

export default CreateNew;
