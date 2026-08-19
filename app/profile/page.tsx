import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserById } from "@/services/user.service";
import { verifyToken } from "@/lib/jwt";
import ProfileSidebar from "@/components/ui/profile/ProfileSidebar";
import ProfileInfo from "@/components/ui/profile/ProfileInfo";


export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");
  

  let payload;
  try {
    payload = await verifyToken(token);
  } catch {
  
    redirect("/login");
  }

  if (!payload || !payload.id) {
    redirect("/login");
  }

  
  const user = await getUserById(payload.id);

  
  if (!user) {
    redirect("/login");
  }

  

  return (
    <div className="container py-8 pb-24">
     
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text md:text-3xl">پروفایل من</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileSidebar user={user}/>
        <ProfileInfo user={user}/>
      </div>
    </div>
  );
}