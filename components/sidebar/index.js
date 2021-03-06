import useSWR from "swr"
import { useUser } from "../../pages/api/users/useUser"
import { useRouter } from "next/router";
import { userLogout } from '../../libs/session'

const Sidebar = ({ activeTabs, rootDir, route = 'api/users/getSession', goto = 'api/users/logoutSession' }) => {
  const router = useRouter()
  const { data: auth, mutate } = useSWR(route)
  const { user, mutateUser, loadUser, errUser } = useUser(auth?.user?.user_id)

  return (
    <>
      {auth && auth?.user?.role === 'user' ? (
        <div className='bg-transparent h-100 p-4 position-relative w-100' style={{ borderRadius: '30px' }}>
          <div className={`${activeTabs === 1 ? 'bg-grey' : 'bg-blue-dark'} sm-index h-100 p-4 position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0 }} onClick={() => router.push('/profile')}>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 1 ? 'notif-icon-active' : 'notif-icon'}.svg`} className='float-end sm-hidden' />
            <div className='mt-5 ms-3 sm-profile'>
              <img width='80px' height='80px' src={user?.photo && user?.photo != 'null' ? `${process.env.API_URL_IMG}${user?.photo}` : `${rootDir?.img || './images'}/photo_profile.png`} className='rounded-circle' />
              <div className="sm-right">
              <h4 className={`${activeTabs === 1 ? 'text-black' : 'text-white'} mt-3`}>{user?.username}</h4>
                <p>{user?.status}</p>
              </div>
            </div>
          </div >
          <div className={`${activeTabs === 2 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 2, height: '66%' }} onClick={() => router.push('/')}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-1 mb-2'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 2 ? 'dashboard-icon-active' : 'dashboard-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 2 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Dashboard</p>
            </div>
          </div >
          <div className={`${activeTabs === 3 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 3, height: '57%' }} onClick={() => router.push('/activity')}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 3 ? 'activity-icon-active' : 'activity-icon'}.svg`} className='me-4' />
              <p className={`${activeTabs === 3 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Activity</p>
            </div>
          </div >
          <div className={`${activeTabs === 4 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 4, height: '49%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 4 ? 'setting-icon-active' : 'setting-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 4 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Settings</p>
            </div>
          </div >
          <div className={`${activeTabs === 5 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 5, height: '41%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 5 ? 'help-icon-active' : 'help-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 5 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Help</p>
            </div>
          </div >
          <div className={`${activeTabs === 6 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 6, height: '33%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-2' onClick={() => mutate('api/users/getSession', userLogout(goto, router))}>
              <img src={`${rootDir?.icon || './icon'}/logout-icon.svg`} className='me-3' />
              <p className='text-danger pt-3 fw-bold cursor-opt'>Logout</p>
            </div>
          </div >
        </div>
      ) : (
        <div className='bg-transparent h-100 p-4 position-relative w-100' style={{ borderRadius: '30px' }}>
          <div className={`${activeTabs === 1 ? 'bg-grey' : 'bg-blue-dark'} sm-index h-100 p-4 position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0 }} onClick={() => router.push('/fasilitator/profile')}>
            <img src={`${rootDir?.icon || './icon'}/${activeTabs === 1 ? 'notif-icon-active' : 'notif-icon'}.svg`} className='float-end sm-hidden' />
            <div className='mt-5 ms-3 sm-profile'>
              <img width='80px' height='80px' src={user?.photo && user?.photo != 'null' ? `${process.env.API_URL_IMG}${user?.photo}` : `${rootDir?.img || './images'}/photo_profile.png`} className='rounded-circle' />
              <div className="sm-right">
                <h4 className={`${activeTabs === 1 ? 'text-black' : 'text-white'} mt-3`}>{user?.username}</h4>
                <p>{user?.status}</p>
              </div>
            </div>
          </div >
          <div className={`${activeTabs === 2 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 2, height: '66%' }} onClick={() => router.push('/fasilitator')}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center pt-1 mb-2'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 2 ? 'dashboard-icon-active' : 'dashboard-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 2 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Dashboard</p>
            </div>
          </div >
          <div className={`${activeTabs === 3 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 3, height: '57%' }} onClick={() => router.push('/fasilitator/activity')}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center mb-2'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 3 ? 'activity-icon-active' : 'activity-icon'}.svg`} className='me-4' />
              <p className={`${activeTabs === 3 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Activity</p>
            </div>
          </div >
          <div className={`${activeTabs === 4 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 4, height: '49%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 4 ? 'setting-icon-active' : 'setting-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 4 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Settings</p>
            </div>
          </div >
          <div className={`${activeTabs === 5 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 5, height: '41%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center'>
              <img src={`${rootDir?.icon || './icon'}/${activeTabs === 5 ? 'help-icon-active' : 'help-icon'}.svg`} className='me-3' />
              <p className={`${activeTabs === 5 ? 'text-black' : 'text-white'} pt-3 fw-bold cursor-opt`}>Help</p>
            </div>
          </div >
          <div className={`${activeTabs === 6 ? 'bg-grey' : 'bg-blue-dark'} position-absolute`} style={{ borderRadius: '30px', bottom: 0, left: 0, right: 0, zIndex: 6, height: '33%' }}>
            <div className='w-100 d-flex justify-content-start mx-5 align-items-center' onClick={() =>mutate('api/users/getSession', userLogout(goto, router))}>
              <img src={`${rootDir?.icon || './icon'}/logout-icon.svg`} className='me-3' />
              <p className='text-danger pt-3 fw-bold cursor-opt'>Logout</p>
            </div>
          </div >
        </div>
      )}
    </>
  )
}


export default Sidebar
