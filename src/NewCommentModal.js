import React, { useState } from "react";
import { 
    Modal, 
    Button, 
    Paper, 
    TextField,  
} from "@material-ui/core";



const NewCommentModal = ({
    addedNewComment,
    setAddedNewComment, 
    setNewCommentMessage, 
    id, 
    newCommentMessage,
    addNewCommentMessage,
})=>{


    return (
        <Modal
        open={addedNewComment}
        onClose={()=>setAddedNewComment(false)}
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
                fullWidth
                onChange={
                    (e)=>{
                        setNewCommentMessage(e.target.value);
                    }
                }
                variant="outlined"
                label="New Comment Message"
            />
            <Button
                style={{
                    backgroundColor: "#00FFAB",
                    margin: "10px",
                }}
                onClick={
                    ()=>{
                        let payload = {
                            message: newCommentMessage,
                            owner: "60d0fe4f5311236168a109ca", 
                            post: id, 
                        }; 

                        addNewCommentMessage(payload);

                    }
                }
            >
                Add Comment
            </Button>
        </Paper>
    </Modal>
    )
}

export default NewCommentModal;

