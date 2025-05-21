import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="row">
      {posts.map((post) => (
        <div className="col-md-6 mb-4" key={post._id}>
          <div className="card h-100 post-card">
            <div className="card-body">
              <h2 className="card-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <div 
                className="card-text" 
                dangerouslySetInnerHTML={{ 
                  __html: post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content 
                }} 
              />
              <div className="mt-2">
                {post.tags?.map((tag) => (
                  <span key={tag} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-footer bg-transparent">
              <small className="text-muted">
                {new Date(post.createdAt).toLocaleDateString()} • {post.readingTime} min read
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
