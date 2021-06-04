import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Header } from "../../components";
/* import style from '../../styles/auth.module.scss' */

const Verify = () => {
  const [inputData, setInputData] = useState({
    code1: null,
    code2: null,
    code3: null,
    code4: null
  })
  //process login
  const processVerify = (e) => {
    e.preventDefault()
    console.log(Object.values(inputData).toString().replace(/,/g, ""))
  }


  return (
    <>
      <Header title="Verify Code" />
      <Container fluid className="bg-blue-light bg-main">
        {/* <Row className="align-content-center py-5">
          <Col md={{ span: 4, offset: 4 }} className='my-5'>
            <h1 className="my-5 text-center kanit">Verify Code</h1>
            <form onSubmit={(e) => processVerify(e)}>
              <div className="mb-3">
                <div className='input-group'>
                  <input
                    type="number"
                    className={`mr-3 form-control px-3 ${style.fieldverify}`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => { setInputData({ ...inputData, code1: e.target.value }) }}
                    required
                  />
                  <input
                    type="number"
                    className={`mr-3 form-control px-3 ${style.fieldverify}`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => { setInputData({ ...inputData, code2: e.target.value }) }}
                    required
                  />
                  <input
                    type="number"
                    className={`mr-3 form-control px-3 ${style.fieldverify}`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => { setInputData({ ...inputData, code3: e.target.value }) }}
                    required
                  />
                  <input
                    type="number"
                    className={`mr-3 form-control px-3 ${style.fieldverify}`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => { setInputData({ ...inputData, code4: e.target.value }) }}
                    required
                  />
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
        </Row> */}
      </Container>
    </>
  );
};

export default Verify;
