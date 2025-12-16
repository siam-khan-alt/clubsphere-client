import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const ErrorPage = ({ status = '404', title = 'Page Not Found', message = 'Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.' }) => {
        const statusColor = (status === '404' || status === '403') ? 'text-indigo-600' : 'text-red-600';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="text-center p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-300 hover:shadow-2xl">
                
                <p className={`font-extrabold text-7xl sm:text-9xl mb-4 ${statusColor} dark:${statusColor.replace('600', '400')} transition duration-500`}>
                    {status}
                </p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <FiAlertTriangle className={`w-6 h-6 ${statusColor}`} />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        {title}
                    </h1>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {message}
                </p>

                <Link
                    to="/"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.02]`}
                >
                    <FiHome className="w-5 h-5 mr-2" />
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
