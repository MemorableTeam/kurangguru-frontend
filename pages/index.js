import Head from 'next/head'
import { Col, Row } from 'react-bootstrap'
import { Header } from '../components'
import Sidebar from '../components/sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (<>
    <Header title="Dashboard" />
    <div className='container-fluid bg-blue-light bg-main sm-bg'>
      <Row className='gx-3 p-2' style={{ height: '100vh' }}>
        <Col md={5} lg={4} xl={3} className='p-0'>
          <Sidebar activeTabs={2} />
        </Col>
        <Col>
          <h1>Ini dashboard</h1>
        </Col>
      </Row>
    </div>
  </>)
}
