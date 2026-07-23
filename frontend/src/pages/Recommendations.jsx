import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { recommendBooks } from "../api/booksApi";

import RecommendationCard from "../components/RecommendationCard";


function Recommendations() {


    const location = useLocation();



    const [title, setTitle] = useState("");

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(false);




    useEffect(() => {


        if (location.state?.title) {


            const selectedBook = location.state.title;


            setTitle(selectedBook);


            getRecommendation(selectedBook);


        }


    }, []);






    const getRecommendation = async (bookTitle) => {


        try {


            setLoading(true);



            console.log(
                "Selected Book:",
                bookTitle
            );



            const data = await recommendBooks(bookTitle);



            console.log(
                "API Response:",
                data
            );



            setBooks(data.recommendations);



        }


        catch (error) {


            console.log(error);


        }


        finally {


            setLoading(false);


        }


    };







    return (

        <div className="container mt-4">


            <h2>

                🤖 Book Recommendation

            </h2>




            <div className="row mt-4">


                <div className="col-md-8">


                    <input

                        className="form-control"

                        placeholder="Enter book title"

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                    />


                </div>




                <div className="col-md-4">


                    <button


                        className="btn btn-success w-100"


                        onClick={() => getRecommendation(title)}


                    >

                        Get Recommendations


                    </button>


                </div>


            </div>






            {
                loading && (

                    <div className="text-center mt-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <h5 className="mt-3">
                            🤖 AI is finding similar books...
                        </h5>

                    </div>

                )
            }






            <h4 className="mt-4">


                Recommendations for:

                <b> {title}</b>


            </h4>






            <div className="row mt-3">

                {books.map((book) => (

                    <RecommendationCard
                        key={book.isbn}
                        book={book}
                        selectedBook={title}
                    />

                ))}

            </div>

            {
                !loading &&
                books.length === 0 && (
                    <div className="text-center mt-5">

                        <h3>📚 No Recommendations Found</h3>

                        <p className="text-muted">
                            Try another book title.
                        </p>

                    </div>
                )
            }





        </div>

    );


}



export default Recommendations;