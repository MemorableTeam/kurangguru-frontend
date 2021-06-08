import useSWR from "swr"
import { useUser } from "../../pages/api/users/useUser"
import { useRouter } from "next/router";

const Sidebar = ({ activeTabs, rootDir }) => {
  const router = useRouter()
  const { data: auth } = useSWR('api/users/getSession')
  const { user, mutateUser, loadUser, errUser } = useUser(auth?.user?.user_id)
  console.log(auth)

  return (
    <>
      <div className='bg-transparent h-100 p-4 position-relative w-100' style={{ borderRadius: '30px' }}>
        <div className={`${activeTabs === 1 ? 'bg-grey' : 'bg-blue-dark'} sm-index h-100 p-4 position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0 }} onClick={() => router.push('/profile')}>
          <img src={`${rootDir?.icon || './icon'}/${activeTabs === 1 ? 'notif-icon-active' : 'notif-icon'}.svg`} className='float-end sm-hidden' />
          <div className='mt-5 ms-3 sm-profile'>
            <img width='80px' height='80px' src={user?.photo && user?.photo != 'null' ? `${process.env.API_URL_IMG}${user?.photo}` : `${rootDir?.img || './images'}/photo_profile.png`} className='rounded-circle' />
            <div className="sm-right">
              <h3 className='mt-4'>{user?.username}</h3>
              <p>{user?.status}</p>
            </div>
          </div>
        </div >
        <div className={`${activeTabs === 2 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 2, height: '65%' }} onClick={() => router.push('/')}>
          <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 2 ? 'dashboard-icon-active' : 'dashboard-icon'}.svg`} className='me-3' />
            <p className={`${activeTabs === 2 ? 'text-black' : 'text-white'} pt-3 fw-bold`}>Dashboard</p>
          </div>
        </div >
        <div className={`${activeTabs === 3 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 3, height: '57%' }} onClick={() => router.push('/activity')}>
          <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 3 ? 'activity-icon-active' : 'activity-icon'}.svg`} className='me-3' />
            <p className={`${activeTabs === 3 ? 'text-black' : 'text-white'} pt-3 fw-bold`}>Activity</p>
          </div>
        </div >
        <div className={`${activeTabs === 4 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 4, height: '49%' }}>
          <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 4 ? 'setting-icon-active' : 'setting-icon'}.svg`} className='me-3' />
            <p className={`${activeTabs === 4 ? 'text-black' : 'text-white'} pt-3 fw-bold`}>Settings</p>
          </div>
        </div >
        <div className={`${activeTabs === 5 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 5, height: '41%' }}>
          <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 5 ? 'help-icon-active' : 'help-icon'}.svg`} className='me-3' />
            <p className={`${activeTabs === 5 ? 'text-black' : 'text-white'} pt-3 fw-bold`}>Help</p>
          </div>
        </div >
        <div className={`${activeTabs === 6 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 6, height: '33%' }}>
          <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
            <img src={`${rootDir?.icon || './icon'}/logout-icon.svg`} className='me-3' />
            <p className='text-danger pt-3 fw-bold'>Logout</p>
          </div>
        </div >
      </div>
    </>
  )
}

export default Sidebar
