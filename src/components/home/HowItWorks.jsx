import { FaRegLightbulb, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Fade, Slide } from "react-awesome-reveal";

const HowItWorks = () => {
    const [text] = useTypewriter({
        words: [
            'Start Your Journey',
            'Make A Difference',
            'Change Lives',
            'Create Impact'
        ],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1500
    });

    const steps = [
        {
            icon: <FaRegLightbulb className="text-4xl" />,
            title: "Start Your Campaign",
            description: "Create your fundraising campaign in minutes. Share your story and set your goal."
        },
        {
            icon: <FaUsers className="text-4xl" />,
            title: "Share With Others",
            description: "Share your campaign with friends, family, and our supportive community."
        },
        {
            icon: <FaHandHoldingHeart className="text-4xl" />,
            title: "Make A Difference",
            description: "Receive donations and make your dream project or cause a reality."
        }
    ];

    return (
        <div className="bg-base-200 py-16">
            <div className="container mx-auto px-4">
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            <span>{text}</span>
                            <Cursor cursorStyle="_" />
                        </h2>
                        <p className="text-base-content/70">Three simple steps to start your crowdfunding journey</p>
                    </div>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <Slide direction="up" delay={index * 100} triggerOnce key={index}>
                            <div className="text-center p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-center mb-4 text-primary">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-base-content/70">{step.description}</p>
                            </div>
                        </Slide>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks; 