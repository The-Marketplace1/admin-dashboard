import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/app/error-boundary';
import NotFound from '@/pages/not-found';
import { AdminShell } from '@/components/admin-shell';
import { ActivityPage, DisputesPage, OverviewPage, ProfessionalsPage, SettingsPage, UsersPage } from '@/features/admin-pages';
import {
  AnalyticsPage,
  BookingsPage,
  CommunicationsPage,
  NotificationsPage,
  PaymentsPage,
  ReportsPage,
  SecurityPage,
  ServicesPage,
} from '@/features/operations-pages';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <AdminShell>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />
          <Route path="/disputes" element={<DisputesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/communications" element={<CommunicationsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>;
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

