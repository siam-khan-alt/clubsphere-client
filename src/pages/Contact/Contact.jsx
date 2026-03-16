import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log("Contact Form Data:", data);
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting ClubSphere. We will get back to you soon.',
            icon: 'success',
            confirmButtonColor: '#0284C7',
            customClass: {
                popup: 'rounded-2xl border-none shadow-2xl bg-card text-text-heading'
            }
        });
        reset();
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-20">
            {/* Background Decor */}
            <div className="plaid-bg absolute inset-0 opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* --- Header Section --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <h2 className="!text-5xl !mb-4 leading-tight">Get In Touch</h2>
                    <p className="text-text-body font-medium opacity-80">
                        Have questions about ClubSphere? Whether you're a student or a manager, we're here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* --- Contact Info Cards --- */}
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            { icon: FiMail, title: "Email Us", info: "nssiam99@gmail.com", color: "text-primary", bg: "bg-primary/10" },
                            { icon: FiPhone, title: "Call Us", info: "+880 1881361160", color: "text-secondary", bg: "bg-secondary/10" },
                            { icon: FiMapPin, title: "Our Location", info: "Dhaka, Bangladesh", color: "text-primary", bg: "bg-primary/10" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl border-standard bg-card shadow-sm flex items-center gap-5 group hover:border-primary/50 transition-all"
                            >
                                <div className={`p-4 rounded-2xl ${item.bg} group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">{item.title}</p>
                                    <p className="font-bold text-text-heading">{item.info}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- Contact Form --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 p-8 lg:p-12 rounded-2xl border-standard bg-card shadow-sm"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">Your Name</label>
                                <input 
                                    {...register("name", { required: true })}
                                    type="text" 
                                    placeholder="Siam Khan"
                                    className="input-field-custom" 
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">Your Email</label>
                                <input 
                                    {...register("email", { required: true })}
                                    type="email" 
                                    placeholder="example@mail.com" 
                                    className="input-field-custom" 
                                />
                            </div>

                            {/* Subject */}
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">Subject</label>
                                <input 
                                    {...register("subject", { required: true })}
                                    type="text" 
                                    placeholder="Membership Inquiry" 
                                    className="input-field-custom" 
                                />
                            </div>

                            {/* Message */}
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-text-heading ml-1 opacity-60">Message</label>
                                <textarea 
                                    {...register("message", { required: true })}
                                    placeholder="Write your message here..." 
                                    className="input-field-custom"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2 pt-4">
                                <button type="submit" className="btn-primary-gradient flex items-center gap-3 group">
                                    Send Message 
                                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;