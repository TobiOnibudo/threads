import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation"

async function Page(){

    const user = await currentUser()

    if(!user) return null

    redirect(`/profile/${user.id}`)

  return (
    <section>
    < h1 className="head-text"> Sorry, We had an issue and could not retrieve your profile.</h1>
    <p className="text-red-500 dark:text-red-900"> Please try logging in again </p>
    </section>
  )
};

export default Page;
