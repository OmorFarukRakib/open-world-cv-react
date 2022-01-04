import React, {useEffect, useState} from 'react';
import PersonalInfoModal from './PersonalInfoModal';
import AcademicInfoModal from './AcademicInfoModal';
const Modal = (props) => {
const [modalID, setModalID] = useState(0);
const [show, SetShow] = useState(false);

useEffect(() => {
    setModalID(props.modalID)
    SetShow(props.show)
}, [props])
return(
    <>
        {modalID === 1 ? <PersonalInfoModal show={show} onHide={props.onHide}/> : null}
        {modalID === 2 ? <AcademicInfoModal show={show} onHide={props.onHide}/> : null}
    </>
)


} 

export default Modal;