import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getPosts, 
  deletePost,
  setCurrentPage 
} from '../features/posts/postSlice';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Home() {
  const dispatch = useDispatch();
  const { 
    posts, 
    isLoading, 
    currentPage, 
    totalPages 
  } = useSelector((state) => state.post);

  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage, dispatch]);

  const handleDelete = async (postId) => {
    if (window.confirm('Delete this post?')) {
      await dispatch(deletePost(postId));
      toast.success('Post deleted!');
      dispatch(getPosts(currentPage)); // Refresh posts
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Latest Posts</h1>
      
      <div className="row">
        {posts?.map((post) => (
          <div className="col-md-6 mb-4" key={post._id}>
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="card-text">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                  <div>
                    <Link 
                      to={`/edit-post/${post._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      )}
    </div>
  );
}

export default Home;
