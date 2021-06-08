import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { globalPost } from "../../libs/fetcher";
import { session } from "../../libs/session";
import useSWR from "swr";

const Login = () => {
  const { data: auth, error } = useSWR('api/users/getSession')
  //variable state untuk visible invisible password
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  let loadAuth = !auth & !error

  const router = useRouter();
  //useform
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //process login
  const processLogin = async (data) => {
    setLoading(true);
    const { username, password } = data;
    try {
      const result = await globalPost({
        url: `${process.env.API_URL}/auth/login`,
        data: {
          email: username,
          password: password,
        },
      });
      if (result.status == 200) {
        session(result.data, router, "api/users/session", setLoading);
      } else {
        setLoading(false)
        alert(result.message);
      }
    } catch (err) { }
  };

  //ketika tekan toogle ditekan
  useEffect(() => {
    if (visible) {
      document.getElementById("input-password").type = "text";
    } else {
      document.getElementById("input-password").type = "password";
    }
  }, [visible]);

  useEffect(() => {
    if (auth?.user && auth !== undefined) router.push('/')
  }, [auth])

  return (
    <>
      <Header title="Login" url="./images/face1.png" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center">
          <Col md={{ span: 4, offset: 4 }} className="my-auto">
            <h1 className="my-5 text-center kanit">Login</h1>
            <form onSubmit={handleSubmit(processLogin)}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-grey-dark kanit label-top4"
                >
                  Username or Email
                </label>
                <input
                  {...register("username", {
                    required: "Username Or Email can't be empty",
                  })}
                  type="text"
                  className={`username form-control shadow-none border-radius-10 py-3 ${errors.username ? "is-invalid" : ""
                    }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <small className="text-danger font-weight-bold mt-2 me-3">
                  {errors?.username?.message}
                </small>
              </div>

              <div className="mb-1">
                <label
                  htmlFor="input-password"
                  className="form-label text-grey-dark kanit label-top4"
                >
                  Password
                </label>
                <div className="input-group">
                  <input
                    {...register("password", {
                      required: "Password can't be empty",
                    })}
                    type="password"
                    className={`password form-control shadow-none border-radius-10 py-3 r-none ${errors.password ? "is-invalid" : ""
                      }`}
                    id="input-password"
                  />
                  <div className="px-2 input-group-append toogle py-3">
                    {!visible ? (
                      <img
                        src="./icon/open-eyes-icon.svg"
                        onClick={() => setVisible(true)}
                      />
                    ) : (
                      <img
                        src="./icon/close-eyes-icon.svg"
                        onClick={() => setVisible(false)}
                      />
                    )}
                  </div>
                </div>
                <small className="text-danger font-weight-bold mt-2 me-3">
                  {errors?.password?.message}
                </small>
              </div>

              <div className="d-flex flex-row-reverse bd-highlight mb-4">
                <Link href="./forgot">
                  <span className="p-2 font-weight-bold robot">
                    Forgot Password ?
                  </span>
                </Link>
              </div>

              <div className="d-grid gap-2 mb-5">
                <Button
                  variant="none"
                  className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                  size="lg"
                  type="submit"
                >
                  Login
                </Button>
                <Button
                  variant="none"
                  className="border-radius-10 bg-grey w-100 text-black shadow-sm kanit"
                  size="lg"
                >
                  <img src="icon/google-icon.svg" className="me-3 icon"></img>
                  <span>Login with google</span>
                </Button>
              </div>

              <div className="mt-5 text-center kanit">
                <span>New user ?</span>
                <Link href="/register">
                  <span className="text-blue-dark ms-2 font-weight-bold">
                    {" "}
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Modal show={loading} aria-labelledby="contained-modal-title-vcenter"
        centered onHide={(e) => setLoading(false)}>
        <Modal.Body>
          <Spinner animation="grow" variant="none" className='bg-blue-light' />
          <Spinner animation="grow" variant="none" className='bg-blue-dark' />
          <Spinner animation="grow" variant="none" className='bg-blue-light' />
          <Spinner animation="grow" variant="none" className='bg-blue-dark' />
          <Spinner animation="grow" variant="none" className='bg-blue-light' />
          <Spinner animation="grow" variant="none" className='bg-blue-dark' />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
