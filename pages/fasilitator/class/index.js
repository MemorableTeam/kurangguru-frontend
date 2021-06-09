import Sidebar from "../../../components/sidebar"
import { Col, Row, Image, DropdownButton, Dropdown, Pagination } from "react-bootstrap"
import { Header } from "../../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useClassByUser } from "../../api/class/useClassByUser";
import useSWR from "swr";
import { useRouter } from "next/router";

const Class = () => {
  const router = useRouter()
  const { data: auth } = useSWR('../api/users/getSession')
  const { class: classUser } = useClassByUser({
    userId: auth?.user?.user_id,
    token: `${auth?.user?.token}`
  })

  useEffect(() => {
    if (auth?.user?.role === 'user' && auth !== undefined) router.push('/')
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  return (
    <>
      <Header title="My Class" url='../images/face1.png' />
      <div className='container-fluid bg-blue-light sm-bg' style={{ height: '100vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={3} rootDir={{ icon: '../../icon', img: '../../images' }} route='../../api/users/getSession' goto='../../api/users/logoutSession' />
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
                    <DropdownButton variant="bg-white" className="mt-3 py-1 bg-white b-category" title="Sort by: All Categories">
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
                        <th colSpan={2}>Description</th>
                        <th className='text-center' colSpan={2}>Schedule</th>
                        <th className='text-center'>Members</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white fs-400">
                      {classUser?.data?.status === 400 && (
                        <div className='text-center text-muted'>You didn't have any class yet</div>
                      )}
                      {classUser?.data?.status !== 400 && classUser?.map(item => {
                        return (<>
                          <tr className="b-table text-grey-dark" onClick={() => router.push(`/fasilitator/class/${item?.id}`)}>
                            <td className="text-center"><input type="checkbox" disabled checked="" /></td>
                            <td colSpan={2}><h6>{item?.name}</h6></td>
                            <td colSpan={1}><h6>{item?.category}</h6></td>
                            <td className="description" colSpan={2}><h6>{item?.description}</h6></td>
                            <td colSpan={2}>{`${item?.day}, ${item?.start_time} - ${item?.end_time}`}</td>
                            <td className='text-center'>{item?.members}<img src='../../icon/student-icon.svg' className='icon' /></td>
                          </tr>
                        </>)
                      })}
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

export default Class;
