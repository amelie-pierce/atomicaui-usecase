import { AuiIdentityProvider } from './vendor/atomic-aui'
import './vendor/atomic-aui/tokens/index.scss'
import './fonts.scss'
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<AuiIdentityProvider brand="atomic" theme="light" typeface="engineering" typography="body"><App /></AuiIdentityProvider>);
