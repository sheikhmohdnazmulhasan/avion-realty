

export const metadata = {
  title: "Avion Realty | Easy way to find a perfect property",
  description: "Avion Realty Properties LLC provides personalized consulting services, guiding you through Dubai's real estate landscape. Our experts offer insights tailored to your goals, ensuring a strategic and successful journey.",
  };

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="bg-black text-white">
      <body>{children}</body>
    </html>
  );
}
