import React, { FC } from "react";

interface UserDetailsProps {
  selectedUser: any;
  closeModal: () => void;
}

export const UserDetails: FC<UserDetailsProps> = ({
  selectedUser,
  closeModal,
}) => {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"   onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex">
          <h2 className="text-xl font-semibold mb-4 text-black flex-1">
            User Details
          </h2>
          <button
            onClick={closeModal}
            className="px-5 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
        {selectedUser && (
          <div>
            <p className="text-black">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-black">
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p className="text-black">
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
