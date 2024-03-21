import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParticipantSubscribeDto } from './dto/participant-subscribe.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signUp')
  async signUp(
    @Body() participantSubscribeDto: ParticipantSubscribeDto
  ) {
    return this.authService.signUp(participantSubscribeDto);
  }

  @Post('/user/login')
  async loginUser(@Body() credentials: LoginCredentialsDto) {
    return this.authService.loginParticipant(credentials);
  }

  @Post('/admin/login')
  async loginAdmin(@Body() credentials: LoginCredentialsDto) {
    return this.authService.loginAdmin(credentials);
  }

}
