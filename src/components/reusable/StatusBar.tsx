import React, { useState } from 'react';
import arrowDown from '../../assets/icons/statusArrowdown.svg';

interface StatusIndicatorProps {
    currentStatus: string; // The current status of the order
    statusOptions: string[]; // Available status options
    onChange: (newStatus: string) => void; // Callback when the status changes
}

const STATUS_STYLES: Record<string, string> = {
    'Processing': 'text-warning-500 bg-[#FEFCE8]',
    'Packing': 'text-blue-600 bg-blue-100',
    'Out-for-Delivery': 'text-orange-600 bg-orange-100',
    'Delivered': 'text-green-600 bg-green-100',
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ currentStatus, statusOptions, onChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changeStatus = (newStatus: string) => {
        onChange(newStatus);
        setIsDropdownOpen(false); // Close the dropdown after status change
    };

    const currentStyle = STATUS_STYLES[currentStatus] || 'text-gray-600 bg-gray-100';

    return (
        <div className="relative">
            <div
                className={`p-4 rounded-xl ${currentStyle} flex w-[220px] justify-between items-center cursor-pointer ${isDropdownOpen ? 'rounded-b-none' : ''}`}
                onClick={toggleDropdown}
            >
                <span>{currentStatus}</span>
                <img
                    className={`w-[16px] h-[16px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    src={arrowDown}
                    alt="Arrow Down"
                />
            </div>
            {isDropdownOpen && (
                <div
                    className="absolute z-10 bg-white border rounded-b-xl"
                    style={{ top: '100%', width: '200px' }}
                >
                    {statusOptions
                        .filter((status) => status !== currentStatus) // Exclude current status from the dropdown
                        .map((status) => (
                            <button
                                key={status}
                                className={`block text-start p-2 w-[220px] ${STATUS_STYLES[status]} hover:bg-warning-100`}
                                onClick={() => changeStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
};

export default StatusIndicator;
