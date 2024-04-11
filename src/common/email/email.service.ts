import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirm(name: string, email: string, token: string) {
    const url = `http://localhost:3000/auth/email-verification?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      html: `<p>Dear ${name},</p><p>Welcome to Nice App! Please confirm your email by clicking the link below:</p><a href="${url}">${url}</a>`,
    });
  }
}
