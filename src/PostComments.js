import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
    Grid,
    Paper, 
    ListItem, 
    ListItemText,
    ListItemAvatar,
    Button, 
    TextField,
    Modal, 
} from "@material-ui/core";

import NewCommentModal from './NewCommentModal';
import EditCommentModal from './EditCommentModal';

import Alert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom"; 
import configData from "./config"; 


const {
    Comments_URL,
    appId, 
    DELETE_COMMENT_API_URL,
    GET_POST_API_URL,
    CREATE_COMMENT_API_URL,
    UPDATE_COMMENT_API_URL,
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



    const [isEditing, setIsEditing] = useState(false);
    const [indexToEdit, setIndexToEdit] = useState(null);

    const addNewCommentMessage= async (payload) => {
        try{
            const response = await axios.post(
                `${CREATE_COMMENT_API_URL}`,
                {
                    ...payload
                }, 
                {
                    headers: {
                        "app-id": appId,
                    }
                }
            );

            getComments();
            setAddedNewComment(false);

        }
        catch(e){

        }
    }


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
            setShowAlertError(true);
        }
    }

    const updateComment = async (commentId, payload) => {
        try{
            const res = await axios.put(
                `${UPDATE_COMMENT_API_URL}/${commentId}`,
                {
                    ...payload
                }, 
                {
                    headers: {
                        "app-id": appId,
                    }
                }); 
            getComments();
        }
        catch(error){
            console.log(error);
        }
    }

    const [newCommentText, setNewCommentText] = useState("");
    const [showAlertError, setShowAlertError] = useState(false);

    const [addedNewComment, setAddedNewComment] = useState(false);
    const [newCommentMessage, setNewCommentMessage] = useState("");

    const [editedComment, setEditedComment] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState({});

    const [isEditingComment, setIsEditingComment] = useState(false);
    const [updatedCommentText, setUpdatedCommentText] = useState("");


    return (
        <>
        {
            !!showAlertError &&(
               <Alert 
                    severity="error"
                    onClose={()=>setShowAlertError(false)}
                    style={{
                        marginTop: "2rem",
                        width: "80%",
                        marginLeft: "10%",
                    }}
                >
                    You can not delete other user's comment!
                </Alert>
            )
        }
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "6rem",
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
                <div>
                    <Button
                        style={{
                            backgroundColor: "#00FFAB",
                            margin: "10px",
                        }}
                        onClick={
                            ()=>{
                                setAddedNewComment(true);
                            }
                        }
                    >
                        + New Comment
                    </Button>
                </div>
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
                                                }
                                            }
                                        >
                                            Delete Comment
                                        </Button>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            onClick={
                                                () => {
                                                    setEditedComment(true);
                                                    setCommentToEdit(comment);
                                                    // setIndexToEdit(index);
                                                    // setIsEditing(true);
                                                    // setNewCommentText(comment?.message);
                                                }
                                            }
                                        >
                                            Edit Comment
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                    )})
                }
                </Grid>

                {
                    !!addedNewComment && (
                       <NewCommentModal 
                            addedNewComment={addedNewComment}
                            setAddedNewComment={setAddedNewComment}
                            setNewCommentMessage={setNewCommentMessage}
                            id={id}
                            newCommentMessage={newCommentMessage}
                            addNewCommentMessage={addNewCommentMessage}
                       />
                    )
                }
                {
                    !!editedComment && (
                        <EditCommentModal 
                            editedComment={editedComment}
                            setEditedComment={setEditedComment}
                            commentToEdit={commentToEdit}
                            isEditingComment={isEditingComment}
                            setIsEditingComment={setIsEditingComment}
                            setUpdatedCommentText={setUpdatedCommentText}
                            updatedCommentText={updatedCommentText}
                            updateComment={updateComment}
                        />
                    )
                }
            </div>
        </>
    )
}


export default PostWithComments;
