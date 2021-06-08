import Sidebar from "../../components/sidebar"
import { Col, Row, Image, DropdownButton, Dropdown, Pagination } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";

const UserActivity = () => {
  return (
    <>
      <Header title="My Class" />
      <div className='container-fluid bg-blue-light sm-bg' style={{ height: '220vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={3} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2'>
              <Col xs={12} className='bg-transparent w-100' style={{ height: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <div className="d-flex mt-3">
                  <Link href="/activity">
                    <Image className="back" src="/icon/back-icon.svg" style={{ height: '20px' }} />
                  </Link>
                  <h6 className="mb-2 ms-3 fw-500">My class</h6>
                </div>
                <Row>
                  <Col xs={9}>
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
                  </Col>
                  <Col xs={3}>
                      <DropdownButton variant="bg-white" className="mt-3 py-1 bg-white b-category"  title="Sort by: All Categories">
                        <Dropdown.Item href="#/action-1">Categories</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </DropdownButton>
                  </Col>
                </Row>

                <div className="mt-3 table-responsive">
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
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UserActivity
