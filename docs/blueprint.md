# **App Name**: DocConnect

## Core Features:

- Public Frontend: Display a clean, responsive website with doctor information, services, testimonials, and a contact form.
- Inquiry Submission: Allow patients to submit inquiries with their name, phone number, reason for visit, and preferred date, storing the data in Firestore.
- Admin Authentication: Secure the admin dashboard at `/admin` with email/password authentication using Firebase Auth.
- Inquiry List: Display a list of patient inquiries in the admin dashboard, optimized for mobile using a card layout.
- Inquiry Management: Allow admin users to delete inquiries and mark them as 'contacted'.
- Call Now Button: Include a 'Call Now' button (tel: link) on each inquiry card in the admin dashboard for quick dialing on mobile.
- Contact Info Suggestion: Use a tool that suggests a personalized response message to patients based on the patient's message when marking a patient as contacted.

## Style Guidelines:

- Primary color: Soft blue (#ADD8E6) to convey a sense of trust and calmness.
- Background color: Very light blue (#F0F8FF) to maintain a clean and professional look.
- Accent color: Light green (#90EE90) to highlight important actions and information.
- Body and headline font: 'PT Sans', a humanist sans-serif for modern and warm readability.
- Use Lucide React icons for a consistent and clean visual language throughout the application.
- Mobile-first design with a focus on clear information hierarchy and easy navigation, especially in the admin dashboard.
- Subtle animations for transitions and feedback to enhance user experience without being distracting.