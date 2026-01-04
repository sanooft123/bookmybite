import React, { useRef, useState } from 'react';
import { Store, User, MapPin, Phone, Mail, Lock, CreditCard, CheckCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import emailjs from '@emailjs/browser';

const InputGroup = ({ label, icon, placeholder, type = "text", name }) => (
  <div className="space-y-2 text-left">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <input 
        name={name}
        required
        type={type} 
        placeholder={placeholder} 
        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
      />
    </div>
  </div>
);

const Register = () => {
  const form = useRef();
  const [searchParams] = useSearchParams(); // Read URL parameters
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Determine current plan from URL (?plan=Professional)
  const currentPlan = searchParams.get('plan') || "Basic";
  
  // Mapping plan names to their price strings
  const planPrices = {
    "Basic": "$0",
    "Professional": "$29",
    "Enterprise": "$99"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = "service_zgfdsam";
    const TEMPLATE_ID = "template_icpxuj5";
    const PUBLIC_KEY = "kP4ud6APwjhgz1fkZ";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        alert("Failed to send registration. Please try again later.");
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Sent!</h2>
          <p className="text-slate-500 mb-8">The owner has been notified. We will review your business details and contact you shortly.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mb-6">
        <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors font-medium flex items-center gap-2 w-fit">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Register Your Restaurant</h1>
            <p className="text-slate-500 mt-1">Join our digital ordering platform</p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold border border-blue-100 shadow-sm shadow-blue-50">
            <CreditCard size={18} />
            PLAN: {currentPlan.toUpperCase()}
          </div>
        </div>

        <form ref={form} className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 text-left">Business Details</h2>
              <InputGroup name="restaurant_name" label="Restaurant Name" icon={<Store size={20}/>} placeholder="Restaurant Name" />
              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-slate-700">Restaurant Type</label>
                <select name="restaurant_type" required className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-600 appearance-none">
                  <option value="">Select an option</option>
                  <option value="Cafe">Cafe / Bistro</option>
                  <option value="Fine Dining">Fine Dining</option>
                  <option value="Fast Food">Fast Food / QSR</option>
                </select>
              </div>
              <InputGroup name="city" label="City" icon={<MapPin size={20}/>} placeholder="City" />
              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-slate-700">Address</label>
                <input name="address" required placeholder="Full street address" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-6 text-left">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">Owner & Security</h2>
              <InputGroup name="owner_name" label="Owner Name" icon={<User size={20}/>} placeholder="Owner Name" />
              <InputGroup name="phone" label="Phone" icon={<Phone size={20}/>} placeholder="Phone Number" />
              <InputGroup name="email" label="Email" icon={<Mail size={20}/>} placeholder="Email Address" type="email" />
              <InputGroup name="password" label="Password" icon={<Lock size={20}/>} placeholder="Create Password" type="password" />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">Subscription Plan</label>
              {/* This field now updates automatically */}
              <input 
                name="plan" 
                value={`${currentPlan} (${planPrices[currentPlan] || "$0"})`} 
                readOnly 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-bold cursor-not-allowed outline-none" 
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">How did you hear about us?</label>
              <select name="source" required className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-600 appearance-none">
                <option value="">Select an option</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend/Colleague</option>
                <option value="Search">Online Search</option>
              </select>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">Additional Notes</label>
              <textarea name="notes" placeholder="Any specific requirements?" rows="4" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending Details..." : "Create FREE Account"}
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-8 text-slate-400 text-sm">© 2026 BookMyBite Inc. All rights reserved.</footer>
    </div>
  );
};

export default Register;