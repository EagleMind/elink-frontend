import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Route {
    path: string;
    title: string;
}

interface SideMenuProps {
    routes: Route[];
}

const SideMenu: React.FC<SideMenuProps> = ({ routes }) => {
    const location = useLocation();

    return (
        <div className="border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-1/6">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                            <path d="M12 3v6"></path>
                        </svg>
                        <span>Acme Inc</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {routes.map((route, index) => (
                            <Link
                                key={index}
                                to={route.path}
                                className={`flex items-center rounded-lg px-3 py-2 text-[18px] ${location.pathname === route.path
                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50 text-[18px]'
                                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-[18px]'
                                    }`}
                            >
                                {/* You can put your SVG icon and text here */}
                                {route.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
