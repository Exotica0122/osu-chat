"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { room } from "@/server/db/schema";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const createRoomFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  osuCollectorLink: z.string().url(),
});

type CreateRoomFormSchemaType = z.infer<typeof createRoomFormSchema>;

export const CreateRoom = () => {
  const session = useSession();
  const form = useForm<CreateRoomFormSchemaType>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      osuCollectorLink: "",
    },
  });

  const onCreateRoomSubmit = async (values: CreateRoomFormSchemaType) => {
    if (!session.data) return;

    const { name, description, tags, osuCollectorLink } = values;
    db;
    // await db.insert(room).values({
    //   name,
    //   description,
    //   tags,
    //   osuCollectorLink,
    //   userId: session.data.user.id,
    // });
  };

  return (
    <>
      <p>Create Room</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCreateRoomSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (Separated by spaces)</FormLabel>
                <FormControl>
                  <Input placeholder="Tags" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="osuCollectorLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Osu Collector Link</FormLabel>
                <FormControl>
                  <Input placeholder="URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
