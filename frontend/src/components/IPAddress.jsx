import React, { useState, useEffect } from "react";

export default function IPAddress() {
    const [ClientIP, setClientIP] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Get IP Address
        const getIP = async () => {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                setClientIP(data.ip);
            } catch (error) {
                console.error("Failed to fetch IP", error);
            }
        };

        // Get Current Date
        const formatDate = () => {
            const date = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formatted = date.toLocaleDateString('en-US', options);
            setCurrentDate(formatted);
        };

        getIP();
        formatDate();
    }, []);

    return (
        <>
            <div className="d-flex flex-column gap-1 p-2 ipaddbox">
                <h4>Date: <span>({currentDate})</span></h4>
                <h4>IP Address: <span>{ClientIP}</span></h4>
            </div>
        </>
    )
}