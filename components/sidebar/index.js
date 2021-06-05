const Sidebar = () => {
  return (
    <>
      <div className='bg-success h-100 p-4 position-absolute' style={{ borderRadius: '30px', left: 0, right: 0 }}>
        <img src='./icon/notif-icon.svg' className='float-right' />
        <div className='mt-5 ms-3'>
          <img width='80px' src='./images/photo_profile.png' className='rounded-circle' />
          <h2 className='mt-5'>Emil Kharisma</h2>
          <p>Online</p>
        </div>
      </div >
      <div className='bg-info position-absolute' style={{ borderRadius: '30px', left: 0, right: 0, bottom: 0, zIndex: 2, height: '65%' }}></div >
      <div className='bg-primary position-absolute' style={{ borderRadius: '30px', left: 0, right: 0, bottom: 0, zIndex: 3, height: '57%' }}></div >
      <div className='bg-warning position-absolute' style={{ borderRadius: '30px', left: 0, right: 0, bottom: 0, zIndex: 4, height: '49%' }}></div >
      <div className='bg-success position-absolute' style={{ borderRadius: '30px', left: 0, right: 0, bottom: 0, zIndex: 5, height: '41%' }}></div >
      <div className='bg-secondary position-absolute' style={{ borderRadius: '30px', left: 0, right: 0, bottom: 0, zIndex: 6, height: '33%' }}></div >
    </>
  )
}

export default Sidebar
