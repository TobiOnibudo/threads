import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const threads  = await fetchThreads(1,30);
  const user = await currentUser();

  return (
   <>
   <h1 className="head-text text-left"> Home</h1>
   <section className="mt-9 flex flex-col gap-10"> 
      {
        threads.posts.length === 0 ? 
        (<p> No threads found</p>) 
        :(
          <>
             { 
                threads.posts.map((thread) => {
                  return <ThreadCard
                  key ={thread._id}
                  id = {thread._id}
                  currentUserId = {user?.id || ""}
                  parentId = {thread.parentId}
                  content ={thread.text}
                  author = {thread.author}
                  community = {thread.community}
                  createdAt = {thread.createdAt}
                  comments  = {thread.children}
                  />
                })
            }
          </>
        ) 

      }
    </section>
   </>
  );
}
