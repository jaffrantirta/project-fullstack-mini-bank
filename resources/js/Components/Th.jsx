import React from 'react'

export default function Th({ className, children, ...props }) {
    return (
        <th {...props} className={`p-5 font-extrabold text-lg ${className}`}>{children}</th>
    )
}
