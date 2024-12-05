import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const EmptyState = ({ message, link, linkText }) => {
    const { theme } = useTheme();

    return (
        <div className={`flex flex-col items-center justify-center min-h-[60vh] text-center p-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
            <img 
                src="/empty-box.png" 
                alt="Empty State" 
                className="w-32 h-32 mb-4 opacity-50"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128?text=Empty';
                }}
            />
            <h3 className="text-xl font-semibold mb-2">{message}</h3>
            {link && linkText && (
                <Link
                    to={link}
                    className={`inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-md ${
                        theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-colors`}
                >
                    <FaPlus /> {linkText}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
