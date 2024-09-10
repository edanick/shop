import { RegisterUser2D } from "../@types";

export const normalizeUpdatedData = (data: any) => {
    return {
        name: {
            first: data.first,
            last: data.last,
        },
        phone: data.phone,
        address: {
            state: data.state,
            country: data.country,
            city: data.city,
            street: data.street,
            houseNumber: data.houseNumber,
            zip: +data.zip!,
        },
    };
};
