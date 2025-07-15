export interface CostCodeCategory {
  id: string
  name: string
  description: string
  codeCount: number
  lastUpdated: string
}

export interface CostCode {
  id: string
  display: string
  description: string
  category: string
  unitType: string
  costPerUnit: number
  isActive: boolean
  percentages: {
    other: number
    materials: number
    equipment: number
    labor: number
    commitment: number
    subcontractor: number
    allowance: number
    contingency: number
    bondsinsurance: number
    warranty: number
    fee: number
  }
}

export const CostCodeCategories: CostCodeCategory[] = [
  { id: "1", name: "Area", description: "Location-based cost codes", codeCount: 15, lastUpdated: "2024-01-15" },
  { id: "2", name: "BCC", description: "Building Construction Codes", codeCount: 23, lastUpdated: "2024-01-10" },
  { id: "3", name: "Bcxx", description: "Building Code Extensions", codeCount: 8, lastUpdated: "2024-01-08" },
  { id: "4", name: "Concrete", description: "Concrete work codes", codeCount: 12, lastUpdated: "2024-01-12" },
  { id: "5", name: "Concrete2", description: "Advanced concrete codes", codeCount: 6, lastUpdated: "2024-01-05" },
  {
    id: "6",
    name: "Construction Type",
    description: "Construction methodology",
    codeCount: 18,
    lastUpdated: "2024-01-14",
  },
  { id: "7", name: "Corporate", description: "Corporate overhead codes", codeCount: 9, lastUpdated: "2024-01-11" },
  { id: "8", name: "Cost", description: "General cost categories", codeCount: 25, lastUpdated: "2024-01-13" },
  { id: "9", name: "Cost Group", description: "Grouped cost categories", codeCount: 14, lastUpdated: "2024-01-09" },
  {
    id: "10",
    name: "Equipment Type",
    description: "Equipment classification",
    codeCount: 20,
    lastUpdated: "2024-01-07",
  },
]

export const CostCodes: CostCode[] = [
  {
    id: "1",
    display: "000000",
    description: "Pending Expenses",
    category: "Cost",
    unitType: "Each",
    costPerUnit: 0.0,
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
  },
  {
    id: "2",
    display: "007201",
    description: "Construction Executive",
    category: "Corporate",
    unitType: "Hour",
    costPerUnit: 125.0,
    isActive: true,
    percentages: {
      other: 5,
      materials: 0,
      equipment: 10,
      labor: 70,
      commitment: 0,
      subcontractor: 0,
      allowance: 5,
      contingency: 5,
      bondsinsurance: 2,
      warranty: 1,
      fee: 2,
    },
  },
  {
    id: "3",
    display: "007202",
    description: "Sr. Project Manager",
    category: "Corporate",
    unitType: "Hour",
    costPerUnit: 95.0,
    isActive: true,
    percentages: {
      other: 3,
      materials: 0,
      equipment: 8,
      labor: 75,
      commitment: 0,
      subcontractor: 0,
      allowance: 4,
      contingency: 5,
      bondsinsurance: 2,
      warranty: 1,
      fee: 2,
    },
  },
  {
    id: "4",
    display: "007203",
    description: "Project Manager",
    category: "Corporate",
    unitType: "Hour",
    costPerUnit: 85.0,
    isActive: true,
    percentages: {
      other: 2,
      materials: 0,
      equipment: 5,
      labor: 80,
      commitment: 0,
      subcontractor: 0,
      allowance: 3,
      contingency: 5,
      bondsinsurance: 2,
      warranty: 1,
      fee: 2,
    },
  },
  {
    id: "5",
    display: "007204",
    description: "Assistant Project Manager",
    category: "Corporate",
    unitType: "Hour",
    costPerUnit: 65.0,
    isActive: true,
    percentages: {
      other: 2,
      materials: 0,
      equipment: 3,
      labor: 85,
      commitment: 0,
      subcontractor: 0,
      allowance: 2,
      contingency: 4,
      bondsinsurance: 2,
      warranty: 1,
      fee: 1,
    },
  },
]
