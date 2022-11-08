export interface ProfileModel {
    id: string,
    name: string,
    email: string,
    phone?: string,
    type?: string,
    country?: string,
    ageGroup?: string,
    hearing: string,
    termsAccepted: boolean,
    favItems?: []
}