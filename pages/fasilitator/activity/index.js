import Sidebar from "../../../components/sidebar"
import { Col, Row, Image, DropdownButton, Dropdown, Pagination, Button } from "react-bootstrap"
import { Header } from "../../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAllClass } from '../../api/class/useAllClass'
import { useClassByUser } from "../../api/class/useClassByUser";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { userPage } from '../../../libs/session'

const Activity = () => {
  const router = useRouter()
  const { data: auth } = useSWR('../api/users/getSession')
  const { class: data, mutateClass } = useAllClass({
    user_id: auth?.user?.user_id,
    page_size: 4,
    current_page: router?.query?.page ? parseInt(router?.query?.page) : 1
  })
  const { class: classUser } = useClassByUser({
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
    mutateClass('../api/class/useAllClass')
  }, [router.query.page])

  useEffect(() => {
    if (auth !== undefined && auth?.user?.role === 'user') router.push('/')
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  return (
    <>
      <Header title="User Activity" url="../../images/face1.png" />
      <div className='container-fluid bg-blue-light sm-bg' style={{ height: '100vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row className='sticky-top'>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={3} rootDir={{ icon: '../../icon', img: '../../images' }} route='../api/users/getSession' />
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
                        <th colSpan={2}>Description</th>
                        <th className='text-center' colSpan={2}>Schedule</th>
                        <th className='text-center'>Members</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white fs-400">
                      {classUser && classUser?.map(item => {
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
                <div className="text-center">
                  <Link href="/fasilitator/class">
                    <a className="text-black text-decoration-none">view all</a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Activity
