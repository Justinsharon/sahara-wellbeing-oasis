
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/components/providers/AppProviders";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
