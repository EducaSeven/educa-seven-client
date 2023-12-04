import React from 'react';



const Congratulations: React.FC = () => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <div className="flex w-full h-[10%] border-b border-gray-500">
                <span className="px-4 text-[32px] text-white font-['Lexend Deca']">Educa7</span>
            </div>
            <div className="text-center text-white text-[32px] font-['Lexend Deca'] mt-[3%]">Parabéns, Jorge!</div>
            <div className="text-center text-white text-sm font-['Lexend Deca']">sua pontuação: 1284</div>
            <div className="flex h-full items-center justify-center">
                <div className=" w-[5%] h-full mt-[30%]">
                    <div className="text-center text-white text-base font-['Lexend Deca']">Cleiton</div>
                    <div className="text-center text-white text-[10px] font-['Lexend Deca']">1720</div>
                    <div className=" w-full h-full bg-gray-500 rounded-lg"></div>
                </div>
                <div className=" w-[5%] h-full mt-[15%]">
                    <div className="text-center text-white text-base font-['Lexend Deca']">Cleiton</div>
                    <div className="text-center text-white text-[10px] font-['Lexend Deca']">1720</div>
                    <div className=" flex w-full h-full bg-amber-300 rounded-lg "></div>
                </div>
                <div className=" w-[5%] h-full mt-[40%]">
                    <div className="text-center text-white text-base font-['Lexend Deca']">Cleiton</div>
                    <div className="text-center text-white text-[10px] font-['Lexend Deca']">1720</div>
                    <div className=" flex w-full h-full bg-amber-700 rounded-lg "></div>
                </div>
            </div>
        </div>
    );
};

export default Congratulations;