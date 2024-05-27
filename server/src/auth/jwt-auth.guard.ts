import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('인증시도1');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('인증시도2');
    if (err || !user) {
      console.log(info);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
