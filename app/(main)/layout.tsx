import { validateRequest } from '@/auth';
import Navbar from './Navbar'
import { redirect } from 'next/navigation';

const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  return (
    <main className="flex h-screen">
      <Navbar user={user} />
      <div className="w-full flex-1 overflow-y-scroll" >
        {children}
      </div>
    </main>
  )
}

export default layout



