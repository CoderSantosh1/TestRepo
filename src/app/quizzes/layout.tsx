import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";

// Initialize Vercel Analytics and Speed Insights
inject();
injectSpeedInsights({ framework: "nextjs" });

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#1a124d]">
        {children}
      </main>
      <Footer />
    </>
  );
} 