import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/MainContainer/Header/Header";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Footer from "@/components/MainContainer/Footer/Footer";
import { MovieProvider } from "@/context/MovieContext";

export const metadata: Metadata = {
  title: "Moviehub",
  description: "Welcome to the MovieHub project, an application to keep track of the movies you are watching.",
  icons: {
    icon: "/assets/logo/movie-icon.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="body">
        <UserProvider>
          <AuthProvider>
            {/* <MovieProvider> */}
            <Header />
            <main className="main">
            {children}
            </main>
            <Footer />
            {/* </MovieProvider> */}
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
