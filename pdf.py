from fpdf2 import FPDF, FontFace
import datetime

pdf_path = "/mnt/data/Society_Gate_ERP_IncubationAI_Emoji_Edition.pdf"


class FancyPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 16)
        self.set_fill_color(0, 102, 204)
        self.set_text_color(255, 255, 255)
        self.cell(0, 12, "🏢 Society Gate ERP | Powered by Incubation AI", 0, 1, "C", fill=True)
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, "Incubation AI | www.incubationai.in | © 2025 All Rights Reserved", 0, 0, "C")

    def chapter(self, emoji, title, body, bg_color=(240, 250, 255)):
        self.set_fill_color(*bg_color)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(0, 80, 160)
        self.cell(0, 10, f"{emoji} {title}", 0, 1, "L", fill=True)
        self.ln(2)
        self.set_font("Helvetica", "", 11)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 7, body)
        self.ln(5)


pdf = FancyPDF()
pdf.add_page()

# --- Cover Page ---
pdf.set_fill_color(0, 153, 153)
pdf.rect(0, 0, 210, 297, "F")
pdf.set_text_color(255, 255, 255)
pdf.set_font("Helvetica", "B", 30)
pdf.ln(80)
pdf.cell(0, 15, "🏠 Society Gate ERP", ln=True, align="C")
pdf.set_font("Helvetica", "I", 16)
pdf.cell(0, 12, "Smart Society & Visitor Management Suite", ln=True, align="C")
pdf.ln(10)
pdf.set_font("Helvetica", "", 14)
pdf.cell(0, 10, "“Your Society, Digitally Secured.”", ln=True, align="C")
pdf.ln(20)
pdf.set_font("Helvetica", "", 12)
pdf.cell(0, 10, "🚀 Powered by Incubation AI", ln=True, align="C")
pdf.ln(70)
pdf.set_font("Helvetica", "I", 11)
pdf.cell(0, 8, f"User Guide & Sales Brochure | © {datetime.datetime.now().year}", ln=True, align="C")

pdf.add_page()

# --- Sections ---
pdf.chapter("💡", "About Society Gate ERP", """
Society Gate ERP is a next-generation, AI-powered platform by Incubation AI that simplifies and secures daily operations in residential communities.

It integrates visitor management, resident services, maintenance billing, communication, and analytics into one seamless digital ecosystem.

✨ Empower your society with digital security, real-time transparency, and effortless management!
""")

pdf.chapter("👮‍♂️", "Guide for Security Personnel", """
As a Security Guard, your device (tablet or mobile) will have the "Society Gate Guard App" installed.

🔹 **Visitor Check-in**
   - Tap “New Visitor Entry” and record visitor details.
   - The system automatically sends an OTP verification request to the resident.

🔹 **OTP Verification**
   - Resident receives a 4-digit OTP or app notification.
   - Once verified, the visitor’s entry is approved digitally.

🔹 **Check-out**
   - Mark visitors as “Checked Out” when they exit.
   - The system logs exit time automatically.

🔹 **Frequent Visitors**
   - Maids, delivery staff, and tutors can be pre-approved.

🚨 **Emergency Alerts**
   - If entry is denied or suspicious activity is detected, alerts are sent to society admins instantly.
""")

pdf.chapter("🏡", "Guide for Flat Owners", """
As a Resident, you will have access to the "Society Gate Resident App" or web portal.

📲 **Visitor Verification**
   - Receive instant notifications for guest arrivals.
   - Approve or deny with a single tap or OTP entry.

👥 **Frequent Visitors**
   - Add trusted individuals for auto-entry privileges.

💰 **Bills & Payments**
   - View invoices, pay maintenance bills securely via UPI, and get instant receipts.

🛠️ **Raise Complaints**
   - Log service requests or complaints and track their real-time resolution.

📢 **Community Updates**
   - Get notified about events, meetings, and emergencies.
""")

pdf.chapter("💰", "Subscription Plans", """
Society Gate ERP offers flexible subscription plans for societies of all sizes:

1️⃣ **Basic Plan (Rs. 499/month per gate)**
   - Visitor entry + OTP verification
   - Guard attendance tracking
   - Resident approvals & basic reports

2️⃣ **Professional Plan (Rs. 999/month per gate)**
   - Includes all Basic features +
   - Invoice & billing system
   - Maintenance ticket tracker
   - Multi-guard logins & analytics

3️⃣ **Enterprise Plan (Rs. 1,999/month per gate)**
   - All Professional features +
   - IoT-based sensors & QR access
   - AI-powered visitor analytics
   - 24x7 premium support

🌟 **Custom Add-ons**
   - CCTV integration
   - WhatsApp/SMS alerts
   - Multi-society admin dashboard
""")

pdf.chapter("🌟", "Why Societies Love Society Gate ERP", """
✅ 100% Digital Security - OTP & real-time visitor verification  
⚡ Faster Entry - Reduces gate waiting time by 70%  
📊 Transparent Reports - All entries, bills, and requests visible to admins  
💡 Easy to Use - Simple for guards and residents alike  
💰 Cost-Effective - One solution replaces multiple systems  
🌍 Eco-Friendly - Fully paperless operations

🚀 Join the digital revolution in community management with Incubation AI’s smart ERP system.
""")

pdf.chapter("📞", "Contact & Demo Booking", """
Want to experience the future of secure society management? Book your personalized demo today!

📞 +91-98765-43210  
📧 hello@incubationai.in  
🌐 www.incubationai.in  

🏢 Office: Incubation AI Innovation Lab, Bhubaneswar, India

Follow us:  
🔗 LinkedIn | 🌐 Instagram | 🐦 Twitter | 📱 WhatsApp  

Let's make your society safer, smarter, and more connected — together!
""")

pdf.output(pdf_path)
pdf_path