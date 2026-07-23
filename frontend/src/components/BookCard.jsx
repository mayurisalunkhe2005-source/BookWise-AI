import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addFavorite,
  removeFavorite,
  getFavoriteStatus,
} from "../api/favoritesApi";


function BookCard({ book }) {

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);



  // Temporary: check book data
  console.log("BOOK DATA:", book);



  // Get ISBN safely
  const isbn = book.isbn || book.isbn13 || book.ISBN;



  // Check favorite status
  useEffect(() => {


    const checkStatus = async () => {

      try {

        if (!isbn) {
          return;
        }


        const response = await getFavoriteStatus(isbn);

        setIsFavorite(response.favorite);


      } catch(error) {

        console.log("Favorite status error:", error);

      }

    };


    checkStatus();


  }, [isbn]);





  // Add / Remove Favorite
  const handleFavorite = async () => {


    try {


      if (!isbn) {

        console.log("ISBN missing:", book);

        return;

      }



      if (isFavorite) {


        await removeFavorite(isbn);

        setIsFavorite(false);


      }
      else {


        await addFavorite(isbn);

        setIsFavorite(true);


      }



    }
    catch(error) {

      console.log("Favorite error:", error);

    }


  };





  const handleDetails = () => {


    navigate("/book-details", {

      state: {
        book: book
      }

    });


  };





  const handleRecommendation = () => {


    navigate("/recommendations", {

      state: {
        title: book.title
      }

    });


  };





  return (

    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">


      <div
        className="card h-100 shadow-sm border-0"
        style={{
          borderRadius: "15px"
        }}
      >



        <img

          src={book.image}

          alt={book.title}

          className="card-img-top"

          style={{

            height: "300px",

            objectFit: "contain",

            background: "#f8f9fa",

            padding: "15px"

          }}


          onError={(e)=>{

            e.target.src =
            "https://placehold.co/250x350?text=No+Cover";

          }}

        />





        <div className="card-body">


          <h5 className="fw-bold">

            📖 {book.title}

          </h5>



          <p>

            👤 <strong>Author:</strong> {book.author}

          </p>



          <p>

            🏢 <strong>Publisher:</strong> {book.publisher}

          </p>



          <p>

            📅 <strong>Year:</strong> {book.year}

          </p>



        </div>





        <div className="card-footer bg-white border-0">


          <div className="d-grid gap-2">



            <button

              className="btn btn-outline-primary"

              onClick={handleDetails}

            >

              📖 View Details

            </button>





            <button

              className="btn btn-success"

              onClick={handleRecommendation}

            >

              🤖 Recommend Similar

            </button>





            <button

              className={
                isFavorite
                ?
                "btn btn-danger"
                :
                "btn btn-outline-danger"
              }

              onClick={handleFavorite}

            >

              {

                isFavorite

                ?

                "❤️ Remove Favorite"

                :

                "🤍 Add Favorite"

              }


            </button>




          </div>


        </div>



      </div>


    </div>


  );

}


export default BookCard;