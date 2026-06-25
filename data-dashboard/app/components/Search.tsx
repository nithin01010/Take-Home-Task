"use client";

import React, { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const search = () => {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("All");
    const [subregion, setSubRegion] = useState("All");
    const [showFilter, setShowFilter] = useState(false);

    // Temporary states, They store data before clicking on apply
    const [tempRegion, setTempRegion] = useState(region);
    const [tempSubRegion, setTempSubRegion] = useState(subregion);

    const handleOpenFilters = () => {
        setTempRegion(region);
        setTempSubRegion(subregion);
        setShowFilter(true);
    };

    const handleApply = () => {
        setRegion(tempRegion);
        setSubRegion(tempSubRegion);
        setShowFilter(false);
    };

    const handleClear = () => {
        setTempRegion("All");
        setTempSubRegion("All");
    };

    // Regions 
    const regions = ['Africa','Americas','Asia','Europe','Oceania']
    const subRegions = ["Northern","Southern","Eastern","Western"]
    
    


    return (
        <div className="relative w-full max-w-4xl mx-auto p-4">
            <div className="relative w-full flex items-center">
                {/* Search Input */}
                <Search
                    size={18}
                    className="absolute left-4 text-gray-400 pointer-events-none"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full text-black rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {/* Filter Icon Button Inside Search Input */}
                <button
                    className="absolute right-3 p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                    onClick={showFilter ? () => setShowFilter(false) : handleOpenFilters}
                >
                    <SlidersHorizontal size={18} />
                </button>
            </div>

            {/* Floating popover */}
            {showFilter && (
                <div className="absolute right-4 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-6 flex flex-col gap-5 text-black">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-bold text-gray-800 text-lg">Refine Results</span>
                        <button onClick={() => setShowFilter(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Region */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-500">Region</label>
                        <select
                            value={tempRegion}
                            onChange={(e) => {
                                setTempRegion(e.target.value);
                                setTempSubRegion("All"); // Reset subregion when region changes
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none focus:border-blue-500 focus:bg-white transition"
                        >
                            <option value="All">All Regions</option>
                            {regions.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subregion */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-500">Subregion</label>
                        <select
                            value={tempSubRegion}
                            onChange={(e) => setTempSubRegion(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-black outline-none focus:border-blue-500 focus:bg-white transition"
                            disabled={tempRegion === "All"}
                        >
                            <option>All</option>
                            {subRegions.map((subRegion) => (
                                <option key={subRegion} value={subRegion}>{subRegion}</option>
                            ))}
                        </select>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-3 border-t border-gray-100 text-sm">
                        <button
                            onClick={handleClear}
                            className="flex-1 py-2.5 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition"
                        >
                            CLEAR
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 py-2.5 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-sm"
                        >
                            APPLY
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default search;