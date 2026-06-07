import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Award, Code, Calendar, Trophy, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const LeetCodeStatsPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userStats, setUserStats] = useState(null);
    const [contestStats, setContestStats] = useState(null);

    useEffect(() => {
        if (user?.leetcodeId) {
            fetchLeetCodeStats();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchLeetCodeStats = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Fetching stats for username:', user.leetcodeId);

            // Fetch user stats
            const userResponse = await fetch(`/api/leetcode/user/${user.leetcodeId}`);
            console.log('User stats response status:', userResponse.status);

            if (!userResponse.ok) {
                const errorText = await userResponse.text();
                console.error('User stats error:', errorText);
                throw new Error(`Failed to fetch user stats (${userResponse.status}). Please check your LeetCode username.`);
            }

            const userData = await userResponse.json();
            console.log('User stats data:', userData);
            setUserStats(userData);

            // Fetch contest stats
            const contestResponse = await fetch(`/api/leetcode/user/${user.leetcodeId}/contests`);
            console.log('Contest stats response status:', contestResponse.status);

            if (!contestResponse.ok) {
                const errorText = await contestResponse.text();
                console.error('Contest stats error:', errorText);
                throw new Error(`Failed to fetch contest stats (${contestResponse.status}).`);
            }

            const contestData = await contestResponse.json();
            console.log('Contest stats data:', contestData);
            setContestStats(contestData);
        } catch (err) {
            console.error('Error fetching LeetCode stats:', err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // If user hasn't set their LeetCode username
    if (!user?.leetcodeId) {
        return (
            <div className="min-h-screen text-white font-sans" style={{ background: 'linear-gradient(to bottom, #1F0C2F, #0A0A0A)' }}>
                <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-white">
                        PrepLC
                    </div>
                    <Link to="/practice" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Practice
                    </Link>
                </header>

                <main className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">LeetCode Stats</h1>
                        <p className="text-white/60">View your LeetCode performance and statistics</p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-yellow-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-yellow-400">LeetCode Username Not Set</h2>
                        <p className="text-white/70 mb-6">
                            You need to link your LeetCode profile to view your statistics.
                        </p>
                        <Link
                            to="/profile"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-all"
                        >
                            Go to My Profile
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: 'linear-gradient(to bottom, #1F0C2F, #0A0A0A)' }}>
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-white">
                    PrepLC
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/practice" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Practice
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="font-bold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <span>{user?.name}</span>
                        </button>
                        {/* Dropdown */}
                        <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                            <div className="p-2">
                                <Link to="/profile" className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm">
                                    My Profile
                                </Link>
                                <Link to="/leetcode-stats" className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm">
                                    LeetCode Stats
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm text-red-400"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">LeetCode Stats</h1>
                    <p className="text-white/60">Performance overview for <span className="text-primary-light font-medium">@{user?.leetcodeId}</span></p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-white/60">Loading your LeetCode stats...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-red-400">Error Loading Stats</h2>
                        <p className="text-white/70 mb-6">{error}</p>
                        <button
                            onClick={fetchLeetCodeStats}
                            className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Submission Stats */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6 text-primary-light" />
                                Problem Solving Stats
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Total Solved */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/60 text-sm font-medium">Total Solved</span>
                                        <Code className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-blue-400">
                                        {userStats?.submitStats?.acSubmissionNum?.[0]?.count || 0}
                                    </div>
                                    <div className="text-xs text-white/40 mt-1">
                                        of {userStats?.submitStats?.totalSubmissionNum?.[0]?.count || 0} submissions
                                    </div>
                                </div>

                                {/* Easy */}
                                <div className="bg-white/5 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/60 text-sm font-medium">Easy</span>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-3xl font-bold text-green-400">
                                        {userStats?.submitStats?.acSubmissionNum?.[1]?.count || 0}
                                    </div>
                                    <div className="text-xs text-white/40 mt-1">
                                        of {userStats?.submitStats?.totalSubmissionNum?.[1]?.count || 0} submissions
                                    </div>
                                </div>

                                {/* Medium */}
                                <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/60 text-sm font-medium">Medium</span>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    </div>
                                    <div className="text-3xl font-bold text-yellow-400">
                                        {userStats?.submitStats?.acSubmissionNum?.[2]?.count || 0}
                                    </div>
                                    <div className="text-xs text-white/40 mt-1">
                                        of {userStats?.submitStats?.totalSubmissionNum?.[2]?.count || 0} submissions
                                    </div>
                                </div>

                                {/* Hard */}
                                <div className="bg-white/5 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/60 text-sm font-medium">Hard</span>
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    </div>
                                    <div className="text-3xl font-bold text-red-400">
                                        {userStats?.submitStats?.acSubmissionNum?.[3]?.count || 0}
                                    </div>
                                    <div className="text-xs text-white/40 mt-1">
                                        of {userStats?.submitStats?.totalSubmissionNum?.[3]?.count || 0} submissions
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contest Stats */}
                        {contestStats?.userContestRanking && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-primary-light" />
                                    Contest Performance
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    {/* Contests Attended */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/60 text-sm font-medium">Contests</span>
                                            <Calendar className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-purple-400">
                                            {contestStats.userContestRanking.attendedContestsCount || 0}
                                        </div>
                                        <div className="text-xs text-white/40 mt-1">attended</div>
                                    </div>

                                    {/* Rating */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/60 text-sm font-medium">Rating</span>
                                            <TrendingUp className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-blue-400">
                                            {Math.round(contestStats.userContestRanking.rating || 0)}
                                        </div>
                                        <div className="text-xs text-white/40 mt-1">current rating</div>
                                    </div>

                                    {/* Global Ranking */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/60 text-sm font-medium">Global Rank</span>
                                            <Award className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-400">
                                            {contestStats.userContestRanking.globalRanking?.toLocaleString() || 'N/A'}
                                        </div>
                                        <div className="text-xs text-white/40 mt-1">worldwide</div>
                                    </div>

                                    {/* Top Percentage */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/60 text-sm font-medium">Top</span>
                                            <Trophy className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-400">
                                            {contestStats.userContestRanking.topPercentage?.toFixed(2) || 0}%
                                        </div>
                                        <div className="text-xs text-white/40 mt-1">percentile</div>
                                    </div>
                                </div>

                                {/* Contest History */}
                                {contestStats.userContestRankingHistory && contestStats.userContestRankingHistory.length > 0 && (
                                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
                                        <div className="p-4 border-b border-white/10">
                                            <h3 className="text-lg font-semibold">Recent Contests</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-white/5 border-b border-white/10 text-white/70 text-sm uppercase tracking-wider">
                                                        <th className="p-4 font-medium">Contest</th>
                                                        <th className="p-4 font-medium">Rating</th>
                                                        <th className="p-4 font-medium">Ranking</th>
                                                        <th className="p-4 font-medium">Problems Solved</th>
                                                        <th className="p-4 font-medium">Finish Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {contestStats.userContestRankingHistory.filter(c => c.attended).slice(0, 10).map((contest, idx) => (
                                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                            <td className="p-4 font-medium text-white">
                                                                {contest.contest?.title || 'N/A'}
                                                            </td>
                                                            <td className="p-4">
                                                                <span className={`font-semibold ${contest.rating > 1500 ? 'text-green-400' : contest.rating > 1200 ? 'text-blue-400' : 'text-white/80'}`}>
                                                                    {Math.round(contest.rating || 0)}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-white/80">
                                                                {contest.ranking?.toLocaleString() || 'N/A'}
                                                            </td>
                                                            <td className="p-4 text-white/80">
                                                                {contest.problemsSolved || 0} / {contest.totalProblems || 0}
                                                            </td>
                                                            <td className="p-4 text-white/60 text-sm">
                                                                {contest.finishTimeInSeconds
                                                                    ? `${Math.floor(contest.finishTimeInSeconds / 60)} min`
                                                                    : 'N/A'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default LeetCodeStatsPage;
