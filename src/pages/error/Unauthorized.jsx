
import { use } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Unauthorized = () => {
const {user}=use(AuthContext)
const userRole = user?.role || 'Guest';
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text-body)] p-6">
            <h2 >403</h2>
            <h4 className="text-3xl font-semibold mt-4">Access Denied</h4>
            <p className="mt-2 text-xl text-[var(--color-text-muted)] text-center">
                Sorry, you do not have the required permissions to view this page ({userRole}).
            </p>
            <Link 
                to="/dashboard" 
                className="mt-8 px-6 py-3 bg-[var(--color-primary-accent)] text-white rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
                Go to Dashboard Home
            </Link>
        </div>
    );
};

export default Unauthorized;