import { useTheme } from '../../contexts/ThemeContext';

const LoadingSpinner = () => {
    const { theme } = useTheme();
    
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className={`animate-spin rounded-full h-16 w-16 border-4 ${
                theme === 'dark' 
                    ? 'border-gray-600 border-t-blue-500' 
                    : 'border-gray-200 border-t-blue-600'
            }`}></div>
        </div>
    );
};

export default LoadingSpinner;
