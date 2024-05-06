"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { createRoomAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const createRoomFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  osuCollectorLink: z.union([z.literal(""), z.string().trim().url()]),
});

type CreateRoomFormSchemaType = z.infer<typeof createRoomFormSchema>;

export const CreateRoomForm = () => {
  const router = useRouter();
  const { toast } = useToast();
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
    const room = await createRoomAction(values);
    if (!room) {
      toast({
        title: "Room Not Created",
        description: "Could not create room. Please try again",
      });
      return;
    }
    toast({
      title: "Room Created",
      description: "Your room was successfully created",
    });
    void router.push(`/rooms/${room.id}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Create Room</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCreateRoomSubmit)}
          className="mt-12 space-y-8"
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
                <FormLabel>Tags (Separated by commas)</FormLabel>
                <FormControl>
                  <Input placeholder="Reading, Low AR" {...field} />
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
