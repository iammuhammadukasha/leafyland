"""Generate LeafyLand backend progress PDF for client."""
from datetime import date
from fpdf import FPDF


class LeafyLandPDF(FPDF):
    GREEN = (30, 84, 57)
    BLACK = (0, 0, 0)
    GRAY = (100, 100, 100)

    def header(self):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*self.GREEN)
        self.cell(0, 8, "LeafyLand", align="L")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(*self.GRAY)
        self.cell(0, 8, "Backend Progress Update", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*self.GREEN)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(*self.GRAY)
        self.cell(0, 10, f"Confidential  |  {date.today().strftime('%d %B %Y')}", align="C")

    def section_title(self, title: str):
        self.ln(2)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*self.GREEN)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.BLACK)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.BLACK)
        x = self.get_x()
        self.cell(5, 5.5, chr(149))
        self.multi_cell(0, 5.5, text)
        self.set_x(x)


def main():
    pdf = LeafyLandPDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*LeafyLandPDF.GREEN)
    pdf.cell(0, 12, "Backend Progress Update", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*LeafyLandPDF.GRAY)
    pdf.cell(0, 6, "Phase 1 Foundation  |  Day 2 Complete", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    pdf.body_text(
        "We have moved from a basic placeholder server to a production-ready API "
        "foundation built on NestJS (Node.js + TypeScript). This covers infrastructure: "
        "API structure, database wiring, environment setup, and monitoring endpoints. "
        "Business features (products, orders, CRM, payments) are next."
    )

    pdf.section_title("What's Done")
    items_done = [
        "API architecture: modular NestJS backend (Config, Database, Health modules)",
        "PostgreSQL connection layer for local dev (Docker) and production (Railway/Supabase)",
        "Environment config with separate dev and production templates",
        "Live endpoints tested: GET /api/health and GET /api/version",
        "Deployment prep: Vercel serverless handler + Docker Compose for local Postgres",
    ]
    for item in items_done:
        pdf.bullet(item)

    pdf.section_title("API Endpoints (Live)")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_fill_color(245, 248, 246)
    pdf.cell(55, 7, "  GET /api/health", fill=True)
    pdf.cell(0, 7, "  Server status + database check", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.cell(55, 7, "  GET /api/version", fill=True)
    pdf.cell(0, 7, "  API version, environment, build info", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    pdf.section_title("Tech Stack")
    pdf.body_text(
        "NestJS 11 + TypeScript  |  PostgreSQL 16  |  @nestjs/config  |  "
        "Docker Compose (local)  |  Planned: Railway or Vercel"
    )

    pdf.section_title("Coming Next")
    items_next = [
        "Admin authentication (JWT, roles)",
        "Product catalog CRUD + bulk CSV import",
        "Vendor management, customer accounts, cart & checkout",
        "Razorpay payments, CRM (leads, pipeline, email campaigns), orders",
    ]
    for item in items_next:
        pdf.bullet(item)

    pdf.section_title("Summary")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*LeafyLandPDF.GREEN)
    pdf.multi_cell(
        0,
        5.5,
        "The backend foundation is complete. The platform is ready to build "
        "business features on top of this base.",
    )

    out = "docs/LeafyLand-Backend-Progress.pdf"
    pdf.output(out)
    print(f"Created: {out}")


if __name__ == "__main__":
    main()
