import React from "react";

const ImageCard = ({ image }) => {
  const { likes, downloads, views, webformatURL, user } = image;
  const tags = image.tags.split(",");

  return (
    <>
      <div className="w-[300px] overflow-hidden shadow-xl m-auto">
        <div className="shadow-inner">
          <img
            src={webformatURL}
            alt="title"
            className="w-full h-[250px] object-contain shadow-inner shadow-black-100"
          />
        </div>
        <div className="p-2">
          <div className="font-bold text-purple-500 text-[20px]">
            photo by {user}
          </div>
          <ul className="py-1">
            <li>
              <strong>Likes:</strong> {likes}
            </li>
            <li>
              <strong>Views:</strong> {views}
            </li>
            <li>
              <strong>Downloads:</strong> {downloads}
            </li>
          </ul>
        </div>
        <div>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-purple-200 rounded-full px-3 py-1 text-[15px] font-semibold text-gray-700 mb-3 mx-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCard;
