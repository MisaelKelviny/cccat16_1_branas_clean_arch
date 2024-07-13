import crypto from "crypto";
import { AccountDAO } from "../resources/AccountDAO";
import { MailerGateway } from "../resources/MailerGateway";
import { validate } from "./validateCpf";

export class Signup {
  constructor(
    readonly accountDAO: AccountDAO,
    readonly mailerGateway: MailerGateway
  ) {}

  async execute(input: any) {
    const account = input;
    account.accountId = crypto.randomUUID();
    const existingAccount = await this.accountDAO.getAccountByEmail(
      account.email
    );
    if (existingAccount) throw new Error("Account already exists");
    if (!account.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!account.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validate(account.cpf)) throw new Error("Invalid CPF");
    if (account.isDriver && !account.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    await this.accountDAO.saveAccount(account);
    await this.mailerGateway.send("test", "test", "test");
    return {
      accountId: account.accountId,
    };
  }
}
