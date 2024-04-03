"use client"

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";

function Bottombar(){
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
      {sidebarLinks.map((link) => {

const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
return (
  <Link 
    href = {link.route}
    key= {link.label}
    className = {`bottombar_link ${isActive && 'bg-primary-500'}`}
  >
    <Image 
      src={link.imgURL}
      alt = {link.label}
      width={24}
      height={24}
    />

    <p className="text-light-1 max-lg:hidden">{link.label.split(/\s+/)[0] }</p>
  </Link>
)}
)}
</div>

<div className="mt-10 px-6">
<SignedIn>
  <SignOutButton signOutCallback={() =>router.push('/sign-in')}>
      <div className="flex cursor-pointer gap-4 p-4">
          <Image 
          src="/assets/logout.svg"
          alt ="logout"
          width={24}
          height={24}
          />
        
        <p className="text-light-2 max-sm:hidden">Logout</p>

      </div>
      </SignOutButton>
       </SignedIn>

      </div>

    </section>
  )
};

export default Bottombar;
