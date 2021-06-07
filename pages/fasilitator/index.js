import Sidebar from "../../components/sidebar"
import { Col, Row, Carousel, Image, Card } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";

const UserDashboard = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const data = [
      {
            from : '08.00',
            to   : '09.40',
            name : 'Front-end fundamentals',
            user : 24
      },
      {
        from : '11.00',
        to   : '11.40',
        name : 'HTML for Beginners',
        user : 32
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
                      My Class
                    </h5>
                    {data.map((element)=>(
                    <div className="d-flex bg-white py-4 px-3">
                    <Card className='w-100 shadow-lg border-0 py-3'>
                        <Card.Body>
                            <Row>
                                <Col className='fw-bolder roboto col-3'>{`${element.from} - ${element.to}`}</Col>
                                <Col className='fw-bolder montserrat col-7'>{element.name}</Col>
                                <Col className='col-2'>{element.user}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </div>
                    ))}
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
