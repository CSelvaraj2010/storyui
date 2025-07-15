"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, AlertTriangle, Download, ChevronDown } from "lucide-react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { CostControlData, CostControlSummaryData, CostControlCategories, MarginAnalysisData } from "./data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function CostControlPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [selectedPhase, setSelectedPhase] = useState<string>("All Phases")
  const [activeTab, setActiveTab] = useState("cost-control")
  const [showStatistics, setShowStatistics] = useState(true)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 1000) return "text-red-600 font-semibold"
    if (variance < -1000) return "text-red-600 font-semibold"
    if (variance > 0) return "text-green-600"
    if (variance < 0) return "text-orange-600"
    return "text-slate-600"
  }

  const getVarianceIcon = (variance: number) => {
    if (Math.abs(variance) > 1000) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  const filteredCostCodes = CostControlData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.costCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    const matchesPhase = selectedPhase === "All Phases" || item.phase === selectedPhase

    return matchesSearch && matchesCategory && matchesPhase
  })

  // Chart data for margin analysis
  const marginChartData = MarginAnalysisData.map((item) => ({
    date: item.date.split("/")[0] + "/" + item.date.split("/")[1],
    contingency: item.projectedContingencyLevel,
  })).reverse()

  // Chart data for cost control
  const chartData = [
    { month: "2/14", budget: 280000, actual: 275000 },
    { month: "4/15", budget: 285000, actual: 280000 },
    { month: "5/15", budget: 290000, actual: 285000 },
    { month: "7/14", budget: 295000, actual: 290000 },
    { month: "10/8", budget: 300000, actual: 295000 },
    { month: "11/8", budget: 305000, actual: 300000 },
    { month: "12/8", budget: 310000, actual: 305000 },
    { month: "2/9", budget: 315000, actual: 310000 },
    { month: "4/7", budget: 320000, actual: 315000 },
    { month: "7/15", budget: 325000, actual: 320000 },
  ]

  const pieData = [
    { name: "Used", value: 85, color: "#ef4444" },
    { name: "Available", value: 15, color: "#22c55e" },
  ]

  const phases = [...new Set(CostControlData.map((item) => item.phase))]

  const handleSubmitMarginAnalysis = () => {
    console.log("Submitting margin analysis...")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <nav className="text-sm text-slate-500 font-medium">
                  Home / Project Management / Striker Remodel / Cost Control
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Cost Control</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600 font-medium">Striker Remodel • 0121-077</div>
                <Button variant="outline" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="cost-control">Cost Control</TabsTrigger>
              <TabsTrigger value="margin-analysis">Margin Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="cost-control" className="mt-6 space-y-6">
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cost Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={2} name="Budget" />
                        <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projected Contingency</CardTitle>
                    <div className="text-sm text-slate-600">as % of Contract</div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Contingency:</span>
                        <span className="font-medium">{formatCurrency(CostControlSummaryData.currentContingency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Projected Contingency:</span>
                        <span className="font-medium">
                          {formatCurrency(CostControlSummaryData.projectedContingency)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-1">Total Budget</div>
                    <div className="text-xl font-bold">{formatCurrency(CostControlSummaryData.totalBudget)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-1">Contracted Amount</div>
                    <div className="text-xl font-bold">{formatCurrency(CostControlSummaryData.contractedAmount)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-1">Contract Variance</div>
                    <div className={`text-xl font-bold ${getVarianceColor(CostControlSummaryData.contractVariance)}`}>
                      {formatCurrency(CostControlSummaryData.contractVariance)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-1">Unapproved Invoices</div>
                    <div className="text-xl font-bold">{formatCurrency(CostControlSummaryData.unapprovedInvoices)}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filter */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search cost codes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-500" />
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Categories">All Categories</SelectItem>
                          {CostControlCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Phases">All Phases</SelectItem>
                          {phases.map((phase) => (
                            <SelectItem key={phase} value={phase}>
                              {phase}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Control Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Cost Control Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="px-4 py-3 text-sm font-semibold">Cost Code</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold">Description</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold">Type</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold">Phase</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold">Subcontractor</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">Current Budget</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                            Original Commitment
                          </TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">Change Order</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                            Current Commitment
                          </TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">Actual Costs</TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                            Projected Final Cost
                          </TableHead>
                          <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                            Projected Variance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCostCodes.map((item, index) => (
                          <TableRow
                            key={item.id}
                            className={`hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                          >
                            <TableCell className="px-4 py-3 font-mono text-sm">{item.costCode}</TableCell>
                            <TableCell className="px-4 py-3 text-sm">{item.description}</TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-sm">{item.phase}</TableCell>
                            <TableCell className="px-4 py-3 text-sm">{item.subcontractor || "-"}</TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.currentBudget)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.originalCommitment)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.changeOrder)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.currentCommitment)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.actualCosts)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right font-mono text-sm">
                              {formatCurrency(item.projectedFinalCost)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className={`font-mono text-sm ${getVarianceColor(item.projectedVariance)}`}>
                                  {formatCurrency(item.projectedVariance)}
                                </span>
                                {getVarianceIcon(item.projectedVariance)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}

                        {/* Totals Row */}
                        <TableRow className="bg-slate-200 border-t-2 border-slate-300 font-semibold">
                          <TableCell className="px-4 py-3"></TableCell>
                          <TableCell className="px-4 py-3 font-bold text-slate-900">OVERALL:</TableCell>
                          <TableCell className="px-4 py-3"></TableCell>
                          <TableCell className="px-4 py-3"></TableCell>
                          <TableCell className="px-4 py-3"></TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.currentBudget, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.originalCommitment, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.changeOrder, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.currentCommitment, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.actualCosts, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.projectedFinalCost, 0))}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(filteredCostCodes.reduce((sum, item) => sum + item.projectedVariance, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    {/* Summary Section */}
                    <div className="border-t bg-slate-50 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-700">Fee:</span>
                            <span className="font-mono font-semibold text-slate-900">
                              {formatCurrency(CostControlSummaryData.fee)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-700">
                              Contracted Amount (per project setup):
                            </span>
                            <span className="font-mono font-semibold text-slate-900">
                              {formatCurrency(CostControlSummaryData.contractedAmount)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-700">Current Budget + Fee:</span>
                            <span className="font-mono font-semibold text-slate-900">
                              {formatCurrency(CostControlSummaryData.currentBudgetPlusFee)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-700">Contract Variance:</span>
                            <span
                              className={`font-mono font-semibold ${getVarianceColor(CostControlSummaryData.contractVariance)}`}
                            >
                              {formatCurrency(CostControlSummaryData.contractVariance)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-slate-700">Unapproved Invoices:</span>
                            <span className="font-mono font-semibold text-slate-900">
                              {formatCurrency(CostControlSummaryData.unapprovedInvoices)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="margin-analysis" className="mt-6 space-y-6">
              {/* Margin Analysis Chart */}
              <Card>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={marginChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[-20000, 30000]} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line
                        type="monotone"
                        dataKey="contingency"
                        stroke="#e91e63"
                        strokeWidth={2}
                        dot={{ fill: "#e91e63", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Statistics Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setShowStatistics(!showStatistics)}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${showStatistics ? "rotate-0" : "-rotate-90"}`}
                      />
                      <span className="font-semibold">Statistics</span>
                    </div>
                  </div>
                </CardHeader>
                {showStatistics && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-slate-700">Margin Analysis Date:</span>
                          <span className="font-semibold text-slate-900">
                            {CostControlSummaryData.marginAnalysisDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-slate-700">Current Contingency:</span>
                          <span className="font-mono font-semibold text-slate-900">
                            {formatCurrency(CostControlSummaryData.currentContingency)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-slate-700">Projected Contingency:</span>
                          <span className="font-mono font-semibold text-slate-900">
                            {formatCurrency(CostControlSummaryData.projectedContingency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-slate-700">Current Budget:</span>
                          <span className="font-mono font-semibold text-slate-900">
                            {formatCurrency(CostControlSummaryData.totalBudget)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-slate-700">Fee:</span>
                          <span className="font-mono font-semibold text-slate-900">
                            {formatCurrency(CostControlSummaryData.fee)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Margin Analysis Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="flex border-b bg-slate-50">
                    <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                      Margin Analysis
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="px-4 py-3 text-sm font-semibold">Date</TableHead>
                        <TableHead className="px-4 py-3 text-sm font-semibold">Description</TableHead>
                        <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                          Current Contingency
                        </TableHead>
                        <TableHead className="px-4 py-3 text-sm font-semibold text-right">
                          Projected Contingency Level
                        </TableHead>
                        <TableHead className="px-4 py-3 text-sm font-semibold text-right">Current Contract</TableHead>
                        <TableHead className="px-4 py-3 text-sm font-semibold text-right">Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MarginAnalysisData.map((item, index) => (
                        <TableRow
                          key={item.id}
                          className={`hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                        >
                          <TableCell className="px-4 py-3 text-sm">{item.date}</TableCell>
                          <TableCell className="px-4 py-3 text-sm">{item.description}</TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono text-sm">
                            {formatCurrency(item.currentContingency)}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono text-sm">
                            {formatCurrency(item.projectedContingencyLevel)}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono text-sm">
                            {formatCurrency(item.currentContract)}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-right font-mono text-sm">
                            {formatCurrency(item.fee)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-start">
                <Button onClick={handleSubmitMarginAnalysis} className="bg-blue-600 hover:bg-blue-700">
                  Submit Margin Analysis
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
