"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, X, FileText, Calendar } from "lucide-react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PayApplicationData } from "./data"
import { SOVData, type SOVItem } from "./sov-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface EditPayApplicationPageProps {
  params: {
    id: string
  }
}

export default function EditPayApplicationPage({ params }: EditPayApplicationPageProps) {
  const [formData, setFormData] = useState(PayApplicationData)
  const [activeTab, setActiveTab] = useState("application")
  const [sovItems, setSovItems] = useState(SOVData)

  const handleSave = () => {
    console.log("Saving pay application:", formData)
    // Here you would typically save to your backend
  }

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US")
  }

  const calculateTotalCompleted = (item: SOVItem) => {
    return item.workCompletedPrevious + item.workCompletedThisPeriod + item.materialsStored
  }

  const calculatePercentComplete = (item: SOVItem) => {
    if (item.scheduledValue === 0) return 0
    return (calculateTotalCompleted(item) / item.scheduledValue) * 100
  }

  const calculateBalanceToFinish = (item: SOVItem) => {
    return item.scheduledValue - calculateTotalCompleted(item)
  }

  const updateSOVItem = (index: number, field: keyof SOVItem, value: number) => {
    const updatedItems = [...sovItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setSovItems(updatedItems)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs text-slate-500 mb-1">
                Home / Project Management / Striker Remodel / Pay Applications / Pay App #{params.id} - Final
              </nav>
              <h1 className="text-xl font-bold text-slate-900">Edit Pay Application</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-600">Striker Remodel : 0121-077</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="application" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Pay Application
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule of Values
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="application" className="mt-6 space-y-6">
              {/* Application Header */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pay App #{formData.applicationNo} - Final</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{formData.submittedBy}</div>
                        <Badge variant="secondary" className="mt-1">
                          Submitted {formatDate(formData.submittedDate)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Client and Project Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">To Client</Label>
                      <div className="mt-1">
                        <div className="font-medium">{formData.client.name}</div>
                        <div className="text-sm text-slate-600">{formData.client.address}</div>
                        <div className="text-sm text-slate-600">
                          {formData.client.city}, {formData.client.state} {formData.client.zip}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium text-slate-600">From Contractor</Label>
                      <div className="mt-1">
                        <div className="font-medium">{formData.contractor.name}</div>
                        <div className="text-sm text-slate-600">{formData.contractor.address}</div>
                        <div className="text-sm text-slate-600">
                          {formData.contractor.city}, {formData.contractor.state} {formData.contractor.zip}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Project</Label>
                      <div className="mt-1">
                        <div className="font-medium">{formData.project.name}</div>
                        <div className="text-sm text-slate-600">{formData.project.address}</div>
                        <div className="text-sm text-slate-600">
                          {formData.project.city}, {formData.project.state} {formData.project.zip}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Via Architect</Label>
                      <div className="mt-1">
                        <div className="font-medium">{formData.architect.name}</div>
                        <div className="text-sm text-slate-600">{formData.architect.address}</div>
                        <div className="text-sm text-slate-600">
                          {formData.architect.city}, {formData.architect.state} {formData.architect.zip}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Application Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="applicationNo">Application No.</Label>
                      <Input
                        id="applicationNo"
                        value={formData.applicationNo}
                        onChange={(e) => setFormData({ ...formData, applicationNo: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodTo">Period To</Label>
                      <Input
                        id="periodTo"
                        type="date"
                        value={formData.periodTo}
                        onChange={(e) => setFormData({ ...formData, periodTo: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractFor">Contract For</Label>
                      <Input
                        id="contractFor"
                        value={formData.contractFor}
                        onChange={(e) => setFormData({ ...formData, contractFor: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectNo">Project No.</Label>
                      <Input
                        id="projectNo"
                        value={formData.projectNo}
                        onChange={(e) => setFormData({ ...formData, projectNo: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contractor's Application For Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">1. Original Contract Sum</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.originalContractSum)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">2. Net Change by Change Orders</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.netChangeByChangeOrders)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm font-medium">3. Contract Sum To Date</span>
                          <span className="font-mono font-bold">
                            {formatCurrency(formData.financial.contractSumToDate)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">4. Total Completed and Stored to Date</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.totalCompletedToDate)}
                          </span>
                        </div>
                        <div className="ml-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-600">a. Completed Work</span>
                            <span className="font-mono text-sm">
                              {formatCurrency(formData.financial.completedWork)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-600">b. Stored Material</span>
                            <span className="font-mono text-sm">
                              {formatCurrency(formData.financial.storedMaterial)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">6. Total Earned Less Retainage</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.totalEarnedLessRetainage)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">7. Less Previous Certificates for Payment</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.lessPreviousCertificates)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">8. Current Payment Due</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.currentPaymentDue)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm">9. Balance to Finish Including Retainage</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(formData.financial.balanceToFinish)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Changes Approved in Previous Periods by Owner</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(formData.financial.totalChangesApproved)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Approved this Period</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(formData.financial.totalApprovedThisPeriod)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-bold">Total</span>
                        <span className="font-mono font-bold">{formatCurrency(formData.financial.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">This Period</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Gross Billed</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(formData.thisPeriod.grossBilled)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Retention</div>
                        <div className="text-xl font-bold">{formatCurrency(formData.thisPeriod.retention)}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-slate-600 mb-1">Net</div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(formData.thisPeriod.net)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment Received</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="dateReceived">Date Received</Label>
                      <Input
                        id="dateReceived"
                        type="date"
                        value={formData.paymentReceived.dateReceived}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentReceived: { ...formData.paymentReceived, dateReceived: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amountReceived">Amount Received</Label>
                      <Input
                        id="amountReceived"
                        type="number"
                        step="0.01"
                        value={formData.paymentReceived.amountReceived}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentReceived: {
                              ...formData.paymentReceived,
                              amountReceived: Number.parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule of Values</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="h-12 bg-slate-50">
                          <TableHead className="px-2 py-2 text-xs font-medium w-16">Item</TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium min-w-48">Description</TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Scheduled Value
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Work Completed From Previous Application
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Work Completed This Period
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Materials Presently Stored
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Total Completed and Stored to Date
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-20">% Complete</TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-24">
                            Balance to Finish
                          </TableHead>
                          <TableHead className="px-2 py-2 text-xs font-medium text-right w-20">Retainage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sovItems.map((item, index) => {
                          const totalCompleted = calculateTotalCompleted(item)
                          const percentComplete = calculatePercentComplete(item)
                          const balanceToFinish = calculateBalanceToFinish(item)

                          return (
                            <TableRow key={item.itemNumber} className="hover:bg-slate-50 h-10">
                              <TableCell className="px-2 py-1 font-mono text-xs">{item.itemNumber}</TableCell>
                              <TableCell className="px-2 py-1 text-xs">{item.description}</TableCell>
                              <TableCell className="px-2 py-1 text-right">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.scheduledValue}
                                  onChange={(e) =>
                                    updateSOVItem(index, "scheduledValue", Number.parseFloat(e.target.value) || 0)
                                  }
                                  className="h-7 text-xs text-right font-mono border-0 bg-transparent p-1"
                                />
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.workCompletedPrevious}
                                  onChange={(e) =>
                                    updateSOVItem(
                                      index,
                                      "workCompletedPrevious",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  className="h-7 text-xs text-right font-mono border-0 bg-transparent p-1"
                                />
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.workCompletedThisPeriod}
                                  onChange={(e) =>
                                    updateSOVItem(
                                      index,
                                      "workCompletedThisPeriod",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  className="h-7 text-xs text-right font-mono border-0 bg-transparent p-1"
                                />
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={item.materialsStored}
                                  onChange={(e) =>
                                    updateSOVItem(index, "materialsStored", Number.parseFloat(e.target.value) || 0)
                                  }
                                  className="h-7 text-xs text-right font-mono border-0 bg-transparent p-1"
                                />
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right font-mono text-xs bg-blue-50">
                                {formatCurrency(totalCompleted)}
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right font-mono text-xs bg-green-50">
                                {percentComplete.toFixed(1)}%
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right font-mono text-xs bg-orange-50">
                                {formatCurrency(balanceToFinish)}
                              </TableCell>
                              <TableCell className="px-2 py-1 text-right font-mono text-xs">
                                {formatCurrency(item.retainage)}
                              </TableCell>
                            </TableRow>
                          )
                        })}

                        {/* Totals Row */}
                        <TableRow className="bg-slate-100 font-medium border-t-2">
                          <TableCell className="px-2 py-2 text-xs font-bold">TOTALS</TableCell>
                          <TableCell className="px-2 py-2 text-xs"></TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.scheduledValue, 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.workCompletedPrevious, 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.workCompletedThisPeriod, 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.materialsStored, 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold bg-blue-100">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + calculateTotalCompleted(item), 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold bg-green-100">
                            {(
                              (sovItems.reduce((sum, item) => sum + calculateTotalCompleted(item), 0) /
                                sovItems.reduce((sum, item) => sum + item.scheduledValue, 0)) *
                              100
                            ).toFixed(1)}
                            %
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold bg-orange-100">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + calculateBalanceToFinish(item), 0))}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right font-mono text-xs font-bold">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.retainage, 0))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Summary Section */}
                  <div className="p-4 bg-slate-50 border-t">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Less Retainage:</span>
                          <span className="font-mono">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.retainage, 0))}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Net Billing:</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(
                              sovItems.reduce((sum, item) => sum + calculateTotalCompleted(item) - item.retainage, 0),
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Less Retainage:</span>
                          <span className="font-mono">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.workCompletedThisPeriod, 0))}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t pt-2">
                          <span>Net Billing This Period:</span>
                          <span className="font-mono">
                            {formatCurrency(sovItems.reduce((sum, item) => sum + item.workCompletedThisPeriod, 0))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-slate-500">Document management will be implemented here</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
