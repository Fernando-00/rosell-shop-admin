import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings, Logout} from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userRedux';

export default function Topbar() {
    const dispatch = useDispatch();

    const user = useSelector((state)=> state.persistedReducer.user.currentUser);

    const handleLogout = () =>{
        dispatch(logout());
    };

  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">roselladmin</span>
            </div>
            <div className="topRight">
                
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings/>
                    
                </div>
                <img src={user.img} alt="" className="topAvatar" />
                <div className="topbarIconContainer">
                    <div className="logout">
                        <button className='logoutButton' onClick={handleLogout}>
                            <Logout/>
                            <b>Logout</b>
                        </button>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}
