import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/theme/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <TopBar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
