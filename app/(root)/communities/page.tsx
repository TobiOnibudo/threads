import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import { fetchCommunities } from "@/lib/actions/community.actions"
import CommunityCard from "@/components/cards/CommunityCard"
import Searchbar from "@/components/shared/Searchbar"
import Pagination from "@/components/shared/Pagination"

async function  Page( {
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser()

  if(!user) return null

  const userInfo =  await fetchUser(user.id);
  if(!userInfo.onboarded) redirect('/onboarding')

  // Fetch Communities
  const result = await fetchCommunities(
    {
      searchString: searchParams.name ?? "",
      pageNumber: 1,
      pageSize: 25,
      sortBy: "asc"
    }
  )
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <Searchbar 
        routeType="communities"
      />
      <div className='mt-14 flex flex-col gap-9'>
        {result.communities.length === 0 ? (
          <p className="no-result">No Communities found</p>
        ):
        (<>
        {result.communities.map((community) => {
          return (
            <CommunityCard
            key={community.id}
            id={community.id}
            name={community.name}
            username={community.username}
            imgUrl= {community.image}
            bio = {community.bio}
            members = {community.members}
            />)
        })}
        </>)}
      </div>
      
      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  )
};

export default Page;
