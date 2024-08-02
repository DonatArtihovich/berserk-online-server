import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string | undefined, host: ExecutionContext) => {
    const request = host.switchToHttp().getRequest<Request>();

    if (data) return request.user[data];

    return request.user;
  },
);
