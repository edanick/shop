
export type RegisterUser = {
    name: {
        first: string,
        last: string
    }
    phone: string,
    email: string,
    password: string,
    address: {
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number
    }
}