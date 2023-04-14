import React from 'react'

export default function Table({ className, children, ...props }) {
    return (
        <table {...props} className={`min-w-full divide-y divide-gray-200 rounded-3xl bg-white ${className}`}>
            {children}
        </table>
    )
}
