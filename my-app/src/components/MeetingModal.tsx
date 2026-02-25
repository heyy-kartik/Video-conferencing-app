/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
interface MeetingModalProps {
  // Define any props you want to pass to the MeetingModal component
  title?: string;
  className?: string;
  chidren?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
