// Force LTR direction and Geist font for all admin pages,
// overriding the root layout's Arabic RTL defaults.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" className="font-[family-name:var(--font-geist-sans)]">
      {children}
    </div>
  );
}
