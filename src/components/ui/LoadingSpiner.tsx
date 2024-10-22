import React from "react";

export const LoadingSpiner = () => {
  return (
    <div className=" mt-3 flex items-center justify-center">
      <div className="loader h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
