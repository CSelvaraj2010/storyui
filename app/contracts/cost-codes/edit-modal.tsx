"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Save, X } from "lucide-react"
import type { CostCode } from "./data"

interface EditCostCodeModalProps {
  isOpen: boolean
  onClose: () => void
  costCode: CostCode | null
  onSave: (costCode: CostCode) => void
}

export function EditCostCodeModal({ isOpen, onClose, costCode, onSave }: EditCostCodeModalProps) {
  const [formData, setFormData] = useState<CostCode | null>(null)
  const [activeTab, setActiveTab] = useState("general")

  useEffect(() => {
    if (costCode) {
      setFormData({ ...costCode })
    }
  }, [costCode])

  if (!formData) return null

  const handlePercentageChange = (field: keyof CostCode["percentages"], value: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            percentages: {
              ...prev.percentages,
              [field]: Math.max(0, Math.min(100, value)), // Clamp between 0-100
            },
          }
        : null,
    )
  }

  const totalPercentage = Object.values(formData.percentages).reduce((sum, val) => sum + val, 0)
  const isValidPercentage = Math.abs(totalPercentage - 100) < 0.01 // Allow for small floating point errors

  const handleSave = () => {
    if (formData) {
      onSave(formData)
    }
  }

  const percentageFields = [
    { key: "other", label: "Other", color: "bg-gray-500" },
    { key: "materials", label: "Materials", color: "bg-blue-500" },
    { key: "equipment", label: "Equipment", color: "bg-green-500" },
    { key: "labor", label: "Labor", color: "bg-orange-500" },
    { key: "commitment", label: "Commitment", color: "bg-purple-500" },
    { key: "subcontractor", label: "Subcontractor", color: "bg-red-500" },
    { key: "allowance", label: "Allowance", color: "bg-yellow-500" },
    { key: "contingency", label: "Contingency", color: "bg-pink-500" },
    { key: "bondsinsurance", label: "Bonds/Insurance", color: "bg-indigo-500" },
    { key: "warranty", label: "Warranty", color: "bg-teal-500" },
    { key: "fee", label: "Fee", color: "bg-cyan-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Edit Cost Code - {formData.display}</span>
            <div className="flex items-center gap-2">
              <Badge variant={formData.isActive ? "default" : "secondary"}>
                {formData.isActive ? "Active" : "Inactive"}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
              <TabsTrigger value="general">General Information</TabsTrigger>
              <TabsTrigger value="percentages">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="general" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="display">Display Code *</Label>
                      <Input
                        id="display"
                        value={formData.display}
                        onChange={(e) => setFormData((prev) => (prev ? { ...prev, display: e.target.value } : null))}
                        className="font-mono"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => (prev ? { ...prev, category: value } : null))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Area">Area</SelectItem>
                          <SelectItem value="BCC">BCC</SelectItem>
                          <SelectItem value="Bcxx">Bcxx</SelectItem>
                          <SelectItem value="Concrete">Concrete</SelectItem>
                          <SelectItem value="Concrete2">Concrete2</SelectItem>
                          <SelectItem value="Construction Type">Construction Type</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Cost">Cost</SelectItem>
                          <SelectItem value="Cost Group">Cost Group</SelectItem>
                          <SelectItem value="Equipment Type">Equipment Type</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="unitType">Unit Type</Label>
                      <Select
                        value={formData.unitType}
                        onValueChange={(value) => setFormData((prev) => (prev ? { ...prev, unitType: value } : null))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Each">Each</SelectItem>
                          <SelectItem value="Hour">Hour</SelectItem>
                          <SelectItem value="Square Foot">Square Foot</SelectItem>
                          <SelectItem value="Linear Foot">Linear Foot</SelectItem>
                          <SelectItem value="Cubic Yard">Cubic Yard</SelectItem>
                          <SelectItem value="Ton">Ton</SelectItem>
                          <SelectItem value="Gallon">Gallon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => (prev ? { ...prev, description: e.target.value } : null))
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
                      <Input
                        id="costPerUnit"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.costPerUnit}
                        onChange={(e) =>
                          setFormData((prev) =>
                            prev ? { ...prev, costPerUnit: Number.parseFloat(e.target.value) || 0 } : null,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => (prev ? { ...prev, isActive: checked } : null))
                        }
                      />
                      <Label htmlFor="isActive">Active Code</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="percentages" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Cost Breakdown Percentages
                      <div className="flex items-center gap-2">
                        {!isValidPercentage && <AlertCircle className="w-4 h-4 text-red-500" />}
                        <div
                          className={`text-sm px-3 py-1 rounded-full font-medium ${
                            isValidPercentage ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          Total: {totalPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {percentageFields.map(({ key, label, color }) => {
                        const value = formData.percentages[key as keyof CostCode["percentages"]]
                        return (
                          <div key={key} className="space-y-2">
                            <Label htmlFor={key} className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color}`} />
                              {label}
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id={key}
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={value}
                                onChange={(e) =>
                                  handlePercentageChange(
                                    key as keyof CostCode["percentages"],
                                    Number.parseFloat(e.target.value) || 0,
                                  )
                                }
                                className="w-20"
                              />
                              <span className="text-sm text-slate-500 w-4">%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Visual Percentage Bar */}
                    <div className="mt-6">
                      <Label className="text-sm font-medium mb-2 block">Visual Breakdown</Label>
                      <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                        {percentageFields.map(({ key, color }) => {
                          const value = formData.percentages[key as keyof CostCode["percentages"]]
                          const width = (value / 100) * 100
                          return width > 0 ? (
                            <div
                              key={key}
                              className={`${color} flex items-center justify-center text-white text-xs font-medium`}
                              style={{ width: `${width}%` }}
                              title={`${key}: ${value}%`}
                            >
                              {width > 8 ? `${value}%` : ""}
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Code Properties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Code ID</Label>
                        <Input value={formData.id} disabled className="bg-gray-50" />
                      </div>
                      <div>
                        <Label>Created Date</Label>
                        <Input value="2024-01-15" disabled className="bg-gray-50" />
                      </div>
                      <div>
                        <Label>Last Modified</Label>
                        <Input value="2024-01-20" disabled className="bg-gray-50" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Times Used:</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Cost Applied:</span>
                        <span className="font-medium">$12,450.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Last Used:</span>
                        <span className="font-medium">2024-01-18</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {!isValidPercentage && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Percentages must total 100%</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isValidPercentage}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
