import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Header } from "../../components";
import {useForm} from 'react-hook-form'

const Verify = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  //process login
  const processVerify = (data) => {
    console.log(Object.values(data).toString().replace(/,/g, ""))
  }
  const handleChange = (e) =>{
    var nextState = e.srcElement || e.target
    let data = e.target.value
    if(data.length == 1){
      while(nextState = nextState.nextElementSibling){
        if (nextState == null)
                break;
            if (nextState.tagName.toLowerCase() === "input") {
                nextState.focus();
                break;
            }
      }
    }
  }

  return (
    <>
      <Header title="Verify Code" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center py-5">
          <Col md={{ span: 4, offset: 4 }} className='my-5'>
            <h1 className="my-5 text-center kanit">Verify Code</h1>
            <form onSubmit={handleSubmit(processVerify)}>
              <div className="mb-3">
                <div className='input-group'>
                  <input
                    {...register('code1', {required:"field can't be empty"})}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e)=>handleChange(e)}
                  />
                  <input
                    {...register('code2', {required:"field can't be empty"})}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e)=>handleChange(e)}
                  />
                  <input
                    {...register("code3", {required:"field can't be empty"})}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e)=>handleChange(e)}
                  />
                  <input
                    {...register("code4", {required:"field can't be empty"})}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e)=>handleChange(e)}
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
        </Row>
      </Container>
    </>
  );
};

export default Verify;
