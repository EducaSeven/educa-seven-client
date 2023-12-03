import { useState, useEffect } from 'react';

const SelectAnswer = () => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const intervalDuration = 150;

        const timer = setInterval(() => {
            setProgress((prevProgress) => Math.max(prevProgress - 1, 0));
        }, intervalDuration);

        return () => clearInterval(timer);
    }, []);

    const calculateColor = () => {
        const percent = Math.max(progress, 0);
        const hue = ((percent / 100) * 120).toString(10);
        return `hsl(${hue}, 100%, 50%)`;
    };

    const progressBarStyle = {
        background: `linear-gradient(to right, ${calculateColor()} ${progress}%, transparent ${progress}%)`
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            <div className="flex w-full h-[10%] border-b border-gray-500">
                <span className="px-4 text-[32px] text-white font-normal font-['Lexend Deca']">Educa7</span>
            </div>
            <div className="w-[50%] ml-[6%] mt-[3%] text-white text-sm font-normal font-['Lexend Deca']">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
            <div className="h-full flex items-end px-[6%] mt-[15%] ">
                <div className="flex-col mr-20 h-full w-full  ">
                    <div className="w-full h-[12%] mb-[10%] rounded-lg border border-violet-700"></div>
                    <div className="w-full h-[12%] rounded-lg border border-violet-700"></div>
                </div>
                <div className="flex-col h-full w-full">
                    <div className="w-full h-[12%] mb-[10%] rounded-lg border border-violet-700"></div>
                    <div className="w-full h-[12%] rounded-lg border border-violet-700"></div>
                </div>
            </div>
            <progress
                className="progress w-full absolute bottom-0 h-4" style={progressBarStyle}></progress>
        </div>
    );
};

export default SelectAnswer;
