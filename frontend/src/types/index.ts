export type TableHeader<T> = {
    id: string;
    label: string;
    render?: (row: T) => React.ReactNode;
}
export type Employee = {
    id: number;
    fullName: string;
    email: string;
    department: string;
    jobTitle: string;
    phoneNumber: string;
    status: "Active" | "Inactive";
    createdAt: string;
    updatedAt: string;
    profileImage?: string;
}
