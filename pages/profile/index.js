import Sidebar from "../../components/sidebar"
import { Col, Row } from "react-bootstrap"

const Profile = () => {
  return (
    <>
      <div className='container-fluid'>
        <Row className='g-0 p-3' style={{ height: '100vh' }}>
          <Col xs={3} className='p-0'>
            <Sidebar />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Profile
