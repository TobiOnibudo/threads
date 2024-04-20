"use client"
import {useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { usePathname, useRouter} from 'next/navigation'
import { CommentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button"
import Image from "next/image";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props{
    threadId: string,
    currentUserImg : string,
    currentUserId : string,
}

function Comment({threadId,currentUserImg,currentUserId}: Props){
  
    const router = useRouter();
    const pathname = usePathname();
  
  
    const form = useForm({
          resolver : zodResolver(CommentValidation),
          defaultValues: {
           thread : '',
          }
      })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {    
    // await createThread({
    //     text: values.thread,
    //     author: currentUserId,
    //     communityId: null,
    //     path: pathname,

    // })

    router.push("/")
}
  
    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}  className="comment-form">
        <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
                <FormLabel>
                    <Image 
                    src={currentUserImg}
                    alt="Profile image"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    />
                </FormLabel>
                <FormControl className='border-none bg-transparent'> 
                <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                    {...field} />
                </FormControl>

            </FormItem>
            )}/>

    <Button type="submit"
    className="bg-primary-500 comment-form_btn">
        Reply
    </Button>
    </form>
    </Form>
  )
};

export default Comment;
