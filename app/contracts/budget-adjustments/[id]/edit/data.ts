export interface BudgetAdjustmentEditData {
  id: string
  budgetName: string
  type: "Owner" | "Internal" | "Initial"
  status: "Submitted" | "Pending" | "Approved" | "Rejected"
  primeChangeOrder: {
    finalSettlement: number
    fee: number
    primeOrderFee: number
  }
  costCodes: CostCodeBudgetItem[]
  amountToDistribute: number
}

export interface CostCodeBudgetItem {
  id: string
  costCode: string
  description: string
  currentBudget: number
  adjustmentAmount: number
  newBudget: number
  costCodeType: string
  phase: string
  category: string
}

export const BudgetAdjustmentEditData: BudgetAdjustmentEditData = {
  id: "1",
  budgetName: "CO #10",
  type: "Owner",
  status: "Submitted",
  primeChangeOrder: {
    finalSettlement: -2434.76,
    fee: -2434.76,
    primeOrderFee: 0.0,
  },
  costCodes: [
    // Soft Costs
    {
      id: "1",
      costCode: "00-002",
      description: "Name Change 2",
      currentBudget: 0,
      adjustmentAmount: 0,
      newBudget: 0,
      costCodeType: "Soft Costs",
      phase: "Pre-Construction",
      category: "Soft Costs",
    },
    {
      id: "2",
      costCode: "01-110",
      description: "Architectural Design",
      currentBudget: 15000,
      adjustmentAmount: -500,
      newBudget: 14500,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "3",
      costCode: "01-111",
      description: "ARCH - Schematic Design",
      currentBudget: 8000,
      adjustmentAmount: 0,
      newBudget: 8000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "4",
      costCode: "01-112",
      description: "ARCH - Design Development",
      currentBudget: 12000,
      adjustmentAmount: 0,
      newBudget: 12000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "5",
      costCode: "01-113",
      description: "ARCH - Construction Documents",
      currentBudget: 18000,
      adjustmentAmount: 0,
      newBudget: 18000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "6",
      costCode: "01-120",
      description: "Field Measurement",
      currentBudget: 2500,
      adjustmentAmount: 0,
      newBudget: 2500,
      costCodeType: "Soft Costs",
      phase: "Pre-Construction",
      category: "Soft Costs",
    },
    {
      id: "7",
      costCode: "01-130",
      description: "Landscaping Design",
      currentBudget: 5000,
      adjustmentAmount: 0,
      newBudget: 5000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "8",
      costCode: "01-140",
      description: "Pool Design",
      currentBudget: 3500,
      adjustmentAmount: 0,
      newBudget: 3500,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "9",
      costCode: "01-150",
      description: "Architectural Reimbursables",
      currentBudget: 1200,
      adjustmentAmount: 0,
      newBudget: 1200,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "10",
      costCode: "01-160",
      description: "Interior Design",
      currentBudget: 8500,
      adjustmentAmount: 0,
      newBudget: 8500,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "11",
      costCode: "01-161",
      description: "ID - Schematic Design",
      currentBudget: 4000,
      adjustmentAmount: 0,
      newBudget: 4000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },
    {
      id: "12",
      costCode: "01-162",
      description: "ID - Design Development",
      currentBudget: 6000,
      adjustmentAmount: 0,
      newBudget: 6000,
      costCodeType: "Soft Costs",
      phase: "Design",
      category: "Soft Costs",
    },

    // Special Construction
    {
      id: "13",
      costCode: "13-100",
      description: "Special Construction - General",
      currentBudget: 25000,
      adjustmentAmount: 1500,
      newBudget: 26500,
      costCodeType: "Special Construction",
      phase: "Construction",
      category: "Special Construction",
    },
    {
      id: "14",
      costCode: "13-200",
      description: "Prefabricated Structures",
      currentBudget: 18000,
      adjustmentAmount: 0,
      newBudget: 18000,
      costCodeType: "Special Construction",
      phase: "Construction",
      category: "Special Construction",
    },

    // Demolition
    {
      id: "15",
      costCode: "02-100",
      description: "Selective Demolition",
      currentBudget: 8500,
      adjustmentAmount: -200,
      newBudget: 8300,
      costCodeType: "Demolition",
      phase: "Pre-Construction",
      category: "Demolition",
    },
    {
      id: "16",
      costCode: "02-200",
      description: "Structure Demolition",
      currentBudget: 12000,
      adjustmentAmount: 0,
      newBudget: 12000,
      costCodeType: "Demolition",
      phase: "Pre-Construction",
      category: "Demolition",
    },

    // Sitework & Utilities
    {
      id: "17",
      costCode: "02-400",
      description: "Site Preparation",
      currentBudget: 15000,
      adjustmentAmount: 800,
      newBudget: 15800,
      costCodeType: "Sitework",
      phase: "Site Work",
      category: "Sitework & Utilities",
    },
    {
      id: "18",
      costCode: "02-500",
      description: "Utilities",
      currentBudget: 22000,
      adjustmentAmount: 0,
      newBudget: 22000,
      costCodeType: "Sitework",
      phase: "Site Work",
      category: "Sitework & Utilities",
    },

    // Landscaping
    {
      id: "19",
      costCode: "32-100",
      description: "Planting",
      currentBudget: 12000,
      adjustmentAmount: 500,
      newBudget: 12500,
      costCodeType: "Landscaping",
      phase: "Final",
      category: "Landscaping",
    },
    {
      id: "20",
      costCode: "32-200",
      description: "Irrigation",
      currentBudget: 8000,
      adjustmentAmount: 0,
      newBudget: 8000,
      costCodeType: "Landscaping",
      phase: "Final",
      category: "Landscaping",
    },

    // Concrete
    {
      id: "21",
      costCode: "03-100",
      description: "Concrete Formwork",
      currentBudget: 18000,
      adjustmentAmount: -300,
      newBudget: 17700,
      costCodeType: "Concrete",
      phase: "Structure",
      category: "Concrete",
    },
    {
      id: "22",
      costCode: "03-300",
      description: "Cast-in-Place Concrete",
      currentBudget: 35000,
      adjustmentAmount: 1200,
      newBudget: 36200,
      costCodeType: "Concrete",
      phase: "Structure",
      category: "Concrete",
    },

    // Masonry
    {
      id: "23",
      costCode: "04-100",
      description: "Unit Masonry",
      currentBudget: 28000,
      adjustmentAmount: 0,
      newBudget: 28000,
      costCodeType: "Masonry",
      phase: "Structure",
      category: "Masonry",
    },
    {
      id: "24",
      costCode: "04-200",
      description: "Stone",
      currentBudget: 15000,
      adjustmentAmount: 750,
      newBudget: 15750,
      costCodeType: "Masonry",
      phase: "Finishes",
      category: "Masonry",
    },

    // Metals
    {
      id: "25",
      costCode: "05-100",
      description: "Structural Metal Framing",
      currentBudget: 42000,
      adjustmentAmount: 0,
      newBudget: 42000,
      costCodeType: "Metals",
      phase: "Structure",
      category: "Metals",
    },
    {
      id: "26",
      costCode: "05-200",
      description: "Metal Joists",
      currentBudget: 18000,
      adjustmentAmount: -400,
      newBudget: 17600,
      costCodeType: "Metals",
      phase: "Structure",
      category: "Metals",
    },

    // Rough Carpentry
    {
      id: "27",
      costCode: "06-100",
      description: "Wood Framing",
      currentBudget: 32000,
      adjustmentAmount: 600,
      newBudget: 32600,
      costCodeType: "Carpentry",
      phase: "Framing",
      category: "Rough Carpentry",
    },
    {
      id: "28",
      costCode: "06-200",
      description: "Structural Panels",
      currentBudget: 12000,
      adjustmentAmount: 0,
      newBudget: 12000,
      costCodeType: "Carpentry",
      phase: "Framing",
      category: "Rough Carpentry",
    },

    // Architectural Millwork
    {
      id: "29",
      costCode: "06-400",
      description: "Architectural Woodwork",
      currentBudget: 25000,
      adjustmentAmount: 1000,
      newBudget: 26000,
      costCodeType: "Millwork",
      phase: "Finishes",
      category: "Architectural Millwork",
    },

    // Insulation
    {
      id: "30",
      costCode: "07-200",
      description: "Thermal Protection",
      currentBudget: 8500,
      adjustmentAmount: 0,
      newBudget: 8500,
      costCodeType: "Insulation",
      phase: "Envelope",
      category: "Insulation",
    },

    // Roofing
    {
      id: "31",
      costCode: "07-300",
      description: "Shingles and Roofing Tiles",
      currentBudget: 22000,
      adjustmentAmount: -500,
      newBudget: 21500,
      costCodeType: "Roofing",
      phase: "Envelope",
      category: "Roofing",
    },
    {
      id: "32",
      costCode: "07-400",
      description: "Membrane Roofing",
      currentBudget: 15000,
      adjustmentAmount: 0,
      newBudget: 15000,
      costCodeType: "Roofing",
      phase: "Envelope",
      category: "Roofing",
    },

    // Siding
    {
      id: "33",
      costCode: "07-460",
      description: "Siding",
      currentBudget: 18000,
      adjustmentAmount: 300,
      newBudget: 18300,
      costCodeType: "Siding",
      phase: "Envelope",
      category: "Siding",
    },

    // Doors
    {
      id: "34",
      costCode: "08-100",
      description: "Metal Doors and Frames",
      currentBudget: 8000,
      adjustmentAmount: 0,
      newBudget: 8000,
      costCodeType: "Doors",
      phase: "Finishes",
      category: "Doors",
    },
    {
      id: "35",
      costCode: "08-200",
      description: "Wood and Plastic Doors",
      currentBudget: 12000,
      adjustmentAmount: 200,
      newBudget: 12200,
      costCodeType: "Doors",
      phase: "Finishes",
      category: "Doors",
    },

    // Windows & Glazing
    {
      id: "36",
      costCode: "08-400",
      description: "Metal Windows",
      currentBudget: 28000,
      adjustmentAmount: 0,
      newBudget: 28000,
      costCodeType: "Windows",
      phase: "Envelope",
      category: "Windows & Glazing",
    },
    {
      id: "37",
      costCode: "08-800",
      description: "Glazing",
      currentBudget: 15000,
      adjustmentAmount: -250,
      newBudget: 14750,
      costCodeType: "Windows",
      phase: "Envelope",
      category: "Windows & Glazing",
    },

    // Drywall
    {
      id: "38",
      costCode: "09-200",
      description: "Plaster and Gypsum Board",
      currentBudget: 22000,
      adjustmentAmount: 400,
      newBudget: 22400,
      costCodeType: "Drywall",
      phase: "Finishes",
      category: "Drywall",
    },

    // Painting
    {
      id: "39",
      costCode: "09-900",
      description: "Paints and Coatings",
      currentBudget: 15000,
      adjustmentAmount: 0,
      newBudget: 15000,
      costCodeType: "Painting",
      phase: "Finishes",
      category: "Painting",
    },

    // Tile & Stone
    {
      id: "40",
      costCode: "09-300",
      description: "Tiling",
      currentBudget: 18000,
      adjustmentAmount: 600,
      newBudget: 18600,
      costCodeType: "Tile",
      phase: "Finishes",
      category: "Tile & Stone",
    },

    // Specialties
    {
      id: "41",
      costCode: "10-100",
      description: "Visual Display Boards",
      currentBudget: 3000,
      adjustmentAmount: 0,
      newBudget: 3000,
      costCodeType: "Specialties",
      phase: "Finishes",
      category: "Specialties",
    },

    // Equipment
    {
      id: "42",
      costCode: "11-100",
      description: "Vehicle and Pedestrian Equipment",
      currentBudget: 5000,
      adjustmentAmount: 0,
      newBudget: 5000,
      costCodeType: "Equipment",
      phase: "Equipment",
      category: "Equipment",
    },

    // Cabinets and Casework
    {
      id: "43",
      costCode: "12-300",
      description: "Manufactured Casework",
      currentBudget: 35000,
      adjustmentAmount: 1500,
      newBudget: 36500,
      costCodeType: "Casework",
      phase: "Finishes",
      category: "Cabinets and Casework",
    },

    // Countertops
    {
      id: "44",
      costCode: "12-360",
      description: "Countertops",
      currentBudget: 12000,
      adjustmentAmount: 300,
      newBudget: 12300,
      costCodeType: "Countertops",
      phase: "Finishes",
      category: "Countertops",
    },

    // Furniture and Furnishings
    {
      id: "45",
      costCode: "12-500",
      description: "Window Treatment",
      currentBudget: 8000,
      adjustmentAmount: 0,
      newBudget: 8000,
      costCodeType: "Furnishings",
      phase: "Final",
      category: "Furniture and Furnishings",
    },

    // Conveying Systems
    {
      id: "46",
      costCode: "14-200",
      description: "Elevators",
      currentBudget: 45000,
      adjustmentAmount: 0,
      newBudget: 45000,
      costCodeType: "Conveying",
      phase: "Equipment",
      category: "Conveying Systems",
    },

    // Plumbing
    {
      id: "47",
      costCode: "15-100",
      description: "Plumbing - Basic Materials",
      currentBudget: 28000,
      adjustmentAmount: 800,
      newBudget: 28800,
      costCodeType: "Plumbing",
      phase: "MEP",
      category: "Plumbing",
    },
    {
      id: "48",
      costCode: "15-200",
      description: "Plumbing - Domestic Water",
      currentBudget: 15000,
      adjustmentAmount: 0,
      newBudget: 15000,
      costCodeType: "Plumbing",
      phase: "MEP",
      category: "Plumbing",
    },

    // Mechanical
    {
      id: "49",
      costCode: "15-400",
      description: "HVAC - Air Distribution",
      currentBudget: 32000,
      adjustmentAmount: -600,
      newBudget: 31400,
      costCodeType: "HVAC",
      phase: "MEP",
      category: "Mechanical",
    },
    {
      id: "50",
      costCode: "15-500",
      description: "HVAC - Controls",
      currentBudget: 18000,
      adjustmentAmount: 400,
      newBudget: 18400,
      costCodeType: "HVAC",
      phase: "MEP",
      category: "Mechanical",
    },

    // Electrical
    {
      id: "51",
      costCode: "16-100",
      description: "Electrical - Basic Materials",
      currentBudget: 25000,
      adjustmentAmount: 0,
      newBudget: 25000,
      costCodeType: "Electrical",
      phase: "MEP",
      category: "Electrical",
    },
    {
      id: "52",
      costCode: "16-400",
      description: "Electrical - Low Voltage",
      currentBudget: 15000,
      adjustmentAmount: 300,
      newBudget: 15300,
      costCodeType: "Electrical",
      phase: "MEP",
      category: "Electrical",
    },

    // General Requirements
    {
      id: "53",
      costCode: "01-500",
      description: "Temporary Facilities",
      currentBudget: 12000,
      adjustmentAmount: 0,
      newBudget: 12000,
      costCodeType: "General",
      phase: "General",
      category: "General Requirements",
    },
    {
      id: "54",
      costCode: "01-600",
      description: "Product Requirements",
      currentBudget: 8000,
      adjustmentAmount: 200,
      newBudget: 8200,
      costCodeType: "General",
      phase: "General",
      category: "General Requirements",
    },

    // Markup
    {
      id: "55",
      costCode: "99-100",
      description: "Contractor Fee",
      currentBudget: 45000,
      adjustmentAmount: -1000,
      newBudget: 44000,
      costCodeType: "Markup",
      phase: "Final",
      category: "Markup",
    },
    {
      id: "56",
      costCode: "99-200",
      description: "General Conditions",
      currentBudget: 25000,
      adjustmentAmount: 0,
      newBudget: 25000,
      costCodeType: "Markup",
      phase: "General",
      category: "Markup",
    },

    // ALLOWANCES
    {
      id: "57",
      costCode: "AL-100",
      description: "Flooring Allowance",
      currentBudget: 15000,
      adjustmentAmount: 500,
      newBudget: 15500,
      costCodeType: "Allowance",
      phase: "Finishes",
      category: "ALLOWANCES",
    },
    {
      id: "58",
      costCode: "AL-200",
      description: "Fixture Allowance",
      currentBudget: 20000,
      adjustmentAmount: 0,
      newBudget: 20000,
      costCodeType: "Allowance",
      phase: "Finishes",
      category: "ALLOWANCES",
    },

    // Design
    {
      id: "59",
      costCode: "DE-100",
      description: "Design Development",
      currentBudget: 12000,
      adjustmentAmount: 0,
      newBudget: 12000,
      costCodeType: "Design",
      phase: "Design",
      category: "Design",
    },
    {
      id: "60",
      costCode: "DE-200",
      description: "Construction Administration",
      currentBudget: 8000,
      adjustmentAmount: 300,
      newBudget: 8300,
      costCodeType: "Design",
      phase: "Construction",
      category: "Design",
    },
  ],
  amountToDistribute: 0.0,
}

export const CostCodeCategories = [
  "Soft Costs",
  "Special Construction",
  "Demolition",
  "Sitework & Utilities",
  "Landscaping",
  "Concrete",
  "Masonry",
  "Metals",
  "Rough Carpentry",
  "Architectural Millwork",
  "Insulation",
  "Roofing",
  "Siding",
  "Doors",
  "Windows & Glazing",
  "Drywall",
  "Painting",
  "Tile & Stone",
  "Specialties",
  "Equipment",
  "Cabinets and Casework",
  "Countertops",
  "Furniture and Furnishings",
  "Conveying Systems",
  "Plumbing",
  "Mechanical",
  "Electrical",
  "General Requirements",
  "Markup",
  "ALLOWANCES",
  "Design",
]
