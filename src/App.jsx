import { useState, useEffect } from "react";
import axios from "axios"
import { REACT_APP_PIXABAY_API_KEY } from "../APIkey";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=${REACT_APP_PIXABAY_API_KEY}&q=${term}&images_type=photo&pretty=true`)
      .then(res => {
        setImages(res.data.hits);
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }, [term])


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col sm:flex-row justify-between  items-center p-5 border-b-2 border-purple-600">
        <ImageSearch searchText={(text) => setTerm(text)} />
      </div>

      {
        !isLoading && images.length === 0 ?
          (<h1 className="text-[30px] text-purple-600 font-bold ">No Images Of {term} found !</h1>) : (<h1 className="text-[30px] text-purple-600 font-bold p-5 ">Images Of {term}</h1>)
      }

      {isLoading ?
        <h1 className="text-[50px]">Loading...</h1> :
        (
          <div className="w-full flex flex-col justify-center items-center ">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 border-b-2 border-purple-600 m-2 p-2">
              {images.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default App
