import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import { Button } from "../ui/button";
import { menuItems } from "../../constants/menuItems";

interface AppSidebarProps {
  activeMenu: string;
  onMenuSelect: (key: string) => void;
}

export function AppSidebar({ activeMenu, onMenuSelect }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">E</span>
          </div>
          <span className="font-bold text-lg">ERP System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="px-4 py-2">
          {menuItems.map((item) => (
            <Button
              key={item.key}
              variant={activeMenu === item.key ? "secondary" : "ghost"}
              className="w-full justify-start mb-1"
              onClick={() => onMenuSelect(item.key)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}