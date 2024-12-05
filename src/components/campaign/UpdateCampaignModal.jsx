import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const UpdateCampaignModal = ({ isOpen, onClose, campaign, onUpdate }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        goal: '',
        deadline: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (campaign) {
            setFormData({
                title: campaign.title || '',
                category: campaign.category || '',
                goal: campaign.goal || '',
                deadline: campaign.deadline ? campaign.deadline.split('T')[0] : '',
                description: campaign.description || '',
                image: campaign.image || ''
            });
        }
    }, [campaign]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.patch(`/api/v1/campaigns/${campaign._id}`, {
                ...formData,
                email: user.email
            });

            if (response.data.success) {
                toast.success('Campaign updated successfully!');
                onUpdate(response.data.campaign);
                onClose();
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update campaign');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className={`relative w-full max-w-2xl p-6 rounded-lg shadow-xl ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
                }`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>

                    <h2 className="text-2xl font-bold mb-6">Update Campaign</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Select Category</option>
                                <option value="Medical">Medical</option>
                                <option value="Education">Education</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Community">Community</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Goal Amount ($)</label>
                            <input
                                type="number"
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                required
                                min="1"
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className={`w-full px-4 py-2 rounded-md ${
                                    theme === 'dark' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-gray-100'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className={`px-4 py-2 rounded-md ${
                                    theme === 'dark'
                                        ? 'bg-gray-600 hover:bg-gray-700'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                } transition-colors`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 rounded-md bg-blue-600 text-white ${
                                    loading 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:bg-blue-700'
                                } transition-colors`}
                            >
                                {loading ? 'Updating...' : 'Update Campaign'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCampaignModal;
