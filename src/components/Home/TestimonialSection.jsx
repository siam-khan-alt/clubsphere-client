import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    { id: 1, name: "Jishan Ahmed", role: "Coding Club Lead", text: "ClubSphere makes event management incredibly intuitive and fast.", img: "https://i.ibb.co.com/mCLsJp11/young-man-sad-expression-1194-2829.jpg" },
    { id: 2, name: "Sarah Miller", role: "Photography Enthusiast", text: "Finding communities for my passion was never this easy!", img: "https://i.ibb.co.com/35Y4JKwp/image.png" },
    { id: 3, name: "David Chen", role: "Sports Manager", text: "Membership automation saves us hours of manual work weekly.", img: "https://i.ibb.co.com/yFT5QVFc/image.png" },
    { id: 4, name: "Raisa Islam", role: "Art Director", text: "The clean UI and dark mode provide a premium experience.", img: "https://i.ibb.co.com/p6ZTwPDS/image.png" },
];
const TestimonialSection = () => {
    return (
        <section className="py-5 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='md-8'
                >
                    What Our Community Says
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {testimonials.map((rev, index) => (
                        <motion.div 
                            key={rev.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-style flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-6">
                                <img src={rev.img} alt={rev.name} className="w-20 h-20 rounded-full border-4 border-primary/20 group-hover:border-primary transition-colors duration-300" />
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12H12.017V9C12.017 6.79086 13.8079 5 16.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H17.017L17.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12H1.017V9C1.017 6.79086 2.80787 5 5.017 5H8.017C10.2261 5 12.017 6.79086 12.017 9V15C12.017 17.2091 10.2261 19 8.017 19H6.017L6.017 21H3.017Z"></path></svg>
                                </div>
                            </div>
                            <p className="italic opacity-70 mb-6 leading-relaxed">"{rev.text}"</p>
                            <h4 className="text-lg font-bold mb-0">{rev.name}</h4>
                            <span className="text-sm text-primary font-semibold tracking-wider uppercase mt-1">{rev.role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;