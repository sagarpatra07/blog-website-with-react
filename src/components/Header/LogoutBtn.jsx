import React from "react";
import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth.service.js';
import { logout } from '../../store/authSlice.js';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.log(err);
        }
        dispatch(logout());
    };

    return (
        <button 
            onClick={logoutHandler}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all duration-200 cursor-pointer"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;