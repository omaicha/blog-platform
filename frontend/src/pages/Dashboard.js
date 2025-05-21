import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      {user && (
        <>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
