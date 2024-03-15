import Layout from "./(OtherLayout)/layout";
import "./globals.css";

import errorImg from "@/public/images/error.svg";

export default function NotFound() {
  const backgroundStyle = {
    backgroundImage: `url(${errorImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <Layout>
      <div style={backgroundStyle}>
        <h2>hiui</h2>
      </div>
    </Layout>
  );
}
