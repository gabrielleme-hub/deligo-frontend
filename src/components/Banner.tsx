import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-gradient-to-b from-[#091E26] to-[#00131C] rounded-[8px] relative mt-[164px] h-[268px] w-full mb-[62px]">
      {/* Imagem fora do banner */}
      <div className="absolute -left-20 -bottom-3.5 z-0">
        <Image
          width={656}
          height={412}
          src="/Assets/images/banner-macarons.png"
          alt="Macarons"
        />
      </div>

      {/* Conteúdo de texto */}
      <div className="flex flex-col items-end mr-[100px] pt-20 z-10">
        <h2 className="text-[40px] font-2 font-medium text-[#E1E1E6] mb-2">
          Sabores inigualáveis
        </h2>
        <p className="text-[#E1E1E6] font-roboto text-[16px]">
          Sinta o cuidado do preparo com ingredientes selecionados
        </p>
      </div>
    </section>
  );
}
