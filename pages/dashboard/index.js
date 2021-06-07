import Sidebar from "../../components/sidebar"
import { Col, Row, Carousel, Image, Button, Form } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";
import moment from 'moment'
import {userPage} from '../../libs/session'
import { useRouter } from 'next/router'

const UserDashboard = () => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [activeTabs, setActiveTabs] = useState(1);
  const router = useRouter()
  const data = useSWR(userPage(router))

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const today = moment().format("D MMMM gggg");
  const today1 = moment().format("YYYY-MM-DD");
  const format = moment(value).format("D MMMM gggg");
  const pickDay = moment(value).format("DD");
  const startOfWeek = moment(value ? value : setValue(today1)).startOf('isoWeek');
  const endOfWeek = moment(value ? value : setValue(today1)).endOf('isoWeek');

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

  // const data = [
  //   {
  //     start_at: "08.00",
  //     end_at: "09.40",
  //   },
  //   {
  //     start_at: "08.10",
  //     end_at: "09.40",
  //   }
  // ]

  return (
    <>
      <Header title="User Activity" url="./images/face1.png"/>
      <div className='container-fluid bg-blue-light sm-bg h-dashboard' style={{ height: '100vh' }}>
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
              <Col xs={8} className='bg-transparent' style={{ width: '60%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
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
                        <Image className="news" src="/images/gambar-1.png" style={{ height: '34.5vh' }} />
                        <Carousel.Caption>
                          <h6 className="fw-600">New update for front end development class sylabus</h6>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item className="w-news">
                        <Image className="news" src="/images/gambar-1.png" style={{ height: '34.5vh' }} />
                        <Carousel.Caption>
                          <h6 className="fw-600">New update for front end development class sylabus</h6>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </Col>

                  <Col xs={12} className='mt-3 w-100' style={{ height: '52%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                    <h5 className="py-3 bg-white px-4 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                      {value ? format : today}
                      <input type="date" className="float-end" id="dateInput" name="dateInput" onChange={(e) => setValue(e.target.value)}></input>
                    </h5>
                    <div className="d-flex bg-white d-flex align-items-center justify-content-center">
                      <Button className={`${pickDay == date[0] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[0])}>
                        <p className="fw-600">{week[0]} </p>
                        <p className="fw-600">{date[0]} </p>
                      </Button>
                      <Button className={`${pickDay == date[1] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[1])}>
                        <p className="fw-600">{week[1]} </p>
                        <p className="fw-600">{date[1]} </p>
                      </Button>
                      <Button className={`${pickDay == date[2] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[2])}>
                        <p className="fw-600">{week[2]} </p>
                        <p className="fw-600">{date[2]} </p>
                      </Button>
                      <Button className={`${pickDay == date[3] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[3])}>
                        <p className="fw-600">{week[3]} </p>
                        <p className="fw-600">{date[3]} </p>
                      </Button>
                      <Button className={`${pickDay == date[4] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[4])}>
                        <p className="fw-600">{week[4]} </p>
                        <p className="fw-600">{date[4]} </p>
                      </Button>
                      <Button className={`${pickDay == date[5] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-4`} onClick={(e) => setValue(fullDate[5])}>
                        <p className="fw-600">{week[5]} </p>
                        <p className="fw-600">{date[5]} </p>
                      </Button>
                      <Button className={`${pickDay == date[6] ? 'btn-blue-dark' : 'bg-white text-black'} b-hover border-radius-10 shadow-none border-0 me-3`} onClick={(e) => setValue(fullDate[6])}>
                        <p className="fw-600">{week[6]} </p>
                        <p className="fw-600">{date[6]} </p>
                      </Button>
                    </div>

                    <div className='d-flex justify-content-center bg-white d-tab'>
                      <div className={`mx-3 py-1 tab ${activeTabs === 1 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(1)} >All schedule</div>
                      <div className={`mx-3 py-1 tab ${activeTabs === 2 ? 'text-blue-dark' : 'text-grey-dark'}`} onClick={() => setActiveTabs(2)} >For you</div>
                    </div>

                    <div className={`py-2 tab ${activeTabs === 1 ? 'd-block bg-white' : 'd-none'}`}>
                      <Row className="mx-3 px-2 py-2 t-schedule">
                        <Col xs={3} className="text-center align-self-center">
                          test
                        </Col>
                        <Col xs={9} className="mb-1">
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>


                    <div className={`py-2 tab ${activeTabs === 2 ? 'bg-white d-block' : 'd-none'}`}>
                      <Row className="mx-3 px-2 py-2 t-schedule">
                        <Col xs={3} className="text-center align-self-center">
                          test
                        </Col>
                        <Col xs={9} className="mb-1">
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                        </Col>
                        <Col xs={3} className="text-center align-self-center">
                          test
                        </Col>
                        <Col xs={9} className="mb-1">
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                          <Row className="t-schedule" className="mb-1">
                            <Col xs={9} className="bg-grey">Test1</Col>
                            <Col xs={3} className="bg-blue-dark">Test2</Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className='bg-white ms-3' style={{ width: '38%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>

              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UserDashboard
