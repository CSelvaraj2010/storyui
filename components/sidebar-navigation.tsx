"use client"

import { Button } from "@/components/ui/button"
import { Plus, Settings2 } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function SidebarNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname.includes(path)

  return (
    <div className="w-64 bg-slate-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Story Denver</h2>
        <p className="text-sm text-slate-400">Division 1</p>
      </div>

      <nav className="space-y-1">
        <div className="text-xs font-medium text-slate-400 mb-2">PROJECTS</div>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-700 h-8 px-2 text-sm">
          <Plus className="w-3 h-3 mr-2" />
          Add Pay Application
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 h-8 px-2 text-sm">
          All Projects
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm ${
            isActive("budget-adjustments") ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700"
          }`}
          onClick={() => router.push("/contracts/budget-adjustments")}
        >
          Budget Adjustments
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 h-8 px-2 text-sm">
          Change Orders
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm ${
            isActive("cost-control") ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700"
          }`}
          onClick={() => router.push("/contracts/cost-control")}
        >
          Cost Control
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 h-8 px-2 text-sm">
          Daily Logs
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 h-8 px-2 text-sm">
          Labor Reporting
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm ${
            isActive("pay-applications") ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700"
          }`}
          onClick={() => router.push("/contracts/pay-applications")}
        >
          Pay Applications
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm ${
            isActive("schedule-of-values") ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700"
          }`}
          onClick={() => router.push("/contracts/schedule-of-values")}
        >
          Schedule of Values
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 h-8 px-2 text-sm">
          Purchase Orders
        </Button>

        <div className="text-xs font-medium text-slate-400 mb-2 mt-4">CONFIGURATION</div>
        <Button
          variant="ghost"
          className={`w-full justify-start h-8 px-2 text-sm ${
            isActive("cost-codes") ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700"
          }`}
          onClick={() => router.push("/contracts/cost-codes")}
        >
          <Settings2 className="w-3 h-3 mr-2" />
          Cost Codes
        </Button>
      </nav>
    </div>
  )
}
