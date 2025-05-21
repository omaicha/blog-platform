import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostById } from '../features/posts/postSlice';
import Spinner from '../components/Spinner';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  if (isLoading) return <Spinner />;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div className="container mt-4">
      <h1>{currentPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
      <p className="text-muted">
        Posted on {new Date(currentPost.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostDetail;
