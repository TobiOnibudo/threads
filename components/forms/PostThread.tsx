
"use client"
import {useForm} from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Textarea } from '../ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useState } from 'react'
import { usePathname, useRouter} from 'next/navigation'

import { updateUser } from '@/lib/actions/user.action'
import { ThreadValidation } from '@/lib/validations/thread';

interface Props {
    user : {
        id : string,
        ObjectId : string,
        username : string,
        name : string,
        bio : string, 
        image : string,
    };
    btnTitle : string;
}

function PostThread({userId} : {userId : string}){ 
  const router = useRouter();
  const pathname = usePathname();


  const form = useForm({
        resolver : zodResolver(ThreadValidation),
        defaultValues: {
         thread : '',
         accountId: userId,
        }
    })

    const onSubmit = () => {

    }

  return (
    <Form {...form}>
    <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="mt-10 flex flex-col justify-start gap-10">
        
        <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                    Content
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea 
                    rows={15}
                    {...field} />
                </FormControl>
            
                <FormMessage />
        </FormItem>
        )}
    />

    <Button type="submit"
    className="bg-primary-500">
        Post Thread
    </Button>
    </form>
    </Form>
    
  )
};

export default PostThread;