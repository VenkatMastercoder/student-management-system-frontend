"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
export default function RemoveStudentForm(data: any) {
  const onDelete = async () => {
    console.log(data)
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/student/${data.data.gmail_id}`
      );
      if (response.data) {
        toast.success("Student has been deleted");
        location.reload();
      }
    } catch (error) {
      toast("Error");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove</DialogTitle>
          <DialogDescription>
            This will completely remove the student&apos;s data from the server
            and this process is irreversible
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>Do you want to delete {data.data.name}&apos;s data?</Label>
        </div>
        <DialogFooter>
          <Button onClick={() => onDelete()} variant="destructive">
            Yes, Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
