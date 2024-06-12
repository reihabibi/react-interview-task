import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { JobsProvider } from "./modules/JobSite/context/jobSites.tsx";
import { JobInventoryProvider } from "./modules/JobInventory/context/jobInentoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JobsProvider>
      <JobInventoryProvider>
        <App />
      </JobInventoryProvider>
    </JobsProvider>
  </React.StrictMode>
);
