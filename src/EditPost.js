import React, { useState, useEffect } from 'react';
import configData from "./config";
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import {
    TextField, 
    Button,
} from "@material-ui/core";

import {useParams} from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

const {
    appId,
    GET_POST_API_URL,
} = configData;


const EditPost = () => {

    const [post, setPost] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [newPostText, setNewPostText] = useState("");

    const getPostDataById = async (postId) => {
        try{
            const response = await axios.get(
                `${GET_POST_API_URL}/${postId}`,
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            ); 

            setPost(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getPostDataById(id);
    }, [])

    

    const updatePost = async () => {
        try{
            const response = await axios.put(
                `${GET_POST_API_URL}/${id}`,
                {
                    text: newPostText,
                }, 
                {
                    headers: {
                        "app-id": appId,
                    }
            }); 

            navigate("/");
            
        }
        catch(error){
            console.log(error);
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
            Post Text: 
            <TextField 
                variant="outlined"
                margin="normal"
                value={
                    !isEditing ? post?.text : newPostText
                }
                onChange={(e)=>{
                    setIsEditing(true);
                    setNewPostText(e.target.value);
                }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={()=>{
                    // call api to update post here 
                    updatePost();
                }}
            >
                Update Post
            </Button>
        </div>
    )
}

export default EditPost;