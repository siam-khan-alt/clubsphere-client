import React from 'react';

const faqs = [
    { q: "How do I join a club?", a: "Browse through our 'Popular Categories' or 'Featured Clubs', click on your desired club, and hit the 'Join Now' button. If it's a private club, the manager will review your request." },
    { q: "Can I create my own club?", a: "Yes! If you have the appropriate account permissions, you can create a club from your dashboard. Provide the details, and once approved by an admin, it will go live." },
    { q: "How are membership fees handled?", a: "Fees are set by individual club managers. You can pay securely through our integrated payment system using SSLCommerz or Stripe if a fee is required." }
];

const FAQSection = () => {
    return (
        <section className="py-5 bg-base-100">
            <div className="container mx-auto px-4 ">
                <h2 className='mb-8'>Got Questions? We Have Answers</h2>
                <div className="space-y-4 mt-12">
                    {faqs.map((faq, i) => (
                        <div key={i} className="collapse collapse-plus card-style border-gray-100 dark:border-gray-800">
                            <input type="radio" name="faq-accordion" defaultChecked={i === 0} /> 
                            <div className="collapse-title text-xl font-bold text-primary">
                                {faq.q}
                            </div>
                            <div className="collapse-content opacity-70"> 
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;