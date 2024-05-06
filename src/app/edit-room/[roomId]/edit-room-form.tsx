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
import { editRoomAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { type Room } from "@/server/db/schema";

const editRoomFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  osuCollectorLink: z.union([z.literal(""), z.string().trim().url()]),
});

type EditRoomFormSchemaType = z.infer<typeof editRoomFormSchema>;

export const EditRoomForm = ({ room }: { room: Room }) => {
  const { toast } = useToast();
  const form = useForm<EditRoomFormSchemaType>({
    resolver: zodResolver(editRoomFormSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? "",
      tags: room.tags,
      osuCollectorLink: room.osuCollectorLink ?? "",
    },
  });

  const onEditRoomSubmit = async (values: EditRoomFormSchemaType) => {
    await editRoomAction({ ...room, ...values });
    toast({
      title: "Room Edited",
      description: "Your room was successfully edited",
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Edit Room</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onEditRoomSubmit)}
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  );
};
