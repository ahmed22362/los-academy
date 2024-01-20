import Link from "next/link";
import { LiaPhoneSolid } from "react-icons/lia";
import { GoMail } from "react-icons/go";
export default function ContactOptions({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  return (
    <div className="flex flex-row justify-between gap-3">
      <LiaPhoneSolid
        className={"text-2xl cursor-pointer"}
        onClick={() => {
          window.open(`https://wa.me/+2${phone}`, "_blank");
        }}
      />
      <Link href={`mailto:${email}`}>
        {" "}
        <GoMail className={"text-2xl cursor-pointer"} />
      </Link>
    </div>
  );
}
