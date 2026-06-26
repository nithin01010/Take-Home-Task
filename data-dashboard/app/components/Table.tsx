'use client'
import { useState, useEffect } from "react"
import TableRow from "./TableRow"
import { useSearchParams } from "next/navigation"

const Table = () => {
    const param = useSearchParams()
    const query = param.toString()
    const headings = ["S.No", "Country", "Region", "Code", "View Details"]
    const [countries, setCountries] = useState<any[]>([])
    const limit = 15;
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // Reset state when query changes
    useEffect(() => {
        setOffset(0);
        setCountries([]);
        setHasMore(true);
    }, [query]);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            const res = await fetch(`/api/countries?${query}&limit=${limit}&offset=${offset}`);
            const result = await res.json();
            const list = result.data?.objects || [];
            
            if (offset === 0) {
                setCountries(list);
            } else {
                setCountries((prev) => [...prev, ...list]);
            }
            
            if (list.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setLoading(false);
        };
        
        fetchCountries();
    }, [query, offset]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (loading || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            setOffset((prev) => prev + limit);
        }
    };

    return (
        <div 
            onScroll={handleScroll}
            className="w-full max-w-4xl mx-auto max-h-[550px] overflow-y-auto overflow-x-auto border border-border/50 rounded-2xl shadow-2xl bg-card/30 backdrop-blur-md [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/60"
        >
            <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="border-b border-border/30">
                    <tr>
                        {headings.map((heading) => (
                            <th 
                                key={heading} 
                                className="sticky top-0 z-20 bg-card/90 backdrop-blur-md px-4 py-3.5 font-bold text-muted-foreground text-xs uppercase tracking-wider"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                    {countries.map((item, index) => (
                        <TableRow
                            key={item.codes?.alpha_3}
                            sNo={index + 1}
                            country={item.names?.common}
                            flag={item.flag?.emoji || "🏳️"}
                            region={item.region}
                            code={item.codes?.alpha_3 || "NA"}
                        />
                    ))}
                    {loading && (
                        <tr>
                            <td colSpan={headings.length} className="text-center py-4 text-xs text-muted-foreground animate-pulse">
                                Loading more countries...
                            </td>
                        </tr>
                    )}
                    {
                        countries.length == 0 && !hasMore &&  (
                            <tr>
                            <td colSpan={headings.length} className="text-center py-4 text-xs text-muted-foreground animate-pulse">
                                    No countries found...
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table