import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Review = ({ service }) => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const id = service.serviceProviderId;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    viewReview();
  }, []);

  const viewReview = async () => {
    try {
      const response = await axios.get(`${baseurl}/reviews/view-reviews/${id}`);
      setReviews(response.data?.viewReviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const filledStarColor = "#FFD700"; // Yellow color for filled stars
    const emptyStarColor = "#000000"; // Default color for empty stars
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<StarIcon key={i} style={{ color: filledStarColor }} />);
      } else {
        stars.push(
          <StarBorderIcon key={i} style={{ color: emptyStarColor }} />
        );
      }
    }
    return stars;
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="drawer-header">
        <h3 className="drawer-header-text text-center p-2">Reviews</h3>
        <hr className="drawer-header-divider" />
      </div>
      <Divider />
      <List>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={review._id}>
              <ListItem key={index} className="review-item">
                <ListItemText
                  primary={
                    <span
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {review.username}
                    </span>
                  }
                  secondary={
                    <>
                      <span style={{ fontSize: "20px" }}>
                        {review.comments}
                      </span>
                      <br />
                      <span>{renderStarRating(review.ratings)}</span>
                    </>
                  }
                />
              </ListItem>
              <hr />
            </div>
          ))
        ) : (
          <div>
            <h3
              className="text-center text-danger"
              style={{ alignItems: "center" }}
            >
              No reviews added
            </h3>
          </div>
        )}
      </List>
    </Box>
  );

  return (
    <div className="review-container">
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        View Reviews
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Review;
