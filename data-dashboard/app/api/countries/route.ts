import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    try {
        const res = await fetch(`https://api.restcountries.com/countries/v5?${searchParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_KEY || process.env.NEXT_PUBLIC_REST_COUNTRIES_API_KEY}`
            }
        });
        
        if (!res.ok) {
            const errData = await res.json();
            return NextResponse.json(errData, { status: res.status });
        }
        
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ errors: [{ message: error.message }] }, { status: 500 });
    }
}
