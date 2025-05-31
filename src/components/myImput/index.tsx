/* eslint-disable @typescript-eslint/no-explicit-any */
interface myImputTextProps {
  onChange?: (e: any) => void;
  label: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  icon?: React.ReactNode;
}
export default function MyImput({
  label,
  onChange,
  value,
  placeholder,
  icon,
  ...rest
}: myImputTextProps) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white ">
        {label}
      </label>
      <div className="relative text-[#7C7C8A]">
        {icon && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#7C7C8A]">
            {icon}
          </div>
        )}
        <input
          {...rest}
          className="w-full rounded-md pl-10 bg-[#0D161B] border-none text-[#7C7C8A] placeholder-[#7C7C8A] px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
