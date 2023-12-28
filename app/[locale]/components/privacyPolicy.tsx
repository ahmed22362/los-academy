"use client";

  import { Button, Modal } from "flowbite-react";
import Image from "next/image";
  import { useState } from "react";

  
  export default function PrivacyPolicy({
    setOpenPrivacyPolicyModal,
    openPrivacyPolicyModal,
  }: any) {

    return (
      <>
        <Modal
          show={openPrivacyPolicyModal}
          className="block space-y-0 md:flex md:space-y-0 md:space-x-4 "
          size={"xl"}
          onClose={() => setOpenPrivacyPolicyModal(false)}
        >
          <Modal.Header className="p-3 flex justify-center items-center ">
            <div className="ml-7 flex justify-center items-center gap-1 text-center ms-auto">
             <Image src={'/vectors/insurance.png'} alt="terms of use" width={20} height={100}/>
             <h3 className="text-center font-bold">Privacy Policy</h3>
            
            </div>
          </Modal.Header>
  
          <Modal.Body>
            <div className="p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. E
            xplicabo enim inventore vel hic iure fugit at quis et natus vero? Aut deleniti repudiandae eiu
            s atque soluta sapiente officiis, rem eos dolores et nihil repe
            llat, accusamus explicabo placeat quaerat quasi error fugiat molestias. Recusandae, perferendis a sit natus iusto quia maxime delectus enim ad nisi
             ipsam corrupti explicabo placeat molestias esse, ducimus autem quam
              saepe velit? Qui sunt temporibus accusantium repudiandae debitis sed
               ipsa veritatis neque ipsum inventore animi corporis ab ad doloremque
                itaque atque, exercitationem veniam repellendus odio. Animi, ipsam
                 omnis at reiciendis quisquam amet voluptatibus saepe libero laudantium quia.
            </div>
            <div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  


