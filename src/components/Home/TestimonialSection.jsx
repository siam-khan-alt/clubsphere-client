import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { RiDoubleQuotesL } from 'react-icons/ri'; // New stylish icon

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    { id: 1, name: "Jishan Ahmed", role: "Coding Club Lead", text: "ClubSphere makes event management incredibly intuitive and fast. It's a game changer for our university.", img: "https://i.ibb.co.com/mCLsJp11/young-man-sad-expression-1194-2829.jpg" },
    { id: 2, name: "Sarah Miller", role: "Photography Enthusiast", text: "Finding communities for my passion was never this easy! The interface is super clean and responsive.", img: "https://i.ibb.co.com/35Y4JKwp/image.png" },
    { id: 3, name: "David Chen", role: "Sports Manager", text: "Membership automation saves us hours of manual work weekly. Highly recommended for any student organization.", img: "https://i.ibb.co.com/yFT5QVFc/image.png" },
    { id: 4, name: "Raisa Islam", role: "Art Director", text: "The clean UI and dark mode provide a premium experience. It truly bridges the gap between students.", img: "https://i.ibb.co.com/p6ZTwPDS/image.png" },
    { id: 5, name: "Alex Rivera", role: "Music Society", text: "Collaboration has reached a whole new level with these tools. We organized our largest concert through this.", img: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Anika Bose", role: "Debate Club", text: "The notification system ensures no member ever misses a session. Efficient and reliable platform.", img: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Tanvir Hossain", role: "Tech Lead", text: "Scalable and robust. Exactly what our university needed to manage diverse campus interests.", img: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "Emma Watson", role: "Literature Head", text: "It's not just a platform; it's a digital home for our club. The growth we've seen is phenomenal.", img: "https://i.pravatar.cc/150?u=8" },
];

const TestimonialSection = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20  bg-background relative overflow-hidden">
            

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Side: Content */}
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px] bg-primary/10 px-3 py-1 rounded">
                            Our Community
                        </span>
                        <h2 className="text-left mt-6 mb-6 leading-tight">
                            What Our <span className="text-primary  font-serif">Members</span> Say About Us
                        </h2>
                        <p className="text-text-body opacity-70 mb-8 leading-relaxed text-sm md:text-base">
                            Join hundreds of students who have found their niche through ClubSphere. 
                            Our platform empowers campus leaders and fosters meaningful connections 
                            across diverse interests.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                            <div className="flex -space-x-3">
                                {testimonials.slice(0, 5).map(t => (
                                    <img 
                                        key={t.id} 
                                        src={t.img} 
                                        className="w-10 h-10 rounded-full border-2 border-background object-cover" 
                                        alt="Member" 
                                    />
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-black text-text-heading">
                                    Trusted by <span className="text-primary">800+</span> Students
                                </p>
                                <p className="text-xs text-text-body opacity-60 italic">Across 20+ active campus clubs</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Vertical Swiper */}
                <div className="h-[480px] relative px-2"> 
                    {/* Top and Bottom Fade Effect for "Infinite Stand" look */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
                    
                    <Swiper
                        direction={'vertical'}
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={2.2} // Show parts of the next slide for better flow
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        className="h-full vertical-testimonial-swiper !py-4"
                    >
                        {testimonials.map((rev) => (
                            <SwiperSlide key={rev.id}>
                                <div className="card-style h-full border border-standrd bg-card/40 backdrop-blur-md p-6 flex flex-col justify-between group hover:border-primary/60 transition-all duration-500 shadow-lg shadow-primary/5">
                                    <div>
                                        <RiDoubleQuotesL className="text-primary opacity-30 group-hover:opacity-100 transition-opacity duration-500 mb-3" size={28} />
                                        <p className="text-text-body text-xs md:text-sm opacity-80 line-clamp-3 italic leading-relaxed">
                                            "{rev.text}"
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mt-4 pt-4 ">
                                        <img 
                                            src={rev.img} 
                                            className="w-10 h-10 rounded-full object-cover group-hover:border-primary/40 transition-colors" 
                                            alt={rev.name} 
                                        />
                                        <div>
                                            <h4 className="text-xs md:text-sm font-black text-text-heading group-hover:text-primary transition-colors">{rev.name}</h4>
                                            <p className="text-[9px] text-primary font-bold uppercase tracking-tighter">{rev.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Custom Swiper Pagination Styling */}
            <style jsx>{`
                .vertical-testimonial-swiper .swiper-pagination {
                    right: 0px !important;
                }
                .vertical-testimonial-swiper .swiper-pagination-bullet {
                    background: var(--color-primary);
                    opacity: 0.3;
                }
                .vertical-testimonial-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    height: 18px;
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
};

export default TestimonialSection;