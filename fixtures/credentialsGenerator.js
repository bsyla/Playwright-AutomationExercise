import { faker, fakerEN_US } from "@faker-js/faker";

export default class CredentialsGenerator {
  constructor() {}

  user() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullAddress: fakerEN_US.location.streetAddress(),
      state: fakerEN_US.location.state(),
      city: fakerEN_US.location.city(),
      zip: fakerEN_US.location.zipCode(),
      number: fakerEN_US.phone.number(),
      sentence: faker.lorem.sentence(),
      paragraph: faker.lorem.paragraph(),
    };
  }

  finance() {
    return {
      creditCardNumber: faker.finance.creditCardNumber(),
      CVC: faker.finance.creditCardCVV(),
    };
  }

  date() {
    return {
      month: faker.date.month(),
    };
  }
}
