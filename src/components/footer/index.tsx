import Image from "next/image";
export default function Footer() {
  return (
    <div className="flex flex-row justify-between px-[128px] py-[24px] bg-[#00111A]">
      <Image
        width={186}
        height={30}
        src="/Assets/logo_footer.svg"
        alt="logo cinza footer"
      />
      <p className="text-[#FFFAF1] text-[14px] font-roboto">
        © 2023 - Todos os direitos reservados
      </p>
    </div>
  );
}
