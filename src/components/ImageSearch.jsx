import React, { useState } from "react";
import search from "../assets/search.png";

const ImageSearch = ({ searchText, searchPage, setImages }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
    searchPage(1);
    setImages([]);
  };

  return (
    <>
      <h1 className="text-purple-600 text-[50px] font-bold">ImageGallery</h1>
      <form onSubmit={onSubmit} className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Images Here"
          onChange={(e) => setText(e.target.value)}
          className="text-purple-600 text-[20px] outline-none border-2 border-purple-600
            p-2 rounded-lg "
        />
        <button type="submit">
          <img
            src={search}
            className="w-[49px] p-2 m-2 border-2 border-purple-600 rounded-lg"
          />
        </button>
      </form>
    </>
  );
};
export default ImageSearch;
