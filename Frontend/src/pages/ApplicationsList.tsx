// pages/ApplicationsList.jsx
import { useParams } from "react-router-dom";
import { useFetchApplicationsQuery } from "../services/ApplicationApi";

export const ApplicationsList = () => {
    const { id: jobId } = useParams();
    const { data, error, isLoading } = useFetchApplicationsQuery(jobId!);
    console.log(data);

    if (isLoading) return <div>Loading applications...</div>;
    if (error) return <div>Error loading applications.</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Applications for this Job</h2>
            {data && data.data.length > 0 ? (
                data.data.map((app) => (
                    <div key={app._id} className="p-4 mb-4 border rounded">
                        <p>
                            <strong>Email:</strong> {app.applicantId?.email || "N/A"}
                        </p>
                        <p>
                            <strong>Cover Letter:</strong> {app.coverLetter}
                        </p>
                        <p>
                            <strong>Resume:</strong>{" "}
                            <a
                                href={`http://54.165.132.132:3000/${app.resume}`}
                                download
                                className="text-blue-500 hover:underline"
                            >
                                Download Resume
                            </a>
                        </p>
                    </div>
                ))
            ) : (
                <p>No applications found.</p>
            )}
        </div>
    );
};
