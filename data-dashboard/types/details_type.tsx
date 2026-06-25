export type Capital = {
    name: string,
    coordinates: { lat: number, lng: number },
    attributes: { primary: boolean }
}


export type Currency = {
    name: string,
    symbol: string
}


export type Details = {
    names: {
        common: string;
        official: string;
        alternates: string[];
    };
    codes: {
        alpha_2: string;
        alpha_3: string;
    };
    capitals: Capital[];
    region: string;
    subregion: string;
    flag: {
        emoji: string;
        url_png: string;
        url_svg: string;
    };
    languages: Record<string, string>[];
    area: {
        kilometers: number;
        miles: number;
    };
    borders: string[];
    population: number;
    landlocked: boolean;
    currencies: Currency[];
    timezones: string[];
    links?: {
        google_maps?: string;
        wikipedia?: string;
        official?: string;
        open_street_maps?: string;
    };
}