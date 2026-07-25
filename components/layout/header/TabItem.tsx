import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function TabItem({
  href,
  label,
  icon: Icon,
  badge,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-1 text-text-secondary transition hover:text-primary"
    >
      <span className="relative">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
        {!!badge && badge > 0 && (
          <span className="absolute -top-3.5 -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  );
}