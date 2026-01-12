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
            confirmButtonColor: '#7C3AED',
            customClass: {
                popup: 'rounded-2xl'
            }
        });
        reset();
    };

    return (
        <div className="pt-10 pb-20 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-black mb-4">Get In Touch</h2>
                    <p className="opacity-70">Have questions about ClubSphere? Whether you're a student or a manager, we're here to help.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            { icon: FiMail, title: "Email Us", info: "nssiam99@gmail.com", color: "text-primary" },
                            { icon: FiPhone, title: "Call Us", info: "+880 1881361160", color: "text-secondary" },
                            { icon: FiMapPin, title: "Our Location", info: "Dhaka, Bangladesh", color: "text-accent" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-base-content/5 bg-base-100 shadow-sm flex items-center gap-5"
                            >
                                <div className="p-4 rounded-xl bg-base-200 dark:bg-slate-800">
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{item.title}</p>
                                    <p className="font-semibold text-base-content">{item.info}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 p-8 lg:p-12 rounded-2xl border border-base-content/5 bg-base-100 shadow-sm"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Name</span>
                                </label>
                                <input 
                                    {...register("name", { required: true })}
                                    type="text" 
                                    placeholder="Siam Khan"
                                    className='input input-bordered w-full rounded-2xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20' 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Email</span>
                                </label>
                                <input 
                                    {...register("email", { required: true })}
                                    type="email" 
                                    placeholder="example@mail.com" 
                                    className='input input-bordered w-full rounded-2xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20' 
                                />
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold">Subject</span>
                                </label>
                                <input 
                                    {...register("subject", { required: true })}
                                    type="text" 
                                    placeholder="Membership Inquiry" 
                                    className='input input-bordered w-full rounded-2xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20' 
                                />
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold">Message</span>
                                </label>
                                <textarea 
                                    {...register("message", { required: true })}
                                    rows="5" 
                                    placeholder="Write your message here..." 
                                    className='textarea textarea-bordered w-full rounded-2xl bg-base-200/50 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-primary/20'
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <button type="submit" className="btn btn-primary rounded-2xl w-full md:w-auto px-10 flex items-center justify-center gap-2 group font-black uppercase text-xs tracking-widest">
                                    Send Message <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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