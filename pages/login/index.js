import { Container, Row, Col, Button } from "react-bootstrap";
import { Header } from "../../components";

const Login = () => {
  return (
    <>
      <Header title="Login" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="align-content-center">
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className="my-5 text-center">Login</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username or Email
                </label>
                <input
                  type="email"
                  className="form-control border-radius-10 py-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-radius-10 py-4"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input border-radius-10"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <div className="d-grid gap-2">
                <Button variant='none' className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit" size='lg'>
                  Login
                </Button>
								<Button variant='none' className="border-radius-10 bg-grey w-100 text-black shadow-sm kanit" size='lg'>
									<img src='icon/google-icon.svg' class='mr-3'></img>
                  <small>Login with google</small>
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
