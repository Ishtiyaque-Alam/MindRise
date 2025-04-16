import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

const Tweet = ({ tweet }) => {
  console.log(tweet);
  return (
    <Card sx={{ maxWidth: 600, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1976d2' }}>
            {tweet.name?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertical size={20} />
          </IconButton>
        }
        title={tweet.name}
        subheader={new Date(tweet.timestamp).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {tweet.post}
        </Typography>

        {tweet.comments && tweet.comments.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Comments:
            </Typography>
            <ul style={{ paddingLeft: '1.2rem', marginTop: 4 }}>
              {tweet.comments.map((comment, index) => (
                <li key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {comment}
                  </Typography>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Heart size={20} />
        </IconButton>
        <IconButton aria-label="comment">
          <MessageCircle size={20} />
        </IconButton>
        <IconButton aria-label="share">
          <Share2 size={20} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Tweet;
