
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { 
  Droplets, 
  Zap, 
  LayoutDashboard, 
  Trophy,
  Lightbulb,
  Plus,
  Star,
  Target // Added Target icon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Painel",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Registrar Conta",
    url: createPageUrl("InputBills"),
    icon: Plus,
  },
  {
    title: "Conquistas",
    url: createPageUrl("Gamification"),
    icon: Trophy,
  },
  {
    title: "Dicas",
    url: createPageUrl("Tips"),
    icon: Lightbulb,
  },
];

const moreItems = [
  {
    title: "Meu Perfil",
    url: createPageUrl("Profile"),
    icon: Star,
  },
  {
    title: "Simulador",
    url: createPageUrl("Simulator"),
    icon: Target,
  },
  {
    title: "Academia",
    url: createPageUrl("Academy"),
    icon: Trophy,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [totalPoints, setTotalPoints] = useState(0);

  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements'],
    queryFn: () => base44.entities.Achievement.list(),
  });

  useEffect(() => {
    const points = achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + (a.points || 0), 0);
    setTotalPoints(points);
  }, [achievements]);

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --water-blue: #0ea5e9;
          --energy-yellow: #f59e0b;
          --success-green: #10b981;
          --gradient-water: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          --gradient-energy: linear-gradient(135deg, #f59e0b 0%, #eab308 100%);
          --gradient-combined: linear-gradient(135deg, #0ea5e9 0%, #f59e0b 100%);
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-cyan-50/40 to-amber-50/30">
        <Sidebar className="border-r border-gray-200/50 backdrop-blur-sm bg-white/90">
          <SidebarHeader className="border-b border-gray-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Gota & Watt</h2>
                <p className="text-xs text-gray-500">Economizador Inteligente</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 shadow-sm' 
                            : 'text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Mais Recursos
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {moreItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-amber-50 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 shadow-sm' 
                            : 'text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Sua Pontuação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Pontos Totais</span>
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {totalPoints}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {achievements.filter(a => a.unlocked).length} conquistas
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200/50 p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">Usuário</p>
                <p className="text-xs text-gray-500 truncate">Economizando recursos</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <Zap className="w-4 h-4 text-amber-600" />
                <h1 className="text-lg font-bold">Gota & Watt</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
