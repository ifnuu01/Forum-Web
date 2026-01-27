import React from 'react';

export default function LeaderboardSkeleton() {
  return (
    <table className="w-full mt-4 border-separate border-spacing-y-2 animate-pulse">
      <thead>
        <th className="w-10 md:w-20">No</th>
        <th className="text-left">Nama Pengguna</th>
        <th>Skor</th>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index}>
            <td className="text-center py-2">
              <div className="h-4 bg-gray-300 rounded w-6 mx-auto"></div>
            </td>
            <td className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </td>
            <td className="text-center">
              <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}