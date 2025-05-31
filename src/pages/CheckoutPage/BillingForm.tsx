import { useFormContext } from "react-hook-form";
import type { BillingFormData } from "../../model/user";

const BillingForm: React.FC<{
  onSubmitForm: (data: BillingFormData) => void;
}> = ({ onSubmitForm }) => {
  const { register, handleSubmit } = useFormContext<BillingFormData>();

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="p-4 space-y-3 bg-white border border-gray-200 shadow-sm rounded-xl"
    >
      <h3 className="text-lg font-semibold text-indigo-600">📝 Billing Info</h3>
      <input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
        className="w-full p-2 text-sm border rounded"
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
        className="w-full p-2 text-sm border rounded"
      />
      <input
        {...register("phone", { required: true })}
        placeholder="Phone"
        className="w-full p-2 text-sm border rounded"
      />
      <input
        {...register("address", { required: true })}
        placeholder="Address"
        className="w-full p-2 text-sm border rounded"
      />
      <input
        {...register("city", { required: true })}
        placeholder="City"
        className="w-full p-2 text-sm border rounded"
      />
      <input
        {...register("pin", { required: true })}
        placeholder="PIN Code"
        className="w-full p-2 text-sm border rounded"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Save Address
      </button>
    </form>
  );
};
export default BillingForm;
