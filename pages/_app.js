
import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
// import { AuthUserProvider } from "../context/AuthUserContext";

import { AuthContextProvider } from "../context/AuthUserContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <Analytics />
    </AuthContextProvider>  
  );
}

export default MyApp;
