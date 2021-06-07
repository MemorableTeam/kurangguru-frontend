import Head from 'next/head'
import { Col, Row } from 'react-bootstrap'
import { Header } from '../components'
import Sidebar from '../components/sidebar'
import styles from '../styles/Home.module.css'
import { privatePage } from '../libs/session'
import useSWR from 'swr'

export default function Home() {
  const data = useSWR(privatePage())
  console.log(data);
  return (<>
    <Header title="Dashboard" url="./images/face1.png"  />
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
