import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService){
        super();
    }

    handleRequest(error, user, info, context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]

        if (this.authService.isTokenBlacklistend(token)) {
            throw new UnauthorizedException('Token invalido - Inicie sesion nuevamente')
        }

        if (error || !user ) {
            throw new UnauthorizedException()
        }

        return user;
    }
}