import Providers from "./components/Providers";

export const metadata = {
  title: "Kanban Board",
  description: "Task Management Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
