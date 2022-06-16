import React, { useState, useEffect } from 'react';
import configData from './config';

import axios from "axios"; 
import {
    Button, 
    TextField, 
} from "@material-ui/core"; 

import { useNavigate } from 'react-router-dom';


const {
    appId,
    CREATE_POST_API_URL,
} = configData;


const AddPost = () => {


    const [postText, setPostText] = useState("");
    const navigate = useNavigate();


    const addPost = async () => {

        try{
            const response = await axios.post(
                CREATE_POST_API_URL,
                {
                    text: postText,
                    image: "https://img.dummyapi.io/photo-1507866246809-91017316fd37.jpg",
                    likes: 0, 
                    owner: "60d0fe4f5311236168a109ca",
                    tags: [""],
                },
                {
                    headers:{
                        "app-id": appId,
                    }
                }
            ); 

            navigate("/");
        }
        catch(e){
            console.log(e);
        }
    }


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <TextField 
                label="Add Post Text"
                variant="outlined"
                multiline
                rows={4}
                rowsMax={4}
                style={{
                    width: "50%",
                    marginBottom: "2rem",
                }}
                onChange={(e) => {
                    setPostText(e.target.value);
                }}
            />
            <Button
                color="primary"
                variant="contained"
                onClick={() => {
                    addPost();
                }}
            >
                Save Post
            </Button>
        </div>
    )
};


export default AddPost;



