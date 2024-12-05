import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/animations/404.json';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'
        }`}>
            <div className="text-center px-4">
                <div className="w-full max-w-md mx-auto mb-8">
                    <Lottie 
                        animationData={notFoundAnimation} 
                        loop={true}
                    />
                </div>
                <h2 className={`text-4xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                    Page Not Found
                </h2>
                <p className={`mb-8 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className={`inline-block px-6 py-3 rounded-md transition-colors ${
                        theme === 'dark' 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
