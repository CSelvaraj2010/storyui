"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X, Search, Filter, DollarSign } from "lucide-react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { BudgetAdjustmentEditData, CostCodeCategories } from "./data"
import { ChevronDown, ChevronRight } from "lucide-react"

interface EditBudgetAdjustmentPageProps {
  params: {
    id: string
  }
}

export default function EditBudgetAdjustmentPage({ params }: EditBudgetAdjustmentPageProps) {
  const [formData, setFormData] = useState(BudgetAdjustmentEditData)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(CostCodeCategories))

  const handleSave = () => {
    console.log("Saving budget adjustment:", formData)
  }

  const handleCancel = () => {
    window.history.back()
  }

  const handleDelete = () => {
    console.log("Deleting budget adjustment:", params.id)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const updateCostCodeItem = (id: string, adjustmentAmount: number) => {
    const updatedCostCodes = formData.costCodes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          adjustmentAmount,
          newBudget: item.currentBudget + adjustmentAmount,
        }
      }
      return item
    })

    setFormData({ ...formData, costCodes: updatedCostCodes })

    const totalAdjustments = updatedCostCodes.reduce((sum, item) => sum + item.adjustmentAmount, 0)
    const amountToDistribute = formData.primeChangeOrder.fee - totalAdjustments
    setFormData((prev) => ({ ...prev, amountToDistribute }))
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const getCostCodesByCategory = (category: string) => {
    return filteredCostCodes.filter((item) => item.category === category)
  }

  const getCategoryTotals = (category: string) => {
    const items = getCostCodesByCategory(category)
    return {
      currentBudget: items.reduce((sum, item) => sum + item.currentBudget, 0),
      adjustmentAmount: items.reduce((sum, item) => sum + item.adjustmentAmount, 0),
      newBudget: items.reduce((sum, item) => sum + item.newBudget, 0),
    }
  }

  const filteredCostCodes = formData.costCodes.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.costCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStatusColor = (type: string) => {
    switch (type) {
      case "Owner":
        return "bg-blue-100 text-blue-800"
      case "Internal":
        return "bg-purple-100 text-purple-800"
      case "Initial":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-sm text-slate-500 mb-1">Projects / Budget Adjustments / {formData.budgetName}</nav>
              <h1 className="text-2xl font-bold text-slate-900">Edit Budget Adjustment</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">Striker Remodel • 0121-077</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Adjustment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Adjustment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="budgetName">Budget Name</Label>
                  <Input
                    id="budgetName"
                    value={formData.budgetName}
                    onChange={(e) => setFormData({ ...formData, budgetName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(formData.type)}>{formData.status}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Prime Change Order</div>
                  <div className="text-xs text-slate-500 mb-2">Final Settlement</div>
                  <div className="text-2xl font-bold">{formatCurrency(formData.primeChangeOrder.finalSettlement)}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">Total Fee</div>
                  <div className="text-xs text-blue-600 mb-2">Available to Distribute</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {formatCurrency(formData.primeChangeOrder.fee)}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700 mb-1">Amount to Distribute</div>
                  <div className="text-xs text-green-600 mb-2">Remaining Balance</div>
                  <div className="text-2xl font-bold text-green-900">{formatCurrency(formData.amountToDistribute)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      {CostCodeCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Codes Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cost Code Adjustments</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedCategories(new Set(CostCodeCategories))}
                  >
                    Expand All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setExpandedCategories(new Set())}>
                    Collapse All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="px-4 py-3">Code</TableHead>
                    <TableHead className="px-4 py-3">Description</TableHead>
                    <TableHead className="px-4 py-3 text-right">Current Budget</TableHead>
                    <TableHead className="px-4 py-3 text-right">Adjustment</TableHead>
                    <TableHead className="px-4 py-3 text-right">New Budget</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CostCodeCategories.filter((category) => getCostCodesByCategory(category).length > 0).map(
                    (category) => {
                      const categoryItems = getCostCodesByCategory(category)
                      const totals = getCategoryTotals(category)

                      return (
                        <React.Fragment key={category}>
                          {/* Category Header */}
                          <TableRow
                            className="bg-slate-100 hover:bg-slate-200 cursor-pointer border-b-2"
                            onClick={() => toggleCategory(category)}
                          >
                            <TableCell colSpan={5} className="px-4 py-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {expandedCategories.has(category) ? (
                                    <ChevronDown className="w-4 h-4 text-slate-600" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                  )}
                                  <span className="font-semibold text-slate-900">{category}</span>
                                  <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                                    {categoryItems.length} items
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="text-right">
                                    <div className="text-xs text-slate-500">Current</div>
                                    <div className="font-mono font-medium">{formatCurrency(totals.currentBudget)}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-slate-500">Adjustment</div>
                                    <div className="font-mono font-medium">
                                      {formatCurrency(totals.adjustmentAmount)}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-slate-500">New Total</div>
                                    <div className="font-mono font-semibold">{formatCurrency(totals.newBudget)}</div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>

                          {/* Category Items */}
                          {expandedCategories.has(category) &&
                            categoryItems.map((item) => (
                              <TableRow key={item.id} className="hover:bg-slate-50">
                                <TableCell className="px-4 py-3 font-mono text-sm pl-8">{item.costCode}</TableCell>
                                <TableCell className="px-4 py-3">
                                  <div className="font-medium">{item.description}</div>
                                  <div className="text-xs text-slate-500">{item.phase}</div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right font-mono">
                                  {formatCurrency(item.currentBudget)}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={item.adjustmentAmount}
                                    onChange={(e) =>
                                      updateCostCodeItem(item.id, Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="h-8 text-right font-mono w-32"
                                  />
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right font-mono font-semibold">
                                  {formatCurrency(item.newBudget)}
                                </TableCell>
                              </TableRow>
                            ))}
                        </React.Fragment>
                      )
                    },
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
