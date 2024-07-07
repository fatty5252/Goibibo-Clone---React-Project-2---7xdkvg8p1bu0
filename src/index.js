import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { UserProvider } from "./providers/UserProvider";
import { TrainUser } from "./providers/TrainUser";
import { BusUser } from "./providers/BusUser";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <UserProvider> {/* Wrap your App component with UserProvider */}
    <TrainUser>
      <BusUser>
    <App />
    </BusUser>
    </TrainUser>
  </UserProvider>
</React.StrictMode>
);
