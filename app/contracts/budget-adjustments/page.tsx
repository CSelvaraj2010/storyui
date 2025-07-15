"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Settings } from "lucide-react"
import { BudgetAdjustmentsData } from "./data"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { useRouter } from "next/navigation"

export default function BudgetAdjustmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const router = useRouter()

  const filteredData = BudgetAdjustmentsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()),
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
    return dateString
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Owner":
        return "bg-blue-100 text-blue-800"
      case "Internal":
        return "bg-gray-100 text-gray-800"
      case "Initial":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFeeColor = (fee: number) => {
    if (fee > 0) return "text-green-600"
    if (fee < 0) return "text-red-600"
    return "text-gray-600"
  }

  const handleDownloadExcel = () => {
    // This would typically trigger an Excel download
    console.log("Downloading adjustments history as .xlsx")
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
                Home / Project Management / Striker Remodel / Budget Adjustments
              </nav>
              <h1 className="text-xl font-bold text-slate-900">Budget Adjustments</h1>
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
                placeholder="Search Budget Adjustments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
            <Button variant="outline" onClick={handleDownloadExcel} className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Download adjustments history as .xlsx
            </Button>
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
                    <TableHead className="px-3 py-2 text-xs font-medium">Name</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Type</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Status</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium text-right">Fee</TableHead>
                    <TableHead className="px-3 py-2 text-xs font-medium">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50 h-8">
                      <TableCell className="px-2 py-1">
                        <Settings
                          className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600"
                          onClick={() => router.push(`/contracts/budget-adjustments/${item.id}/edit`)}
                        />
                      </TableCell>
                      <TableCell className="px-3 py-1 text-sm font-medium">{item.name}</TableCell>
                      <TableCell className="px-3 py-1">
                        <Badge variant="secondary" className={`text-xs ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-1">
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`px-3 py-1 text-right font-mono text-sm font-medium ${getFeeColor(item.fee)}`}
                      >
                        {formatCurrency(item.fee)}
                      </TableCell>
                      <TableCell className="px-3 py-1 text-sm">{formatDate(item.submittedDate)}</TableCell>
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
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
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
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold">Total Adjustments:</div>
                  <div className="font-mono">{filteredData.length}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Total Positive:</div>
                  <div className="font-mono text-green-600">
                    {formatCurrency(
                      filteredData.filter((item) => item.fee > 0).reduce((sum, item) => sum + item.fee, 0),
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Total Negative:</div>
                  <div className="font-mono text-red-600">
                    {formatCurrency(
                      filteredData.filter((item) => item.fee < 0).reduce((sum, item) => sum + item.fee, 0),
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Net Total:</div>
                  <div
                    className={`font-mono font-bold ${getFeeColor(filteredData.reduce((sum, item) => sum + item.fee, 0))}`}
                  >
                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.fee, 0))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
