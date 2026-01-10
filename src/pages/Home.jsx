import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturedClubsSection from '../components/Home/FeaturedClubsSection';
import CategorySection from '../components/Home/PopularCategorySection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import StatsSection from '../components/Home/StatsSection';
import TestimonialSection from '../components/Home/TestimonialSection';
import NewsletterSection from '../components/Home/NewsletterSection';
import FAQSection from '../components/Home/FAQSection';
import ContactSupport from '../components/Home/ContactSupport';
import TopManagersSection from '../components/Home/TopManagersSection';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <StatsSection/>
            <CategorySection/>
            <FeaturedClubsSection/>
            <HowItWorksSection/>
            <TopManagersSection/>
            <TestimonialSection/>
            <FAQSection/>
            <ContactSupport/>
            <NewsletterSection/>
        </div>
    );
};

export default Home;