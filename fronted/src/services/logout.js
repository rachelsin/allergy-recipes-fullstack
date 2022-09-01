import React, { useEffect } from 'react'
import localStorageFunction from "./localStorage";

export default function Logout() {
    useEffect(() => {
        localStorageFunction.logout();
        window.location = "/";
    }, [])
    return null
}
