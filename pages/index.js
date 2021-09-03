import Head from 'next/head'
import Link from "next/link"
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
  const { data: auth } = useSWR('api/users/getSession')

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [theDay, setTheDay] = useState(null);
  const [activeTabs, setActiveTabs] = useState(1);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  console.log(activeTabs)
  const today = moment().format("D MMMM gggg");
  const today1 = moment().format("YYYY-MM-DD");
  const today2 = moment().format("dddd");
  const format = moment(value).format("D MMMM gggg");
  const pickDay = moment(value).format("DD");
  const startOfWeek = moment(value ? value : setValue(today1)).startOf('isoWeek');
  const endOfWeek = moment(value ? value : setValue(today1)).endOf('isoWeek');

  let id = null
  const { list: data, mutateList: mutate } = useScheduleByDay(theDay ? theDay : today2, id, auth?.user?.token)
  const { list: myData, mutateList: mutateData } = useScheduleById(theDay ? theDay : today2, auth?.user?.user_id, auth?.user?.token)

  var days = [];
  var day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }

  var week = days.map(function (dayOfWeek, i) {
    return moment(dayOfWeek).format("dd")
  });

  var date = days.map(function (dayOfWeek, i) {
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
      <div className='container-fluid bg-blue-light sm-bg h-dashboard'>
        <Row className='gx-3 p-2' >
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Row>
              <Col md={12} className="h-activity">
                <Sidebar activeTabs={2} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className='w-100 bg-main ms-2'>
              <Col xs={8} className='bg-transparent' style={{ width: '60%', height: 'fit-content', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <Row>
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

                  <Col xs={12} className='mt-3 w-100' style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                    <h5 className="py-3 bg-white px-4 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                      Schedule List
                      <input min={fullDate[0]} max={fullDate[6]} type="date" className="float-end" id="dateInput" name="dateInput" onChange={(e) => { setValue(e.target.value); activeTabs === 1 ? router.push(`/${moment(e.target.value).format("dddd")}?date=${moment(e.target.value).format("DD")}`) : router.push(`/${moment(e.target.value).format("dddd")}?ondate=${moment(e.target.value).format("DD")}&by=${auth?.user?.user_id}`) }}></input>
                    </h5>
                    <div className="d-flex bg-white d-flex align-items-center justify-content-between px-4">
                      <Button className={`${pickDay == date[0] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[0]); setTheDay(byDay[0]); activeTabs === 1 ? router.push(`/${byDay[0].toLowerCase()}?date=${date[0]}`) : router.push(`/${byDay[0].toLowerCase()}?ondate=${date[0]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[0]} </p>
                        <p className="fw-600">{date[0]} </p>
                      </Button>
                      <Button className={`${pickDay == date[1] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[1]); setTheDay(byDay[1]); activeTabs === 1 ? router.push(`/${byDay[1].toLowerCase()}?date=${date[1]}`) : router.push(`/${byDay[1].toLowerCase()}?ondate=${date[1]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[1]} </p>
                        <p className="fw-600">{date[1]} </p>
                      </Button>
                      <Button className={`${pickDay == date[2] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[2]); setTheDay(byDay[2]); activeTabs === 1 ? router.push(`/${byDay[2].toLowerCase()}?date=${date[2]}`) : router.push(`/${byDay[2].toLowerCase()}?ondate=${date[2]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[2]} </p>
                        <p className="fw-600">{date[2]} </p>
                      </Button>
                      <Button className={`${pickDay == date[3] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[3]); setTheDay(byDay[3]); activeTabs === 1 ? router.push(`/${byDay[3].toLowerCase()}?date=${date[3]}`) : router.push(`/${byDay[3].toLowerCase()}?ondate=${date[3]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[3]} </p>
                        <p className="fw-600">{date[3]} </p>
                      </Button>
                      <Button className={`${pickDay == date[4] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[4]); setTheDay(byDay[4]); activeTabs === 1 ? router.push(`/${byDay[4].toLowerCase()}?date=${date[4]}`) : router.push(`/${byDay[4].toLowerCase()}?ondate=${date[4]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[4]} </p>
                        <p className="fw-600">{date[4]} </p>
                      </Button>
                      <Button className={`${pickDay == date[5] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[5]); setTheDay(byDay[5]); activeTabs === 1 ? router.push(`/${byDay[5].toLowerCase()}?date=${date[5]}`) : router.push(`/${byDay[5].toLowerCase()}?ondate=${date[5]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[5]} </p>
                        <p className="fw-600">{date[5]} </p>
                      </Button>
                      <Button className={`${pickDay == date[6] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0`} onClick={(e) => { setValue(fullDate[6]); setTheDay(byDay[6]); activeTabs === 1 ? router.push(`/${byDay[6].toLowerCase()}?date=${date[6]}`) : router.push(`/${byDay[6].toLowerCase()}?ondate=${date[6]}&by=${auth?.user?.user_id}`) }}>
                        <p className="fw-600">{week[6]} </p>
                        <p className="fw-600">{date[6]} </p>
                      </Button>
                    </div>

                    <div className='d-flex justify-content-center bg-white d-tab'>
                      <div className={`mx-3 py-1 tab fs-900 ${activeTabs === 1 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(1)} >All schedule</div>
                      <div className={`mx-3 py-1 tab fs-900 ${activeTabs === 2 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(2)} >For you</div>
                    </div>

                    <div className={`py-3 b-schedule tab ${activeTabs === 1 ? 'd-block bg-white' : 'd-none'}`}>
                      {data?.class_list ? (
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
                        ))
                      )
                        : (
                          <div className="d-flex bg-white px-3 py-1">
                            <Card className='w-100 shadow-lg border-0 py-3'>
                              <Card.Body>
                                <Row>
                                  <Col className='fw-bolder roboto col-12'>No Schedule Yet</Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        )
                      }
                    </div>


                    <div className={`py-3 b-schedule tab ${activeTabs === 2 ? 'bg-white d-block' : 'd-none'}`}>
                      {myData?.class_list ? (
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
                        ))
                      )
                        : (
                          <div className="d-flex bg-white px-3 py-1">
                            <Card className='w-100 shadow-lg border-0 py-3'>
                              <Card.Body>
                                <Row>
                                  <Col className='fw-bolder roboto col-12'>No Schedule Yet</Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        )
                      }
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className='bg-white ms-3 d-none d-md-block' style={{ width: '38%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <Row className='h-100'>
                  <Col xs={12} style={{ height: '9%' }}>
                    <div className='d-flex justify-content-between'>
                      <h5 className="py-3 bg-white px-3 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                        Messages
                      </h5>
                      <Link href='#'>
                        <Button variant='none'>
                          <Image className="py-1" src="/icon/plus-black-icon.svg" style={{ width: '80%', height: '80%' }} />
                        </Button>
                      </Link>
                    </div>
                    <div className="mx-3 input-group" style={{ width: '91%' }}>
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-blue-light b-search-chat">
                          <Image className="py-1" src="/icon/search-icon.svg" />
                        </span>
                      </div>
                      <input type="text" className="form-control search shadow-none bg-blue-light" placeholder="Search" />
                    </div>
                    <div>
                      <div className='text-left text-muted fst-italic mt-3 mx-3'>You didn't have any messages yet</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Home
