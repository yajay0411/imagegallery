import React, { useState, useEffect } from "react";
import { REACT_APP_PIXABAY_API_KEY } from "../APIkey";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Loader from "./components/Loader.jsx";
import ScrollTop from "./components/ScrollTop.jsx";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      let api = await fetch(
        `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_API_KEY}&q=${term}&per_page=15&page=${page}&safesearch=true`
      );
      let imagesArry = await api.json();
      if (!imagesArry.hits) {
        setIsLoading(false);
        console.log(imagesArry.details);
      }
      setImages((prev) => [...prev, ...imagesArry.hits]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page, term]);

  const handleScroll = () => {
    try {
      if (window.innerHeight < window.document.documentElement.scrollTop) {
        setShow(true);
      }

      if (window.innerHeight > window.document.documentElement.scrollTop) {
        setShow(false);
      }

      if (
        window.innerHeight + window.document.documentElement.scrollTop + 1 >=
        window.document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopScroll = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());
    return () => window.removeEventListener("scroll", () => handleScroll());
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col sm:flex-row justify-between  items-center p-5 border-b-2 border-purple-600">
        <ImageSearch
          searchText={(text) => setTerm(text)}
          searchPage={setPage}
          setImages={setImages}
        />
      </div>

      {isLoading && <Loader isLoading={isLoading} />}

      {!isLoading && images.length === 0 ? (
        <h1 className="text-[30px] text-purple-600 font-bold ">
          No Images Of {term} found !
        </h1>
      ) : (
        <>
          {term ? (
            <h1 className="text-[30px] text-purple-600 font-bold p-5 ">
              Images Of {term}
            </h1>
          ) : (
            <h1 className="text-[30px] text-purple-600 font-bold p-5 ">
              Images
            </h1>
          )}
        </>
      )}
      {images.length > 0 && (
        <div className="w-full p-5">
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              300: 1,
              350: 2,
              750: 3,
              900: 4,
              1200: 5,
            }}
          >
            <Masonry gutter="10px">
              {images.map((image, index) => (
                <ImageCard key={index + 1} image={image} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}

      <ScrollTop show={show} handleTopScroll={handleTopScroll} />
    </div>
  );
}

export default App;
