import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs/";
import { Toaster } from "@/components/ui/sonner"
import { CurrencyProvider } from "@/components/currencyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Split",
  description: "manage your expences amoung groups or single person",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ConvexClientProvider>
            <CurrencyProvider>
              <>
                <Header />
            <main className="container mx-auto pt-14 sm:pt-20">{children}</main>
              </>
            </CurrencyProvider>
            
             <Toaster richColors />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
