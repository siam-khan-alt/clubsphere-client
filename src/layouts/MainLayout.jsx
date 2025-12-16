import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar/>
            <div className='bg-[#FFFFFF]'>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;