import { useTheme } from '../../contexts/ThemeContext';

const SkeletonLoader = () => {
    const { theme } = useTheme();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <div 
                    key={index}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                >
                    {/* Image Skeleton */}
                    <div className={`w-full h-48 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    } animate-pulse`}></div>

                    {/* Content Skeleton */}
                    <div className="p-4 space-y-4">
                        {/* Title */}
                        <div className={`h-6 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        } rounded animate-pulse`}></div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className={`h-4 ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            } rounded animate-pulse`}></div>
                            <div className={`h-4 w-3/4 ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            } rounded animate-pulse`}></div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between">
                            <div className={`h-4 w-1/4 ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            } rounded animate-pulse`}></div>
                            <div className={`h-4 w-1/4 ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            } rounded animate-pulse`}></div>
                        </div>

                        {/* Button */}
                        <div className={`h-10 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        } rounded animate-pulse`}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
