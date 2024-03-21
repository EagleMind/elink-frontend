import { faFileCirclePlus, faFileLines, faHouse, faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/assets/logo.png';

interface Route {
    path: string;
    title: string;
}

interface SideMenuProps {
    routes: Route[];
}
const routeIcons: { [key: string]: JSX.Element } = {
    "Statistiques générale": <FontAwesomeIcon icon={faHouse} size='xl' />, // Replace HomeIcon with your actual icon component for the Home route
    "Factures": <FontAwesomeIcon icon={faFileLines} size='xl' />, // Replace DashboardIcon with your actual icon component for the Dashboard route
    "Créer une facture": <FontAwesomeIcon icon={faFileCirclePlus} size='xl' />, // Replace DashboardIcon with your actual icon component for the Dashboard route
    "Liens de paiments": <FontAwesomeIcon icon={faLink} size='xl' />, // Replace DashboardIcon with your actual icon component for the Dashboard route
    "Profile": <FontAwesomeIcon icon={faUser} size='xl' />, // Replace DashboardIcon with your actual icon component for the Dashboard route
    // Add more route titles and their corresponding icons here
};
const SideMenu: React.FC<SideMenuProps> = ({ routes }) => {
    const location = useLocation();

    return (
        <div className="  lg:block dark:bg-gray-800/40 w-1/6 border-r">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6 justify-center border-b ">
                    <img src={logo} alt="Logo" width={150} className='p-5' />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start p-5 text-sm font-medium" >
                        {routes.map((route, index) => (
                            route.path !== '/editInvoice/:invoiceId' && route.path !== '/getPaymentLinkDetails/:paymentlinkId' && route.path !== '/createPaymentLink/:id' &&
                            <Link
                                key={index}
                                to={route.path}
                                className={`flex items-center rounded-lg px-3 py-2 text-[14px] my-1 ${location.pathname === route.path
                                    ? 'bg-gray-100 text-blue-500 hover:text-blue-500 dark:bg-gray-800 dark:text-white text-[14px]'
                                    : 'text-blue-500 hover:text-white hover:bg-blue-500  transition ease-in dark:text-gray-400 dark:hover:text-white text-[14px]'
                                    }`}
                            >
                                <div className="flex justify-between items-center space-x-3">
                                    {routeIcons[route.title]}
                                    <span className="text-left">{route.title}</span>
                                </div>

                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
