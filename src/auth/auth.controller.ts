import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() input: User): Promise<User> {
    const user = await this.authService.login(input.email, input.password);
    if (user) {
      return user;
    }
    throw new Error('Invalid credentials');
  }
}
