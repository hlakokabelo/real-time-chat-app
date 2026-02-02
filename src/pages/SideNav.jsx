import { appName } from "../App";
import { useAuth } from "../utils/AuthContext";
import "./sidenav.css";
import { FaComments, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";



export default function SideNav() {
    const { user, handleLogout } = useAuth()
    const userName = user.name
    function getInitials(name) {
        return name
            .trim()
            .split(/\s+/)
            .map(word => word[0].toUpperCase())
            .join("");
    }
    return (
        <div className="sidenav">
            <div className="logo">
                <h2 style={{color:'#cedb74'}}> {appName}</h2>
            </div>

            <nav>
                <button className="nav-item active">
                    <FaComments />
                    <span>Chats</span>
                </button>

                <button className="nav-item">
                    <FaUserFriends />
                    <span>Friends</span>
                </button>

                <button className="nav-item">
                    <FaCog />
                    <span>Settings</span>
                </button>
            </nav>

            <div className="profile">
                <div className="avatar">{getInitials(userName)}</div>
                <div className="profile-info">
                    <p className="name">{userName}</p>
                    <span className="status">Online</span>
                </div>


                <FaSignOutAlt className="logout" onClick={() => alert('Logging out')} />

            </div>
        </div>
    );
}
