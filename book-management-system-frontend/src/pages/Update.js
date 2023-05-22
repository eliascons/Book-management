import { useParams } from "react-router-dom";
import GET_BOOK from "../api/books/queries/getBook";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const UpdateBooks = () => {
    const {bookId} = useParams()
    const [book, {laoding, error}] = useQuery(GET_BOOK);

    useEffect(() =>{

    }, []);

    return (
        <>
            <div>{bookId}</div>
        </>
    )

}

export default UpdateBooks;