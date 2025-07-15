"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Settings, FileText } from "lucide-react"
import { ScheduleOfValuesData } from "./data"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { useRouter } from "next/navigation"

export default function ScheduleOfValuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const router = useRouter()

  const filteredData = ScheduleOfValuesData.filter(
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
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Internal":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Initial":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddSOV = () => {
    // Navigate to add new SOV page
    console.log("Add new Schedule of Values")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <nav className="text-xs text-slate-500 font-medium">
                  Home / Project Management / Striker Remodel / Schedule of Value Periods
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Schedule of Values</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600 font-medium">Striker Remodel • 0121-077</div>
                <Button onClick={handleAddSOV} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add SOV
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search Schedules"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 p-6">
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 border-b">
                    <TableHead className="w-8 px-4 py-3"></TableHead>
                    <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700">Name</TableHead>
                    <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700">Type</TableHead>
                    <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 text-right">
                      Total Amount
                    </TableHead>
                    <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={item.id} className={`hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : ""}`}>
                      <TableCell className="px-4 py-3">
                        <Settings
                          className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600"
                          onClick={() => router.push(`/contracts/schedule-of-values/${item.id}/edit`)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-900">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant="secondary" className={`border ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant="secondary" className={`border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-medium text-slate-900">
                        {formatCurrency(item.totalAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-slate-600">{formatDate(item.submittedDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Rows per page:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <SelectTrigger className="w-20 h-8">
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
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-sm bg-transparent"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-sm bg-transparent"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <Card className="mt-4 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-slate-700">Total Schedules:</div>
                  <div className="text-lg font-bold text-slate-900">{filteredData.length}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-700">Submitted:</div>
                  <div className="text-lg font-bold text-blue-600">
                    {filteredData.filter((item) => item.status === "Submitted").length}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-700">Pending:</div>
                  <div className="text-lg font-bold text-yellow-600">
                    {filteredData.filter((item) => item.status === "Pending").length}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-700">Total Value:</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.totalAmount, 0))}
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
