import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from './jwt.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registra un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario registrado con exito en BD y nos devuelve el usuario' })
    register(@Body() data: CreateUserDTO) {
        return this.authService.register(data);
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicia la sesion de un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario logueado con exito y devuelve el JWT Token' })
    @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Request() req) {
        const token = req.headers.authorization?.split(' ')[1]
        return this.authService.logout(token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Devuelve la informacion del usuario' })
    @ApiResponse({ status: 200, description: 'Informacion del usuario' })
    getProfile(@Request() req) {
        return req.user;
    }
}
