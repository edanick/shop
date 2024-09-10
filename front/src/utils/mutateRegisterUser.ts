import { RegisterUser, RegisterUser2D } from "../@types";

export default function mutateData(data: RegisterUser2D) {
    return (({ first, last, state, country, city, street, houseNumber, zip,
        ...r }: any): RegisterUser => (
        {
            name: {
                first: first,
                last: last,
            },
            address: {
                state: state,
                country: country,
                city: city,
                street: street,
                houseNumber: houseNumber,
                zip: zip,
            }, ...r
        }
    ))(data);
}