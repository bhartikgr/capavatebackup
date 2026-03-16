// src/components/Analytics.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/config';

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        const trackVisit = async () => {
            try {
                // Get or create persistent device ID
                const isAdminPage = location.pathname.startsWith('/admin');
                if (isAdminPage) {
                    console.log('🔒 Skipping analytics for admin page:', location.pathname);
                    return; // Don't track admin pages
                }
                const deviceId = await getOrCreateDeviceId();

                // Get visitor data
                const visitorData = {
                    page_url: window.location.href,
                    page_path: location.pathname,
                    referrer: document.referrer || 'direct',
                    user_agent: navigator.userAgent,
                    screen_size: `${window.innerWidth}x${window.innerHeight}`,
                    language: navigator.language,
                    timestamp: new Date().toISOString(),
                };

                // First get IP address
                let ipAddress = '';
                try {
                    const ipResponse = await fetch('https://api.ipify.org?format=json', {
                        signal: AbortSignal.timeout(5000)
                    });
                    if (ipResponse.ok) {
                        const ipData = await ipResponse.json();
                        ipAddress = ipData.ip || '';
                    }
                } catch (ipError) {
                    // Silent fail - IP is optional
                }

                // Get location from IP
                let country = '';
                let state = '';

                if (ipAddress) {
                    try {
                        const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
                            signal: AbortSignal.timeout(5000)
                        });
                        if (locationResponse.ok) {
                            const locationData = await locationResponse.json();
                            console.log('Location data:', locationData);

                            country = locationData.country_name || '';
                            state = locationData.region ||
                                locationData.state ||
                                locationData.province || '';
                        }
                    } catch (locationError) {
                        console.log('Could not fetch location data:', locationError);
                    }
                }

                // Prepare data for your database
                const dbData = {
                    country: country || null,
                    state: state || null,
                    ip_address: ipAddress || null,
                    device_id: deviceId, // Use persistent device ID
                    device_type: getDeviceType(),
                    is_mobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1 : 0, // Convert to number for MySQL tinyint
                    page_url: visitorData.page_url,
                    referrer: visitorData.referrer,
                    user_agent: visitorData.user_agent,
                };

                // Send to your backend API

                const result = await sendToDatabase(dbData);

                if (result && result.success) {
                    console.log('✅ Visitor tracked successfully');
                } else {
                    console.warn('⚠️ Failed to track visitor, saving to localStorage');
                    saveToLocalStorage(dbData);
                }

                // Google Analytics (optional)
                if (window.gtag) {
                    window.gtag('event', 'page_view', {
                        page_path: location.pathname,
                        country: country || 'unknown',
                        state: state || 'unknown',
                        device_type: dbData.device_type
                    });
                }

            } catch (error) {
                console.error('Analytics tracking error:', error);
                // Fallback: save basic data to localStorage
                saveToLocalStorage({
                    path: location.pathname,
                    timestamp: new Date().toISOString()
                });
            }
        };

        // Use setTimeout to avoid blocking initial render
        setTimeout(trackVisit, 1000);

    }, [location]);

    return null;
};

/**
 * Get or create a PERSISTENT device ID
 * 1. First tries localStorage
 * 2. Then tries cookies
 * 3. Creates new one if none exists
 */
const getOrCreateDeviceId = () => {
    // Try localStorage first (most reliable for single domain)
    try {
        let deviceId = localStorage.getItem('device_id');

        // If exists in localStorage, return it
        if (deviceId && deviceId.length > 10) {
            console.log('📱 Using existing device ID from localStorage:', deviceId);
            return deviceId;
        }

        // Try cookies as fallback
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'device_id' && value && value.length > 10) {
                console.log('🍪 Using existing device ID from cookie:', value);
                // Also save to localStorage for future
                localStorage.setItem('device_id', value);
                return value;
            }
        }

        // Generate new device ID
        deviceId = generatePersistentDeviceId();
        console.log('🆕 Generated new device ID:', deviceId);

        // Save to both localStorage and cookie
        localStorage.setItem('device_id', deviceId);
        setCookie('device_id', deviceId, 365); // 1 year expiry

        return deviceId;

    } catch (error) {
        console.error('Error getting device ID:', error);
        return generatePersistentDeviceId();
    }
};

/**
 * Generate a persistent device ID
 * Combines multiple stable identifiers
 */
const generatePersistentDeviceId = () => {
    // Get stable browser characteristics
    const components = [];

    // 1. User Agent (contains device info)
    components.push(navigator.userAgent);

    // 2. Platform (OS)
    components.push(navigator.platform);

    // 3. Language
    components.push(navigator.language);

    // 4. Timezone (stable)
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // 5. Screen properties (relatively stable) - FIXED: use window.screen
    if (typeof window !== 'undefined' && window.screen) {
        components.push(`${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`);
    } else {
        components.push('0x0x0'); // Fallback
    }

    // 6. Hardware concurrency (CPU cores)
    components.push(navigator.hardwareConcurrency || 'unknown');

    // 7. Max touch points (mobile detection)
    components.push(navigator.maxTouchPoints || 0);

    // 8. Device memory (if available)
    components.push(navigator.deviceMemory || 'unknown');

    // Join and hash
    const combined = components.join('|');

    // Generate consistent hash
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    // Add prefix and timestamp for uniqueness
    const prefix = getDeviceType().substring(0, 3).toLowerCase();
    const timestamp = Math.floor(Date.now() / 1000).toString(36); // Base36 timestamp

    return `${prefix}_${Math.abs(hash).toString(16).substring(0, 8)}_${timestamp}`;
};

