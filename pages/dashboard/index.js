import Sidebar from "../../components/sidebar"
import { Col, Row, Carousel, Image } from "react-bootstrap"
import { Header } from "../../components";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from "next/link";

const UserDashboard = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
      <Header title="User Activity" />
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
                      Today, October 16
                    </h5>
                    <div className="d-flex bg-white">
                      {/* <Button className="d-flex align-items-center justify-content-between shadow-none bg-transparent border-0 border-bottom w-100 h-btn" onClick={handleShowPhone}>
                        <div className="d-flex align-items-center w-max">
                          <Image className="py-1" src="/icon/phone-icon.svg" style={{ height: '10%', width: '10%' }} />
                          <p className="ms-3 pt-3 pb-0 fw-700 text-black">Phone Numbers</p>
                        </div>
                        <Image className="py-1" src="/icon/right-icon.svg" style={{ height: '60%', width: '10%' }} />
                      </Button> */}
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
