// DRIVEN/RESOURCE PORT
export interface MailerGateway {
  send(recipient: string, subject: string, content: string): Promise<void>;
}

// DRIVEN/RESOURCE ADAPTER
export class MailerGatewayMemory implements MailerGateway {
  async send(
    recipient: string,
    subject: string,
    content: string
  ): Promise<void> {
    console.log(recipient, subject, content);
  }
}
