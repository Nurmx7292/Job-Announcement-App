// DashboardSideBar.tsx
import { MdDelete } from "react-icons/md";
import { UserApi } from "../services/UserApi";

interface UserProps {
    user: {
        username: string;
        email: string;
        role: string;
        _id: string;
    };
}

export function DashboardSideBar({ user }: UserProps) {
    const [deleteUser, { isLoading, error }] = UserApi.useDeleteUserMutation();
    console.log(isLoading, error)
    async function handleDelete(id: string) {
        try {
            const result = await deleteUser(id).unwrap();
            console.log(result);
        } catch (err) {
            console.error("Delete error:", err);
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <MdDelete
                onClick={() => handleDelete(user._id)}
                className="top-6 right-4 text-3xl text-red-500 cursor-pointer"
            />
            <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
        </div>
    );
}
