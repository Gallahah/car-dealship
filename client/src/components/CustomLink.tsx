import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

// Routing, determine which part of the UI changes and only load the changes; do not reload the unchanged parts
interface Props {
    to: string;
    children: React.ReactNode;
}

const CustomLink = ({ to, children, ...props }: Props) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <div
            className={`${isActive ? 'active' : ""}`}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}

[]

export default CustomLink;