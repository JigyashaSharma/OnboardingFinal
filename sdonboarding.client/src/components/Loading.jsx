import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading = () => {
    return (
        <div className="flex justify-center items-center space-x-4">
            {/* Spinning Refresh Icon */}
            <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin" />

            {/* Loading Text */}
            <span className="text-lg text-gray-700">Loading...</span>
        </div>
    );
};

export default Loading;
