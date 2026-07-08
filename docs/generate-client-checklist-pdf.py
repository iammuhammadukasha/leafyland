"""Generate 1-page LeafyLand client go-live checklist PDF."""
from datetime import date
from fpdf import FPDF


class LeafyLandPDF(FPDF):
    GREEN = (30, 84, 57)
    BLACK = (0, 0, 0)
    GRAY = (100, 100, 100)
    LIGHT = (245, 248, 246)

    def header(self):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*self.GREEN)
        self.cell(0, 7, "LeafyLand", align="L")
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*self.GRAY)
        self.cell(0, 7, "Client Go-Live Checklist", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*self.GREEN)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(3)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 7)
        self.set_text_color(*self.GRAY)
        self.cell(0, 8, f"Confidential  |  {date.today().strftime('%d %B %Y')}  |  leafyland.shop", align="C")

    def section(self, title: str):
        self.ln(1)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(*self.GREEN)
        self.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")

    def check_item(self, text: str):
        self.set_font("Helvetica", "", 8.5)
        self.set_text_color(*self.BLACK)
        x = self.get_x()
        self.cell(4, 4.2, "[ ]")
        self.multi_cell(0, 4.2, text)
        self.set_x(x)


def main():
    pdf = LeafyLandPDF()
    pdf.set_auto_page_break(auto=False)
    pdf.set_margins(12, 14, 12)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 15)
    pdf.set_text_color(*LeafyLandPDF.GREEN)
    pdf.cell(0, 8, "What We Need From You", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(*LeafyLandPDF.GRAY)
    pdf.multi_cell(
        0,
        4,
        "Platform is built and connected to Supabase. Complete the items below to move from demo to live sales.",
    )
    pdf.ln(1)

    pdf.set_fill_color(*LeafyLandPDF.LIGHT)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*LeafyLandPDF.GREEN)
    pdf.cell(0, 5, "STATUS: Demo ready  |  Payments: mock mode  |  Catalog: sample data only", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    # Two-column layout
    col_w = 93
    left_x = 12
    right_x = 107
    y_start = pdf.get_y()

    def col_section(x: float, y: float, title: str, items: list[str]) -> float:
        pdf.set_xy(x, y)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*LeafyLandPDF.GREEN)
        pdf.cell(col_w, 5, title, new_x="LMARGIN", new_y="NEXT")
        y = pdf.get_y()
        for item in items:
            pdf.set_xy(x, y)
            pdf.set_font("Helvetica", "", 8)
            pdf.set_text_color(*LeafyLandPDF.BLACK)
            pdf.cell(4, 3.8, "[ ]")
            pdf.multi_cell(col_w - 4, 3.8, item)
            y = pdf.get_y() + 0.5
        return y

    blocking = [
        "Razorpay account + API keys (test, then live)",
        "GSTIN for invoices and checkout",
        "Real product catalog (names, prices, stock, descriptions)",
        "Product photos (real images or approved stock)",
        "Services list + pricing + service cities",
        "Shipping rules (pincodes, rates, free-delivery threshold)",
        "Domain DNS access for leafyland.shop",
        "Production hosting approval (Vercel + API host)",
        "Supabase: disable Confirm email for MVP login",
    ]
    legal = [
        "Company legal name, address, phone, support email",
        "Privacy Policy, Terms, Refund & Shipping policy text",
        "Vendor onboarding rules + KYC requirements",
        "Production admin emails (replace demo accounts)",
    ]
    signoff = [
        "MVP scope sign-off (Phase 2 CRM/AI deferred)",
        "UAT walkthrough: order, booking, admin, vendor",
        "Milestone payment / sign-off alignment",
    ]
    soon = [
        "Logo / brand kit (if updated)",
        "Razorpay webhook URL after API deploy",
        "Email provider for order confirmations",
        "WhatsApp business number confirmation",
        "SEO titles and meta descriptions",
    ]

    y1 = col_section(left_x, y_start, "Blocking Go-Live", blocking)
    y2 = col_section(right_x, y_start, "Business & Legal Content", legal)
    y_mid = max(y1, y2) + 2

    y3 = col_section(left_x, y_mid, "Decisions & Sign-Off", signoff)
    y4 = col_section(right_x, y_mid, "Nice to Have Soon", soon)
    y_end = max(y3, y4) + 3

    pdf.set_xy(left_x, y_end)
    pdf.set_draw_color(*LeafyLandPDF.GREEN)
    pdf.line(left_x, y_end, 200, y_end)
    pdf.ln(3)

    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(*LeafyLandPDF.GREEN)
    pdf.multi_cell(
        0,
        4,
        "Message to share: Platform is built and on Supabase. To go live we need Razorpay keys, "
        "GSTIN, real catalog with images, shipping rules, legal text, domain DNS, production admin "
        "emails, and MVP sign-off. Payments stay in test mode until Razorpay is connected.",
    )

    pdf.ln(2)
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*LeafyLandPDF.GRAY)
    pdf.cell(0, 4, "Already done (no action needed): Supabase DB + Auth + Storage, React storefront, admin/vendor dashboards, cart, checkout, service booking.", new_x="LMARGIN", new_y="NEXT")

    out = "docs/LeafyLand-Client-GoLive-Checklist.pdf"
    pdf.output(out)
    print(f"Created: {out}")


if __name__ == "__main__":
    main()
