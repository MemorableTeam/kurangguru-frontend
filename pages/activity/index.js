import Sidebar from "../../components/sidebar"
import { Col, Row, Image, DropdownButton, Dropdown, Pagination } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";

const UserActivity = () => {
  //   const [visiblePassword, setVisiblePassword] = useState(false);
  //   const [visibleConfirm, setVisibleConfirm] = useState(false);


  return (
    <>
      <Header title="User Activity" url="./images/face1.png" />
      <div className='container-fluid bg-blue-light sm-bg' style={{ height: '100vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row className='sticky-top'>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={3} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2 mb-3'>
              <Col xs={12} className='bg-transparent w-100' style={{ height: '32%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <h5 className="mt-3 mb-1 fw-500">Activity</h5>
                <h6 className="mt-3 mb-2 ms-3 fw-500">My class</h6>
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
                      <tr className="b-table text-grey-dark">
                        <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                        <td colSpan={2}><h6>Front-end fundamentals</h6></td>
                        <td colSpan={1}><h6>Software</h6></td>
                        <td className="description" colSpan={3}><h6>Learn the fundamentals or front end</h6></td>
                        <td colSpan={1}></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                        <td colSpan={2}><h6>Front-end fundamentals</h6></td>
                        <td colSpan={1}><h6>Software</h6></td>
                        <td colSpan={3}><h6>Learn the fundamentals or front end</h6></td>
                        <td colSpan={1}></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                        <td colSpan={2}><h6>Front-end fundamentals</h6></td>
                        <td colSpan={1}><h6>Software</h6></td>
                        <td colSpan={3}><h6>Learn the fundamentals or front end</h6></td>
                        <td colSpan={1}></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link href="#">
                    <a className="text-black text-decoration-none">view all</a>
                  </Link>
                </div>
              </Col>

              <Col xs={12} className='px-4 bg-white border-radius-10 w-90 mb-3' style={{ height: '72%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
                <h6 className="mt-3 mb-2 ms-1 fw-500">New class</h6>
                <div className="mt-3 input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white b-search">
                      <Image className="py-2" src="/icon/search-icon.svg" style={{ height: '10%', width: '80%' }} />
                    </span>
                  </div>
                  <input type="text" className="form-control search shadow-none" placeholder="Quick Search" />
                  <div className="input-group-append">
                    <button className="btn btn-blue-dark btn-search" type="button">Search</button>
                  </div>
                </div>

                <div className="d-flex b-white border-bottom">
                  <DropdownButton variant="transparent" className="b-category" title="Categories">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  <DropdownButton variant="transparent" title="Level">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  <DropdownButton variant="transparent" title="Pricing">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                </div>

                <div className="mt-4 table-responsive">
                  <table className="table table-borderless">
                    <thead>
                      <tr className="text-grey-dark">
                        <th colSpan={2} className="px-2">ClassName</th>
                        <th colSpan={1}>Category</th>
                        <th colSpan={3}>Description</th>
                        <th colSpan={1}>Level</th>
                        <th>Pricing</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white fs-400 btm-table">
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Learn the fundamentals or front end Learn the fundamentals or front end</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                      <tr className="b-table text-grey-dark">
                        <td colSpan={2} className="px-2">ClassName</td>
                        <td colSpan={1}>Category</td>
                        <td colSpan={3}>Description</td>
                        <td colSpan={1}>Level</td>
                        <td>Pricing</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex mt-3 justify-content-between">
                  <h6>Showing 10 out 64</h6>
                  <div>
                    <p></p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UserActivity
