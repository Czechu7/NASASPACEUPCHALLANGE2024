export interface IResQuestion {
    id: number
    description: string
    forecast: string
    decisions: IDecision[]
  }
  
  export interface IDecision {
    id: number
    description: string
    budget: number
    safety: number
    infrastructure: number
    morale: number
    questionId: number
  }

  export interface IUserDecisions {
    description: string;
    forecast: string;
    decision1: string;
    decision2: string;
    decision3: string;
    decision4: string;
  }