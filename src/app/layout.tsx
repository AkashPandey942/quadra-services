import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/theme/ThemeRegistry";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScrolling>
          <ThemeRegistry>
            <TopBar />
            <Header />
            {children}
            <Footer />
          </ThemeRegistry>
        </SmoothScrolling>
      </body>
    </html>
  );
}
