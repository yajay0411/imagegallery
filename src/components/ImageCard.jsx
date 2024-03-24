import React, { useState } from "react";
import download from "../assets/download.png";

const ImageCard = ({ image }) => {
  const { likes, downloads, views, webformatURL, user, userImageURL } = image;

  const tags = image.tags.split(",");
  const [imageHover, setImageHover] = useState(false);

  const downloadImage = async (url) => {
    try {
      console.log(url);
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          console.log(blob);
          const blobUrl = window.URL.createObjectURL(new Blob([blob]), {
            type: "image/png",
          });
          const fileName = url.split("get/")[1];
          console.log(`url`, blobUrl);
          const imageAnchorTag = document.createElement("a");
          imageAnchorTag.href = blobUrl;
          imageAnchorTag.setAttribute("download", fileName);
          document.body.appendChild(imageAnchorTag);
          imageAnchorTag.click();
          imageAnchorTag.remove();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="relative"
        onMouseOver={() => {
          setImageHover(true);
        }}
        onMouseLeave={() => {
          setImageHover(false);
        }}
      >
        <img
          src={webformatURL}
          alt="title"
          className="max-w w-[100%] h-[100%] inline-block items-center"
        />
        {imageHover && (
          <div className="absolute bottom-0 bg-white rounded-tr-full bg-opacity-60 pr-5">
            <div className="p-2">
              <div className="text-[20px] py-2">
                <img
                  src={userImageURL}
                  alt="title"
                  className="max-w w-10 h-10 inline-block items-center rounded-full mr-2"
                />
                <span>
                  <strong>{user}</strong>
                </span>
              </div>
              <div className="w-full flex justify-start ">
                <span className="mr-5">
                  <strong>Likes:</strong> {likes}
                </span>
                <span className="mr-5">
                  <strong>Views:</strong> {views}
                </span>
                <span className="mr-5">
                  <strong>Downloads:</strong> {downloads}
                </span>
              </div>
            </div>
            <div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-purple-200 rounded-sm px-3 py-1 text-[15px] font-semibold text-gray-700 mb-3 mx-2 shadow-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {imageHover && (
          <div
            className="flex justify-end items-end absolute bottom-0 right-0 bg-white rounded-tl-full cursor-pointer"
            onClick={() => {
              downloadImage(webformatURL);
            }}
          >
            <img
              src={download}
              className="w-[30px] h-[30px] inline-block ml-4 mr-2 mt-3 mb-1"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageCard;
