'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { NavIcons, ArchitectureIcons } from '@/components/Icons';
import { navItems } from '@/constants/navItems';

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent className='flex flex-col gap-2'>
            <SidebarMenu>
              {group.items?.map((item) => {
                const isActive = item.url ? pathname === item.url : false;
                const Icon = item.icon ? NavIcons[item.icon] ?? ArchitectureIcons[item.icon] : null;

                if (item.component) {
                  const Component = item.component;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Component />
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items?.length ? (
                      <Collapsible
                        defaultOpen={
                          isActive ||
                          item.items.some(
                            (subItem) => subItem.url && pathname === subItem.url
                          )
                        }
                        className='group/collapsible'
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                          >
                            {Icon && <Icon className='size-4' />}
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const isSubActive = subItem.url
                                ? pathname === subItem.url
                                : false;
                              const SubIcon = subItem.icon
                                ? NavIcons[subItem.icon] ?? ArchitectureIcons[subItem.icon]
                                : null;
                              if (!subItem.url) return null;

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                  >
                                    <Link href={subItem.url}>
                                      {SubIcon && (
                                        <SubIcon className='size-4' />
                                      )}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : item.url ? (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link href={item.url}>
                          {Icon && <Icon className='size-4' />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
