import React, { useState } from "react";
import Card from '@mui/material/Card';
import { useAuth } from "../context/AuthContext";
import { Button, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Phone, MapPin, Star ,Video,MessagesSquare} from "lucide-react";
import { useParams } from "react-router-dom"

import Data from "../../Data/SearchDummy/clinicData"

const Profile = () => {
  const handleOpen = () => {
    window.location.href = 'https://us04web.zoom.us/j/74054512005?pwd=6W2i1hkmTDUhSoKXJnGEVCKntl6jeu.1';
  };
  const { id } = useParams();
  const clinicData = Data[parseInt(id)];
  if (!clinicData) {
    return <div className="p-4">Clinic not found.</div>;
  }
  const { user }=useAuth();

  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [userReviews, setUserReviews] = useState(clinicData.reviews);
  const handleReviewSubmit = () => {
    if (selectedRating > 0 && reviewText.trim()) {
      const newReview = {
        name: user 
        ? (user.displayName || ((email) => email.split('@')[0])(user.email))
        : "Anonymous",
        rating: selectedRating,
        comment: reviewText,
        date: new Date().toLocaleDateString("en-GB")
      };
      setUserReviews([newReview, ...userReviews]);
      setReviewText("");
      setSelectedRating(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{clinicData.name}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-semibold flex items-center">
              <Star className="w-4 h-4 mr-1" /> {clinicData.rating} ({clinicData.totalRatings} Ratings)
            </span>
            <span className="text-sm text-gray-500">{clinicData.yearsExperience} Years in Healthcare</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-1" /> {clinicData.address}
          </div>
        </div>
        <div className="flex flex-row gap-4 overflow-x-auto"
        style={{borderTop:"10px",borderBottom:"10px",borderleft:"10px"}}>
        <Button className="mt-4 md:mt-0 flex items-center space-x-2" style={{borderRadius:"10px",backgroundColor:"green",color:"white",margin:"10px"
        }}>
          <Phone className="w-4 h-4 mr-2 " style={{color:"white"}}/> Call: {clinicData.phone}
        </Button>
        <Button className="mt-4 md:mt-0 flex items-center space-x-2" style={{borderRadius:"10px",backgroundColor:"blue",color:"white",margin:"10px"
        }}>
          <MessagesSquare className="w-4 h-4 mr-2 " style={{color:"white"}}/>
          Chat 
        </Button>
        <Button className="mt-4 md:mt-0 flex items-center space-x-2" style={{borderRadius:"10px",backgroundColor:"green",color:"white",margin:"10px"
        }}>
          <Video className="w-4 h-4 mr-2 " style={{color:"white",marginLeft:"5px"}} onClick={handleOpen}/>
          Video Call
        </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2 pr-2">
  {clinicData.photos.map((photo, index) => (
    <div key={index} className="flex-shrink-0">
      <Card
        className="min-w-[200px] max-w-[220px] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
        style={{marginLeft:"10px",
          height:"220px"
        }}
      >
        <img
          src={photo.url}
          alt={photo.label}
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <CardContent className="p-2 text-center text-sm font-medium">
          {photo.label}
        </CardContent>
      </Card>
    </div>
  ))}
</div>


      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

        <div className="mb-6 p-4 border rounded-xl">
          <div className="mb-2 font-medium">Start your Review</div>
          <Rating
            value={selectedRating}
            onChange={(e, newValue) => setSelectedRating(newValue)}
            sx={{
              color: "#facc15", // tailwind yellow-400
              '& .MuiRating-iconFilled': { color: "#facc15" },
              '& .MuiRating-iconHover': { color: "#fbbf24" }
            }}
          />


          <textarea
            className="w-full p-2 border rounded-md text-sm"
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <Button className="mt-2" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </div>

        {userReviews.map((review, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{review.name}</div>
                <div className="text-xs text-gray-500">{review.date}</div>
              </div>
              <div className="flex space-x-1 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
