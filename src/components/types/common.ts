export interface HistoryEntry {
  category: string;
  amount: string;
  createdAt: string;
  type: "income" | "expense";
}

export interface IncomeExpense {
  id?: number;
  category: string;
  amount: string;
  createdAt?: string;
  notes?: string;
  date?: string;
}

export interface Income {
  account: string;
  category: string;
  amount: string;
  notes?: string;
  id ? : number
}


export interface GraphData {
  id: number;
  account: string;
  category: string;
  notes: string;
  amount: string;
  date: string;
  userId?: number;
  type: "income" | "expense";
}
