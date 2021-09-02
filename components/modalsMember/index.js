import { Button, Modal } from "react-bootstrap"
import { useMembersById } from "../../pages/api/class/useMemberById"

// const data = [
//   {
//     id: 1,
//     id_class: 1,
//     topic_name: "Topic 1",
//     is_finished: true,
//     score: 83,
//     user_id: 2,
//     username: "nadia",
//     photo: "/uploads/photo/photo-1623164072414-history-in-hd-cTz5-T7voqQ-unsplash 2.png"
//   },
//   {
//     id: 2,
//     id_class: 1,
//     topic_name: "Topic 2",
//     is_finished: true,
//     score: 75,
//     user_id: 2,
//     username: "nadia",
//     photo: "/uploads/photo/photo-1623164072414-history-in-hd-cTz5-T7voqQ-unsplash 2.png"
//   },
// ]

const ModalMember = ({ show, onHide, form, route = { icon: '../icon', img: '../images' } }) => {
  const { member: data } = useMembersById({ ...form })
  const member = data ? data[0] : null

  const setColor = (score) => {
    if (score >= 90 && score <= 100) return 'text-success'
    if (score < 90 && score >= 80) return 'text-primary'
    if (score < 80 && score >= 40) return 'text-warning'
    if (score < 40 && score >= 0) return 'text-danger'
    return ''
  }

  console.log(data, 'modalll')
  console.log(form, 'modal')
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='border-0 pt-4'>
        <div className='ms-3 d-flex justify-content-start'>
          <img src={member?.photo && member?.photo !== 'null' ? `${process.env.API_URL_IMG}/${member?.photo}` : `${route?.img}/photo_profile.png`} width='55px' height='55px' className='rounded-circle mx-3' />
          <h2 className='p-2'>{member?.username}</h2>
        </div>
        <img className='me-4' src={`${route?.icon}/close-icon-modal.svg`} onClick={onHide} />
      </Modal.Header>
      <hr className='mx-4 mt-0' />
      <Modal.Body className='mb-4'>
        {data && data?.map(item => {
          return (<>
            <div className='w-100 d-flex justify-content-start align-items-center'>
              <h5 className='w-100 mx-3 pt-3'>{item?.topic_name}</h5>
              <h5 className={`mx-5 pt-3 ${setColor(item?.score)}`}>{item?.is_finished ? item?.score : (<label className='badge bg-danger rounded-pill'>Unfinished</label>)}</h5>
              <h5 className='fw-bold text-center mt-3'><img src={`${route?.icon}/list-icon.svg`} /></h5>
            </div>
          </>)
        })}
      </Modal.Body>
    </Modal>
  )
}

export default ModalMember
