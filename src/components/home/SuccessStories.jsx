import { useTheme } from '../../contexts/ThemeContext';
import { Fade } from 'react-awesome-reveal';
import { FaQuoteLeft } from 'react-icons/fa';

const SuccessStories = () => {
    const { theme } = useTheme();

    const stories = [
        {
            id: 1,
            name: "Sarah Johnson",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            story: "Thanks to the generous support of donors, I was able to fund my medical treatment and make a full recovery.",
            amount: "$15,000",
            category: "Medical"
        },
        {
            id: 2,
            name: "Michael Chen",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            story: "The community helped me rebuild my small business after a natural disaster. I'm forever grateful.",
            amount: "$25,000",
            category: "Emergency"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            story: "With the support of donors, I completed my education and am now pursuing my dream career.",
            amount: "$12,000",
            category: "Education"
        }
    ];

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                            Success Stories
                        </h2>
                        <p className={`text-lg ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Real stories of hope, resilience, and community support
                        </p>
                    </div>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <Fade key={story.id} direction="up" triggerOnce cascade>
                            <div className={`rounded-lg overflow-hidden shadow-lg ${
                                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            }`}>
                                <div className="relative h-48">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Story';
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <h3 className="text-white text-xl font-semibold">
                                            {story.name}
                                        </h3>
                                        <span className="text-white/80 text-sm">
                                            {story.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <FaQuoteLeft className={`text-2xl ${
                                            theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                                        }`} />
                                    </div>
                                    <p className={`text-lg mb-4 ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {story.story}
                                    </p>
                                    <div className={`flex justify-between items-center pt-4 border-t ${
                                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                        <span className={`font-semibold ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Raised:
                                        </span>
                                        <span className={`text-lg font-bold ${
                                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                            {story.amount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
