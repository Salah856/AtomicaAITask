import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    useNavigate
} from "react-router-dom";

import configData from "./config"; 

import {
    CircularProgress, 
    Button, 
    Grid,
    Paper, 
    ListItem, 
    ListItemText,
    ListItemAvatar,
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';


const {
    GET_POSTS_API_URL,
    appId,
    DELETE_POST_API_URL,
} = configData; 


const UsersPosts = () => {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const [deletePostSuccess, setDeletePostSuccess] = useState(false);

    const getUserPosts = async () => {

        try{
            const response = await axios.get(
                GET_POSTS_API_URL, 
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            );
            setPosts(response.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUserPosts();
    }, []);

    const deletePost = async (postId) => {
        try{
            const response = await axios.delete(
                `${DELETE_POST_API_URL}/${postId}`,
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            );
            setDeletePostSuccess(true);
            getUserPosts();
        }
        catch(error){
            console.log(error);
        }
    }



    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                }}
            >
                User Posts
            </h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/add-post")}
                style={{
                    marginLeft: "calc(50% - 76px)",
                    marginBottom: "2rem",
                }}
            >
                + Add New Post
            </Button>
            {
                !!deletePostSuccess && (
                    <div
                        onClick={()=>{
                            setDeletePostSuccess(false);
                        }}
                        style={{
                            width: "60%",
                            margin: "0 auto",
                        }}
                    >
                        <Alert 
                            severity="success"
                            onClose={()=>{
                                setDeletePostSuccess(false);
                            }}
                        >
                            Post deleted successfully
                        </Alert>
                    </div>
                )
            }
            {
                !posts.length && (
                    <CircularProgress 
                        style={{
                            display: "block",
                            top: "30%",
                            left: "50%",
                            position: "absolute",
                        }}
                    />
                )
            }
            <Grid container spacing={3}>
            {
                posts.map(post => {
                    return (
                        <Grid 
                            item xs={12}
                            style={{
                                marginLeft: "calc(50% - 300px)",
                                cursor: "pointer",
                            }}
                        >
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <img 
                                            src={post.owner.picture} 
                                            alt="avatar" 
                                            style={{
                                                borderRadius: "50%",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={
                                            post.owner.firstName 
                                                + 
                                            " " 
                                                + 
                                            post.owner.lastName
                                        }
                                        secondary={post.publishDate.slice(0, 10)}
                                    />
                                </ListItem>
                            </div>
                            <div key={post.id}>
                                <h2>{post.text}</h2>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            marginRight: "10px",
                                        }}
                                        variant="contained"
                                        onClick={
                                            () => {
                                                deletePost(post.id);
                                            }
                                        }
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{
                                            marginRight: "10px",
                                        }}
                                        onClick={
                                            () => {
                                                navigate(`/edit-post/${post.id}`);
                                            }
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={
                                            () => {
                                                navigate(`/post/${post.id}`);
                                            }
                                        }
                                    >
                                        Comments
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    )
                })
            }
            </Grid>
        </>
    ); 


};


export default UsersPosts;