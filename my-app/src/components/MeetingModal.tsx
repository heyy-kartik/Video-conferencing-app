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
  isOpen?: boolean;
  onClose?: () => void;
}
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chidren,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-130 flex-col gap-6 border-none   ">
          {image && (
            <div className="flex justify-center ">
              <Image
                src={image || "/icons/add-meeting.svg"}
                alt="Meeting Modal Image"
                width={72}
                height={72}
              />
            </div>
          )}
          <h1 className=" ">{title}</h1>
          {chidren}
          <Button
            className={
              "bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="Button Icon"
                width={12}
                height={12}
              />
            )}
            &nbsp; {buttonText || "Start Meeting"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
