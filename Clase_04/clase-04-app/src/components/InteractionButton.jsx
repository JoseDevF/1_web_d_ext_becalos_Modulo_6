
// components/InteractionButton.jsx
import React from 'react';

export default function InteractionButton({
    onClick,
    count,
    active = false,
    activeColor = 'text-gray-500',
    hoverColor = 'text-blue-500',
    hoverBg = 'bg-blue-50',
    children
}) {
    const baseColor = active ? activeColor : 'text-gray-500';
    return (
        <button
            onClick={onClick}
            className={`${baseColor} flex items-center space-x-2 hover:${hoverColor} transition-colors group`}
        >
            <div className={`p-2 rounded-full group-hover:${hoverBg}`}>{children}</div>
            {(count !== undefined && count !== null) && <span className="text-sm">{count}</span>}
        </button>
    );
}