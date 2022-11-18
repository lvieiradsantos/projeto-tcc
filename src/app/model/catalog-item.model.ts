export interface CatalogItemModel {
    id: string,
    name: string,
    model: string,
    brand: string,
    watts: number,
    db?: number,
    file?: File,
    rate: string,
    active: boolean,
    photo?: string;
}