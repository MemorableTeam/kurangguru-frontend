import Sidebar from "../../components/sidebar"
import { Col, Row, Image, DropdownButton, Dropdown, Pagination, Button } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAllClass } from '../api/class/useAllClass'
import { useClassByUser } from "../api/class/useClassByUser";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { userPage } from '../../libs/session'
import { globalPost } from "../../libs/fetcher";

const UserActivity = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { data: auth } = useSWR('api/users/getSession')
  const { class: data, mutateClass } = useAllClass({
    user_id: auth?.user?.user_id,
    page_size: 10,
    current_page: router?.query?.page ? parseInt(router?.query?.page) : 1
  })
  
  const { class: classUser, mutateClass : mutateByUser } = useClassByUser({
    userId: auth?.user?.user_id,
    token: `${auth?.user?.token}`
  })
  const [page, setPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  //   const [visiblePassword, setVisiblePassword] = useState(false);
  //   const [visibleConfirm, setVisibleConfirm] = useState(false);
  useEffect(() => {
    let page = []
    if (data?.total_pages > 1) {
      for (let i = 1; i <= data?.total_pages; i++) {
        page.push(i)
      }
    }
    setPage(page)
  }, [data])

  useEffect(() => {
    if (router?.query?.page == 1) router.push(`${router.pathname}`)
    setCurrentPage(router.query.page || 1)
    mutateClass('get_class')
  }, [router.query.page])

  useEffect(() => {
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  const processRegister = async(id) =>{
    try {
      const result = await globalPost({
        url: `${process.env.API_URL}/members`,
        headers : {
          Authorization: `Bearer ${auth?.user?.token}`
        },
        params: { user_id : auth?.user?.user_id, class_id : id }
      })
      console.log(result)
      setLoading(false)
      router.reload()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (auth !== undefined && auth?.user?.role === 'fasilitator') router.push('/fasilitator')
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

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
                {classUser?.data?.status === 400 && (
                  <div className='text-center text-muted'>You didn't join any class yet</div>
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
                    {classUser?.data?.status === 400 && (
                        <div className='w-100 text-center text-muted'>You didn't join any class yet</div>
                    )}
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
                  <Link href="/class">
                    <a className="text-black text-decoration-none">view all</a>
                  </Link>
                </div>
                </>
                )}
              </Col>

              <Col xs={12} className='px-4 bg-white border-radius-10 w-90 mb-3 mt-3' style={{ height: '72%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
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
                  <DropdownButton variant="tranparent" className="b-category" title="Categories">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  <DropdownButton variant="tranparent" title="Level">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                  <DropdownButton variant="tranparent" title="Pricing">
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
                      {data && data?.class_list?.map(e => {
                        return (<>
                          <tr className="b-table text-grey-dark">
                            <td colSpan={2} className="px-2">{e?.name}</td>
                            <td colSpan={1}>{e?.category}</td>
                            <td colSpan={3}>{e?.description}</td>
                            <td colSpan={1}>{e?.level}</td>
                            <td>{`$${e?.price}`}</td>
                            <td><Button variant='success' data-id={e?.id} className='rounded-pill' onClick={(e)=>processRegister(e.target.getAttribute('data-id'))}>Register</Button></td>
                          </tr>
                        </>)
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex mt-3 justify-content-between">
                  <h6>{`Showing ${data?.page_size >= data?.total_data ? 'all' : data?.page_size} out ${data?.total_data}`}</h6>
                  <div className='d-flex'>
                    {page && page.map(e => {
                      return (<>
                        <div className={`text-center py-1 px-2 mx-2 ${e == currentPage ? 'bg-success' : 'bg - blue - light'}`} onClick={() => router.push(`${location.pathname}?page=${e}`)} >{e}</div>
                      </>)
                    })}
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
