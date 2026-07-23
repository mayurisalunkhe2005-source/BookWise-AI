import { useEffect, useState } from "react";

import { getPopularBooks } from "../api/booksApi";

import BookCard from "../components/BookCard";


function PopularBooks() {

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    loadPopularBooks();

  }, []);


  const loadPopularBooks = async () => {

    try {

      const data = await getPopularBooks();

      setBooks(data);

    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  };


  if(loading)
    return <h3 className="text-center mt-5">Loading...</h3>;


  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        🔥 Popular Books
      </h2>


      <div className="row">

        {books.map((book)=>(

          <BookCard

            key={book.ISBN}

            book={book}

          />

        ))}

      </div>


    </div>

  );

}


export default PopularBooks;