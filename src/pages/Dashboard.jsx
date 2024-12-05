import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import { FaCrown, FaDollarSign, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [stats, setStats] = useState({
        totalCampaigns: 0,
        activeCampaigns: 0,
        totalDonations: 0,
        totalDonated: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsResponse, activitiesResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/v1/dashboard/stats/${user.email}`),
                    axios.get(`http://localhost:5000/api/v1/dashboard/activities/${user.email}`)
                ]);

                setStats(statsResponse.data);
                setRecentActivities(activitiesResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchDashboardData();
        }
    }, [user]);

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {title}
                    </p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'
        }`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Welcome back, {user?.displayName}!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={FaCrown}
                        title="Total Campaigns"
                        value={stats.totalCampaigns}
                        color="bg-purple-500"
                    />
                    <StatCard
                        icon={FaChartLine}
                        title="Active Campaigns"
                        value={stats.activeCampaigns}
                        color="bg-blue-500"
                    />
                    <StatCard
                        icon={FaHandHoldingHeart}
                        title="Total Donations"
                        value={stats.totalDonations}
                        color="bg-green-500"
                    />
                    <StatCard
                        icon={FaDollarSign}
                        title="Total Donated"
                        value={`$${stats.totalDonated}`}
                        color="bg-yellow-500"
                    />
                </div>

                {/* Recent Activities */}
                <div className={`rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg p-6`}>
                    <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{activity.type}</p>
                                            <p className={`text-sm ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {activity.description}
                                            </p>
                                        </div>
                                        <p className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {new Date(activity.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                No recent activities
                            </p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Link
                        to="/add-campaign"
                        className={`p-4 rounded-lg text-center ${
                            theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition-colors`}
                    >
                        Create New Campaign
                    </Link>
                    <Link
                        to="/my-campaigns"
                        className={`p-4 rounded-lg text-center ${
                            theme === 'dark'
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-purple-500 hover:bg-purple-600'
                        } text-white transition-colors`}
                    >
                        View My Campaigns
                    </Link>
                    <Link
                        to="/my-donations"
                        className={`p-4 rounded-lg text-center ${
                            theme === 'dark'
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                    >
                        View My Donations
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
