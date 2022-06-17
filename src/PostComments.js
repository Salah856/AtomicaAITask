import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
    Grid,
    Paper, 
    ListItem, 
    ListItemText,
    ListItemAvatar,
    Button, 
} from "@material-ui/core";

import { useParams } from "react-router-dom"; 
import configData from "./config"; 


const {
    Comments_URL,
    appId, 
    DELETE_COMMENT_API_URL,
    GET_POST_API_URL,
} = configData


const PostWithComments = () => {

    const [post, setPost] = useState({});

    const [comments, setComments] = useState([]);

    const { id } = useParams();

    const getPostById = async (postId) => {
        try{
            const res = await axios.get(
                GET_POST_API_URL + "/" + postId,
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            ); 

            setPost(res.data);

        }
        catch(e){
            console.log(e);
        }
    }

    const getComments = async () => {
        try{
            const response = await axios.get(
                `${Comments_URL}/${id}/comment?limit=10`,
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

    useEffect(()=>{
        getPostById(id);
        getComments();
    }, []);



    console.log("post owner", post?.owner)

    const deleteComment = async (commentId) => {
        try{
            const res = await axios.delete(
                `${DELETE_COMMENT_API_URL}/${commentId}`,
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            ); 
            getComments();
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10%",
                }}
            >
                <Paper
                    style={{
                        padding: "2rem",
                    }}
                >
                <ListItem>
                    <ListItemAvatar>
                        <img 
                            src={
                                post?.owner?.picture 
                                    ? 
                                post?.owner?.picture 
                                    : 
                                "https://img.dummyapi.io/photo-1507866246809-91017316fd37.jpg"
                            }
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
                                    post?.owner?.firstName 
                                        + 
                                    " " 
                                    + 
                                    post?.owner?.lastName
                                }
                                secondary={post?.publishDate?.slice(0, 10)}
                            />
                        </ListItem>
                        <h3>
                            {post?.text}
                        </h3>
                </Paper>

                <h2 
                    style={{
                        margin: "20px",
                    }}
                > 
                    Post Comments:  
                </h2>
                <Grid container spacing={3}>
                {
                    comments.map((comment, index) => {
                        return (
                            <Grid 
                                item 
                                xs={6} 
                                key={index}
                            >
                                <Paper
                                    style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                        padding: "20px",
                                    }}
                                >
                                <ListItem>
                                        <ListItemAvatar>
                                            <img 
                                                src={comment.owner.picture} 
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
                                                comment.owner.firstName 
                                                    + 
                                                " " 
                                                    + 
                                                comment.owner.lastName
                                            }
                                            secondary={comment.publishDate.slice(0, 10)}
                                        />
                                    </ListItem>

                                    <div>
                                        {
                                            comment?.message
                                        }
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                        }}
                                    >
                                        <Button
                                            style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                marginRight: "10px",
                                            }}
                                            variant="contained"
                                            onClick={
                                                () => {
                                                    deleteComment(comment.id);
                                                    console.log(
                                                        "delete comment", 
                                                        comment.id
                                                    )
                                                }
                                            }
                                        >
                                            Delete Comment
                                        </Button>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                        >
                                            Edit Comment
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                    )})
                }
                </Grid>

            </div>
        </>
    )
}


export default PostWithComments;
