export class User {
    firstname: string;
    lastname: string;
	address: Address;
	accessToken: string;
	permissions: string[];
}

export class Address {
    street: string;
    zip: string;
    city: string;
}