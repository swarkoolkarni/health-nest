import React from 'react';

export const Library = ({ actionList }) => {
    return (
        <>
            <p>Library</p>
            <div>
                <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
                    {actionList.map((item) => (
                        <li key={item.index} style={{ paddingBottom: 10 }}>
                            <span> {item.icon}</span>
                            <span> {item.action}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}