export interface CatalogItemModel {
    id: string,
    name: string,
    model: string,
    brand: string,
    watts: number,
    db?: number,
    photo?: File,
    rate: string,
    active: boolean
}