type AuthInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
}: AuthInputProps) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="text-sm font-medium text-[#3e2a55]">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
      />
    </label>
  );
}
