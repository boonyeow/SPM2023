import { ChakraProvider } from "@chakra-ui/react";
import { LoginProvider } from "./context/LoginContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LoginProvider>
                                <RouterProvider router={router} />
        </LoginProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
