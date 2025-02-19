import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
