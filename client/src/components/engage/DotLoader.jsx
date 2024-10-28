import React, { useState, useEffect } from 'react';

const DotLoader = () => {
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        const messages = [
            "Finding the best deals for you...",
            "Planning your next adventure...",
            "Exploring exciting destinations...",
            "Preparing your travel itinerary...",
            "Packing your virtual suitcase...",
            "Searching high and low for the perfect destination...",
            "Dreaming up your next getaway...",
            "Checking flights, hotels, and activities...",
            "Crafting your personalized travel experience...",
            "Building memories one trip at a time...",
            "Charting your course to adventure...",
            "Sifting through travel options just for you...",
            "Creating unforgettable travel experiences...",
            "Scouting out hidden gems around the globe...",
            "Designing your dream vacation...",
            "Navigating the world of travel possibilities...",
            "Tailoring your trip to perfection...",
            "Uncovering travel treasures for you...",
            "Crafting a journey filled with excitement...",
            "Building anticipation for your upcoming trip...",
            "Roaming the virtual globe for your next destination...",
            "Planning the ultimate travel escape for you...",
            "Searching for the perfect getaway spot...",
            "Customizing your travel plans with care...",
            "Dreaming big for your next travel adventure..."
        ];

        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setLoadingMessage(messages[randomIndex]);
        }, 2000); // Change the duration as needed

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex items-center gap-8'>
            <div className="loader"></div>
            <div className='text-xl font-semibold'>
                {loadingMessage || 'Loading'}
            </div>
        </div>
    );
};

export default DotLoader;
