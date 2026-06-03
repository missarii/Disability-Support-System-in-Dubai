import React, { useState } from 'react';
import { ShieldCheck, BarChart3, Plus, Car, Building2, CreditCard, FileText, CheckCircle2, Phone, Globe, Smartphone, ChevronRight, Star, HeartHandshake } from 'lucide-react';
import PODicon from '../assets/PODicon.png';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [activeEligibility, setActiveEligibility] = useState('citizens');



  const eligibilityGroups = {
    citizens: {
      label: 'UAE Citizens',
      color: 'bg-primary-500',
      items: ['Disability confirmed by medical report', 'Approved by Dubai medical committee', 'Access to full financial assistance programs', 'Priority government services']
    },
    residents: {
      label: 'UAE Residents',
      color: 'bg-dark-green',
      items: ['Valid Emirates ID required', 'Medical report from DHA-approved hospital', 'Proof of Dubai residency', 'Access to services & transport benefits']
    },
    tourists: {
      label: 'Tourists',
      color: 'bg-primary-600',
      items: ['Temporary disability proof from home country', 'Short-term Sanad Card (~2 months)', 'Up to 50% taxi discount', 'Metro & bus accessibility services']
    }
  };

  return (
    <div className="min-h-screen font-sans bg-cream">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={PODicon} alt="POD Logo" className="w-9 h-9 rounded-lg shadow" />
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-dark-green leading-none">POD Platform</h1>
            <p className="text-xs text-primary-600 font-semibold">Dubai • People of Determination</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-dark-green/80">
          <a href="#home" className="text-primary-600">Home</a>
          <a href="#services" className="hover:text-primary-600 transition-colors">Services</a>
          <a href="#eligibility" className="hover:text-primary-600 transition-colors">Eligibility</a>
          <a href="#apply" className="hover:text-primary-600 transition-colors">How to Apply</a>
        </div>
        
        <Link to="/apply" className="bg-primary-500 hover:bg-primary-600 text-dark-green text-sm font-bold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
          <Plus size={16} /> Apply Now
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-900 text-xs font-bold tracking-widest uppercase rounded-full px-4 py-2 mb-6">
            <img src={PODicon} alt="" className="w-4 h-4 rounded" />
            COMMUNITY DEVELOPMENT AUTHORITY — DUBAI
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-dark-green leading-tight mb-6">
            Dubai's Official <span className="text-primary-500">Disability</span> Support System
          </h2>
          <p className="text-dark-green/70 text-lg mb-8 max-w-lg leading-relaxed">
            The People of Determination platform provides Sanad Card access, financial assistance, transport benefits, and priority healthcare for all eligible residents and tourists in Dubai.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/apply" className="bg-primary-500 hover:bg-primary-600 text-dark-green font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2">
              <CreditCard size={18} /> Apply for Sanad Card
            </Link>
            <a href="#eligibility" className="border-2 border-dark-green/20 hover:border-primary-500 text-dark-green font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2">
              <FileText size={18} /> Check Eligibility
            </a>
          </div>
          <div className="flex items-center gap-6 mt-10">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-dark-green">CDA</p>
              <p className="text-xs text-dark-green/60">Issuing Authority</p>
            </div>
            <div className="w-px h-10 bg-dark-green/20"></div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-dark-green">~30min</p>
              <p className="text-xs text-dark-green/60">Verification Time</p>
            </div>
            <div className="w-px h-10 bg-dark-green/20"></div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-dark-green">1–2 days</p>
              <p className="text-xs text-dark-green/60">Full Approval</p>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="POD support professionals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <p className="text-xs text-dark-green/60 font-semibold uppercase tracking-wide mb-1">Issued By</p>
            <p className="font-extrabold text-dark-green text-sm">Community Development Authority (CDA), Dubai</p>
          </div>
        </div>
      </section>

      {/* Yellow Banner */}
      <div className="bg-primary-500 py-4 overflow-hidden flex border-y border-primary-600/20">
        <div className="flex gap-16 whitespace-nowrap px-6 text-dark-green text-xs font-bold tracking-widest uppercase">
          <span className="flex items-center gap-4"><Plus size={12}/> CDA — Community Development Authority</span>
          <span className="flex items-center gap-4"><Plus size={12}/> DHA — Dubai Health Authority</span>
          <span className="flex items-center gap-4"><Plus size={12}/> RTA — Roads & Transport Authority</span>
          <span className="flex items-center gap-4"><Plus size={12}/> SANAD CARD — OFFICIAL GOVERNMENT ID</span>
          <span className="flex items-center gap-4"><Plus size={12}/> CDA — Community Development Authority</span>
          <span className="flex items-center gap-4"><Plus size={12}/> DHA — Dubai Health Authority</span>
        </div>
      </div>

      {/* Core Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <p className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-4">CORE SERVICES</p>
            <h2 className="text-4xl font-extrabold text-dark-green leading-tight">
              Complete Dubai Disability Support System
            </h2>
            <p className="text-dark-green/70 mt-6 leading-relaxed">
              Dubai focuses on <strong>services and true inclusion</strong>, not direct universal cash. The Sanad Card is your key to unlocking healthcare, mobility, and government access benefits.
            </p>
            <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
              <p className="text-sm font-bold text-dark-green mb-1">💡 Key Principle</p>
              <p className="text-sm text-dark-green/70">Dubai provides <em>needs-based</em> targeted financial assistance — not universal monthly payments. Focus is on services + inclusion.</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <CreditCard size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">🪪 Sanad Card</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Official government ID issued by CDA. Unlocks free/discounted services, private sector benefits, and priority access. <span className="font-semibold">NOT cash by default.</span>
              </p>
            </div>
            
            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <BarChart3 size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">💰 Financial Assistance</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Monthly social assistance for eligible low-income UAE citizens. Covers therapy, rehabilitation, caregiver costs, medical equipment, and education.
              </p>
            </div>

            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <Car size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">🅿️ Transport & Mobility</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Free dedicated parking, Salik toll exemptions, metro/bus accessibility assistance, and up to 50% taxi discount for eligible cardholders.
              </p>
            </div>

            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <HeartHandshake size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">🏥 Healthcare & Medical</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                DHA home healthcare visits, rehabilitation therapy, assistive devices support, and priority hospital services.
              </p>
            </div>

            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <Building2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">🏛️ Government Access</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Free/discounted parks, museums, and Dubai attractions (Dubai Frame, Safari Park). Fast-track government service counters.
              </p>
            </div>

            <div className="group p-5 rounded-2xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200">
              <div className="text-primary-600 mb-4 border border-primary-200 w-12 h-12 flex items-center justify-center rounded-lg bg-white shadow-sm">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-dark-green mb-2">🔒 Priority Services</h3>
              <p className="text-dark-green/70 text-sm leading-relaxed">
                Accessible buildings and transport infrastructure, special assistance at metro stations, and priority queuing at all government centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibility" className="bg-dark-green py-24 text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-primary-400 text-xs font-bold tracking-widest uppercase mb-4">WHO CAN APPLY</p>
            <h2 className="text-4xl font-extrabold">Eligibility Criteria</h2>
            <p className="text-cream/70 mt-4 max-w-xl mx-auto">The Sanad Card is available for UAE citizens, residents, and tourists with valid disability documentation.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(eligibilityGroups).map(([key, grp]) => (
              <button
                key={key}
                onClick={() => setActiveEligibility(key)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeEligibility === key ? 'bg-primary-500 text-dark-green' : 'bg-white/10 text-cream hover:bg-white/20'}`}
              >
                {grp.label}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-primary-400 mb-6">{eligibilityGroups[activeEligibility].label}</h3>
            <ul className="space-y-4">
              {eligibilityGroups[activeEligibility].items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-cream/90 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Apply - Yellow Section */}
      <section id="apply" className="bg-primary-400 py-24 text-dark-green">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-dark-green/70 text-xs font-bold tracking-widest uppercase mb-4">APPLICATION PROCESS</p>
            <h2 className="text-4xl font-extrabold">How to Apply for Sanad Card</h2>
            <p className="text-dark-green/80 mt-4 max-w-lg mx-auto">Apply online via the CDA portal or Dubai Now App in minutes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 text-center border border-dark-green/10">
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-dark-green rounded-2xl mx-auto">
                <Globe size={26} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Online Submission</h3>
              <p className="text-dark-green/80 text-sm leading-relaxed mb-4">
                Visit <strong>cda.gov.ae</strong> or open the <strong>Dubai Now App</strong>. Choose "Issue Sanad Card" to begin.
              </p>
            </div>
            
            <div className="bg-dark-green rounded-2xl p-8 text-center text-cream">
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary-500 rounded-2xl mx-auto">
                <FileText size={26} className="text-dark-green" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cream">2. Upload Documents</h3>
              <ul className="text-cream/80 text-sm leading-relaxed text-left space-y-2">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary-400 shrink-0" /> Emirates ID</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary-400 shrink-0" /> Passport photo</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary-400 shrink-0" /> Medical report (DHA approved)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary-400 shrink-0" /> Proof of residence (if resident)</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 text-center border border-dark-green/10">
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-dark-green rounded-2xl mx-auto">
                <Smartphone size={26} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Receive Digital Card</h3>
              <p className="text-dark-green/80 text-sm leading-relaxed">
                Verification: <strong>~30 minutes</strong>. Full approval: <strong>1–2 working days</strong>. Card sent digitally via SMS/email.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-green/80 font-semibold">
            <span className="flex items-center gap-2"><Globe size={16} /> cda.gov.ae</span>
            <span className="flex items-center gap-2"><Smartphone size={16} /> Dubai Now App</span>
            <span className="flex items-center gap-2"><Phone size={16} /> 800-CDA (232)</span>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex text-primary-500 text-xl gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-dark-green leading-snug mb-8 max-w-2xl mx-auto">
          "Implementing the POD Platform streamlined our benefit application process, resulting in a 20% increase in accessibility support delivery efficiency across Dubai."
        </h3>
        <div className="flex items-center justify-center gap-4 mb-12">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Ahmed Al Mansouri" className="w-12 h-12 rounded-full object-cover" />
          <div className="text-left">
            <p className="font-bold text-dark-green text-sm">Ahmed Al Mansouri</p>
            <p className="text-xs text-dark-green/60">Director, Community Development Authority</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-green text-cream py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={PODicon} alt="POD Logo" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="font-extrabold text-sm">POD Benefit Platform</p>
              <p className="text-xs text-cream/60">Dubai People of Determination</p>
            </div>
          </div>
          <p className="text-xs text-cream/50 text-center">© 2024 Community Development Authority, Dubai Government. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-cream/60 font-semibold">
            <a href="https://www.cda.gov.ae" target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors">CDA Portal</a>
            <span>•</span>
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
