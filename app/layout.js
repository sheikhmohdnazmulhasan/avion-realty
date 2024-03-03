export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body>{children}</body>
    </html>
  );
}
