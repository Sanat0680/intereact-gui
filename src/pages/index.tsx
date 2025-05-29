import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {};

const HomePage = () => {
  const { handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Navigating to Login Page with data:", data);
    navigate("/loginpage");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-center text-gray-800">
          Welcome To Interact !!
        </h2>
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full px-4 py-2 text-white transition duration-300 bg-purple-600 rounded hover:bg-purple-400"
        >
          <p className="text-black">Let's Interact</p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
