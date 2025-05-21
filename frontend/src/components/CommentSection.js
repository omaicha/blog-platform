import { useState } from 'react';
import { Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';


const CommentSection = ({ comments, postId, token }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/posts/${postId}/comments`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCommentText('');
      // You would typically refresh comments here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <h4>Comments</h4>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroupItem key={index}>
            <strong>{comment.user.username}</strong>: {comment.text}
          </ListGroupItem>
        ))}
      </ListGroup>
      
      <Form onSubmit={handleSubmit} className="mt-3">
        <FormGroup>
          <Input
            type="textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
          />
        </FormGroup>
        <Button color="primary" type="submit">Post Comment</Button>
      </Form>
    </div>
  );
};
