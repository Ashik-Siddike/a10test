import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import SuccessAnimation from "../components/shared/SuccessAnimation";

const AddCampaign = () => {
    const { user } = useAuth();
    const { addCampaign, loading } = useApi();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        campaignType: "personal",
        description: "",
        minimumDonation: "",
        deadline: "",
    });

    const campaignTypes = [
        { value: "personal", label: "Personal Issue" },
        { value: "startup", label: "Startup" },
        { value: "business", label: "Business" },
        { value: "creative", label: "Creative Ideas" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const campaign = {
            ...formData,
            minimumDonation: parseFloat(formData.minimumDonation),
            userEmail: user.email,
            userName: user.displayName,
            userPhotoURL: user.photoURL,
            createdAt: new Date().toISOString()
        };

        try {
            await addCampaign(campaign);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/my-campaigns');
            }, 2000);
        } catch (error) {
            console.error("Failed to add campaign:", error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-lg shadow-md">
                {showSuccess ? (
                    <SuccessAnimation message="Campaign added successfully!" />
                ) : (
                    <>
                        <h2 className="text-3xl font-bold mb-6 text-center">Create New Campaign</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* ক্যাম্পেইন টাইটেল */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Campaign Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            {/* ইমেজ URL */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            {/* ক্যাম্পেইন টাইপ */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Campaign Type
                                </label>
                                <select
                                    name="campaignType"
                                    value={formData.campaignType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                >
                                    {campaignTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* ডেসক্রিপশন */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                ></textarea>
                            </div>

                            {/* মিনিমাম ডোনেশন */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Minimum Donation Amount (USD)
                                </label>
                                <input
                                    type="number"
                                    name="minimumDonation"
                                    value={formData.minimumDonation}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.01"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            {/* ডেডলাইন */}
                            <div>
                                <label className="block text-base-content/70 text-sm font-bold mb-2">
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            {/* ইউজার ইনফো */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base-content/70 text-sm font-bold mb-2">
                                        User Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        className="w-full px-3 py-2 border rounded-lg bg-base-200"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-base-content/70 text-sm font-bold mb-2">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        value={user.displayName}
                                        className="w-full px-3 py-2 border rounded-lg bg-base-200"
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* সাবমিট বাটন */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Add Campaign"
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddCampaign; 