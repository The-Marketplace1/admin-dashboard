import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main>
      <AlertCircle aria-hidden="true" />
      <h1>404 Page Not Found</h1>
      <p>This route is not part of the administrator console.</p>
    </main>
  );
}

