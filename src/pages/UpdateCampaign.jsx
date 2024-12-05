import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const UpdateCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [campaign, setCampaign] = useState({
        title: '',
        image: '',
        campaignType: '',
        description: '',
        minimumDonation: '',
        deadline: '',
        userEmail: '',
        userName: ''
    });

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/campaigns/${id}`);
                const campaignData = response.data;
                
                // Check if the campaign belongs to the current user
                if (campaignData.userEmail !== user.email) {
                    toast.error("You don't have permission to edit this campaign");
                    navigate('/my-campaigns');
                    return;
                }

                // Format the date to YYYY-MM-DD for the input field
                const formattedDate = new Date(campaignData.deadline)
                    .toISOString()
                    .split('T')[0];

                setCampaign({
                    ...campaignData,
                    deadline: formattedDate
                });
            } catch (error) {
                console.error('Error fetching campaign:', error);
                toast.error('Failed to load campaign details');
                navigate('/my-campaigns');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchCampaign();
        }
    }, [id, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await axios.put(`http://localhost:5000/api/v1/campaigns/${id}`, campaign);
            toast.success('Campaign updated successfully');
            navigate('/my-campaigns');
        } catch (error) {
            console.error('Error updating campaign:', error);
            toast.error('Failed to update campaign');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Update Campaign</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Campaign Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={campaign.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={campaign.image}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700 mb-2">
                            Campaign Type
                        </label>
                        <select
                            id="campaignType"
                            name="campaignType"
                            value={campaign.campaignType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a type</option>
                            <option value="personal issue">Personal Issue</option>
                            <option value="startup">Startup</option>
                            <option value="business">Business</option>
                            <option value="creative ideas">Creative Ideas</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={campaign.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="minimumDonation" className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Donation Amount
                        </label>
                        <input
                            type="number"
                            id="minimumDonation"
                            name="minimumDonation"
                            value={campaign.minimumDonation}
                            onChange={handleChange}
                            required
                            min="1"
                            step="0.01"
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                            Deadline
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={campaign.deadline}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Email
                        </label>
                        <input
                            type="email"
                            value={campaign.userEmail}
                            disabled
                            className="w-full px-4 py-2 border rounded-md bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Name
                        </label>
                        <input
                            type="text"
                            value={campaign.userName}
                            disabled
                            className="w-full px-4 py-2 border rounded-md bg-gray-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                            submitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {submitting ? 'Updating...' : 'Update Campaign'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCampaign;
