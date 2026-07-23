import { useEffect, useState } from "react";

import { getBooks, searchBooks } from "../api/booksApi";

import BookCard from "../components/BookCard";


function Books() {


    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadBooks();

    }, []);



    const loadBooks = async () => {

        try {

            const data = await getBooks();


            console.log("Books received:", data);

            console.log("Is Array:", Array.isArray(data));

            console.log("Length:", data.length);


            setBooks(data);


        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };




    const handleSearch = async () => {


        try {


            if (search.trim() === "") {

                loadBooks();

                return;

            }


            const data = await searchBooks(search);


            setBooks(data);


        }

        catch (error) {

            console.log(error);

        }


    };





    if (loading) {
        return (

            <div className="text-center mt-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <h4 className="mt-3">
                    Loading Books...
                </h4>

            </div>

        );
    }





    return (

        <div className="container mt-4">


            <h2 className="mb-4">

                📚 Browse Books

            </h2>




            <div className="row mb-4">


                <div className="col-md-10">


                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search by title, author or publisher..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />


                </div>




                <div className="col-md-2">


                    <button

                        className="btn btn-primary w-100"

                        onClick={handleSearch}

                    >

                        Search

                    </button>


                </div>


            </div>





            <div className="row">


                {

                    books.map((book) => (


                        <BookCard

                            key={book.ISBN}

                            book={book}

                        />


                    ))

                }

                {
                    !loading &&
                    books.length === 0 && (

                        <div className="text-center mt-5">

                            <h3>📚 No Books Found</h3>

                            <p className="text-muted">
                                Try another search.
                            </p>

                        </div>

                    )
                }


            </div>



        </div>

    );


}


export default Books;