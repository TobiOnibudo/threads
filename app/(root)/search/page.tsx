import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import ProfileHeader from "@/components/shared/ProfileHeader"
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { profileTabs } from "@/constants"
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab"

async function  Page({params} : {params : {id : string}}) {
  const user = await currentUser()

  if(!user) return null

  const userInfo =  await fetchUser(params.id);

  if(!userInfo.onboarded) redirect('/onboarding')

  return (
    <div>
        <h1 className="head-text mb-10">Search</h1>
    </div>
  )
};

export default Page;
