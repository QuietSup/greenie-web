import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConfig } from 'src/config-namespaces/auth/auth.config';
import { UsersService } from 'src/users/users.service';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,

    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: authConf.jwtRefreshSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.userId);
    if (user) {
      const { password: _, ...reqUser } = user;
      return reqUser;
    }
    throw new NotFoundException('user not found');
  }
}
