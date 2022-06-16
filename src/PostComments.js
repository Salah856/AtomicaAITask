import React, { useState, useEffect } from 'react';
import axios from 'axios';

import configData from "./config"; 


const {
    Comments_URL,
    appId, 
} = configData


const PostWithComments = () => {

    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try{
            const response = await axios.get(
                Comments_URL,
                {
                    headers: {
                        "app-id": appId,
                    }
                })

            setComments(response.data.data);
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <>
            post with comments
        </>
    )
}


export default PostWithComments;
