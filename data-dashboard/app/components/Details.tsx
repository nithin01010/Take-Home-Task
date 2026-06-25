import React from 'react'
import { Details as DetailsType } from '@/types/details_type'
import PixelSnow from './PixelSnow'

const getDetails = async(code: string) => {
    const res = await fetch(`https://api.restcountries.com/countries/v5/codes.alpha_3/${code.toUpperCase()}?pretty=1`,{
        headers: {"Authorization": `Bearer ${process.env.REST_COUNTRIES_API_KEY}`}
    })
    if (!res.ok) {
        throw new Error('Failed to fetch details')
    }
    const data = await res.json()
    return data
}

const Details = async({code}: {code: string}) => {
    const response = await getDetails(code)
    const details = response.data.objects[0] as DetailsType
    console.log(details)

    const capitals = details.capitals?.map(c => c.name).join(', ') || 'N/A'
    const languages = details.languages?.map(l => l.name).join(', ') || 'N/A'
    const currencies = details.currencies?.map(c => `${c.name} (${c.symbol})`).join(', ') || 'N/A'

    // Defined fields config array to map dynamically
    const fields = [
        { label: 'Capital', value: capitals },
        { label: 'Region', value: `${details.region} (${details.subregion || 'N/A'})` },
        { label: 'Population', value: details.population?.toLocaleString() || 'N/A' },
        { label: 'Area', value: `${details.area?.kilometers?.toLocaleString() || '0'} km²` },
        { label: 'Languages', value: languages },
        { label: 'Currencies', value: currencies }
    ]

    return (
        <>
        {/* <div className="pointer-events-none absolute inset-0"> */}
            <PixelSnow/>
        {/* </div> */}
        <div className="relative z-10 max-w-2xl mx-auto my-6 p-4 sm:p-6 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl text-foreground flex flex-col gap-6"> 
            {/* Header: Name and Flag */}
            <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-6 mb-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-none">
                        {details.names.common}
                    </h1>
                    <p className="text-base text-muted-foreground">{details.names.official}</p>
                </div>
                {details.flag?.url_png && (
                    <img 
                        src={details.flag.url_png} 
                        alt={`${details.names.common} Flag`} 
                        className="w-24 h-auto rounded-lg shadow-lg border border-border/50 object-cover"
                    />
                )}
            </div>

            {/* Stacked Fields mapped dynamically */}
            <div className="flex flex-col gap-3">
                {fields.map((field) => (
                    <div key={field.label} className="flex items-center gap-3">
                        <div className="w-28 flex-shrink-0 bg-muted/60 px-3 py-2 rounded-lg font-medium text-xs uppercase tracking-wider text-muted-foreground text-center">
                            {field.label}
                        </div>
                        <div className="flex-grow bg-card/60 px-4 py-2 rounded-lg border border-border/30 text-sm">
                            {field.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scrollable: Horizontal & Vertical scroll container */}
            <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Timezones & Borders
                </span>
                <div className="h-36 w-full overflow-y-auto border border-border/40 bg-muted/20 rounded-xl p-3 flex flex-col gap-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/60">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">Timezones:</p>
                        <div className="flex flex-nowrap overflow-x-auto gap-2 pb-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/60" style={{WebkitOverflowScrolling: 'touch', touchAction: 'pan-x'}}>
                            {details.timezones?.map((tz, index) => (
                                <span key={index} className="flex-shrink-0 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full border border-primary/20">
                                    {tz}
                                </span>
                            ))}
                        </div>
                    </div>
                    {details.borders && details.borders.length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">Neighboring Borders:</p>
                            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/60" style={{WebkitOverflowScrolling: 'touch', touchAction: 'pan-x'}}>
                                {details.borders.map((border, index) => (
                                    <span key={index} className="flex-shrink-0 bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-full border border-accent/20">
                                        {border}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row Buttons (Map & wiekie) */}
            <div className="flex items-center gap-4 border-t border-border/30 pt-4">
                {details.links?.google_maps && (
                    <a 
                        href={details.links.google_maps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2.5 px-4 rounded-xl border border-border transition duration-200 text-sm"
                    >
                        Google Map
                    </a>
                )}
                {details.links?.wikipedia && (
                    <a 
                        href={details.links.wikipedia} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2.5 px-4 rounded-xl border border-border transition duration-200 text-sm"
                    >
                        Wikipedia
                    </a>
                )}
            </div>
        </div>
        </>
    )
}

export default Details;
