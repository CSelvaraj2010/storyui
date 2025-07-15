"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import type { CostCode } from "./data"

interface AddCostCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (costCode: Omit<CostCode, "id">) => void
}

export function AddCostCodeModal({ isOpen, onClose, onAdd }: AddCostCodeModalProps) {
  const [formData, setFormData] = useState({
    display: "",
    description: "",
    category: "",
    unitType: "Each",
    costPerUnit: 0,
    isActive: true,
    percentages: {
      other: 0,
      materials: 0,
      equipment: 0,
      labor: 0,
      commitment: 0,
      subcontractor: 0,
      allowance: 0,
      contingency: 0,
      bondsinsurance: 0,
      warranty: 0,
      fee: 0,
    },
  })

  const handleSubmit = () => {
    if (formData.display && formData.description && formData.category) {
      onAdd(formData)
      // Reset form
      setFormData({
        display: "",
        description: "",
        category: "",
        unitType: "Each",
        costPerUnit: 0,
        isActive: true,
        percentages: {
          other: 0,
          materials: 0,
          equipment: 0,
          labor: 0,
          commitment: 0,
          subcontractor: 0,
          allowance: 0,
          contingency: 0,
          bondsinsurance: 0,
          warranty: 0,
          fee: 0,
        },
      })
    }
  }

  const isValid = formData.display && formData.description && formData.category

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Cost Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="display">Display Code *</Label>
              <Input
                id="display"
                value={formData.display}
                onChange={(e) => setFormData((prev) => ({ ...prev, display: e.target.value }))}
                placeholder="e.g., 007230"
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter cost code description"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unitType">Unit Type</Label>
              <Select
                value={formData.unitType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, unitType: value }))}
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
            <div>
              <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
              <Input
                id="costPerUnit"
                type="number"
                step="0.01"
                min="0"
                value={formData.costPerUnit}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, costPerUnit: Number.parseFloat(e.target.value) || 0 }))
                }
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Active Code</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            <Plus className="w-4 h-4 mr-2" />
            Add Cost Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
