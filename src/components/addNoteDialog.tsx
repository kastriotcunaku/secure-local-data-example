import { Note } from "@/lib/types/note.type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(500),
  created_at: z.number(),
});

type AddNoteDialogProps = {
  onSubmit?: (note: Note) => void;
};

const AddNoteDialog = (props: AddNoteDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      created_at: Date.now(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.created_at = Date.now();
    if (props.onSubmit) props.onSubmit(values);
    form.reset();
  }

  const onOpenChange = (open: boolean) => {
    if (open === false) form.reset();
  }

  return (
    <Dialog  onOpenChange={onOpenChange}>
      <DialogTrigger>Add new note</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add note</DialogTitle>
          <DialogDescription>
            Add a new note to your collection
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
              <DialogClose asChild onClick={() => close()}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;