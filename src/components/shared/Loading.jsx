import { useTheme } from '../../contexts/ThemeContext';

const Loading = () => {
    const { theme } = useTheme();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${
                theme === 'dark' 
                    ? 'border-gray-600 border-t-blue-500' 
                    : 'border-gray-200 border-t-blue-600'
            }`}></div>
            <p className={`mt-4 text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
                Loading...
            </p>
        </div>
    );
};

export default Loading;
