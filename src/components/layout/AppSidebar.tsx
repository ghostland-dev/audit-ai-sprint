
import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Shield,
  GitBranch,
  Users,
  CreditCard,
  HelpCircle,
  Zap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Projets", url: "/projects", icon: GitBranch },
  { title: "Audits", url: "/audits", icon: Shield },
  { title: "Rapports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const settingsItems = [
  { title: "Équipe", url: "/team", icon: Users },
  { title: "Facturation", url: "/billing", icon: CreditCard },
  { title: "Paramètres", url: "/settings", icon: Settings },
  { title: "Support", url: "/support", icon: HelpCircle },
]

export function AppSidebar() {
  const [isRouterReady, setIsRouterReady] = useState(false)
  
  // Try to get location to check if router context is available
  let location
  try {
    location = useLocation()
    if (!isRouterReady) {
      setIsRouterReady(true)
    }
  } catch (error) {
    // Router context not available yet
    console.log("Router context not ready yet")
  }

  const currentPath = location?.pathname || ""

  // Don't render navigation links until router is ready
  if (!isRouterReady) {
    return (
      <Sidebar className="w-64">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">DevAudit AI</h2>
              <p className="text-xs text-muted-foreground">Audit de code intelligent</p>
            </div>
          </div>
        </div>
        <SidebarContent>
          <div className="p-4 text-center text-muted-foreground">
            Chargement...
          </div>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar className="w-64">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">DevAudit AI</h2>
            <p className="text-xs text-muted-foreground">Audit de code intelligent</p>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border-r-2 border-purple-500 font-medium" 
                          : "hover:bg-muted/50 transition-colors"
                      }
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border-r-2 border-purple-500 font-medium" 
                          : "hover:bg-muted/50 transition-colors"
                      }
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
