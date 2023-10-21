'use client';

import { Button, Modal } from 'flowbite-react';
import { PrimaryButton } from '.';

export default function ModalCourse({handleOpen, handleCloseModal, modalTarget}: {
  handleOpen: string; handleCloseModal: () => void; modalTarget: number}) {

  return (
    <>
      <Modal show={true} onClose={handleCloseModal}>
        <Modal.Header>{modalTarget}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {modalTarget} modal
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton text='Done' ourStyle={
            "bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors \
            text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 shadow rounded-full w-50"
            } onClick={handleCloseModal} />
        </Modal.Footer>
      </Modal>
    </>
  )
}
