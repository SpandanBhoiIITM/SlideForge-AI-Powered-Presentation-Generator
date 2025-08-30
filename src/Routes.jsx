import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainPresentationGenerator from './pages/main-presentation-generator';
import TemplateLibraryManagement from './pages/template-library-management';
import SettingsApiConfiguration from './pages/settings-api-configuration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MainPresentationGenerator />} />
        <Route path="/main-presentation-generator" element={<MainPresentationGenerator />} />
        <Route path="/template-library-management" element={<TemplateLibraryManagement />} />
        <Route path="/settings-api-configuration" element={<SettingsApiConfiguration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
