"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X, Edit, Plus, Trash2, Calculator } from "lucide-react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { SOVLineItemsData, type SOVLineItem } from "../../data"

interface EditScheduleOfValuesPageProps {
  params: {
    id: string
  }
}

export default function EditScheduleOfValuesPage({ params }: EditScheduleOfValuesPageProps) {
  const [sovName, setSovName] = useState("Exterior Upgrades")
  const [sovType, setSovType] = useState("Owner")
  const [sovStatus, setSovStatus] = useState("Submitted")
  const [lineItems, setLineItems] = useState<SOVLineItem[]>(SOVLineItemsData)
  const [editingItem, setEditingItem] = useState<string | null>(null)

  const handleSave = () => {
    console.log("Saving Schedule of Values:", {
      name: sovName,
      type: sovType,
      status: sovStatus,
      lineItems,
    })
  }

  const handleCancel = () => {
    window.history.back()
  }

  const handleDelete = () => {
    console.log("Deleting Schedule of Values:", params.id)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const updateLineItem = (id: string, field: keyof SOVLineItem, value: number | string) => {
    const updatedItems = lineItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        // Auto-calculate adjusted amount when current amount or adjustment amount changes
        if (field === "currentAmount" || field === "adjustmentAmount") {
          updatedItem.adjustedAmount = updatedItem.currentAmount + updatedItem.adjustmentAmount
        }
        return updatedItem
      }
      return item
    })
    setLineItems(updatedItems)
  }

  const addNewLineItem = () => {
    const newItem: SOVLineItem = {
      id: Date.now().toString(),
      code: "",
      description: "",
      currentAmount: 0,
      adjustmentAmount: 0,
      adjustedAmount: 0,
      currentCommittedAmount: 0,
      billedToDateAmount: 0,
      category: "General",
    }
    setLineItems([...lineItems, newItem])
    setEditingItem(newItem.id)
  }

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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

  const getTotals = () => {
    return {
      currentAmount: lineItems.reduce((sum, item) => sum + item.currentAmount, 0),
      adjustmentAmount: lineItems.reduce((sum, item) => sum + item.adjustmentAmount, 0),
      adjustedAmount: lineItems.reduce((sum, item) => sum + item.adjustedAmount, 0),
      currentCommittedAmount: lineItems.reduce((sum, item) => sum + item.currentCommittedAmount, 0),
      billedToDateAmount: lineItems.reduce((sum, item) => sum + item.billedToDateAmount, 0),
    }
  }

  const totals = getTotals()

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <nav className="text-xs text-slate-500 font-medium">
                  Home / Project Management / Striker Remodel / Schedule of Value Periods / {sovName}
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Edit Schedule of Values</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600 font-medium">Striker Remodel • 0121-077</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* SOV Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Schedule Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="sovName" className="text-sm font-medium text-slate-700">
                    Schedule Name
                  </Label>
                  <Input id="sovName" value={sovName} onChange={(e) => setSovName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Type</Label>
                  <div className="mt-1.5">
                    <Badge variant="secondary" className={`border ${getTypeColor(sovType)}`}>
                      {sovType}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Status</Label>
                  <div className="mt-1.5">
                    <Select value={sovStatus} onValueChange={setSovStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-slate-600 mb-1">Current Amount</div>
                  <div className="text-xl font-bold text-slate-900">{formatCurrency(totals.currentAmount)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-blue-700 mb-1">Adjustment</div>
                  <div className="text-xl font-bold text-blue-900">{formatCurrency(totals.adjustmentAmount)}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-green-700 mb-1">Adjusted Amount</div>
                  <div className="text-xl font-bold text-green-900">{formatCurrency(totals.adjustedAmount)}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-orange-700 mb-1">Committed</div>
                  <div className="text-xl font-bold text-orange-900">
                    {formatCurrency(totals.currentCommittedAmount)}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-purple-700 mb-1">Billed to Date</div>
                  <div className="text-xl font-bold text-purple-900">{formatCurrency(totals.billedToDateAmount)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Line Items</CardTitle>
                <Button onClick={addNewLineItem} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Line Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 border-b">
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-24">Code</TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 min-w-80">
                        Description of Work
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-32 text-right">
                        Current Amount
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-36 text-right">
                        Adjustment Amount
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-32 text-right">
                        Adjusted Amount
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-36 text-right">
                        Current Committed Amount
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-32 text-right">
                        Billed to Date Amount
                      </TableHead>
                      <TableHead className="px-4 py-3 text-sm font-semibold text-slate-700 w-20 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item, index) => (
                      <TableRow key={item.id} className={`hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : ""}`}>
                        <TableCell className="px-4 py-3">
                          {editingItem === item.id ? (
                            <Input
                              value={item.code}
                              onChange={(e) => updateLineItem(item.id, "code", e.target.value)}
                              className="h-8 text-sm font-mono"
                              placeholder="Code"
                            />
                          ) : (
                            <span className="font-mono text-sm font-medium text-slate-700">{item.code}</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {editingItem === item.id ? (
                            <Input
                              value={item.description}
                              onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                              className="h-8 text-sm"
                              placeholder="Description"
                            />
                          ) : (
                            <span className="text-sm text-slate-900">{item.description}</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={item.currentAmount}
                              onChange={(e) =>
                                updateLineItem(item.id, "currentAmount", Number.parseFloat(e.target.value) || 0)
                              }
                              className="h-8 text-sm text-right font-mono"
                            />
                          ) : (
                            <span className="font-mono text-sm text-slate-700">
                              {formatCurrency(item.currentAmount)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={item.adjustmentAmount}
                              onChange={(e) =>
                                updateLineItem(item.id, "adjustmentAmount", Number.parseFloat(e.target.value) || 0)
                              }
                              className="h-8 text-sm text-right font-mono"
                            />
                          ) : (
                            <button
                              className="font-mono text-sm text-slate-700 hover:bg-slate-100 px-2 py-1 rounded w-full text-right"
                              onClick={() => setEditingItem(item.id)}
                            >
                              {formatCurrency(item.adjustmentAmount)}
                            </button>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          <span className="font-mono text-sm font-semibold text-slate-900">
                            {formatCurrency(item.adjustedAmount)}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={item.currentCommittedAmount}
                              onChange={(e) =>
                                updateLineItem(
                                  item.id,
                                  "currentCommittedAmount",
                                  Number.parseFloat(e.target.value) || 0,
                                )
                              }
                              className="h-8 text-sm text-right font-mono"
                            />
                          ) : (
                            <span className="font-mono text-sm text-slate-700">
                              {formatCurrency(item.currentCommittedAmount)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          {editingItem === item.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={item.billedToDateAmount}
                              onChange={(e) =>
                                updateLineItem(item.id, "billedToDateAmount", Number.parseFloat(e.target.value) || 0)
                              }
                              className="h-8 text-sm text-right font-mono"
                            />
                          ) : (
                            <span className="font-mono text-sm text-slate-700">
                              {formatCurrency(item.billedToDateAmount)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {editingItem === item.id ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                                onClick={() => setEditingItem(null)}
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                onClick={() => setEditingItem(item.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => removeLineItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Totals Row */}
                    <TableRow className="bg-slate-100 font-semibold border-t-2">
                      <TableCell className="px-4 py-3 font-bold text-slate-900">TOTALS</TableCell>
                      <TableCell className="px-4 py-3"></TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(totals.currentAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(totals.adjustmentAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-bold text-green-700">
                        {formatCurrency(totals.adjustedAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(totals.currentCommittedAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(totals.billedToDateAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
