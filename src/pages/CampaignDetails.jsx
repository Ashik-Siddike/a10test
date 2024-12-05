import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donationAmount, setDonationAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/campaigns/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
                toast.error('Failed to load campaign details');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();
        
        // Check if campaign has ended
        if (new Date(campaign.deadline) < new Date()) {
            toast.error('This campaign has ended and is no longer accepting donations');
            return;
        }

        // Validate donation amount
        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount < campaign.minimumDonation) {
            toast.error(`Minimum donation amount is $${campaign.minimumDonation}`);
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/v1/donations', {
                campaignId: campaign._id,
                amount,
                userEmail: user.email,
                userName: user.displayName
            });
            
            toast.success('Donation successful! Thank you for your support.');
            navigate('/my-donations');
        } catch (error) {
            console.error('Error making donation:', error);
            toast.error('Failed to process donation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700">Campaign not found</h2>
            </div>
        );
    }

    const isExpired = new Date(campaign.deadline) < new Date();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                            {isExpired ? 'Campaign Ended' : 'Active Campaign'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
                            <div className="space-y-3">
                                <p className="text-gray-600">
                                    <span className="font-medium">Type:</span> {campaign.campaignType}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Created by:</span> {campaign.userName}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Minimum Donation:</span> ${campaign.minimumDonation}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Deadline:</span>{' '}
                                    {new Date(campaign.deadline).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-600 whitespace-pre-line">{campaign.description}</p>
                            </div>
                        </div>

                        <div>
                            {!isExpired && (
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
                                    <form onSubmit={handleDonate}>
                                        <div className="mb-4">
                                            <label 
                                                htmlFor="amount" 
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Donation Amount (USD)
                                            </label>
                                            <input
                                                type="number"
                                                id="amount"
                                                value={donationAmount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                min={campaign.minimumDonation}
                                                step="0.01"
                                                required
                                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={`Minimum $${campaign.minimumDonation}`}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        >
                                            {isSubmitting ? 'Processing...' : 'Donate Now'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
