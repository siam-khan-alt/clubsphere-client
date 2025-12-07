import { Navigate, useLocation } from 'react-router-dom';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default PrivateRoute;