import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ajaxHandler } from "../../common/ajaxHandler";
import { useAuth } from "../../common/AuthProvider";
import InputField from "../../common/form";
import type { FormValues, User } from "../../model/user";

const Loginpage = () => {
  const methods = useForm<FormValues>();
  const { login } = useAuth();
  const navigate = useNavigate();
  // const fetchUsers = async () => {
  //   try {
  //     const data = await ajaxHandler<User[]>("/api/users", "GET");
  //     console.log("Fetched Users:", data);
  //   } catch (err) {
  //     console.error("Failed to fetch users", err);
  //   } finally {
  //   }
  // };
  const doLogin = async (x: FormValues) => {
    try {
      const data = await ajaxHandler<User>("/login", "POST", x);
      console.log("Fetched Users:", data);
      toast.success("Login Successful ,Welcome - " + data.username);
      login(data);
      navigate("/landingpage");
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Invalid Credentials - Please try again.");
    }
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
    doLogin(data);
    // fetchUsers();
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
              id="username"
              label="User Name"
              type="text"
              placeholder="UserName"
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
          Don&apos;t have an account -- ?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
