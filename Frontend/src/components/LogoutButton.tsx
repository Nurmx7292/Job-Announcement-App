import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId, setUser } from "../store/reducers/userSlice";
import { t } from "i18next";

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setUser({ token: null, username: "", email: "", role: null }));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        dispatch(setId(""));
        navigate("/login");
    };

    return (
        <a
            className="p-5 bg-black bg-opacity-60 text-white rounded-lg hover:bg-opacity-80 cursor-pointer"
            onClick={handleLogout}
        >
            {t("logout")}
        </a>
    );
};
