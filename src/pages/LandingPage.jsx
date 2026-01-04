import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Smartphone, Layout, Clock } from 'lucide-react';

// Pricing Card Sub-component
const PriceCard = ({ title, price, features, popular, buttonText }) => (
  <div className={`relative p-8 rounded-3xl transition-all duration-300 ${popular ? 'bg-white border-2 border-blue-600 shadow-2xl shadow-blue-100 scale-105 z-10' : 'bg-white border border-slate-100 hover:shadow-xl'}`}>
    {popular && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
        Popular
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-extrabold">${price}</span>
      <span className="text-slate-500 text-sm">{price === "0" ? "/14-day trial" : "/month"}</span>
    </div>
    <ul className="space-y-4 mb-8 text-left">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
          <Check className="w-5 h-5 text-green-500 shrink-0" /> {f}
        </li>
      ))}
    </ul>
    {/* Automatically passes the plan title to the register page */}
    <Link 
      to={`/register?plan=${title}`}
      className={`block w-full py-3 rounded-xl font-bold text-center transition ${popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
    >
      {buttonText}
    </Link>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Digitize Your Restaurant <br/>
            <span className="text-blue-600 px-2">in Minutes</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Launch your own QR ordering system. Zero commission, lightning-fast AWS infrastructure, and a seamless experience for your customers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register?plan=Basic" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-200 transition">
              Start 14-Day Free Trial →
            </Link>
            <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features for Modern Dining</h2>
            <p className="text-slate-500">Everything you need to manage your restaurant from menu to tracking.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "QR Code Ordering", desc: "Unique QR codes for every table. No app downloads.", icon: <Zap className="text-blue-500"/> },
              { title: "Mobile Optimized", desc: "A beautiful web-app experience on any browser.", icon: <Smartphone className="text-blue-500"/> },
              { title: "Real-Time Dashboard", desc: "Instant order notifications via AWS AppSync.", icon: <Layout className="text-blue-500"/> },
              { title: "Efficiency Boost", desc: "Reduce wait times by 30%. Focus on service.", icon: <Clock className="text-blue-500"/> },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS  --- */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Simple Setup, Powerful Results</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Register & Verify", desc: "Sign up and choose your plan. Our team verifies your business." },
              { step: "2", title: "Build Your Menu", desc: "Upload dishes, prices, and photos to our AWS S3 backed storage." },
              { step: "3", title: "Print & Go Live", desc: "Download auto-generated QR codes and start receiving orders." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-100">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-500 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Pricing that scales with you</h2>
          <p className="text-slate-500 mb-16">Transparent plans with no hidden commission fees.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PriceCard title="Basic" price="0" features={["Up to 20 menu items", "Digital QR Code", "Email Support"]} buttonText="Start Free Trial" />
            <PriceCard title="Professional" price="29" features={["Unlimited menu items", "Real-time Order Dashboard", "Priority Support", "Analytics"]} popular buttonText="Select Plan" />
            <PriceCard title="Enterprise" price="99" features={["Multiple Locations", "Custom Domain", "API Access", "Dedicated Manager"]} buttonText="Select Plan" />
          </div>
        </div>
      </section>


      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[2rem] p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your service?</h2>
          <p className="text-slate-400 mb-8">Join the growing community of restaurants maximizing efficiency with BookMyBite.</p>
          <Link to="/register?plan=Basic" className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-100">Get Started Now</Link>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg"><Layout className="text-white w-4 h-4" /></div>
              <span className="font-bold text-lg">BookMyBite</span>
            </div>
            <p className="text-slate-500 text-sm">Empowering restaurants with enterprise-grade technology. Built on AWS.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Product</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>Features</li><li>Pricing</li><li>Infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Company</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>Our Story</li><li>Contact Support</li><li>Partner Program</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Legal</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>Privacy Policy</li><li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-4">
          <p>© 2026 BookMyBite Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            System Status: <span className="text-slate-600 font-medium">Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;