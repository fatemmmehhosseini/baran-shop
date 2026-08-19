"use client"
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/stores/user.store';
import { User as UserType } from '@/types/user.type';
import { LogOut, Package, User } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProfileProps {
  user: UserType;
}


export default function ProfileSidebar({user}: ProfileProps) {


    const router = useRouter();
    const logout = useUserStore((state) => state.logout);

    async function handleLogout() {
        try {
        await authService.logout(); 

        logout(); 

        toast.success("با موفقیت خارج شدید");

        router.replace("/");
        router.refresh();
        } catch {
        toast.error("خطا در خروج");
        }
    }

  return (
         <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                {user.full_name.charAt(0) || "?"}
              </div>
              <h2 className="text-lg font-bold text-text">{user.full_name}</h2>
              <p className="text-sm text-text-secondary dir-ltr">{user.phone}</p>
            </div>

            <nav className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/10">
                <User size={18} />
                اطلاعات حساب
              </button>
              <Link
                href="/profile/orders"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-text"
              >
                <Package size={18} />
                سفارش‌های من
              </Link>
              
                <button
                  onClick={handleLogout}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  خروج از حساب
                </button>
        
            </nav>
          </div>
        </aside>
  )
}
