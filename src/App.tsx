import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobInventory from "./pages/JobInventory";

import { ConfigProvider } from "antd";
import ThemeProvider from "./theme-provider";
import theme from "./theme";

function App() {
  return (
    <ConfigProvider
      theme={theme}
    >
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="job-inventory/:jobId" element={<JobInventory />} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
