import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthSessionProvider, useAuthSession } from "./auth/AuthSessionContext";
import { LandingPage } from "./components/LandingPage";
import { Private } from "./auth/Private";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

const PageWrapper = () => {
  const { id } = useParams();
  return (
    <Layout>
      <AppStateProvider key={id}>
        <Page />
      </AppStateProvider>
    </Layout>
  );
};

const RootRoute = () => {
  const { session, loading } = useAuthSession();
  if (loading) return null;
  return session ? <Layout><Home /></Layout> : <LandingPage />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthSessionProvider>
        <Routes>
          <Route
            path="/:id"
            element={<Private component={<PageWrapper />} />}
          />
          <Route path="/" element={<RootRoute />} />
        </Routes>
      </AuthSessionProvider>
    </BrowserRouter>
  );
};

export default App;
