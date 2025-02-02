import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";


export const metadata = {
  title: 'AI Study Helper',
  description: 'Generated study material using ai',
}

export default async function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gray-50`}
      >
          <Navbar/>
            {children}
          <Footer/>
      </body>
    </html>
  );
}
