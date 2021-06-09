import Head from 'next/head'
import { Col, Row, Carousel, Image, Button, Card } from "react-bootstrap"
import { Header } from '../components'
import Sidebar from '../components/sidebar'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { useScheduleByDay } from "./api/schedule/useScheduleByDay"
import { useScheduleById } from './api/schedule/useScheduleById'

function Home() {
  const router = useRouter()
  const { day, date } = router.query
  const { day: myDay, ondate, by } = router.query

  let id = null
  const { data: auth } = useSWR('api/users/getSession')
  const { list: data, mutateList: mutate } = useScheduleByDay(day?.charAt(0).toUpperCase() + day?.slice(1), id, auth?.user?.token)
  const { list: myData, mutateList: mutateList } = useScheduleById(myDay?.charAt(0).toUpperCase() + myDay?.slice(1), auth?.user?.user_id, auth?.user?.token)

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [theDay, setTheDay] = useState(null);
  const [active, setActive] = useState(1);
  const [activeTabs, setActiveTabs] = useState(1);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (by) {
      setActiveTabs(2)
    }
  }, [by])

  const today = moment().format("D MMMM gggg");
  const today1 = moment().format("YYYY-MM-DD");
  const today2 = moment().format("dddd");
  const format = moment(value).format("D MMMM gggg");
  const pickDay = moment(value).format("DD");
  const startOfWeek = moment(value ? value : setValue(today1)).startOf('isoWeek');
  const endOfWeek = moment(value ? value : setValue(today1)).endOf('isoWeek');

  var days = [];
  var day1 = startOfWeek;

  while (day1 <= endOfWeek) {
    days.push(day1.toDate());
    day1 = day1.clone().add(1, 'd');
  }

  var week = days.map(function (dayOfWeek, i) {
    return moment(dayOfWeek).format("dd")
  });

  var date1 = days.map(function (dayOfWeek, i) {
    return moment(dayOfWeek).format("DD")
  });

  var fullDate = days.map(function (dayOfWeek, i) {
    return moment(dayOfWeek).format("YYYY-MM-DD")
  });

  var byDay = days.map(function (dayOfWeek, i) {
    return moment(dayOfWeek).format("dddd")
  });

  useEffect(() => {
    if (auth !== undefined && auth?.user?.role === 'fasilitator') router.push('/fasilitator')
    if (auth?.logout && auth !== undefined) router.push('/login')
  }, [auth])

  return (
    <>
      <Header title="User Dashboard" url="./images/face1.png" />
      <div className='container-fluid bg-blue-light sm-bg h-dashboard' style={{ height: '100vh' }}>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={2} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2'>
              <Col xs={8} className='bg-transparent mb-4' style={{ width: '60%', height: 'fit-content', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <Row className='h-100'>
                  <Col xs={12} style={{ height: '40%' }}>
                    <h5 className="py-3 bg-white px-3 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                      News
                    </h5>
                    <Carousel activeIndex={index} onSelect={handleSelect} className="bg-white b-news">
                      <Carousel.Item className="w-news">
                        <Image className="news" src="/images/gambar-1.png" style={{ height: '34.5vh' }} />
                        <Carousel.Caption>
                          <h6 className="fw-600">New update for front end development class sylabus</h6>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item className="w-news">
                        <Image className="news" src="/images/gambar-2.png" style={{ height: '34.5vh' }} />
                        <Carousel.Caption>
                          <h6 className="fw-600">New update for front end development class sylabus</h6>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item className="w-news">
                        <Image className="news" src="/images/gambar-3.png" style={{ height: '34.5vh' }} />
                        <Carousel.Caption>
                          <h6 className="fw-600">New update for front end development class sylabus</h6>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </Col>

                  <Col xs={12} className='mt-3 w-100' style={{ height: 'min-content', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                    <h5 className="py-3 bg-white px-4 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                      Schedule List
                      <input min={fullDate[0]} max={fullDate[6]} type="date" className="float-end" id="dateInput" name="dateInput" onChange={(e) => { setValue(e.target.value); activeTabs === 1 ? router.push(`/${moment(e.target.value).format("dddd")}?date=${moment(e.target.value).format("DD")}`) : router.push(`/${moment(e.target.value).format("dddd")}?ondate=${moment(e.target.value).format("DD")}&by=${auth?.user?.user_id}`); window.location.href = by ? `/${moment(e.target.value).format("dddd")}?ondate=${moment(e.target.value).format("DD")}&by=${auth?.user?.user_id}` : `/${moment(e.target.value).format("dddd")}?date=${moment(e.target.value).format("DD")}` }}></input>
                    </h5>
                    <div className="d-flex bg-white d-flex align-items-center justify-content-center">
                      <Button className={`${date == date1[0] || ondate == date1[0] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[0]); setTheDay(byDay[0]); activeTabs === 1 ? router.push(`/${byDay[0].toLowerCase()}?date=${date1[0]}`) : router.push(`/${byDay[0].toLowerCase()}?ondate=${date1[0]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[0].toLowerCase()}?ondate=${date1[0]}&by=${auth?.user?.user_id}` : `/${byDay[0].toLowerCase()}?date=${date1[0]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[0]} </p>
                        <p className="fw-600">{date1[0]} </p>
                      </Button>
                      <Button className={`${date == date1[1] || ondate == date1[1] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[1]); setTheDay(byDay[1]); activeTabs === 1 ? router.push(`/${byDay[1].toLowerCase()}?date=${date1[1]}`) : router.push(`/${byDay[1].toLowerCase()}?ondate=${date1[1]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[1].toLowerCase()}?ondate=${date1[1]}&by=${auth?.user?.user_id}` : `/${byDay[1].toLowerCase()}?date=${date1[1]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[1]} </p>
                        <p className="fw-600">{date1[1]} </p>
                      </Button>
                      <Button className={`${date == date1[2] || ondate == date1[2] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[2]); setTheDay(byDay[2]); activeTabs === 1 ? router.push(`/${byDay[2].toLowerCase()}?date=${date1[2]}`) : router.push(`/${byDay[2].toLowerCase()}?ondate=${date1[2]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[2].toLowerCase()}?ondate=${date1[2]}&by=${auth?.user?.user_id}` : `/${byDay[2].toLowerCase()}?date=${date1[2]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[2]} </p>
                        <p className="fw-600">{date1[2]} </p>
                      </Button>
                      <Button className={`${date == date1[3] || ondate == date1[3] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[3]); setTheDay(byDay[3]); activeTabs === 1 ? router.push(`/${byDay[3].toLowerCase()}?date=${date1[3]}`) : router.push(`/${byDay[3].toLowerCase()}?ondate=${date1[3]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[3].toLowerCase()}?ondate=${date1[3]}&by=${auth?.user?.user_id}` : `/${byDay[3].toLowerCase()}?date=${date1[3]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[3]} </p>
                        <p className="fw-600">{date1[3]} </p>
                      </Button>
                      <Button className={`${date == date1[4] || ondate == date1[4] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[4]); setTheDay(byDay[4]); activeTabs === 1 ? router.push(`/${byDay[4].toLowerCase()}?date=${date1[4]}`) : router.push(`/${byDay[4].toLowerCase()}?ondate=${date1[4]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[4].toLowerCase()}?ondate=${date1[4]}&by=${auth?.user?.user_id}` : `/${byDay[4].toLowerCase()}?date=${date1[4]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[4]} </p>
                        <p className="fw-600">{date1[4]} </p>
                      </Button>
                      <Button className={`${date == date1[5] || ondate == date1[5] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => { setValue(fullDate[5]); setTheDay(byDay[5]); activeTabs === 1 ? router.push(`/${byDay[5].toLowerCase()}?date=${date1[5]}`) : router.push(`/${byDay[5].toLowerCase()}?ondate=${date1[5]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[5].toLowerCase()}?ondate=${date1[5]}&by=${auth?.user?.user_id}` : `/${byDay[5].toLowerCase()}?date=${date1[5]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[5]} </p>
                        <p className="fw-600">{date1[5]} </p>
                      </Button>
                      <Button className={`${date == date1[6] || ondate == date1[6] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-3`} onClick={(e) => { setValue(fullDate[6]); setTheDay(byDay[6]); activeTabs === 1 ? router.push(`/${byDay[6].toLowerCase()}?date=${date1[6]}`) : router.push(`/${byDay[6].toLowerCase()}?ondate=${date1[6]}&by=${auth?.user?.user_id}`); window.location.href = by || activeTabs === 2 ? `/${byDay[6].toLowerCase()}?ondate=${date1[6]}&by=${auth?.user?.user_id}` : `/${byDay[6].toLowerCase()}?date=${date1[6]}`; by ? setActiveTabs(2) : setActiveTabs(1) }}>
                        <p className="fw-600">{week[6]} </p>
                        <p className="fw-600">{date1[6]} </p>
                      </Button>
                    </div>

                    <div className='d-flex justify-content-center bg-white d-tab'>
                      <div className={`mx-3 py-1 tab ${activeTabs === 1 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(1)} >All schedule</div>
                      <div className={`mx-3 py-1 tab ${activeTabs === 2 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(2)} >For you</div>
                    </div>

                    <div className={`py-2 tab ${activeTabs === 1 ? 'd-block bg-white' : 'd-none'}`}>
                      {data?.class_list &&
                        data?.class_list?.map((item) => (
                          <div className="d-flex bg-white px-3 py-1">
                            <Card className='w-100 shadow-lg border-0 py-3'>
                              <Card.Body>
                                <Row>
                                  <Col className='fw-bolder roboto col-4'>{moment(`${item?.start_time}`, 'h:mm a').format('LT')} - {moment(`${item?.end_time}`, 'h:mm a').format('LT')}</Col>
                                  <Col className='fw-bolder montserrat col-6'>{item.name}</Col>
                                  <Col className='col-2 montserrat'>{`${item?.topic_completed / item?.total_topic * 100}%`}</Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                    </div>


                    <div className={`py-2 tab ${activeTabs === 2 ? 'bg-white d-block' : 'd-none'}`}>
                      {myData?.class_list &&
                        myData?.class_list?.map((item) => (
                          <div className="d-flex bg-white px-3 py-1">
                            <Card className='w-100 shadow-lg border-0 py-3'>
                              <Card.Body>
                                <Row>
                                  <Col className='fw-bolder roboto col-4'>{moment(`${item?.start_time}`, 'h:mm a').format('LT')} - {moment(`${item?.end_time}`, 'h:mm a').format('LT')}</Col>
                                  <Col className='fw-bolder montserrat col-6'>{item.name}</Col>
                                  <Col className='col-2 montserrat'>{`${item?.topic_completed / item?.total_topic * 100}%`}</Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className='bg-transparent ms-3' style={{ width: '38%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>

              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Home
