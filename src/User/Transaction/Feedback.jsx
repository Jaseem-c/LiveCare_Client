import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import axios from 'axios'; // Import Axios
import { addreviewApi } from '../../Services/allApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Feedback({ id }) {
    const [feedback, setFeedback] = useState({ ratings: "", comments: "" });
    const [hover, setHover] = useState(-1);
    const [open, setOpen] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to track if feedback is submitted

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getLabelText = (value) => {
        return labels[value];
    };

    const labels = {
        1: "Useless",
        2: "Poor",
        3: "Ok",
        4: "Good",
        5: "Excellent",
    };

    const handleSubmit = async () => {
        try {
            const { ratings, comments } = feedback;
            if (!ratings || !comments) {
                alert('Please fill all fields');
            } else {
                const token = sessionStorage.getItem("token");
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                };

                const result = await addreviewApi({ ...feedback, serviceProviderId: id }, reqHeader);
                console.log(result);
                alert("Feedback added successfully");
                setFeedback({ ratings: "", comments: "" });
                handleClose();
                setFeedbackSubmitted(true); // Set feedbackSubmitted to true after feedback is successfully submitted
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <>
            {!feedbackSubmitted && !open && <button onClick={handleOpen} className='btn btn-primary'>Add Feedback</button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className="mb-3"
                    >
                        Add Your Feedback
                    </Typography>
                    <Typography id="modal-modal-description" xl={{ mt: 2 }}>
                        <Stack spacing={1}>
                            <Rating
                                name="hover-feedback"
                                value={feedback.ratings}
                                precision={1}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setFeedback({ ...feedback, ratings: newValue });
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                size="large"
                            />
                            {feedback.ratings !== null && (
                                <Box sx={{ ml: 2 }}>
                                    {labels[hover !== -1 ? hover : feedback.ratings]}
                                </Box>
                            )}
                        </Stack>
                        <TextField
                            style={{ width: "100%" }}
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={5}
                            placeholder="Enter your feedback"
                            value={feedback.comments}
                            onChange={(e) =>
                                setFeedback({ ...feedback, comments: e.target.value })
                            }
                        />
                    </Typography>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success mt-3" onClick={handleSubmit}>Submit</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default Feedback;
