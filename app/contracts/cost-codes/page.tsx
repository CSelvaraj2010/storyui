"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Folder, FileText, Settings2 } from "lucide-react"
import { CostCodeCategories, CostCodes, type CostCode } from "./data"
import { EditCostCodeModal } from "./edit-modal"
import { AddCostCodeModal } from "./add-modal"
import { SidebarNavigation } from "@/components/sidebar-navigation"

export default function CostCodesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("categories")

  const [editingCode, setEditingCode] = useState<CostCode | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredCategories = CostCodeCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCodes = selectedCategory
    ? CostCodes.filter(
        (code) =>
          code.category === selectedCategory &&
          (code.description.toLowerCase().includes(searchTerm.toLowerCase()) || code.display.includes(searchTerm)),
      )
    : CostCodes.filter(
        (code) =>
          code.description.toLowerCase().includes(searchTerm.toLowerCase()) || code.display.includes(searchTerm),
      )

  const handleEditCode = (code: CostCode) => {
    setEditingCode(code)
    setIsEditModalOpen(true)
  }

  const handleSaveCode = (updatedCode: CostCode) => {
    // Here you would typically update your data source
    console.log("Saving code:", updatedCode)
    setIsEditModalOpen(false)
    setEditingCode(null)
  }

  const handleAddCode = (newCode: Omit<CostCode, "id">) => {
    // Here you would typically add to your data source
    const codeWithId = { ...newCode, id: Date.now().toString() }
    console.log("Adding new code:", codeWithId)
    setIsAddModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs text-slate-500 mb-1">Admin / Configuration / Cost Codes</nav>
              <h1 className="text-xl font-bold text-slate-900">Cost Code Management</h1>
            </div>
            <Button className="h-8" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border-b px-4 py-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search categories or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="codes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Cost Codes
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cost Code Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCategories.map((category) => (
                      <Card
                        key={category.id}
                        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                        onClick={() => {
                          setSelectedCategory(category.name)
                          setActiveTab("codes")
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm">{category.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {category.codeCount}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{category.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">Last updated: {category.lastUpdated}</span>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codes" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Cost Codes {selectedCategory && `- ${selectedCategory}`}</CardTitle>
                    {selectedCategory && (
                      <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
                        Show All Categories
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="h-10">
                        <TableHead className="px-4 py-2 text-xs font-medium">Code</TableHead>
                        <TableHead className="px-4 py-2 text-xs font-medium">Description</TableHead>
                        <TableHead className="px-4 py-2 text-xs font-medium">Category</TableHead>
                        <TableHead className="px-4 py-2 text-xs font-medium">Unit Type</TableHead>
                        <TableHead className="px-4 py-2 text-xs font-medium">Cost/Unit</TableHead>
                        <TableHead className="px-4 py-2 text-xs font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCodes.map((code) => (
                        <TableRow key={code.id} className="hover:bg-slate-50 h-10">
                          <TableCell className="px-4 py-2 font-mono text-sm font-medium">{code.display}</TableCell>
                          <TableCell className="px-4 py-2 text-sm">{code.description}</TableCell>
                          <TableCell className="px-4 py-2">
                            <Badge variant="outline" className="text-xs">
                              {code.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4 py-2 text-sm">{code.unitType}</TableCell>
                          <TableCell className="px-4 py-2 text-sm font-mono">${code.costPerUnit.toFixed(2)}</TableCell>
                          <TableCell className="px-4 py-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditCode(code)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{CostCodeCategories.length}</div>
                    <p className="text-sm text-slate-600">Total Categories</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">{CostCodes.length}</div>
                    <p className="text-sm text-slate-600">Total Cost Codes</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {CostCodes.filter((c) => c.isActive).length}
                    </div>
                    <p className="text-sm text-slate-600">Active Codes</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">{CostCodes.filter((c) => !c.isActive).length}</div>
                    <p className="text-sm text-slate-600">Inactive Codes</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CostCodeCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-slate-600">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{category.codeCount} codes</div>
                          <div className="text-sm text-slate-500">Updated {category.lastUpdated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AddCostCodeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddCode} />
      <EditCostCodeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        costCode={editingCode}
        onSave={handleSaveCode}
      />
    </div>
  )
}
