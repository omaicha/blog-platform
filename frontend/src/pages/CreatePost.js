import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postSlice';
import PostEditor from '../components/PostEditor';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const { title, content, tags } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.post);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    dispatch(createPost({ title, content, tags: tagsArray }))
      .unwrap()
      .then(() => {
        toast.success('Post created successfully!');
        navigate('/');
      })
      .catch((error) => toast.error(error.message || 'Failed to create post'));
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Create New Post</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <PostEditor content={content} setContent={onContentChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            value={tags}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
