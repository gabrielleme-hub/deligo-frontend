"use client";

interface MyButtonTextProps {
  onClose: () => void;
  message: string;
}
export default function MyButtonText({ onClose, message }: MyButtonTextProps) {
  return (
    <button
      className="top-8 left-4 text-[24px] font-poppins font-bold text-[#E1E1E6] hover:text-white text-xl flex items-center gap-2 cursor-pointer z-10" // Ajustado posicionamento e estilo
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {message}
    </button>
  );
}
