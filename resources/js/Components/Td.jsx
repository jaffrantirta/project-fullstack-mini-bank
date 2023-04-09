import React from 'react'

export default function Td({ className, children, ...props }) {
    return (
        <td {...props} className={`border-t px-4 py-2 ${className}`}>{children}</td>
    )
}
