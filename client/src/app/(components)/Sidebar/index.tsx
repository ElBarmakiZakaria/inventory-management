"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import React, { useActionState } from 'react'

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className ={`cursor-pointer flex item center ${
                isCollapsed ? "justify-center py-4" : 'justufy-start px-8 py-4'
            }
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
                isActive ? "bg-blue-200 text-white" : ""
            }`}
            >
                <Icon className='w-6 h-6 !text-gray-700'/>
                <span className={`${
                    isCollapsed ? "hidden" : "block"
                } font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) =>state.global.isSidebarCollapsed);
    
    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }

    const sidebarClassNames = `fixed flex flex-col ${ isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white tarnsition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
    <div className={sidebarClassNames}>
        <div className={`flex gap-3 justify-between md:justify-normal item-center pt-8 ${
            isSidebarCollapsed ? "px-5" : "px-8"}`}>
            <Image
                src="https://ss3-inventory-management.s3.eu-north-1.amazonaws.com/logo.png"
                alt="edstock-logo"
                width={27}
                height={27}
                className="rounded w-8"
                />
            <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>ZACKSTOCK</h1>

            <button className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                <Menu className='w-4 h-4' />
            </button>
        </div>

            {/* side bar links */}
        <div className='flex-grow mt-8'>
            <SidebarLink href='/dashboard' icon={Layout} label='Dashboard' isCollapsed = {isSidebarCollapsed}/>
            <SidebarLink href='/inventory' icon={Archive} label='Inventory' isCollapsed = {isSidebarCollapsed}/>
            <SidebarLink href='/products' icon={Clipboard} label='Products' isCollapsed = {isSidebarCollapsed}/>
            <SidebarLink href='/users' icon={User} label='Users' isCollapsed = {isSidebarCollapsed}/>
            <SidebarLink href='/settings' icon={SlidersHorizontal} label='Settings' isCollapsed = {isSidebarCollapsed}/>
            <SidebarLink href='/expenses' icon={CircleDollarSign} label='Expenses' isCollapsed = {isSidebarCollapsed}/>
        </div>
        
        {/*FOOTER side bar */}
        <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`} >
            <p className='text-center text-cs text-gray-500'>&copy; 2024 ZACKSTOCK</p>
        </div>

    </div>
  );
};

export default Sidebar