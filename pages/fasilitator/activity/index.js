import Sidebar from "../../../components/sidebar";
import {
  Col,
  Row,
  Image,
  DropdownButton,
  Dropdown,
  Pagination,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { Header } from "../../../components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAllClass } from "../../api/class/useAllClass";
import { useClassByUser } from "../../api/class/useClassByUser";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";

const Activity = () => {
  const [dataClass, setDataclass] = useState({
    price: 0,
    categories: '',
    level: '',
    day: '',
    start_time: '',
    end_time: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paid, setPaid] = useState(false);
  const router = useRouter();
  const { data: auth } = useSWR("../api/users/getSession");

  const { class: data, mutateClass } = useAllClass({
    user_id: auth?.user?.user_id,
    page_size: 4,
    current_page: router?.query?.page ? parseInt(router?.query?.page) : 1,
  });

  const { class: classUser } = useClassByUser({
    userId: auth?.user?.user_id,
    token: `${auth?.user?.token}`,
  });
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let page = [];
    if (data?.total_pages > 1) {
      for (let i = 1; i <= data?.total_pages; i++) {
        page.push(i);
      }
    }
    setPage(page);
  }, [data]);

  useEffect(() => {
    if (router?.query?.page == 1) router.push(`${router.pathname}`);
    setCurrentPage(router.query.page || 1);
    mutateClass("../api/class/useAllClass");
  }, [router.query.page]);

  const addClass = async (data) => {
    const newBody = {
      name: data.name,
      category: dataClass.categories,
      price: dataClass.price,
      description: data.description,
      day: dataClass.day,
      start_time: dataClass.start_time,
      end_time: dataClass.end_time,
      level: dataClass.level,
      fasilitator: auth?.user?.user_id,
    }
  }
  useEffect(() => {
    if (paid) {
      document.getElementById("paid_field").required = true;
      document.getElementById("paid_field").type = "number";
    } else {
      setDataclass({ ...dataClass, price: 0 })
      document.getElementById("paid_field").required = false;
      document.getElementById("paid_field").type = "hidden";
    }
  }, [paid]);

  useEffect(() => {
    if (auth !== undefined && auth?.user?.role === "user") router.push("/");
    if (auth?.logout && auth !== undefined) router.push("/login");
  }, [auth]);

  return (
    <>
      <Header title="User Activity" url="../../images/face1.png" />
      <div
        className="container-fluid bg-blue-light sm-bg"
        style={{ height: "100vh" }}
      >
        <Row className="gx-3 p-2" style={{ height: "100vh" }}>
          <Col md={5} lg={4} xl={3} className="p-0">
            <Row className="sticky-top">
              <Col md={12} className="h-activity">
                <Sidebar
                  activeTabs={3}
                  rootDir={{ icon: "../../icon", img: "../../images" }}
                  route="../api/users/getSession"
                />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className="w-100 h-100 ms-2 mb-3">
              <Col
                xs={12}
                className="bg-transparent w-100"
                style={{
                  height: "32%",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                }}
              >
                <h5 className="mt-3 mb-1 fw-500">Activity</h5>
                <h6 className="mt-3 mb-2 ms-3 fw-500">My class</h6>
                {classUser?.data?.status === 400 && (
                  <div className='text-center text-muted'>You didn't have any class yet</div>
                )}
                { classUser?.data?.status !== 400 && (
                <>
                <div className="table-responsive">
                  <table className="table table-borderless table-hover">
                    <thead>
                      <tr className="text-grey-dark">
                        <th className="px-2 text-center"><input type="checkbox" disabled checked="" /></th>
                        <th colSpan={2}>Class Name</th>
                        <th colSpan={1}>Category</th>
                        <th colSpan={3}>Description</th>
                        <th colSpan={1}>Progress</th>
                        <th>Status</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white fs-400">
                      {classUser?.data?.status !== 400 && classUser?.length <= 3 && classUser?.map(item => {
                        return (<>
                          <tr className="b-table text-grey-dark" onClick={() => router.push(`/class/${item?.id}`)}>
                            <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                            <td colSpan={2}><h6>{item?.name}</h6></td>
                            <td colSpan={1}><h6>{item?.category}</h6></td>
                            <td className="description" colSpan={3}><h6>{item?.description}</h6></td>
                            <td colSpan={1}>{`${item?.topic_completed / item?.total_topic * 100}%`}</td>
                            <td>{item?.topic_completed / item?.total_topic !== 1 ? 'On Going' : 'Completed'}</td>
                            <td>{item?.avg ? Math.round(item?.avg) : '0'}</td>
                          </tr>
                        </>)
                      })}
                      {classUser?.data?.status !== 400 && classUser?.length > 3 && classUser?.splice(0, 3).map(item => {
                        return (<>
                          <tr className="b-table text-grey-dark" onClick={() => router.push(`/class/${item?.id}`)}>
                            <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                            <td colSpan={2}><h6>{item?.name}</h6></td>
                            <td colSpan={1}><h6>{item?.category}</h6></td>
                            <td className="description" colSpan={3}><h6>{item?.description}</h6></td>
                            <td colSpan={1}>{`${item?.topic_completed / item?.total_topic * 100}%`}</td>
                            <td>{item?.topic_completed / item?.total_topic !== 1 ? 'On Going' : 'Completed'}</td>
                            <td>{item?.avg ? Math.round(item?.avg) : '0'}</td>
                          </tr>
                        </>)
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-2">
                  <Link href="/fasilitator/class">
                    <a className="text-black text-decoration-none">view all</a>
                  </Link>
                </div>
                </>
                )}
              </Col>
              <Card className="bg-white border-radius-20 p-3 my-5">
                <Form onSubmit={handleSubmit(addClass)}>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm={3}>
                          <small className="montserrat fw-bold">
                            Class Name
                          </small>
                          <span className="float-end"> : </span>
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            {...register("name", {
                              required: "Class Name can't be empty",
                            })}
                            type="text"
                            placeholder="Class Name"
                            className={`name form-control ${errors.name ? "is-invalid" : ""
                              }`}
                          />
                          <small className="text-danger font-weight-bold mt-2 me-3">
                            {errors?.name?.message}
                          </small>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm={3}>
                          <small className="montserrat fw-bold">Pricing</small>
                          <span className="float-end"> : </span>
                        </Form.Label>
                        <Col sm={9}>
                          <div key={`inline-radio`} className="mt-2">
                            <Form.Group required>
                              <Form.Check
                                inline
                                label="Free"
                                name="group1"
                                type="radio"
                                id={`inline-radio-1`}
                                required
                                onChange={(e) =>
                                  e.target.checked
                                    ? setPaid(false)
                                    : setPaid(true)
                                }
                              />
                              <Form.Check
                                inline
                                label="Paid"
                                name="group1"
                                type="radio"
                                id={`inline-radio-1`}
                                onChange={(e) =>
                                  e.target.checked
                                    ? setPaid(true)
                                    : setPaid(false)
                                }
                              />
                              <input
                                className="is-invalid"
                                type="number" id="paid_field"
                                onChange={(e) => setDataclass({ ...dataClass, price: e.target.value })}
                              />
                            </Form.Group>
                          </div>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm={3}>
                          <small className="montserrat fw-bold">
                            Categories
                          </small>
                          <span className="float-end"> : </span>
                        </Form.Label>
                        <Col sm={9}>
                          <select
                            className='mt-2'
                            aria-label="Default select example"
                            onChange={(e) => { setDataclass({ ...dataClass, categories: e.target.value }) }}
                          >
                            <option value={null} selected>Choose</option>
                            <option value="Software">Software</option>
                            <option value="History">History</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="Finance">Finance</option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm={3}>
                          <small className="montserrat fw-bold">Schedule</small>
                          <span className="float-end"> : </span>
                        </Form.Label>
                        <Col sm={9}>
                          <select
                            className='mt-2'
                            aria-label="Default select example"
                            onChange={(e) => { setDataclass({ ...dataClass, day: e.target.value }) }}
                          >
                            <option value={null} selected>Choose</option>
                            <option value="01">Monday</option>
                            <option value="02">Tuesday</option>
                            <option value="03">Wednesday</option>
                            <option value="04">Thursday</option>
                            <option value="05">Freeday</option>
                            <option value="06">Saturday</option>
                            <option value="07">Sunday</option>
                          </select>
                          <input
                            className="ms-2 w-30 bg-transparent border-top-0 border-start-0 border-end-0"
                            type="time"
                            id="appt"
                            name="appt"
                            required
                            onChange={(e) => { setDataclass({ ...dataClass, start_time: e.target.value }) }}
                          />{" "}
                          -{" "}
                          <input
                            required
                            className="w-30 bg-transparent border-top-0 border-start-0 border-end-0"
                            type="time"
                            id="appt"
                            name="appt"
                            onChange={(e) => { setDataclass({ ...dataClass, end_time: e.target.value }) }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm={3}>
                          <small className="montserrat fw-bold">Level</small>
                          <span className="float-end"> : </span>
                        </Form.Label>
                        <Col sm={9}>
                          <select
                            className="mt-2"
                            aria-label="Default select example monserrat px-3"
                            onChange={(e) => { setDataclass({ ...dataClass, level: e.target.value }) }}
                          >
                            <option selected className="fw-bold montserrat">
                              Choose
                            </option>
                            <option
                              value="Beginner"
                              className="fw-bold montserrat"
                            >
                              Beginner
                            </option>
                            <option
                              value="Intermediate"
                              className="fw-bold montserrat"
                            >
                              Intermediate
                            </option>
                            <option
                              value="Expert"
                              className="fw-bold montserrat"
                            >
                              Expert
                            </option>
                          </select>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          <small className="montserrat fw-bold">
                            Description :
                          </small>
                        </Form.Label>
                        <Form.Control
                          {...register("description", {
                            required: "Description can't be empty",
                          })}
                          as="textarea"
                          rows={3}
                          size="lg"
                          className={`description bg-grey ${errors.description ? "is-invalid" : ""
                            }`}
                        />
                        <small className="text-danger font-weight-bold mt-2 me-3">
                          {errors?.description?.message}
                        </small>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    type='submit'
                    variant="success"
                    size="lg"
                    className="float-end border-radius-30 px-5"
                  >
                    <small className="mx-5">Create</small>
                  </Button>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Activity;
