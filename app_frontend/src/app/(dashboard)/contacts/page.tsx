import ContactTable from "@/components/tables/contact-table";
import { NextPage } from "next";

const ContactsPage: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your contacts
        </p>
      </div>
      <ContactTable />
    </div>
  );
};

export default ContactsPage;
