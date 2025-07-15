export interface CostControlItem {
  id: string
  costCode: string
  description: string
  type: string
  category: string
  phase: string
  subcontractor?: string
  currentBudget: number
  originalCommitment: number
  changeOrder: number
  currentCommitment: number
  actualCosts: number
  projectedFinalCost: number
  projectedVariance: number
}

export interface CostControlSummary {
  totalBudget: number
  contractedAmount: number
  contractVariance: number
  unapprovedInvoices: number
  currentContingency: number
  projectedContingency: number
  fee: number
  currentBudgetPlusFee: number
  marginAnalysisDate: string
}

export interface MarginAnalysisItem {
  id: string
  date: string
  description: string
  currentContingency: number
  projectedContingencyLevel: number
  currentContract: number
  fee: number
}

export const CostControlData: CostControlItem[] = [
  {
    id: "1",
    costCode: "01-100",
    description: "General Requirements",
    type: "Labor",
    category: "General",
    phase: "Phase 1",
    subcontractor: "ABC Construction",
    currentBudget: 25000,
    originalCommitment: 24000,
    changeOrder: 1000,
    currentCommitment: 25000,
    actualCosts: 23500,
    projectedFinalCost: 25000,
    projectedVariance: 0,
  },
  {
    id: "2",
    costCode: "02-200",
    description: "Site Preparation",
    type: "Material",
    category: "Sitework",
    phase: "Phase 1",
    subcontractor: "Site Works LLC",
    currentBudget: 18000,
    originalCommitment: 17500,
    changeOrder: 500,
    currentCommitment: 18000,
    actualCosts: 17800,
    projectedFinalCost: 18200,
    projectedVariance: -200,
  },
  {
    id: "3",
    costCode: "03-300",
    description: "Concrete Work",
    type: "Labor",
    category: "Concrete",
    phase: "Phase 2",
    subcontractor: "Concrete Pro",
    currentBudget: 45000,
    originalCommitment: 44000,
    changeOrder: 1000,
    currentCommitment: 45000,
    actualCosts: 42000,
    projectedFinalCost: 44500,
    projectedVariance: 500,
  },
  {
    id: "4",
    costCode: "04-400",
    description: "Masonry",
    type: "Material",
    category: "Masonry",
    phase: "Phase 2",
    currentBudget: 32000,
    originalCommitment: 31000,
    changeOrder: 1000,
    currentCommitment: 32000,
    actualCosts: 30500,
    projectedFinalCost: 32500,
    projectedVariance: -500,
  },
  {
    id: "5",
    costCode: "05-500",
    description: "Structural Steel",
    type: "Material",
    category: "Steel",
    phase: "Phase 2",
    subcontractor: "Steel Works Inc",
    currentBudget: 65000,
    originalCommitment: 63000,
    changeOrder: 2000,
    currentCommitment: 65000,
    actualCosts: 61000,
    projectedFinalCost: 64000,
    projectedVariance: 1000,
  },
  {
    id: "6",
    costCode: "06-600",
    description: "Wood Framing",
    type: "Labor",
    category: "Carpentry",
    phase: "Phase 3",
    subcontractor: "Frame Masters",
    currentBudget: 28000,
    originalCommitment: 27500,
    changeOrder: 500,
    currentCommitment: 28000,
    actualCosts: 26800,
    projectedFinalCost: 27800,
    projectedVariance: 200,
  },
  {
    id: "7",
    costCode: "07-700",
    description: "Thermal & Moisture Protection",
    type: "Material",
    category: "Insulation",
    phase: "Phase 3",
    currentBudget: 15000,
    originalCommitment: 14500,
    changeOrder: 500,
    currentCommitment: 15000,
    actualCosts: 14200,
    projectedFinalCost: 14800,
    projectedVariance: 200,
  },
  {
    id: "8",
    costCode: "08-800",
    description: "Openings",
    type: "Material",
    category: "Doors & Windows",
    phase: "Phase 3",
    subcontractor: "Window World",
    currentBudget: 22000,
    originalCommitment: 21000,
    changeOrder: 1000,
    currentCommitment: 22000,
    actualCosts: 20500,
    projectedFinalCost: 21500,
    projectedVariance: 500,
  },
  {
    id: "9",
    costCode: "09-900",
    description: "Finishes",
    type: "Labor",
    category: "Finishes",
    phase: "Phase 4",
    subcontractor: "Finish Pro",
    currentBudget: 38000,
    originalCommitment: 37000,
    changeOrder: 1000,
    currentCommitment: 38000,
    actualCosts: 35000,
    projectedFinalCost: 37500,
    projectedVariance: 500,
  },
  {
    id: "10",
    costCode: "10-000",
    description: "Specialties",
    type: "Equipment",
    category: "Specialties",
    phase: "Phase 4",
    currentBudget: 12000,
    originalCommitment: 11500,
    changeOrder: 500,
    currentCommitment: 12000,
    actualCosts: 11200,
    projectedFinalCost: 11800,
    projectedVariance: 200,
  },
]

