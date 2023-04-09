import React from 'react'

export default function Tr({ className, children, ...props }) {
    return (
        <tr {...props} className={`text-left ${className}`}>
            {children}
        </tr>
    )
}
