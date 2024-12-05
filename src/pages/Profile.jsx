import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const { theme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });
    const [loading, setLoading] = useState(false);

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
            await updateUserProfile(formData.displayName, formData.photoURL);
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error('Update error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || '',
            photoURL: user?.photoURL || ''
        });
        setIsEditing(false);
    };

    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'
        }`}>
            <div className={`max-w-3xl mx-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-xl rounded-lg overflow-hidden`}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Profile</h1>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                <FaEdit /> Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="space-y-8">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                                <img
                                    src={isEditing ? formData.photoURL : user?.photoURL}
                                    alt={user?.displayName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/128?text=User';
                                    }}
                                />
                            </div>
                            {isEditing && (
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="Enter photo URL"
                                    className={`w-full max-w-md px-4 py-2 rounded-md ${
                                        theme === 'dark' 
                                            ? 'bg-gray-700 text-white' 
                                            : 'bg-gray-100'
                                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Display Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-md ${
                                            theme === 'dark' 
                                                ? 'bg-gray-700 text-white' 
                                                : 'bg-gray-100'
                                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                ) : (
                                    <p className="text-xl">{user?.displayName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <p className="text-xl">{user?.email}</p>
                            </div>

                            {isEditing && (
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-md ${
                                            loading 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-green-600 hover:bg-green-700'
                                        } text-white transition-colors`}
                                    >
                                        <FaCheck /> Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
