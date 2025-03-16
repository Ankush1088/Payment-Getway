import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentsSuccess = () => {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-10 text-center w-full max-w-lg border-t-4 border-green-500">
                <div className="flex items-center justify-center mb-4">
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-green-600 mb-3">
                    Payment Successful!
                </h1>
                <p className="text-lg text-gray-700 mb-2">Your payment has been processed successfully.</p>
                <p className="text-lg text-gray-700 mb-6">Thank you for your purchase!</p>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition duration-300"
                >
                    Go to Home
                </button>
                {reference && (
                    <p className="mt-6 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md border border-gray-300">
                        <strong>Reference ID:</strong> {reference}
                    </p>
                )}
            </div>
        </div>
    );
}

export default PaymentsSuccess;