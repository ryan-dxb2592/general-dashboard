"use client";

// import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import AddContact from "@/components/forms/add-contact";

const ContactDrawer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const isMobile = useIsMobile();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:rounded-t-none data-[vaul-drawer-direction=right]:rounded-l-none  data-[vaul-drawer-direction=right]:sm:max-w-full ">
        {/* Drawer Header */}
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <DrawerTitle>Add Contact</DrawerTitle>
            <DrawerDescription>
              Add a new contact to your address book.
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button size="icon" variant="outline">
              <X className="size-4 p-0" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {/* Add Contact Form */}
        <div className="p-4">
          <AddContact />
        </div>

        {/* Drawer Footer */}
        <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContactDrawer;
