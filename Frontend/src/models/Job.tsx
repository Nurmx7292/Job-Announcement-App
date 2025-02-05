export interface IJob {
    _id: string; 
    title: string;
    description: string;
    location: string;
    salary: number;
    category: "Engineering" | "Design" | "Marketing" | "Sales" | "Customer Support" | "Other";
    requirements?: string; 
    employerId?: string; 
    createdAt?: string; 
    updatedAt?: string;
    imageUrl?: string;
  }