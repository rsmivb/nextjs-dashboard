
export type Project = {
    id: string;
    name: string;
    description: string;
};

export type Category = {
    id: string;
    name: string;
};

export type Supplier = {
    id: string;
    name: string;
};

export type Unit = {
    id: string;
    name: string;
};

export type Item = {
    id: string;
    description: string;
    quantity: string;
    unitId: string;
    unitValue: number;
    discount: number;
    date: string;
    month: number;
    year: number;
    supplierId: string;
    categoryIds: string[];
    projectId: string;
};