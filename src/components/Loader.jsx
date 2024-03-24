import React from "react";
import CircleLoader from "react-spinners/ClipLoader";

const Loader = ({ isLoading }) => {
  return (
    <>
      <div className="flex justify-center items-center w-[100%] h-[100%] bg-purple-400 bg-opacity-30 fixed left-0 top-0 z-50">
        <CircleLoader
          color={"purple"}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loader;
