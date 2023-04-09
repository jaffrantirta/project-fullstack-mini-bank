import React from 'react'

export default function Table({ className, children, ...props }) {
    return (
        <table {...props} className={`w-full rounded-3xl bg-white ${className}`}>
            {children}
        </table>
    )
}
