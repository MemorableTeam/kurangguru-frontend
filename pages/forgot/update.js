import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Header } from "../../components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  useEffect(() => {
    if (visiblePassword) {
      document.getElementById("input-password").type = "text";
    } else {
      document.getElementById("input-password").type = "password";
    }

    if (visibleConfirm) {
      document.getElementById("input-confirm-password").type = "text";
    } else {
      document.getElementById("input-confirm-password").type = "password";
    }
  }, [visiblePassword, visibleConfirm]);

  const processUpdate = (data) =>{
    console.log(data)
  }
  return (
    <>
      <Header title="Craete New Password" />
      <Container fluid className="bg-blue-light bg-main">
        <Row className="g-0">
          <Col md={6} xs={12} className="sm-hidden">
            <Row className="justify-content-center align-items-center bg-main">
              <Col md={6}>
                <Image className="logo" src="/images/face2.png" />
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12} className="bg-white kanit">
            <Row className="justify-content-center align-items-center bg-main text-center">
              <Col md={8} xs={10}>
                <h2 className="fw-bolder">Create New Password</h2>
                <p className="mt-5 fw-bolder">
                  Your new password must be different from previous used
                  password!
                </p>
                <form onSubmit={handleSubmit(processUpdate)}>
                  <div className="text-left">
                    <div className="mt-5 mb-1">
                      <label
                        htmlFor="input-password"
                        className="form-label text-grey-dark bg-white kanit label-top2"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          {...register("password", {
                            required: "Password can't be empty ! ",
                          })}
                          type="password"
                          className={`form-control shadow-none border-radius-10 py-3 r-none ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          id="input-password"
                        />
                        <div className="px-2 input-group-append toogle py-3">
                          {!visiblePassword ? (
                            <img
                              src="/icon/open-eyes-icon.svg"
                              onClick={() => setVisiblePassword(true)}
                            />
                          ) : (
                            <img
                              src="/icon/close-eyes-icon.svg"
                              onClick={() => setVisiblePassword(false)}
                            />
                          )}
                        </div>
                      </div>
                      <small className="text-danger font-weight-bold mt-2 mr-3">
                        {errors?.password?.message}
                      </small>
                    </div>
                    <div className="mt-5 mb-5">
                      <label
                        htmlFor="input-confirm-password"
                        className="form-label text-grey-dark bg-white kanit label-top3"
                      >
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <input
                          {...register("confirm_password", {
                            required: "Confirm password can't be empty ! ",
                          })}
                          type="password"
                          className={`form-control shadow-none border-radius-10 py-3 r-none ${
                            errors.confirm_password ? "is-invalid" : ""
                          }`}
                          id="input-confirm-password"
                        />
                        <div className="px-2 input-group-append toogle py-3">
                          {!visibleConfirm ? (
                            <img
                              src="/icon/open-eyes-icon.svg"
                              onClick={() => setVisibleConfirm(true)}
                            />
                          ) : (
                            <img
                              src="/icon/close-eyes-icon.svg"
                              onClick={() => setVisibleConfirm(false)}
                            />
                          )}
                        </div>
                      </div>
                      <small className="text-danger font-weight-bold mt-2 mr-3">
                        {errors?.confirm_password?.message}
                      </small>
                    </div>
                    <Button
                      variant="none"
                      className="btn-blue-dark border-radius-10 w-100 my-3 shadow-sm kanit"
                      size="lg"
                      type="submit"
                    >
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

export default UpdateNew;
