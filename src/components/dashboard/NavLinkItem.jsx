import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, children, icon: Icon }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center p-3 my-1 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-base-content/80 hover:bg-primary hover:text-white'
            }`
        }
    >
        {Icon && <Icon className="w-5 h-5 mr-3" />}
        <span className="truncate">{children}</span>
    </NavLink>
);

export default NavLinkItem;