'use client'
import TableRow from "./TableRow"

const DUMMY_COUNTRIES = [
  { country: "Canada", flag: "🇨🇦", region: "Americas", code: "CAN" },
  { country: "Japan", flag: "🇯🇵", region: "Asia", code: "JPN" },
  { country: "Germany", flag: "🇩🇪", region: "Europe", code: "DEU" },
  { country: "Australia", flag: "🇦🇺", region: "Oceania", code: "AUS" },
  { country: "South Africa", flag: "🇿🇦", region: "Africa", code: "ZAF" },
];

const Table = () => {
    const headings = ["S.No", "Country", "Region", "Code", "View Details"]
    
  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            {headings.map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold text-gray-700 text-sm">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {DUMMY_COUNTRIES.map((item, index) => (
            <TableRow
              key={item.code}
              sNo={index + 1}
              country={item.country}
              flag={item.flag}
              region={item.region}
              code={item.code}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table