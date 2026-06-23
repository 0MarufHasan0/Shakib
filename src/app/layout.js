import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata = {
  title: "Md Shakib Al Hasan | Professional Pharmacy Portfolio",
  description: "B.Pharm Student at KYAU, Clinical Pharmacy Trainee, and Computational Drug Discovery & Molecular Docking Researcher.",
  keywords: [
    "Md Shakib Al Hasan",
    "Pharmacy Researcher",
    "Clinical Pharmacist",
    "Khwaja Yunus Ali University",
    "KYAU",
    "Molecular Docking",
    "AutoDock Vina",
    "In Silico Drug Discovery",
    "Gut Microbiota",
    "Breast Cancer Research"
  ],
  authors: [{ name: "Md Shakib Al Hasan" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        {/* Load Material Symbols Outlined from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
