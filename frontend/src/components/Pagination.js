const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
        )}

        {[...Array(totalPages).keys()].map((num) => (
          <li 
            key={num + 1} 
            className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}
          >
            <button 
              className="page-link" 
              onClick={() => onPageChange(num + 1)}
            >
              {num + 1}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item">
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
