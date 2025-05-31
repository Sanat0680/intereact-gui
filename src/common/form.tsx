import { useFormContext } from "react-hook-form";
import type { FormValues } from "../model/user";

const InputField = ({
  id,
  label,
  type,
  placeholder,
}: {
  id: keyof FormValues;
  label: string;
  type: string;
  placeholder?: string;
}) => {
  const { register } = useFormContext<FormValues>();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
};
export default InputField;
