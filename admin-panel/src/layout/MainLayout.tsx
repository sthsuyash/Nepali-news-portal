import { Sidebar } from '@/components/Sidebar/Sidebar'
import { ReactNode } from 'react'

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
    <div className="main-layout grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className="content">
            {children}
        </div>
    </div>
)