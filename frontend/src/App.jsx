import React from 'react';
import { ArrowRight, CheckCircle2, BarChart3, Users, Clock, ShieldCheck, HeartHandshake, Eye, Briefcase, Plus } from 'lucide-react';
import PODicon from './assets/PODicon.png';

function App() {
  return (
    <div className="min-h-screen font-sans bg-cream">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={PODicon} alt="POD Logo" className="w-8 h-8 rounded-md" />
          <h1 className="text-xl font-bold tracking-tight text-dark-green">POD Platform</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-dark-green/80">
          <a href="#" className="text-primary-600">Home</a>
          <a href="#" className="hover:text-primary-600 transition-colors">About Us</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Benefits</a>
          <a href="#" className="hover:text-primary-600 transition-colors flex items-center gap-1">Pages <span className="text-xs">▼</span></a>
        </div>
        
        <button className="bg-primary-500 hover:bg-primary-600 text-dark-green text-sm font-bold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
          <Plus size={16} /> Apply Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            UNLOCK YOUR POTENTIAL WITH POD
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-dark-green leading-tight mb-6">
            Your strategic partner for accessibility
          </h2>
          <p className="text-dark-green/70 text-lg mb-8 max-w-lg leading-relaxed">
            Welcome to POD Platform, where strategic vision meets actionable solutions. Our system is designed to guide you through every stage of your accessibility journey.
          </p>
          <button className="bg-primary-500 hover:bg-primary-600 text-dark-green font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2">
            <Plus size={18} /> Apply for Benefits
          </button>
        </div>
        <div className="relative h-[500px] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Professionals in a meeting" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Yellow Banner */}
      <div className="bg-primary-500 py-4 overflow-hidden flex border-y border-primary-600/20">
        <div className="flex gap-12 whitespace-nowrap px-6 text-dark-green text-xs font-bold tracking-widest uppercase animate-marquee">
          <span className="flex items-center gap-4"><Plus size={12}/> EMPOWERING ORGANIZATIONS FOR SUSTAINABLE GROWTH</span>
          <span className="flex items-center gap-4"><Plus size={12}/> PROMOTING INCLUSION AND ACCESSIBILITY</span>
          <span className="flex items-center gap-4"><Plus size={12}/> SOLVING COMPLEX CHALLENGES</span>
          <span className="flex items-center gap-4"><Plus size={12}/> EMPOWERING ORGANIZATIONS FOR SUSTAINABLE GROWTH</span>
        </div>
      </div>

      {/* Strategic Partner Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <p className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-4">CORE SERVICES</p>
            <h2 className="text-4xl font-extrabold text-dark-green leading-tight">
              Dubai Disability Support System
            </h2>
            <p className="text-dark-green/70 mt-6 leading-relaxed">
              We focus on delivering services and true inclusion across Dubai, ensuring seamless access to mobility, healthcare, and targeted support.
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg rotate-3">
                <ShieldCheck size={24} className="-rotate-3" />
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Sanad Card</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                The official government ID unlocking free services, private sector benefits, and priority access for People of Determination.
              </p>
            </div>
            
            <div>
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg rotate-3">
                <BarChart3 size={24} className="-rotate-3" />
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Financial Assistance</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Targeted support for low-income citizens covering therapy costs, rehabilitation, and medical equipment needs.
              </p>
            </div>

            <div>
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg rotate-3">
                <Users size={24} className="-rotate-3" />
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Transport & Mobility</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Free dedicated parking, Salik toll exemptions, public transport assistance, and significant taxi discounts.
              </p>
            </div>

            <div>
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg rotate-3">
                <HeartHandshake size={24} className="-rotate-3" />
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-2">Healthcare & Govt Access</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Home healthcare visits, priority hospital services, and fast-track counters at government service centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (Yellow Section) */}
      <section className="bg-primary-400 py-24 text-dark-green">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-dark-green/80 text-xs font-bold tracking-widest uppercase mb-4">APPLICATION PROCESS</p>
          <h2 className="text-4xl font-extrabold mb-16">How to Apply</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center border border-dark-green/20 rounded-full">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Online Submission</h3>
              <p className="text-dark-green/80 text-sm max-w-xs leading-relaxed">
                Apply via CDA portal. Upload Emirates ID, passport photo, and your DHA medical report.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center border border-dark-green/20 rounded-full">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Fast Processing</h3>
              <p className="text-dark-green/80 text-sm max-w-xs leading-relaxed">
                Automated check takes ~30 minutes. Complete admin approval occurs within 1-2 working days.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center border border-dark-green/20 rounded-full">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Card Issued</h3>
              <p className="text-dark-green/80 text-sm max-w-xs leading-relaxed">
                Your digital Sanad Card is instantly sent via SMS/email to unlock access to all benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex text-primary-500">
            {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-dark-green leading-snug mb-8">
          "Implementing the Platform's recommendations, we streamlined our application process, resulting in a 20% increase in output efficiency."
        </h3>
        <div className="flex items-center justify-center gap-4">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Bryn Knight" className="w-12 h-12 rounded-full object-cover" />
          <div className="text-left">
            <p className="font-bold text-dark-green text-sm">Bryn Knight</p>
            <p className="text-xs text-dark-green/60">Creative Director</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
