import React from 'react'

export default function SideLink({ active, children, href, ...props }) {
    return (
        <a {...props} className={`flex px-8 py-5 cursor-pointer hover:bg-gray-100 transition-all duration-500 ${active ? 'bg-gray-200' : ''}`} href={href}>
            {children}
        </a>
    )
}
