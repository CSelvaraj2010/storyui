"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Settings } from "lucide-react"
import { PayApplicationsData } from "./data"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { useRouter } from "next/navigation"

export default function PayApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const router = useRouter()

  const filteredData = PayApplicationsData.filter(
    (item) =>
      item.payAppName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.payAppNumber.toString().includes(searchTerm),
  )

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs text-slate-500 mb-1">
                Home / Project Management / Striker Remodel / Pay Applications
              </nav>
              <h1 className="text-xl font-bold text-slate-900">Pay Applications</h1>
            </div>
            <div className="text-xs text-slate-600">Striker Remodel : 0121-077</div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white border-b px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search Pay Applications"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 p-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="h-10">
                    <TableHead className="w-8 px-2 py-1"></TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Pay App#</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Date Submitted</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Pay App Name</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Period To</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Gross Billed</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Retention</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Net Billed</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Paid</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Outstanding</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Date Received</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.payAppNumber} className="hover:bg-slate-50 h-8">
                      <TableCell className="px-2 py-1">
                        <Settings
                          className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600"
                          onClick={() => router.push(`/contracts/pay-applications/${item.payAppNumber}/edit`)}
                        />
                      </TableCell>
                      <TableCell className="px-3 py-1 font-medium text-sm">{item.payAppNumber}</TableCell>
                      <TableCell className="px-3 py-1 text-sm">{formatDate(item.dateSubmitted)}</TableCell>
                      <TableCell className="px-3 py-1 text-sm">{item.payAppName}</TableCell>
                      <TableCell className="px-3 py-1 text-sm">{formatDate(item.periodTo)}</TableCell>
                      <TableCell className="px-3 py-1 text-right font-mono text-sm">
                        {formatCurrency(item.grossBilled)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-right font-mono text-sm">
                        {formatCurrency(item.retention)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-right font-mono text-sm">
                        {formatCurrency(item.netBilled)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-right font-mono text-sm">
                        {formatCurrency(item.paid)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-right font-mono text-sm">
                        {formatCurrency(item.outstanding)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-sm">{formatDate(item.dateReceived)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <SelectTrigger className="w-16 h-7">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs bg-transparent"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs bg-transparent"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Row */}
          <Card className="mt-2">
            <CardContent className="p-3">
              <div className="grid grid-cols-5 gap-4 text-xs">
                <div></div>
                <div></div>
                <div className="text-right">
                  <div className="font-semibold">Total Gross:</div>
                  <div className="font-mono">{formatCurrency(314373.65)}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Total Net:</div>
                  <div className="font-mono">{formatCurrency(314373.65)}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Total Paid:</div>
                  <div className="font-mono">{formatCurrency(314373.65)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
