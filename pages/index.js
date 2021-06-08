import Head from 'next/head'
import { Col, Row } from 'react-bootstrap'
import { Header } from '../components'
import Sidebar from '../components/sidebar'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import {useRouter} from 'next/router'
import { useUser } from "./api/users/useUser";
import { userPage } from '../libs/session'

function Home() {
  const router = useRouter()
  const data = useSWR(userPage())
  /*if(data.data.user.role != 'user'){
    if(data.data.user.role == 'fasilitator'){
      router.replace('fasilitator')
    }
  } */
  /* const id_user = data.data.user.user_id */
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
export default Home
