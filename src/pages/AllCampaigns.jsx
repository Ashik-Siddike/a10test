import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import CampaignCard from "../components/shared/CampaignCard";
import Loading from "../components/shared/Loading";
import SkeletonLoader from "../components/shared/SkeletonLoader";
import { FaSort } from "react-icons/fa";

const AllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async (order = 'asc') => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/campaigns');
            // Sort the campaigns on the client side
            const sortedCampaigns = response.data.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            });
            setCampaigns(sortedCampaigns);
        } catch (error) {
            console.error('Error fetching campaigns:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
            });
            // The toast error will be handled by the axiosInstance interceptor
        } finally {
            setLoading(false);
        }
    };

    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        fetchCampaigns(newOrder);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <SkeletonLoader key={num} type="card" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">All Campaigns</h2>
                <button
                    onClick={handleSort}
                    className="btn btn-outline gap-2"
                    title={`Sort by minimum donation ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                >
                    <FaSort />
                    Sort by Minimum Donation
                </button>
            </div>

            {campaigns.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No campaigns found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map(campaign => (
                        <CampaignCard
                            key={campaign._id}
                            campaign={campaign}
                        />
                    ))}
                </div>
            )}

            {/* পেজিনেশন (অপশনাল) */}
            {campaigns.length > 0 && (
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <button className="join-item btn btn-outline">1</button>
                        <button className="join-item btn btn-outline btn-active">2</button>
                        <button className="join-item btn btn-outline">3</button>
                        <button className="join-item btn btn-outline">4</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCampaigns;