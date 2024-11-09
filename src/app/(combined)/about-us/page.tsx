'use client'

import React, { useState } from 'react';
import { api } from "@/api/api";
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('sending');
        
        try {
            // Replace with your actual API endpoint
            await api.post('/contact', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    return (
        <div className="bg-[rgb(250,250,250)] min-h-screen p-8">
            <div className="w-[80vw] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                </div>

                {/* Contact Information Cards */}
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] flex flex-col items-center">
                        <div className="bg-[rgb(196,148,29)] p-3 rounded-full mb-4">
                            <Phone className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                        <p className="text-gray-600 text-center">+91 1234567890</p>
                        <p className="text-gray-600 text-center">+91 9876543210</p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] flex flex-col items-center">
                        <div className="bg-[rgb(196,148,29)] p-3 rounded-full mb-4">
                            <Mail className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email</h3>
                        <p className="text-gray-600 text-center">support@devicebooking.com</p>
                        <p className="text-gray-600 text-center">info@devicebooking.com</p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Sed do eiusmod tempor incididunt ut labore et dolore.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] flex flex-col items-center">
                        <div className="bg-[rgb(196,148,29)] p-3 rounded-full mb-4">
                            <Clock className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                        <p className="text-gray-600 text-center">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-600 text-center">Saturday: 10:00 AM - 4:00 PM</p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Ut enim ad minim veniam, quis nostrud exercitation.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] flex flex-col items-center">
                        <div className="bg-[rgb(196,148,29)] p-3 rounded-full mb-4">
                            <MessageSquare className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                        <p className="text-gray-600 text-center">Available 24/7</p>
                        <p className="text-gray-600 text-center">Average Response Time: 5 mins</p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white p-8 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Lorem ipsum dolor sit amet?</h3>
                            <p className="text-gray-600">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Ut enim ad minim veniam?</h3>
                            <p className="text-gray-600">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Duis aute irure dolor?</h3>
                            <p className="text-gray-600">In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Excepteur sint occaecat?</h3>
                            <p className="text-gray-600">Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-[0px_0px_15px_rgb(205,205,205)] mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>
                    <p className="text-center text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgb(196,148,29)]"
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgb(196,148,29)]"
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgb(196,148,29)]"
                                required
                                placeholder="How can we help you?"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:border-[rgb(196,148,29)]"
                                required
                                placeholder="Tell us more about your inquiry..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[rgb(196,148,29)] text-white py-3 rounded-lg font-semibold hover:bg-[rgb(176,128,9)] transition-colors duration-200"
                            disabled={submitStatus === 'sending'}
                        >
                            {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    {submitStatus === 'success' && (
                        <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="text-red-600 text-center mt-4">Failed to send message. Please try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
}