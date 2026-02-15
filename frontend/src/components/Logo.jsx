import React from 'react';

const Logo = ({ className = "h-10 w-auto", showText = true, textColor = "text-slate-800" }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative flex items-center justify-center w-10 h-10">
                {/* Engineering Gear & Circuit Logo */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-sm"
                >
                    {/* Hexagonal Nut / Gear Shape */}
                    <path
                        d="M50 10 L85 30 V70 L50 90 L15 70 V30 Z"
                        className="text-primary-600 stroke-current"
                        strokeWidth="8"
                        strokeLinejoin="round"
                    />

                    {/* Internal Circuit Lines */}
                    <path
                        d="M50 50 L85 30"
                        className="text-primary-400 stroke-current"
                        strokeWidth="4"
                    />
                    <path
                        d="M50 50 L15 30"
                        className="text-primary-400 stroke-current"
                        strokeWidth="4"
                    />
                    <path
                        d="M50 50 V90"
                        className="text-primary-400 stroke-current"
                        strokeWidth="4"
                    />

                    {/* Central Core / Vertex */}
                    <circle cx="50" cy="50" r="8" className="fill-white" />
                    <circle cx="50" cy="50" r="4" className="fill-primary-700" />

                    {/* Digital Node Dot */}
                    <circle cx="85" cy="30" r="5" className="fill-secondary-500" />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className={`text-xl font-bold tracking-tight leading-none ${textColor}`}>
                        Eni<span className="text-primary-600">Gov</span>
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] uppercase leading-none mt-0.5">
                        Univ. Carthage
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
