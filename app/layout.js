export const metadata = {
  title: 'Instamind, AI grocery refill and meal planning assistant',
  description: 'Instamind is an AI-native commerce assistant for grocery refills and meal planning on top of Swiggy Food and Instamart.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
