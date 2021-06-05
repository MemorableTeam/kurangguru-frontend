import Sidebar from "../../components/sidebar"
import { Col, Row } from "react-bootstrap"

const Profile = () => {
  return (
    <>
      <div className='container-fluid bg-blue-light bg-main'>
        <Row className='gx-3 p-2' style={{ height: '100vh' }}>
          <Col md={5} lg={4} xl={3} className='p-0'>
            <Sidebar activeTabs={1} />
          </Col>
          <Col>
            <Row className='w-100 h-100 ms-2'>
              <Col xs={12} className='bg-secondary w-100' style={{ height: '35%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
                test
              </Col>
              <Col xs={12} className='bg-warning w-100' style={{ height: '65%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
                test
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Profile
