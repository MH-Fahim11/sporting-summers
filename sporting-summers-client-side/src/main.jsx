import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import router from "./Route/MainRoute";
import AuhtProvider from "./providers/AuhtProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuhtProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AuhtProvider>
  </React.StrictMode>
);
