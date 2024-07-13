import crypto from "crypto";
import { GetAccount } from "../src/application/GetAccount";
import { Signup } from "../src/application/Signup";
import { AccountDAOMemory } from "../src/resources/AccountDAO";
import { MailerGatewayMemory } from "../src/resources/MailerGateway";

let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
  const accountDAO = new AccountDAOMemory();
  const mailerGateway = new MailerGatewayMemory();
  signup = new Signup(accountDAO, mailerGateway);
  getAccount = new GetAccount(accountDAO);
});

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: true,
  };

  const output = await signup.execute(input);
  expect(output.accountId).toBeDefined();

  const outputGetAccount = await getAccount.execute(output);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Deve criar uma conta para o driver", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "AAA0000",
    isPassenger: false,
    isDriver: true,
  };
  const output = await signup.execute(input);
  expect(output.accountId).toBeDefined();

  const outputGetAccount = await getAccount.execute(output);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.carPlate).toBe(input.carPlate);
});

test("Não deve criar se o passageiro tiver o nome inválido", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "AAA0000",
    isPassenger: true,
  };

  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid name")
  );
});

test("Não deve criar se o passageiro tiver o email inválido", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    cpf: "87748248800",
    carPlate: "AAA0000",
    isPassenger: true,
  };
  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid email")
  );
});

test("Não deve criar se o passageiro tiver o cpf inválido", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "8774824880022222",
    carPlate: "AAA0000",
    isPassenger: true,
  };
  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid CPF")
  );
});

test("Não deve criar se o passageiro tiver placa do carro inválido", async function () {
  const input = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "aa222222ss",
    isDriver: true,
  };
  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid car plate")
  );
});
