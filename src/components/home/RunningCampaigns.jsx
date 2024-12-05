import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import axiosInstance from '../../api/axiosInstance';
import CampaignCard from '../shared/CampaignCard';
import Loading from '../shared/Loading';
import EmptyState from '../shared/EmptyState';
import { Fade } from 'react-awesome-reveal';

const RunningCampaigns = () => {
    const { theme } = useTheme();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axiosInstance.get('/campaigns/running');
                setCampaigns(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching campaigns:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    config: error.config
                });
                setError(error.response?.data?.message || 'Failed to load campaigns. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <p className={`text-lg ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    {error}
                </p>
            </div>
        );
    }

    if (!campaigns.length) {
        return (
            <EmptyState 
                message="No running campaigns at the moment"
                link="/add-campaign"
                linkText="Start a Campaign"
            />
        );
    }

    return (
        <section className={`py-16 px-4 md:px-8 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className="container mx-auto">
                <Fade direction="up" triggerOnce>
                    <h2 className={`text-3xl font-bold text-center mb-12 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                        Running Campaigns
                    </h2>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.map((campaign) => (
                        <Fade key={campaign._id} direction="up" triggerOnce>
                            <CampaignCard campaign={campaign} />
                        </Fade>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/campaigns"
                        className={`inline-block px-6 py-3 rounded-lg ${
                            theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition-colors`}
                    >
                        View All Campaigns
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RunningCampaigns;
