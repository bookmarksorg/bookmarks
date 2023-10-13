import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
