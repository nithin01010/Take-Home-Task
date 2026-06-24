'use client'
import React from 'react'
import Link from 'next/link'

interface TableRowProps {
  sNo: number;
  country: string;
  flag: string;
  region: string;
  code: string;
}

const TableRow = ({ sNo, country, flag, region, code }: TableRowProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-black">
      <td className="px-4 py-3.5 text-sm text-gray-500 font-medium">{sNo}</td>
      <td className="px-4 py-3.5 text-sm font-semibold flex items-center gap-2">
        <span className="text-lg" role="img" aria-label={`Flag of ${country}`}>{flag}</span>
        <span>{country}</span>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-600">{region}</td>
      <td className="px-4 py-3.5 text-sm font-mono text-gray-500">{code}</td>
      <td className="px-4 py-3.5 text-sm">
        <Link 
          href={`/country/${code.toLowerCase()}`}
          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          View Details →
        </Link>
      </td>
    </tr>
  )
}

export default TableRow