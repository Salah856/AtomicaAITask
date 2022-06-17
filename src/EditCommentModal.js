import React, { useState } from "react";

import {
    Modal,
    TextField, 
    Button, 
    Paper,
} from "@material-ui/core";


const EditCommentModal = ({
    editedComment, 
    setEditedComment,
    commentToEdit,
    isEditingComment,
    setIsEditingComment,
    setUpdatedCommentText,
    updatedCommentText,
    updateComment, 
})=>{

    return (
        <Modal
            open={editedComment}
            onClose={()=>setEditedComment(false)}
        >
            <Paper
                style={{
                    padding: "2rem",
                    marginTop: "6rem",
                    width: "80%",
                    marginLeft: "10%",
                }}
            >
                <TextField 
                    value={
                        !isEditingComment ? commentToEdit.message : updatedCommentText
                    }
                    fullWidth
                    onChange={
                        (e)=>{
                            setIsEditingComment(true);
                            setUpdatedCommentText(e.target.value);
                        }
                    }
                    variant="outlined"
                />

                <Button
                    color="primary"
                    variant="contained"
                    style={{
                        margin: "10px",
                    }}
                    onClick={
                        ()=>{
                            
                            let payload = {
                                message: !isEditingComment ? commentToEdit.message : updatedCommentText,
                                owner: "60d0fe4f5311236168a109ca",
                                post: commentToEdit.post,
                            }; 

                            updateComment(
                                commentToEdit?.id,
                                payload,
                            )
                        }
                    }
                >
                    Update Comment
                </Button>
            </Paper>
        </Modal>
    )
};


export default EditCommentModal;