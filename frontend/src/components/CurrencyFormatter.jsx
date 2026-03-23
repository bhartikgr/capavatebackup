import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const CurrencyFormatter = ({ amount, currency, digit = 2 }) => {
    const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
    const [currencyMap, setCurrencyMap] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch currency symbols from API
    useEffect(() => {
        const getCountrySymbolList = async () => {
            let formData = { id: "" };
            try {
                const res = await axios.post(
                    apiUrlRound + "getallcountrySymbolList",
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

                const respo = res.data.results;

                // Create a map of currency_code -> currency_symbol for quick lookup
                const currencySymbolMap = {};
                respo.forEach(country => {
                    if (country.currency_code && !currencySymbolMap[country.currency_code]) {
                        currencySymbolMap[country.currency_code] = {
                            symbol: country.currency_symbol,
                            name: country.currency_name
                        };
                    }
                });

                setCurrencyMap(currencySymbolMap);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching currency symbols:', err);
                setLoading(false);
            }
        };

        getCountrySymbolList();
    }, [apiUrlRound]);

    // ✅ FIXED: Safe number parsing function
    const parseAmount = (value) => {
        if (value === null || value === undefined || value === '') return 0;

        // If it's already a number, return it
        if (typeof value === 'number') return value;

        // If it's a string, clean it and parse
        if (typeof value === 'string') {
            // Remove any existing currency symbols, commas, and extra spaces
            const cleaned = value.replace(/[$,€£¥₹\s]/g, '');
            const parsed = parseFloat(cleaned);
            return isNaN(parsed) ? 0 : parsed;
        }

        return 0;
    };

    // ✅ FIXED: Proper rounding function
    const roundToNearest = (num, digits = 2) => {
        // Handle floating point precision issues
        const multiplier = Math.pow(10, digits);
        // Use Math.round with small epsilon to handle floating point errors
        return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
    };

    // ✅ FIXED: Format with proper rounding to nearest integer for 44,999.97 -> 45,000
    const formatCurrency = (amount, currency, digits = digit) => {
        // Parse amount safely
        const numAmount = parseAmount(amount);

        // Handle NaN or invalid numbers
        if (isNaN(numAmount)) return `${currency || ''} 0.00`;

        const cleanCurrency = currency?.trim()?.toUpperCase() || '';

        // Get symbol from map or fallback
        const currencyInfo = currencyMap[cleanCurrency];
        const symbol = currencyInfo?.symbol || '';

        // ✅ FIX: Special rounding for values very close to next integer
        let roundedAmount = numAmount;

        // Check if value is very close to next integer (like 44,999.97 -> 45,000)
        const nearestInteger = Math.round(numAmount);
        const difference = Math.abs(nearestInteger - numAmount);

        // If difference is less than 0.03, round to nearest integer (for display purposes)
        if (difference < 0.03 && digits === 2) {
            roundedAmount = nearestInteger;
        } else {
            // Normal rounding
            roundedAmount = roundToNearest(numAmount, digits);
        }

        try {
            // Use Intl.NumberFormat with exact digits
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: cleanCurrency,
                minimumFractionDigits: digits,
                maximumFractionDigits: digits,
            });

            return formatter.format(roundedAmount);
        } catch (error) {
            // Fallback: Manual formatting
            // Format with commas and fixed decimals
            const formattedNumber = roundedAmount.toLocaleString("en-US", {
                minimumFractionDigits: digits,
                maximumFractionDigits: digits,
            });

            if (symbol) {
                return `${symbol} ${formattedNumber}`;
            }
            return `${cleanCurrency} ${formattedNumber}`;
        }
    };

    if (loading) {
        return <span>...</span>;
    }

    const formattedAmount = formatCurrency(amount, currency, digit);

    return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;