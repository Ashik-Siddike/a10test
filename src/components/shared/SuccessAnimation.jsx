import { useEffect } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../../assets/animations/success.json';
import { useTheme } from '../../contexts/ThemeContext';

const SuccessAnimation = ({ onComplete }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 2000); // Animation duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${
            theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
        }`}>
            <div className="w-64 h-64">
                <Lottie
                    animationData={successAnimation}
                    loop={false}
                    autoplay={true}
                />
            </div>
        </div>
    );
};

export default SuccessAnimation;
