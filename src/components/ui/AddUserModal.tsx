import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/schemas/user";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  username: z.string().min(1, "Username is required"),
});

type UserFormInputs = z.infer<typeof schema>;

interface AddUserProps {
  closeModal: () => void;
  addUser: (user: Partial<User>) => void;
}

export const AddUserInfo: React.FC<AddUserProps> = ({ closeModal, addUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: UserFormInputs) => {
    addUser(data);
    reset(); 
    closeModal();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
   
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add New User</h2>
          <button
            onClick={closeModal}
            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`mt-1 block w-full rounded-md border-2 border-black sm:text-sm p-2 text-black ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={`mt-1 block w-full rounded-md border-2 border-black sm:text-sm p-2 text-black ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`mt-1 block w-full rounded-md border-2 border-black sm:text-sm p-2 text-black ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


