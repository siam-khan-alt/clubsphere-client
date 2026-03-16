import React from 'react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiUsers, FiPlusCircle, FiCreditCard, FiShield, FiSettings } from 'react-icons/fi';

const faqs = [
    { 
        q: "How do I join a club?", 
        a: "Browse through our 'Popular Categories' or 'Featured Clubs', click on your desired club, and hit the 'Join Now' button. If it's a private club, the manager will review your request.",
        icon: <FiUsers className="text-primary" />
    },
    { 
        q: "Can I create my own club?", 
        a: "Yes! If you have the appropriate account permissions, you can create a club from your dashboard. Provide the details, and once approved by an admin, it will go live.",
        icon: <FiPlusCircle className="text-secondary" />
    },
    { 
        q: "How are membership fees handled?", 
        a: "Fees are set by individual club managers. You can pay securely through our integrated payment system using SSLCommerz or Stripe if a fee is required.",
        icon: <FiCreditCard className="text-primary" />
    },
    { 
        q: "Is my data secure on ClubSphere?", 
        a: "Absolutely. We use industry-standard encryption and secure database protocols to ensure your personal information and club data remain private and protected.",
        icon: <FiShield className="text-secondary" />
    },
    { 
        q: "How can I manage my notifications?", 
        a: "You can customize your notification preferences from your User Profile settings. Choose to receive alerts via email or in-app for new events and messages.",
        icon: <FiSettings className="text-primary" />
    },
    { 
        q: "Can I leave a club anytime?", 
        a: "Yes, you have full control over your memberships. Simply go to the club's page and select 'Leave Club'. Your data for that specific club will be archived.",
        icon: <FiHelpCircle className="text-secondary" />
    }
];

const FAQSection = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20  bg-background relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        Common Questions & Support
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-body text-lg opacity-80"
                    >
                        Everything you need to know about the ClubSphere ecosystem. Can't find what you're looking for? Contact our support team.
                    </motion.p>
                </div>

                {/* FAQ Grid: 2 Columns on Large Screens */}
                <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {faqs.map((faq, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="collapse collapse-plus card-style !p-0 border-standard h-fit"
                        >
                            <input type="radio" name="faq-accordion" defaultChecked={i === 0} /> 
                            
                            <div className="collapse-title text-lg font-bold text-text-heading hover:text-primary transition-all duration-300 py-6 px-8 flex items-center gap-4">
                                <span className="text-2xl opacity-80">{faq.icon}</span>
                                {faq.q}
                            </div>
                            
                            <div className="collapse-content px-8"> 
                                <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent mb-5"></div>
                                <p className="text-text-body leading-relaxed pb-6 opacity-90">
                                    {faq.a}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;