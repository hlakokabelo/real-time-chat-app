import { appName } from "../App";
import { getListFriends } from "../database/demoData";
import { useAuth } from "../utils/AuthContext";
import "./sidenav.css";
import { FaComments, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";


export function getInitials(name) {
  
    return name
        .trim()
        .split(/\s+/)
        .map(word => word[0].toUpperCase())
        .join("");
}
export default function SideNav() {
    const { user, handleLogout, talkingWith, changeTalkingTo } = useAuth()
    const userName = user.name


    const friends = getListFriends();
    return (
        <div className="sidenav">
            <div className="logo">
                <h2 style={{ color: '#cedb74' }}> {appName}</h2>
            </div>

            <nav>
                <button className="nav-item active">
                    <FaComments />
                    <span>Chats</span>
                </button>

                {friends.map((friend) => (
                    <button className="nav-item" key={friend.id} onClick={()=>{changeTalkingTo(friend.name)}}>
                        <span>{friend.name}</span>
                    </button>
                ))}

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
