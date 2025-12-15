import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturedClubsSection from '../components/Home/FeaturedClubsSection';
import CategorySection from '../components/Home/PopularCategorySection';
import HowItWorksSection from '../components/Home/HowItWorksSection';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturedClubsSection/>
            <CategorySection/>
            <HowItWorksSection/>
        </div>
    );
};

export default Home;