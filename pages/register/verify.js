import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { Header } from "../../components";
import style from '../../styles/auth.module.scss'

const Verify = () => {
  //process login
  const processLogin = (e) =>{
    e.preventDefault()

  }


  return (
    <>
      <Header title="Login" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center py-5">
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className="my-5 text-center kanit">Verify Code</h1>
            <form onSubmit={(e)=>processLogin(e)}>
              <div className="mb-3">
                <div className='input-group'>
                  <input type="text" className={`mr-3 form-control ${style.fieldverify}`}/>
                  <input type="text" className={`mr-3 form-control ${style.fieldverify}`}/>
                  <input type="text" className={`mr-3 form-control ${style.fieldverify}`}/>
                  <input type="text" className={`mr-3 form-control ${style.fieldverify}`}/>
                </div>
              </div>

              <div className="d-grid gap-2 my-5">
                <Button
                  variant="none"
                  className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                  size="lg"
                  type='submit'
                >
                  Verify
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Verify;
