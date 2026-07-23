import { useLocation, useNavigate } from "react-router-dom";


function BookDetails(){

    const location = useLocation();

    const navigate = useNavigate();


    const book = location.state?.book;



    if(!book){

        return (

            <h3 className="text-center mt-5">

                Book not found

            </h3>

        );

    }




    const handleRecommendation = ()=>{


        navigate("/recommendations",{

            state:{
                title:book.title
            }

        });


    };




    return (

        <div className="container mt-5">


            <div className="card shadow">


                <div className="row">


                    <div className="col-md-4">


                        <img

                            src={book.image}

                            alt={book.title}

                            className="img-fluid"

                            style={{
                                height:"450px",
                                width:"100%",
                                objectFit:"contain"
                            }}

                            onError={(e)=>{

                                e.target.src=
                                "https://placehold.co/300x450?text=No+Cover";

                            }}

                        />


                    </div>





                    <div className="col-md-8 p-4">


                        <h2>

                            {book.title}

                        </h2>


                        <hr/>


                        <p>

                            <b>Author:</b> {book.author}

                        </p>


                        <p>

                            <b>Publisher:</b> {book.publisher}

                        </p>


                        <p>

                            <b>Year:</b> {book.year}

                        </p>




                        <button

                            className="btn btn-primary mt-3"

                            onClick={handleRecommendation}

                        >

                            ⭐ Get Recommendations

                        </button>



                    </div>


                </div>


            </div>


        </div>

    );


}


export default BookDetails;