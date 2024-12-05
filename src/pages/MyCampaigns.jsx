import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import UpdateCampaignModal from "../components/campaign/UpdateCampaignModal";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import EmptyState from "../components/shared/EmptyState";
import { Fade } from "react-awesome-reveal";

const MyCampaigns = () => {
    const { user } = useAuth();
    const { deleteCampaign } = useApi();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axiosInstance.get(`/user-campaigns/${user.email}`);
                setCampaigns(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch campaigns:", error);
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, [user.email]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteCampaign(id);
                setCampaigns(prev => prev.filter(campaign => campaign._id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your campaign has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Failed to delete campaign.',
                    'error'
                );
            }
        }
    };

    const handleUpdate = (campaign) => {
        setSelectedCampaign(campaign);
        setIsModalOpen(true);
    };

    const onCampaignUpdated = (updatedCampaign) => {
        setCampaigns(prev => prev.map(campaign => 
            campaign._id === updatedCampaign._id ? updatedCampaign : campaign
        ));
    };

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">My Campaigns</h2>
                    <Link to="/add-campaign" className="btn btn-primary">
                        Add New Campaign
                    </Link>
                </div>

                {campaigns.length === 0 ? (
                    <EmptyState message="You haven't created any campaigns yet." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Min. Donation</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign) => (
                                    <Fade key={campaign._id}>
                                        <tr>
                                            <td>
                                                <img
                                                    src={campaign.image}
                                                    alt={campaign.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td>{campaign.title}</td>
                                            <td>{campaign.campaignType}</td>
                                            <td>${campaign.minimumDonation}</td>
                                            <td>
                                                {new Date(campaign.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="space-x-2">
                                                <Link
                                                    to={`/campaign/${campaign._id}`}
                                                    className="btn btn-sm btn-info"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleUpdate(campaign)}
                                                    className="btn btn-sm btn-warning"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(campaign._id)}
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </Fade>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedCampaign && (
                <UpdateCampaignModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    campaign={selectedCampaign}
                    onUpdate={onCampaignUpdated}
                />
            )}
        </div>
    );
};

export default MyCampaigns; 