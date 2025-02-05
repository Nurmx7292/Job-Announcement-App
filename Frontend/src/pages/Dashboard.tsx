import { useState } from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { JobApi } from "../services/JobService";
import { UserApi } from "../services/UserApi";
import { DashboardSideBar } from "../components/DashboardSideBar";
import { useTranslation } from "react-i18next";

export function Dashboard() {
    const { t } = useTranslation();
    const { data: response, error, isLoading } = JobApi.useFetchAllJobsQuery();
    const { data: usersData, error: userError, isLoading: userLoading } = UserApi.useGetAllUsersQuery();
    const [selectedTab, setSelectedTab] = useState<"jobs" | "users">("jobs");

    if (isLoading || userLoading) return <p>Loading...</p>;
    if (error || userError) return <p>Error loading data</p>;
    if (!response || !response.data || !usersData || !usersData.data) return <p>No data available</p>;

    const categoryData = Object.values(
        response.data.reduce((acc: any, job: any) => {
            acc[job.category] = acc[job.category] || { name: job.category, count: 0 };
            acc[job.category].count += 1;
            return acc;
        }, {})
    );
    console.log(usersData.data);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BE0"];

    return (
        <div className="mt-[30px]">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">{t("admin_dashboard")}</h1>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setSelectedTab("jobs")}
                    className={`py-2 px-4 rounded ${selectedTab === "jobs" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                    {t("jobs")}
                </button>
                <button
                    onClick={() => setSelectedTab("users")}
                    className={`py-2 px-4 rounded ${selectedTab === "users" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                    {t("users")}
                </button>
            </div>

            {/* Job charts */}
            {selectedTab === "jobs" && (
                <>
                    <div style={{ width: "65%", height: 250, margin: "0 auto" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={response.data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="salary" fill="#8874d8" barSize={20} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ width: "50%", maxWidth: 400, height: 300, margin: "20px auto" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            {/* User Data Display */}
            {selectedTab === "users" && (
                <>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Users</h2>
                        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {usersData.data.map((user: any) => (
                                <DashboardSideBar key={user.id} user={user} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
