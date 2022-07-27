import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async login(email: string, password: string): Promise<User | undefined> {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  // validate user
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
