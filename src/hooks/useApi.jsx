import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const useApi = () => {
    const [loading, setLoading] = useState(false);

    const addCampaign = async (campaignData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/campaigns', campaignData);
            toast.success('Campaign created successfully!');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong!');
            throw error;
        }
    };

    const updateCampaign = async (id, campaignData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(`/campaigns/${id}`, campaignData);
            toast.success('Campaign updated successfully!');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong!');
            throw error;
        }
    };

    const deleteCampaign = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/campaigns/${id}`);
            toast.success('Campaign deleted successfully!');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong!');
            throw error;
        }
    };

    const addDonation = async (donationData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/donations', donationData);
            toast.success('Donation successful!');
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong!');
            throw error;
        }
    };

    return {
        loading,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        addDonation
    };
};

export default useApi; 