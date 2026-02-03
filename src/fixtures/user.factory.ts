import { faker } from "@faker-js/faker";
import { PaymentDetails } from "../types/payment";
import { User } from "../types/user";

export class UserFactory {
  createUser(overrides: Partial<User> = {}): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const unique = faker.string.alphanumeric({ length: 6 }).toLowerCase();
    const email = `${firstName}.${lastName}.${unique}@example.com`.toLowerCase();

    return {
      title: "Mr",
      firstName,
      lastName,
      email,
      password: `Pw!${faker.string.alphanumeric({ length: 10 })}`,
      birthDay: "10",
      birthMonth: "May",
      birthYear: "1990",
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: "Canada",
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode("#####"),
      mobile: faker.phone.number("##########"),
      ...overrides,
    };
  }

  createPayment(
    user?: Pick<User, "firstName" | "lastName">,
    overrides: Partial<PaymentDetails> = {}
  ): PaymentDetails {
    const cardholder = user
      ? `${user.firstName} ${user.lastName}`
      : faker.person.fullName();

    return {
      nameOnCard: cardholder,
      cardNumber: faker.finance.creditCardNumber("################"),
      cvc: faker.finance.creditCardCVV(),
      expiryMonth: "12",
      expiryYear: "2030",
      ...overrides,
    };
  }
}
