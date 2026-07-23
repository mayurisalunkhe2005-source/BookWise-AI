import { useEffect, useState } from "react";

import {
  getFavorites
} from "../api/favoritesApi";

import BookCard from "../components/BookCard";


function Favorites(){


  const [favorites,setFavorites] = useState([]);



  useEffect(()=>{

    loadFavorites();

  },[]);



  const loadFavorites = async()=>{

    try{

      const data = await getFavorites();

      setFavorites(data);

    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <div className="container mt-4">


      <h2 className="text-center mb-4">
        ❤️ My Favorites
      </h2>



      <div className="row">


        {
          favorites.length === 0

          ?

          <h4 className="text-center">
            No favorite books found
          </h4>


          :

          favorites.map((book)=>(

            <BookCard

              key={book.isbn}

              book={book}

            />

          ))

        }


      </div>


    </div>

  );

}


export default Favorites;