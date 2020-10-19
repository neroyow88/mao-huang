import "../styles/globals.css";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// const UserContext = createContext("user");

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
