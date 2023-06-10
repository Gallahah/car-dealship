import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";


interface Props {
    to: string;
    children: React.ReactNode;
}

const CustomLink = ({ to, children, ...props }: Props) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <div
            className={`${isActive ? 'active' : ""} transition duration-500 hover:text-light-200`}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}

export default CustomLink;