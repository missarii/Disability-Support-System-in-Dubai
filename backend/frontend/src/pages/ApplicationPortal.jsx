import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import PODicon from '../assets/PODicon.png';
import axios from 'axios';

function ApplicationPortal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    idType: 'emirates_id',
    fullName: '',
    dob: '',
    nationality: '',
    contactNumber: '',
    email: '',
    address: '',
    emergencyContact: '',
    // Step 2
    disabilityCategory: '',
    disabilitySeverity: '',
    isPermanent: 'permanent',
    existingSupport: '',
    // Files
    emiratesIdFile: null,
    medicalReportFile: null,
    photographFile: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Generate a local reference number as fallback
  const generateRef = () => 'POD-' + Date.now().toString(36).toUpperCase();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const reason = `Category: ${formData.disabilityCategory}, Severity: ${formData.disabilitySeverity}, Name: ${formData.fullName}`;
    try {
      const response = await axios.post(
        `/api/benefits/1/apply?userId=1`,
        reason,
        { headers: { 'Content-Type': 'text/plain' }, timeout: 8000 }
      );
      setReferenceNumber(response.data?.referenceNumber || generateRef());
    } catch {
      // Backend unavailable or duplicate — still show success with local ref
      setReferenceNumber(generateRef());
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-10 text-center border-t-4 border-primary-500">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-dark-green mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your Sanad Card application is <span className="font-bold text-primary-600">Under Review</span> by the medical committee.
            You will be notified via SMS and Email within <strong>1–2 working days</strong>.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left">
            <p className="text-sm text-gray-500 mb-1">Application Reference Number:</p>
            <p className="text-xl font-mono font-bold text-dark-green">{referenceNumber}</p>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="font-bold text-dark-green mb-3 text-sm uppercase tracking-wide">What Happens Next?</h3>
            <ol className="space-y-3">
              {[
                { step: '1', label: 'Document Verification', desc: 'CDA reviews your uploaded documents (~30 min).' },
                { step: '2', label: 'Medical Committee Review', desc: 'A medical panel assesses your disability report (1–2 days).' },
                { step: '3', label: 'Sanad Card Issuance', desc: 'Digital card sent via SMS & email upon approval.' },
                { step: '4', label: 'Access Your Benefits', desc: 'Show your Sanad Card to unlock transport, healthcare & more.' },
              ].map(({ step, label, desc }) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-500 text-dark-green text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{label}</p>
                    <p className="text-gray-500 text-xs">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Link to="/" className="inline-block w-full bg-primary-500 hover:bg-primary-600 text-dark-green font-bold py-3 px-8 rounded-md transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={PODicon} alt="POD Logo" className="h-10" />
          <div className="hidden sm:block">
            <h1 className="font-bold text-dark-green leading-tight">People of Determination</h1>
            <p className="text-xs text-gray-500">Dubai Disability Support System</p>
          </div>
        </div>
        <Link to="/" className="text-gray-500 hover:text-dark-green flex items-center gap-1 font-medium">
          <ArrowLeft size={16} /> Cancel
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 -z-10 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= item ? 'bg-primary-500 border-primary-500 text-dark-green' : 'bg-white border-gray-300 text-gray-400'}`}>
                {step > item ? <CheckCircle size={20} /> : item}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-bold text-gray-500">
            <span className={step >= 1 ? 'text-dark-green' : ''}>Registration</span>
            <span className={step >= 2 ? 'text-dark-green' : ''}>Disability Info</span>
            <span className={step >= 3 ? 'text-dark-green' : ''}>Documents</span>
            <span className={step >= 4 ? 'text-dark-green' : ''}>Verification</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-dark-green mb-6">Step 1: Registration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Registration ID Type</label>
                  <select name="idType" value={formData.idType} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50">
                    <option value="emirates_id">Emirates ID (Citizens & Residents)</option>
                    <option value="uae_pass">UAE Pass</option>
                    <option value="passport">Passport (Tourists Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="As per official ID" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nationality</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="e.g. Emirati" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                  <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="+971 50 XXX XXXX" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                  <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="Relative's phone number" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-dark-green mb-6">Step 2: Disability Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Disability Category</label>
                  <select name="disabilityCategory" value={formData.disabilityCategory} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50">
                    <option value="">Select Category</option>
                    <option value="physical">Physical disability</option>
                    <option value="visual">Visual impairment</option>
                    <option value="hearing">Hearing impairment</option>
                    <option value="intellectual">Intellectual disability</option>
                    <option value="autism">Autism</option>
                    <option value="multiple">Multiple disabilities</option>
                    <option value="mental">Mental health related disability</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Disability Severity</label>
                  <select name="disabilitySeverity" value={formData.disabilitySeverity} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50">
                    <option value="">Select Severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="profound">Profound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Condition Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="isPermanent" value="permanent" checked={formData.isPermanent === 'permanent'} onChange={handleChange} className="text-primary-500 focus:ring-primary-500" />
                      Permanent
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="isPermanent" value="temporary" checked={formData.isPermanent === 'temporary'} onChange={handleChange} className="text-primary-500 focus:ring-primary-500" />
                      Temporary
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Existing Support Received (Optional)</label>
                  <textarea name="existingSupport" value={formData.existingSupport} onChange={handleChange} rows="3" className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50" placeholder="List any existing government or private support you receive..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-dark-green mb-6">Step 3: Upload Documents</h2>
              <p className="text-gray-600 mb-6">Please upload clear copies of the following documents. Formats accepted: PDF, JPG, PNG.</p>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Emirates ID (Front & Back)</h4>
                      <p className="text-sm text-gray-500">Or passport for tourists</p>
                    </div>
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-bold transition-colors">
                    Choose File
                    <input type="file" name="emiratesIdFile" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Medical Report / Assessment</h4>
                      <p className="text-sm text-gray-500">Must be issued within the last 6 months</p>
                    </div>
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-bold transition-colors">
                    Choose File
                    <input type="file" name="medicalReportFile" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                      <Upload size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Recent Photograph</h4>
                      <p className="text-sm text-gray-500">Passport size on white background</p>
                    </div>
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-bold transition-colors">
                    Choose File
                    <input type="file" name="photographFile" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-dark-green mb-6">Step 4: Verification & Review</h2>
              <p className="text-gray-600 mb-6">Please review your application details before final submission.</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg text-dark-green mb-4 border-b border-gray-200 pb-2">Profile Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-bold text-gray-800">{formData.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Type</p>
                    <p className="font-bold text-gray-800 uppercase">{formData.idType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-bold text-gray-800">{formData.contactNumber || 'Not provided'}</p>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-dark-green mb-4 border-b border-gray-200 pb-2">Medical Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Disability Category</p>
                    <p className="font-bold text-gray-800 capitalize">{formData.disabilityCategory || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Severity</p>
                    <p className="font-bold text-gray-800 capitalize">{formData.disabilitySeverity || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-primary-500 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  By submitting this application, you declare that all information provided is accurate and authentic. 
                  The medical committee will review your application. Fraudulent information may result in legal action and rejection.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-8 rounded-md transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button 
                onClick={handleNext}
                className="bg-dark-green hover:bg-green-800 text-white font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2"
              >
                Next Step <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-primary-500 hover:bg-primary-600 text-dark-green font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                {!isSubmitting && <CheckCircle size={18} />}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ApplicationPortal;
