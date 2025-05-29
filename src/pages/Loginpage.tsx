import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../common/form";
type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};
const Loginpage = () => {
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
    // Add login logic here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...methods.register("remember")}
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full p-3 font-semibold text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Sign In
            </button>
          </form>
        </FormProvider>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
