import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
export default function ViewStudentDetails(data:any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Student Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <DialogTitle>{data.data.student_name}</DialogTitle>
            <DialogDescription>Student Id: {data.data.student_id}</DialogDescription>
          <Label>Parent Number: {data.data.parent_number}</Label>
          <Label>Year: {data.data.current_year}</Label>
          <Label>College: {data.data.college_name}</Label>
          <Label>Attendence: {data.data.attendence}</Label>
          <Label>Gmail ID: {data.data.gmail_id}</Label>
          <Label>Total Marks: {(data?.data?.marks?.total_marks)?(data.data.marks.total_marks):("Null")}</Label>
          <Label>AI: {(data?.data?.marks?.subject1)?(data.data.marks.subject1):("Null")}</Label>
          <Label>WIP: {(data?.data?.marks?.subject2)?(data.data.marks.subject2):("Null")}</Label>
          <Label>DBMS: {(data?.data?.marks?.subject3)?(data.data.marks.subject3):("Null")}</Label>
          <Label>Maths: {(data?.data?.marks?.subject4)?(data.data.marks.subject4):("Null")}</Label>
          <Label>OS: {(data?.data?.marks?.subject5)?(data.data.marks.subject5):("Null")}</Label>
          <Label>Address: {data.data.address}</Label>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