/**
 * Detect device type
 */
const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return 'iOS';
    } else if (/Android/i.test(userAgent)) {
        return 'Android';
    } else if (/Windows/i.test(userAgent)) {
        return 'Windows';
    } else if (/Macintosh|Mac OS/i.test(userAgent)) {
        return 'Mac';
    } else if (/Linux/i.test(userAgent)) {
        return 'Linux';
    } else {
        return 'Unknown';
    }
};

/**
 * Set cookie with expiry
 */
const setCookie = (name, value, days) => {
    try {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
};

/**
 * Send analytics data to backend
 */
/**
 * Send analytics data to backend
 */
const sendToDatabase = async (data) => {
    const apiURL = API_BASE_URL + "api/user/";
    try {
        // Prepare clean data matching your table structure
        const cleanData = {
            country: data.country,
            state: data.state,
            ip_address: data.ip_address,
            device_id: data.device_id,
            device_type: data.device_type,
            is_mobile: data.is_mobile, // Already converted to 0/1
            user_agent: data.user_agent,
            page_url: data.page_url,
            referrer: data.referrer,
        };

        const response = await fetch(apiURL + "track-visitor", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cleanData),
            keepalive: true
        });

        const result = await response.json();

        // ✅ Handle 409 Conflict (Duplicate device) gracefully
        if (response.status === 409) {
            console.log('📱 Device already tracked (returning visitor):', result.message);
            return {
                success: false,
                isDuplicate: true,
                message: result.message,
                status: 409
            };
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${result.message || 'Unknown error'}`);
        }

        // ✅ Success response
        console.log('✅ Visitor tracked successfully:', result.message);
        return {
            success: true,
            ...result
        };

    } catch (error) {
        console.error('Failed to send analytics:', error);

        // Check if it's a 409 error from the error message
        if (error.message.includes('409') || error.message.includes('Conflict')) {
            return {
                success: false,
                isDuplicate: true,
                message: 'Device already tracked',
                status: 409
            };
        }

        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Save failed tracking attempts to localStorage for retry
 */
const saveToLocalStorage = (dbData = {}) => {
    try {
        const visit = {
            ...dbData,
            retry_count: 0,
            last_attempt: new Date().toISOString()
        };

        const pendingVisits = JSON.parse(localStorage.getItem('pending_visits') || '[]');
        pendingVisits.push(visit);

        // Keep only last 50 pending visits
        if (pendingVisits.length > 50) {
            pendingVisits.splice(0, pendingVisits.length - 50);
        }

        localStorage.setItem('pending_visits', JSON.stringify(pendingVisits));
        console.log('💾 Saved to localStorage for retry');

        // Try to retry immediately in background
        setTimeout(retryFailedVisits, 5000);

    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
};

/**
 * Retry failed tracking attempts
 */
const retryFailedVisits = async () => {
    try {
        const pendingVisits = JSON.parse(localStorage.getItem('pending_visits') || '[]');
        if (pendingVisits.length === 0) return;

        console.log(`🔄 Retrying ${pendingVisits.length} failed visits...`);

        const successIndexes = [];

        for (let i = 0; i < pendingVisits.length; i++) {
            const visit = pendingVisits[i];

            // Skip if retried too many times
            if (visit.retry_count > 5) {
                successIndexes.push(i);
                continue;
            }

            try {
                // Clean the data before sending
                const cleanData = {
                    country: visit.country,
                    state: visit.state,
                    ip_address: visit.ip_address,
                    device_id: visit.device_id,
                    device_type: visit.device_type,
                    is_mobile: visit.is_mobile || 0,
                    user_agent: visit.user_agent,
                    page_url: visit.page_url,
                    referrer: visit.referrer,
                };

                const response = await fetch(API_BASE_URL + "api/user/track-visitor", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cleanData),
                    keepalive: true
                });

                if (response.ok) {
                    successIndexes.push(i);
                    console.log(`✅ Retry successful for visit ${i}`);
                } else {
                    // Update retry count
                    pendingVisits[i].retry_count = (visit.retry_count || 0) + 1;
                    pendingVisits[i].last_attempt = new Date().toISOString();
                }
            } catch (error) {
                // Update retry count on error too
                pendingVisits[i].retry_count = (visit.retry_count || 0) + 1;
                pendingVisits[i].last_attempt = new Date().toISOString();
            }
        }

        // Remove successfully sent visits
        if (successIndexes.length > 0) {
            // Remove from highest index to lowest to avoid shifting issues
            successIndexes.sort((a, b) => b - a);
            successIndexes.forEach(index => {
                pendingVisits.splice(index, 1);
            });

            localStorage.setItem('pending_visits', JSON.stringify(pendingVisits));
            console.log(`✅ Removed ${successIndexes.length} successful retries`);
        }

    } catch (error) {
        console.error('Error retrying failed visits:', error);
    }
};

export default Analytics;