import { validateRequest } from '@/auth';
import Navbar from './Navbar'
import { redirect } from 'next/navigation';

const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  return (
    <main className=" h-screen  w-full px-2.5 md:px-8 overflow-y-scroll">
      <div className="max-w-screen-xl mx-auto flex">
        <Navbar user={user} />
        <div className="w-full flex-1" >
          {children}
        </div>
      </div>
    </main>
  )
}

export default layout



