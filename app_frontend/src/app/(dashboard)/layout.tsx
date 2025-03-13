import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <DashboardHeader>
          <SidebarTrigger />
          {children}
        </DashboardHeader>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
