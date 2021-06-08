import { useRouter } from "next/router"
import { useEffect } from "react"
import { Card, Col, Row } from "react-bootstrap"
import useSWR from "swr"
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import { globalGet } from "../../libs/fetcher"
import { useClassById } from "../api/class/useClassById"
import { useTopics } from "../api/class/useTopics"

// const data = {
//   id: 1,
//   name: 'Beginner Javascript',
//   day: 'Friday',
//   start_time: '18:00:00',
//   end_time: '20:00:00',
//   description: 'Mempelajari dasar- dasar Javascript.'
// }

// const topics = [
//   {
//     id: 1,
//     topic_name: 'Apa itu Javascript',
//     score: 86,
//     is_finished: true
//   },
//   {
//     id: 2,
//     topic_name: 'Sejarah Javascript',
//     score: 90,
//     is_finished: true
//   },
//   {
//     id: 3,
//     topic_name: 'Sintaks Javascript',
//     score: null,
//     is_finished: false
//   },
//   {
//     id: 4,
//     topic_name: 'Type data Javascript',
//     score: null,
//     is_finished: false
//   }
// ]

const member = [
  {
    id: 1,
    username: 'Rpetz',
    photo: null
  },
  {
    id: 2,
    username: 'Irvanswan',
    photo: null
  },
  {
    id: 3,
    username: 'Dendy AR',
    photo: null
  },
  {
    id: 4,
    username: 'Dea Edria',
    photo: null
  },
]

const classDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: auth } = useSWR('../api/users/getSession')
  const { class: data } = useClassById(id)
  const { topic } = useTopics({
    user_id: auth?.user?.user_id,
    token: auth?.user?.token,
    class_id: id,
  })

  console.log(data, 'Dataaaaaaaaaaaa')
  console.log(auth, 'auth')
  console.log(topic, 'topiccsss')

  const setColor = (score) => {
    if (score >= 90 && score <= 100) return 'text-success'
    if (score < 90) return 'text-primary'
    if (score < 80) return 'text-warning'
    if (score < 40 && score >= 0) return 'text-danger'
    return ''
  }

  useEffect(() => {
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  return (
    <>
      <Header title="Class Detail" />
      <div className='container-fluid bg-blue-light sm-bg' style={{ height: '100vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={3} rootDir={{ icon: '../icon', img: '../images' }} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col md={5} lg={5} xl={6}>
            <div className='ms-2 mt-3'>
              <h4 className=''>
                <img src='../icon/back-icon.svg' className='p-0 me-2' />
                {data?.name}
              </h4>
            </div>
            <Card className='border-radius-10 p-3 mt-3 mb-3' style={{ height: '40%' }}>
              <div className='w-100 h100'>
                <h6 className='fw-700 mb-4'>Information</h6>
                <div className='d-flex justify-content-between'>
                  <p>Classname:</p>
                  <p>{data?.name}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Schedule:</p>
                  <p>{`${data?.day}, ${data?.start_time} - ${data?.end_time}`}</p>
                </div>
                <div className=''>
                  <p>Description:</p>
                  <p>{data?.description}</p>
                </div>
              </div>
            </Card>
            <Card className='border-radius-10 p-3 mt-3 mb-3'>
              <div className='w-100 h100'>
                <h6 className='fw-700 mb-4'>Class Progress</h6>
                {topic && topic?.map(item => {
                  return (<>
                    <div className='w-100 d-flex justify-content-start'>
                      <input type="checkbox" className="px-2 text-center mt-1 ms-2" value={item?.id} />
                      <p className='w-100 mx-3'>{item?.topic_name}</p>
                      <p className={`${setColor(item?.score)} fw-bold text-center w-25`}>{item?.is_finished ? item?.score : (<label className='badge bg-danger rounded-pill'>Unfinished</label>)}</p>
                    </div>
                  </>)
                })}
              </div>
            </Card>
          </Col>
          <Col md={2} lg={3} xl={3}>
            <div className='ms-2 mt-3 d-block'>
              <h4 className=''>
                <img src='../icon/back-icon.svg' className='p-0 me-2 invisible' />
              </h4>
            </div>
            <Card className='border-radius-10 p-3 mt-3'>
              <h6 className='fw-700 mb-4'>Class Member</h6>
              <div className='w-100 d-flex justify-content-start'>
                <input type="checkbox" className="px-2 text-center mt-1 ms-2" value='' />
                <p className='w-100 mx-3'>Select all</p>
                <p className='fw-bold text-center'><img src='../icon/list-icon.svg' /></p>
              </div>
              <hr />
              {member && member?.map(item => {
                return (<>
                  <div className='w-100 d-flex justify-content-start align-items-center'>
                    <input type="checkbox" className="px-2 text-center mt-1 ms-2" value={item?.id} />
                    <img src={item?.photo ? `${process.env.API_URL_IMG}/${item?.photo}` : '../images/photo_profile.png'} width='36px' height='36px' className='rounded-circle ms-3' />
                    <p className='w-100 mx-3 pt-3'>{item?.username}</p>
                    <p className='fw-bold text-center mt-3'><img src='../icon/list-icon.svg' /></p>
                  </div>
                </>)
              })}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default classDetail
