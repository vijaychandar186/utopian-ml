import React from 'react';
import ThemeProvider from './theme-provider';
import { ActiveSchemeProvider } from './scheme-provider';
import KBar from '@/features/kbar';
import NavbarSection from '../layout/NavbarSection';
import PageContainer from '../../features/layout/page-container';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../layout/AppSidebar';
import { cookies } from 'next/headers';

export default async function Provider({
  children,
  activeThemeValue,
  activeSchemeValue,
  customColor,
  customForeground
}: {
  children: React.ReactNode;
  activeThemeValue?: string;
  activeSchemeValue?: string;
  customColor?: string;
  customForeground?: string;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <ThemeProvider activeThemeValue={activeThemeValue}>
      <ActiveSchemeProvider
        activeSchemeValue={activeSchemeValue}
        customColor={customColor}
        customForeground={customForeground}
      >
        <KBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <NavbarSection />
              <PageContainer>{children}</PageContainer>
            </SidebarInset>
          </SidebarProvider>
        </KBar>
      </ActiveSchemeProvider>
    </ThemeProvider>
  );
}
