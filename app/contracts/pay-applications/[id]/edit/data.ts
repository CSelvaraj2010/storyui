export interface PayApplicationData {
  applicationNo: string
  periodTo: string
  contractFor: string
  projectNo: string
  submittedBy: string
  submittedDate: string
  client: {
    name: string
    address: string
    city: string
    state: string
    zip: string
  }
  contractor: {
    name: string
    address: string
    city: string
    state: string
    zip: string
  }
  project: {
    name: string
    address: string
    city: string
    state: string
    zip: string
  }
  architect: {
    name: string
    address: string
    city: string
    state: string
    zip: string
  }
  financial: {
    originalContractSum: number
    netChangeByChangeOrders: number
    contractSumToDate: number
    totalCompletedToDate: number
    completedWork: number
    storedMaterial: number
    totalEarnedLessRetainage: number
    lessPreviousCertificates: number
    currentPaymentDue: number
    balanceToFinish: number
    totalChangesApproved: number
    totalApprovedThisPeriod: number
    total: number
  }
  thisPeriod: {
    grossBilled: number
    retention: number
    net: number
  }
  paymentReceived: {
    dateReceived: string
    amountReceived: number
  }
}

export const PayApplicationData: PayApplicationData = {
  applicationNo: "17",
  periodTo: "2023-11-30",
  contractFor: "0",
  projectNo: "0121-077",
  submittedBy: "Beau Chadwick",
  submittedDate: "2024-01-25",
  client: {
    name: "Helena Striker",
    address: "145 N Monroe St",
    city: "Denver",
    state: "CO",
    zip: "80206",
  },
  contractor: {
    name: "Story Renovations",
    address: "5601 S Broadway",
    city: "Littleton",
    state: "CO",
    zip: "80121",
  },
  project: {
    name: "Striker Remodel",
    address: "145 N Monroe St",
    city: "Denver",
    state: "CO",
    zip: "80206",
  },
  architect: {
    name: "Story Renovations LLC",
    address: "5601 S Broadway",
    city: "Littleton",
    state: "CO",
    zip: "80121",
  },
  financial: {
    originalContractSum: 321605.24,
    netChangeByChangeOrders: -4796.83,
    contractSumToDate: 316808.41,
    totalCompletedToDate: 314893.65,
    completedWork: 0.0,
    storedMaterial: 0.0,
    totalEarnedLessRetainage: 314893.65,
    lessPreviousCertificates: 313128.5,
    currentPaymentDue: 1765.15,
    balanceToFinish: 1914.76,
    totalChangesApproved: 34643.63,
    totalApprovedThisPeriod: -39440.46,
    total: -4796.83,
  },
  thisPeriod: {
    grossBilled: 1765.15,
    retention: 0.0,
    net: 1765.15,
  },
  paymentReceived: {
    dateReceived: "2024-02-06",
    amountReceived: 1765.15,
  },
}
