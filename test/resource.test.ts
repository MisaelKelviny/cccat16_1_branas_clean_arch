import crypto from "crypto";
import { AccountDAODatabase } from "../src/resources/AccountDAO";

test("Deve salvar um registro na tabela account", async () => {
  const account = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "AAA1111",
    isPassenger: true,
  };

  const accountDAO = new AccountDAODatabase();
  await accountDAO.saveAccount(account);

  const savedAccount = await accountDAO.getAccountById(account.accountId);

  expect(savedAccount.account_id).toBe(account.accountId);
  expect(savedAccount.name).toBe(account.name);
  expect(savedAccount.email).toBe(account.email);
  expect(savedAccount.cpf).toBe(account.cpf);
});

test("Deve salvar um registro na tabela account e buscar por email", async () => {
  const account = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    carPlate: "AAA1111",
    isPassenger: true,
  };

  const accountDAO = new AccountDAODatabase();
  await accountDAO.saveAccount(account);

  const savedAccount = await accountDAO.getAccountByEmail(account.email);

  expect(savedAccount.account_id).toBe(account.accountId);
  expect(savedAccount.name).toBe(account.name);
  expect(savedAccount.email).toBe(account.email);
  expect(savedAccount.cpf).toBe(account.cpf);
});
