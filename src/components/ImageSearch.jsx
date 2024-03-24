import React, { useState } from "react";
import search from "../assets/search.png";

const ImageSearch = ({ searchText, searchPage, setImages }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text || text.trim() !== "") {
      setImages([]);
      searchPage(1);
      searchText(text.trim());
    }
  };

  const onEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!text || text.trim() !== "") {
        setImages([]);
        searchPage(1);
        searchText(text.trim());
      }
    }
  };

  const resetSearch = (fromHome = false) => {
    console.log(`text `, text);
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
    setText("");

    if (text !== "") {
      setImages([]);
    }
    searchPage(1);
    searchText("");
  };

  return (
    <>
      <h1
        className="text-purple-600 text-[50px] font-bold cursor-pointer"
        onClick={() => {
          resetSearch(true);
        }}
      >
        ImageGallery
      </h1>
      <form
        onSubmit={onSubmit}
        onKeyDown={onEnterKeyDown}
        className="flex justify-center items-center"
      >
        <div className="relative flex justify-center items-center">
          <input
            id={"search-input"}
            type="text"
            placeholder="Search Images Here"
            onChange={(e) => setText(e.target.value)}
            className="text-purple-600 text-[20px] outline-none border-2 border-purple-600
            p-2 rounded-lg"
          />
          {!text ||
            (text.trim() !== "" && (
              <button
                className="text-purple-600 font-bold text-lg px-2 absolute right-2"
                onClick={() => {
                  resetSearch();
                }}
              >
                X
              </button>
            ))}
        </div>
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
