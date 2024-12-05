import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
    const [text] = useTypewriter({
        words: [
            'Support Innovation',
            'Make Dreams Reality',
            'Create Impact',
            'Change Lives'
        ],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1500
    });

    const bannerData = [
        {
            id: 1,
            title: "Support Innovation",
            description: "Help entrepreneurs bring their ideas to life through crowdfunding",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80",
            buttonText: "Start Funding"
        },
        {
            id: 2,
            title: "Make Dreams Reality",
            description: "Join our community of changemakers and support meaningful projects",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80",
            buttonText: "Explore Projects"
        },
        {
            id: 3,
            title: "Create Impact",
            description: "Your contribution can make a difference in someone's life",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
            buttonText: "Get Started"
        }
    ];

    return (
        <div className="h-[600px]">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full"
            >
                {bannerData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="hero h-full"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">
                                        <span>{text}</span>
                                        <Cursor cursorStyle="|" />
                                    </h1>
                                    <p className="mb-5">{slide.description}</p>
                                    <button className="btn btn-primary">{slide.buttonText}</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner; 