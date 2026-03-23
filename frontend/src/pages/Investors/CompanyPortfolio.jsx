import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUsers, FaBuilding, FaGlobe, FaHandshake, FaChartLine, FaEdit, FaUser, FaUserSecret } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import axios from "axios";
import SideBar from '../../components/Investor/social/SideBar';
import TopBar from '../../components/Investor/social/TopBar';
const CompanyPortfolio = ({ userData, userLogin }) => {
    const [showNameToggle, setShowNameToggle] = useState(false);
    const [useScreenName, setUseScreenName] = useState(true);
    const [showJoinWaitlist, setShowJoinWaitlist] = useState(false);
    const [portfolioCompanies, setPortfolioCompanies] = useState([]);
    const [isActiveMember, setIsActiveMember] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const apiURL = "";
    useEffect(() => {
        // Fetch portfolio companies where user is on cap table
        fetchPortfolioCompanies();
        // Fetch follower/following counts
        fetchSocialStats();
        // Check if user is active Angel Network member
        checkActiveMembership();
    }, []);

    const fetchPortfolioCompanies = async () => {
        try {
            // API call to get companies where user has cap table position
            const response = await axios.post(apiURL + "getPortfolioCompanies", {
                user_id: userLogin.id
            });
            if (response.data.results) {
                setPortfolioCompanies(response.data.results);
            }
        } catch (error) {
            console.error("Error fetching portfolio companies:", error);
        }
    };

    const fetchSocialStats = async () => {
        try {
            // API call to get follower and following counts
            const response = await axios.post(apiURL + "getUserSocialStats", {
                user_id: userLogin.id
            });
            if (response.data.results) {
                setFollowerCount(response.data.results.followers || 0);
                setFollowingCount(response.data.results.following || 0);
            }
        } catch (error) {
            console.error("Error fetching social stats:", error);
        }
    };

    const checkActiveMembership = async () => {
        try {
            // API call to check if user is active Angel Network member
            const response = await axios.post(apiURL + "checkAngelNetworkStatus", {
                user_id: userLogin.id
            });
            setIsActiveMember(response.data.isActive || false);
        } catch (error) {
            console.error("Error checking membership:", error);
        }
    };

    const handleJoinWaitlist = async () => {
        try {
            await axios.post(apiURL + "joinAngelNetworkWaitlist", {
                user_id: userLogin.id,
                email: userData.email,
                portfolio_companies: portfolioCompanies.map(company => company.name)
            });
            setShowJoinWaitlist(false);
            alert("You've been added to the waitlist!");
        } catch (error) {
            console.error("Error joining waitlist:", error);
        }
    };

    const handleNavigateToCompany = (companyId) => {
        // Navigate to company dashboard
        window.location.href = `/company-dashboard/${companyId}`;
    };

    const displayedName = 'Test';

    return (
        <></>

    );
};

export default CompanyPortfolio;