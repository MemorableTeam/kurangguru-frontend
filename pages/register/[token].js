import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Header } from "../../components";
import { useForm } from 'react-hook-form'
import { globalPost } from "../../libs/fetcher";
import { useRouter } from 'next/router'
import { session } from "../../libs/session";
import useSWR from "swr";

const Verify = () => {
  const router = useRouter()
  const { data: auth } = useSWR('../api/users/getSession')
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const [focus, setFocus] = useState('code1')

  //process login
  const processVerify = async (data) => {
    let code = Object.values(data).toString().replace(/,/g, "")
    const { token } = router.query
    try {
      const result = await globalPost({
        url: `${process.env.API_URL}/auth/register/email-verify`,
        data: { code: code },
        headers: { token: token }
      })
      console.log(result)
      if (result.status == 200) {
        session(result.data, router, "../api/users/session")
      } else {
        alert(result.message)
      }
    } catch {
      throw error
    }
  }
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

  useEffect(() => {
    if (auth?.user && auth !== undefined) router.push('/')
  }, [auth])

  return (
    <>
      <Header title="Verify Code" url="../images/face1.png" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center py-5">
          <Col md={{ span: 4, offset: 4 }} className='my-5'>
            <h1 className="my-5 text-center kanit">Verify Code</h1>
            <form onSubmit={handleSubmit(processVerify)}>
              <div className="mb-3">
                <div className='input-group'>
                  <input
                    id='code1'
                    {...register('code1', { required: "field can't be empty" })}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => { handleChange(e) }}
                    autoFocus
                  />
                  <input
                    id='code2'
                    {...register('code2', { required: "field can't be empty" })}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    id='code3'
                    {...register("code3", { required: "field can't be empty" })}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    id='code4'
                    {...register("code4", { required: "field can't be empty" })}
                    type="number"
                    className={`mt-2 text-center form-control border-top-0 border-left-0 border-right-0 border-dark shadow-none py-4 b-bottom bg-transparent`}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                    }}
                    onChange={(e) => handleChange(e)}
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
