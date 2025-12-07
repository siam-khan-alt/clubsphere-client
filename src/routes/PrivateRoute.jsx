import { Navigate, useLocation } from 'react-router-dom';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const PrivateRoute = ({ children , requiredRole }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner/>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />; 
        }

  return children;
};

export default PrivateRoute;