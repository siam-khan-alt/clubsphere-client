import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;