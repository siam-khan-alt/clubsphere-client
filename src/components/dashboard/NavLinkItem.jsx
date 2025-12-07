import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, children, icon: Icon }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center p-3 my-1 rounded-lg transition duration-200 ${
                isActive 
                    ? 'bg-[var(--color-primary-accent)] text-white shadow-md' 
                    : 'text-[var(--color-text-body)] hover:bg-gray-100'
            }`
        }
        end={to === '/dashboard'}
    >
        {Icon && <Icon className="w-5 h-5 mr-3" />}
        {children}
    </NavLink>
);

export default NavLinkItem;