export const CostControlSummaryData: CostControlSummary = {
  totalBudget: 319562.24,
  contractedAmount: 356248.87,
  contractVariance: -36686.63,
  unapprovedInvoices: 15420.5,
  currentContingency: 1008.0,
  projectedContingency: 10496.44,
  fee: 64733.0,
  currentBudgetPlusFee: 384295.24,
  marginAnalysisDate: "4/7/2023",
}

export const MarginAnalysisData: MarginAnalysisItem[] = [
  {
    id: "1",
    date: "4/7/2023",
    description: "4.7.23",
    currentContingency: 1008.0,
    projectedContingencyLevel: 10496.44,
    currentContract: 319562.24,
    fee: 64733.0,
  },
  {
    id: "2",
    date: "2/3/2023",
    description: "2.3.23",
    currentContingency: 19728.0,
    projectedContingencyLevel: 5548.16,
    currentContract: 356248.87,
    fee: 64733.0,
  },
  {
    id: "3",
    date: "12/9/2022",
    description: "12.3.22",
    currentContingency: 19905.0,
    projectedContingencyLevel: 10041.13,
    currentContract: 356248.87,
    fee: 64733.0,
  },
  {
    id: "4",
    date: "11/4/2022",
    description: "11.4.22",
    currentContingency: 19728.0,
    projectedContingencyLevel: 12259.06,
    currentContract: 356248.87,
    fee: 64733.0,
  },
  {
    id: "5",
    date: "10/6/2022",
    description: "10.6.2022 Margin",
    currentContingency: 19700.0,
    projectedContingencyLevel: 9056.26,
    currentContract: 356248.87,
    fee: 64733.0,
  },
  {
    id: "6",
    date: "7/14/2022",
    description: "7.15.22",
    currentContingency: 7823.0,
    projectedContingencyLevel: -11905.18,
    currentContract: 356248.87,
    fee: 76638.79,
  },
  {
    id: "7",
    date: "5/13/2022",
    description: "5.15.22",
    currentContingency: 7822.0,
    projectedContingencyLevel: 534.31,
    currentContract: 346472.49,
    fee: 75363.61,
  },
  {
    id: "8",
    date: "4/15/2022",
    description: "April 4.15.22",
    currentContingency: 8000.0,
    projectedContingencyLevel: 6273.85,
    currentContract: 348748.49,
    fee: 75363.61,
  },
  {
    id: "9",
    date: "2/14/2022",
    description: "Feb 22 Margin",
    currentContingency: 8000.0,
    projectedContingencyLevel: 8000.0,
    currentContract: 321605.24,
    fee: 72938.4,
  },
]

export const CostControlCategories = [
  "General",
  "Sitework",
  "Concrete",
  "Masonry",
  "Steel",
  "Carpentry",
  "Insulation",
  "Doors & Windows",
  "Finishes",
  "Specialties",
]
