import { Signup } from "../application/Signup";
import { AccountDAOMemory } from "../resources/AccountDAO";
import { MailerGatewayMemory } from "../resources/MailerGateway";

let input: any = {};
let step = "";
process.stdin.on("data", async function (chunk) {
  const command = chunk.toString().replace(/\n/g, "").replace(/\r/g, "");
  if (command.startsWith("signup-passenger")) {
    process.stdout.write("passenger-name: ");
    step = "name";
    return;
  }

  if (step === "name") {
    input[step] = command;
    console.log(input);
    process.stdout.write("passenger-email: ");
    step = "email";
    return;
  }

  if (step === "email") {
    input[step] = command;
    console.log(input);
    process.stdout.write("passenger-cpf: ");
    step = "cpf";
    return;
  }

  if (step === "cpf") {
    input[step] = command;
    console.log(input);
    const accountDAO = new AccountDAOMemory();
    const mailGateway = new MailerGatewayMemory();
    const signup = new Signup(accountDAO, mailGateway);
    const output = await signup.execute(input);
    console.log(output);
  }
});
