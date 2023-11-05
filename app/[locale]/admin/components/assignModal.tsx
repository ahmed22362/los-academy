'use client';

import { Dropdown, Modal } from 'flowbite-react';
import Image from 'next/image';
import { CustomFlowbiteTheme } from 'flowbite-react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';

export default function AssignModal({openAssignModal, handleCloseModal, sessionReqId, user, updateComponent}: 
    {
        openAssignModal: boolean;
        handleCloseModal: () => void;
        sessionReqId: number | string;
        user: string | any;
        updateComponent: () => void;
    }) {

      const modalRef = useRef<HTMLDivElement>(null);
      const cookies = new Cookies();
      const [allTeacher, setAllTeacher] = useState([]);
      const [teacher, setTeacher] = useState("select teacher");
      const [teacherid, setTeacherid] = useState(null)
      const [message, setMessage] = useState('')

      const selectTeacher = (selectedTeacherName: SetStateAction<string>) => {
        setTeacher(selectedTeacherName);
      };
      const selectTeacherid = (selectedTeacherid: any) => {
        setTeacherid(selectedTeacherid);
      };

      const getAllTeachers = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(data => {
            setAllTeacher(data.data);
            // console.log(data.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
      getAllTeachers()
    }, [])


      useEffect(() => {
        const handleClickOutside = (event: MouseEvent | any) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
          }
        };

        if (openAssignModal) {
          document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [openAssignModal, handleCloseModal]);
    
      if (!openAssignModal) {
        return null;
      }

      const customTheme: CustomFlowbiteTheme['dropdown'] = {
        floating: {
          base: "w-fit",
          item: {
            base: "bg-white-color",
          },
          style: {
            light: "bg-white-color"
          }
        },
        
        inlineWrapper: "flex justify-between w-[260px] items-center px-5 py-3 rounded-full bg-white-color"
      }
      const modalTheme: CustomFlowbiteTheme['modal'] = {
        header: {
          base: "flex items-start justify-between rounded-t p-5"
        }
      }

    const assignTeacher = () => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/session/assignTeacher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify({
                teacherId: teacherid,
                sessionReqId: sessionReqId
            })
        }).then(response => response.json()).then(data => {
            setMessage(data.status)
            if(data.status === 'success') {
                updateComponent()
            }
        }).catch(err => console.log(err))
      }

  return (
    <>
      <Modal ref={modalRef} show={openAssignModal} onClose={handleCloseModal} size={"lg"}>
        <Modal.Header theme={modalTheme.header}>Assign to this Student :</Modal.Header>
            {message ? (<span className={`${message === 'fail' ? 'bg-danger-color': 'bg-success-color'} text-center py-4 px-8 text-green-100`}>{message === 'fail' ? 'The User and Teacher together had free session before' : 'Assign Success'}</span>) : (<></>)}
        <Modal.Body>
            <div className="flex items-center gap-5">
                <Image src={'/vectors/feedback3.svg'} alt={'student'} width={50} height={50} />
                <span className='text-black-one-color'>Student Name: {user}</span>
            </div>
            <div className="flex flex-col my-5 gap-3">
              <h4 className="adminBoxTitle">This Teacher: </h4>
              <Dropdown label={teacher} theme={customTheme} inline>
                {allTeacher && allTeacher.map((teacher: any) => {
                  return(
                    <Dropdown.Item key={teacher.id} onClick={() => {
                        selectTeacher(teacher.name)
                        selectTeacherid(teacher.id)
                        }}>
                      {teacher.name}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown>
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="text-white bg-gray-two-color hover:bg-gray-three-color rounded-full py-2 px-5 transition-colors"
                    onClick={assignTeacher}
                >Assign</button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
