import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, LandingPage, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddJob,
  AllJobs,
  Profile,
  ProtectedRoute,
  SharedLayout,
  Stats,
} from "./pages/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats queryClient={queryClient} />} />
            <Route
              path="all-jobs"
              element={<AllJobs queryClient={queryClient} />}
            />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
