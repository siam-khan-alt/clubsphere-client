import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturedClubsSection from '../components/Home/FeaturedClubsSection';
import CategorySection from '../components/Home/PopularCategorySection';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturedClubsSection/>
            <CategorySection/>
        </div>
    );
};

export default Home;