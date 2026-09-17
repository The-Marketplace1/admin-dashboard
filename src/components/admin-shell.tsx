import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  CreditCard,
  ExternalLink,
  FileBarChart,
  Gavel,
  LayoutDashboard,
  ListFilter,
  Menu,
  MessageSquare,
  Send,
  ShieldAlert,
  Settings2,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { runtimeConfig } from '@/config/env';
import { useAdminUiStore } from '@/store/admin-ui-store';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/users', label: 'Customers', icon: Users },
  { href: '/professionals', label: 'Professionals', icon: ShieldCheck },
  { href: '/disputes', label: 'Disputes', icon: Gavel },
  { href: '/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/services', label: 'Services', icon: BriefcaseBusiness },
  { href: '/notifications', label: 'Notifications', icon: Send },
  { href: '/reports', label: 'Reports', icon: FileBarChart },
  { href: '/security', label: 'Security', icon: ShieldAlert },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/communications', label: 'Communications', icon: MessageSquare },
  { href: '/activity', label: 'Activity log', icon: ListFilter },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const mobileOpen = useAdminUiStore((state) => state.mobileNavigationOpen);
  const setMobileOpen = useAdminUiStore((state) => state.setMobileNavigationOpen);
  const activeLabel =
    navItems.find((item) => item.href === location.pathname)?.label ?? 'Settings';

  return (
    <div>
      <aside aria-label="Marketplace administration">
        <div>
          <Link to="/" onClick={() => setMobileOpen(false)} data-testid="link-brand">
            <strong>Marketplace</strong>
            <span>Operations</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            hidden={!mobileOpen}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <p>Workspace</p>
        <nav aria-label="Primary navigation">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              to={href}
              key={href}
              onClick={() => setMobileOpen(false)}
              aria-current={location.pathname === href ? 'page' : undefined}
              data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <p>Gateway-controlled operations</p>
        <Link to="/settings" onClick={() => setMobileOpen(false)} data-testid="link-nav-settings">
          <Settings2 aria-hidden="true" />
          Settings
        </Link>
        <div>
          <span aria-hidden="true">Admin</span>
          <span>
            <strong>Administrator session</strong>
            <small>Authorized operations access</small>
          </span>
          <button type="button" aria-label="Open account menu" data-testid="button-account-menu">
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      </aside>
      <header>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          data-testid="button-open-navigation"
        >
          <Menu aria-hidden="true" />
        </button>
        <div>
          <p>Marketplace / {activeLabel}</p>
          <h1>{activeLabel}</h1>
        </div>
        <div>
          <button type="button" aria-label="Open command search" data-testid="button-command-search">
            Search
          </button>
          <button type="button" aria-label="View notifications" data-testid="button-notifications">
            <Bell aria-hidden="true" />
          </button>
          <a
            href={`${runtimeConfig.gatewayUrl}${runtimeConfig.gatewayPrefix}/health`}
            target="_blank"
            rel="noreferrer"
            data-testid="link-api-health"
          >
            <ExternalLink aria-hidden="true" />
            API health
          </a>
        </div>
      </header>
      {mobileOpen ? (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
          data-testid="button-navigation-overlay"
        >
          Close navigation
        </button>
      ) : null}
      <main>
        {children}
      </main>
    </div>
  );
}
