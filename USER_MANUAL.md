# POD Benefit Management Platform — User Manual

> **Official Guide for People of Determination (POD) Portal**  
> Community Development Authority (CDA), Dubai Government

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Applying for a Sanad Card](#applying-for-a-sanad-card)
3. [Application Steps Explained](#application-steps-explained)
4. [After Submission — What Happens Next](#after-submission)
5. [Eligibility Criteria](#eligibility-criteria)
6. [Services Unlocked by the Sanad Card](#services-unlocked)
7. [Frequently Asked Questions](#frequently-asked-questions)
8. [Contact & Support](#contact--support)

---

## Getting Started

Open your browser and go to **http://localhost:8080** (or the deployed URL).

You will see the **POD Platform homepage** with:
- A hero section with "Apply for Sanad Card" and "Check Eligibility" buttons
- An overview of core services (transport, healthcare, financial aid)
- Eligibility criteria by applicant type (Citizens, Residents, Tourists)
- A step-by-step guide on how to apply

---

## Applying for a Sanad Card

Click **"Apply for Sanad Card"** or **"Apply Now"** from the navigation bar.

You will be taken to the **4-step Application Portal** at `/apply`.

> ✅ **No login required** for the demo. The system automatically links your application to the demo user profile.

---

## Application Steps Explained

### Step 1 — Registration

Fill in your personal details:

| Field | Description |
|-------|-------------|
| **Registration ID Type** | Emirates ID (Citizens & Residents), UAE Pass, or Passport (Tourists) |
| **Full Name** | As it appears on your official ID |
| **Date of Birth** | Your date of birth |
| **Nationality** | e.g., Emirati, Indian, British |
| **Contact Number** | Mobile number with country code (e.g., +971 50 XXX XXXX) |
| **Email Address** | Active email for notifications |
| **Emergency Contact** | A relative's phone number |

Click **Next Step** to proceed.

---

### Step 2 — Disability Information

Provide your medical details:

| Field | Options |
|-------|---------|
| **Disability Category** | Physical, Visual, Hearing, Intellectual, Autism, Multiple, Mental health |
| **Disability Severity** | Mild, Moderate, Severe, Profound |
| **Condition Status** | Permanent or Temporary |
| **Existing Support** | *(Optional)* List any current government or private support you receive |

Click **Next Step** to proceed.

---

### Step 3 — Upload Documents

Upload clear copies of the following:

| Document | Requirement |
|----------|-------------|
| **Emirates ID** (front & back) | Or passport for tourists |
| **Medical Report / Assessment** | Must be from a DHA-approved hospital, issued within 6 months |
| **Recent Photograph** | Passport-size, white background |

Accepted formats: **PDF, JPG, PNG**

Click **Next Step** to proceed.

---

### Step 4 — Verification & Review

Review your application summary before final submission:

- **Profile Information** — Name, ID type, contact number
- **Medical Information** — Disability category and severity
- Read and acknowledge the **declaration notice**

Click **Submit Application** when ready.

> ⏳ The system will process your submission. This takes a few seconds.

---

## After Submission

Once submitted, you'll see the **Application Submitted** confirmation screen:

| Detail | Information |
|--------|-------------|
| ✅ **Status** | Application received — Under Review |
| 📋 **Reference Number** | A unique `POD-XXXXXXXXXX` code — save this for tracking |

### Next Steps Timeline

| Step | Who | Timeframe |
|------|-----|-----------|
| **1. Document Verification** | CDA team reviews uploads | ~30 minutes |
| **2. Medical Committee Review** | Panel assesses your disability report | 1–2 working days |
| **3. Sanad Card Issuance** | Digital card sent via SMS & email | Upon approval |
| **4. Access Your Benefits** | Present Sanad Card at service points | Immediately after issuance |

You will receive **SMS and email notifications** at each stage.

---

## Eligibility Criteria

### 🇦🇪 UAE Citizens
- Disability confirmed by medical report
- Approved by the Dubai medical committee
- Access to full financial assistance programs
- Priority government services

### 🏠 UAE Residents
- Valid Emirates ID required
- Medical report from a DHA-approved hospital
- Proof of Dubai residency
- Access to services & transport benefits

### ✈️ Tourists
- Temporary disability proof from home country
- Short-term Sanad Card (valid ~2 months)
- Up to 50% taxi discount
- Metro & bus accessibility services

---

## Services Unlocked

| Service | Benefit |
|---------|---------|
| 🪪 **Sanad Card** | Official government ID — unlocks all services below |
| 💰 **Financial Assistance** | Monthly social assistance for eligible low-income UAE citizens |
| 🅿️ **Free Parking** | Dedicated disabled parking spaces across Dubai |
| 🛣️ **Salik Exemption** | Toll road exemptions for eligible vehicles |
| 🚕 **Taxi Discount** | Up to 50% discount on licensed taxis |
| 🚇 **Metro Accessibility** | Station assistance and priority access |
| 🏥 **Healthcare** | DHA home visits, rehabilitation, assistive devices |
| 🏛️ **Government Access** | Fast-track counters at all government centers |
| 🎡 **Attractions** | Free or discounted entry to Dubai Frame, Safari Park, and museums |

---

## Frequently Asked Questions

**Q: Can I apply multiple times?**  
A: No. The system detects duplicate applications. If you already have a PENDING or APPROVED application for the same benefit, a new submission will be rejected.

**Q: What if the page shows an error during submission?**  
A: The system will still generate a local reference number and show the success screen. Your application data is saved. Contact CDA support with your reference number if unsure.

**Q: How long is the Sanad Card valid?**  
A: Permanent disability cards have no expiry. Temporary cards (e.g., for tourists) are valid for approximately 2 months.

**Q: Can tourists apply?**  
A: Yes — with a valid passport and disability documentation from their home country. The card is issued for the duration of their stay (up to 2 months).

**Q: What happens if I am rejected?**  
A: You will be notified via SMS and email with the reason. You may re-apply after addressing the rejection reason (e.g., submitting an updated medical report).

**Q: Is my data secure?**  
A: Yes. The platform uses AES-256 encryption for sensitive fields, BCrypt password hashing, and JWT-based stateless authentication. All data is stored in a secure government-managed PostgreSQL database.

---

## Contact & Support

| Channel | Details |
|---------|---------|
| 📞 **CDA Hotline** | 800-CDA (800-232) |
| 🌐 **CDA Portal** | [cda.gov.ae](https://www.cda.gov.ae) |
| 📱 **Dubai Now App** | Available on iOS and Android |
| 🏢 **In Person** | CDA offices across Dubai (Sunday–Thursday, 7:30am–2:30pm) |

---

*© 2024 Community Development Authority, Dubai Government. All rights reserved.*
