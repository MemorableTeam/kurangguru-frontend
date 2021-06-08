import Sidebar from "../../components/sidebar"
import { Container, Col, Row, Carousel, Image, Card, Button, Modal, closeButton } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import moment from 'moment'
import { useClassByUser } from "../api/class/useClassByUser";

const UserDashboard = () => {
  const { data: auth } = useSWR('api/users/getSession')
  const { class: classUser } = useClassByUser({
    userId: auth?.user?.user_id,
    token: `${auth?.user?.token}`
  })
  console.log('class', classUser)
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [activeTabs, setActiveTabs] = useState(1);
  const router = useRouter()

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleModals = (e) => {
    e.preventDefault()

    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

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
  const dataDummy = [
    {
      from: '08.00',
      to: '09.40',
      name: 'Front-end fundamentals',
      user: 24
    },
    {
      from: '11.00',
      to: '11.40',
      name: 'HTML for Beginners',
      user: 32
    }
  ]
  // const today = moment();
  // const from_date = today.startOf('week');
  // const to_date = today.endOf('week');
  // console.log({
  //   from_date: from_date.toString(),
  //   today: moment().toString(),
  //   to_date: to_date.toString(),
  // });

  return (
    <>
      <Header title="User Activity" url="./images/face1.png" />
      <Container fluid className='bg-blue-light bg-main sm-bg'>
        <Row className='gx-3 p-2 pb-5'>
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
              <Col xs={8} className='bg-transparent' style={{ width: '60%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                <Row className='h-100'>
                  <Col xs={12} style={{ height: '40%' }}>
                    <h5 className="py-3 bg-white px-3 mb-0 fw-500" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                      News
                    </h5>
                    <Carousel activeIndex={index} onSelect={handleSelect} className="bg-white b-news" style={{ borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
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
                    <Card className='w-100 border-0 mb-5'>
                    {classUser.map((element)=>(
                    <div className="d-flex bg-white py-3 px-3">
                    <Card className='w-100 shadow-lg border-0 py-3'>
                        <Card.Body>
                            <Row>
                                <Col className='fw-bolder roboto col-4'>{moment(`${element?.start_time}`,'h:mm a').format('LT')} - {moment(`${element?.end_time}`,'h:mm a').format('LT')}</Col>
                                <Col className='fw-bolder montserrat col-6'>{element.name}</Col>
                                <Col className='col-2 montserrat'>{element.members} <img src='./icon/student-icon.svg' className='icon'/></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </div>
                    ))}
                    <div className='d-flex justify-content-center my-3'>
                      <Button variant='none' className = 'bg-blue-dark rounded-pill' onClick={(e)=>handleModals(e)}>
                        <img src='./icon/plus-icon.svg' className='rounded' /> <span className='text-white fw-bold kanit'>New Task</span> 
                      </Button>
                    </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className='bg-white ms-3' style={{ width: '38%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={(e) => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default UserDashboard
