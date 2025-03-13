import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import PageLayout from "@/components/common/page-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <DashboardHeader />
        <PageLayout>{children}</PageLayout>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
