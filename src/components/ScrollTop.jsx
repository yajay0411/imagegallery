import React from "react";

export default function ScrollTop({ show, handleTopScroll }) {
  return (
    <>
      {show && (
        <button
          className="fixed bottom-10 right-10 bg-purple-600 text-white font-bold p-5 rounded-full"
          onClick={() => {
            handleTopScroll();
          }}
        >
          Top
        </button>
      )}
    </>
  );
}
