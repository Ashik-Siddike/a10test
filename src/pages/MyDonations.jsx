import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

const MyDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyDonations = async () => {
            try {
                const response = await axiosInstance.get(`/donations/my-donations/${user.email}`);
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchMyDonations();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!donations.length) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Donations Yet</h2>
                <p className="text-gray-500">You haven't made any donations to campaigns yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Donations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                    <div key={donation._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={donation.campaign.image} 
                            alt={donation.campaign.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{donation.campaign.title}</h3>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Amount Donated:</span>{' '}
                                    <span className="text-green-600">${donation.amount}</span>
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Donation Date:</span>{' '}
                                    {new Date(donation.donationDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Campaign Type:</span>{' '}
                                    {donation.campaign.campaignType}
                                </p>
                                <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm text-gray-500">
                                        Campaign Status:{' '}
                                        {new Date(donation.campaign.deadline) > new Date() ? (
                                            <span className="text-green-600">Active</span>
                                        ) : (
                                            <span className="text-red-600">Ended</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDonations;
