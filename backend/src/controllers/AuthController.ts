import {
    JsonController,
    Post,
    Body,
    HttpCode,
    Get,
    Authorized,
    Req,
  } from "routing-controllers";
  import { Service } from "typedi";
  import { AuthService } from "../services/AuthService";
  
  @Service()
  @JsonController("/auth")
  export class AuthController {
    constructor(private service: AuthService) {}
  
    @Post("/register")
    @HttpCode(201)
    async register(
      @Body() body: { username: string; password: string; email: string }
    ): Promise<any> {
      return this.service.register(body.username, body.password, body.email);
    }
  
    @Post("/login")
    @HttpCode(200)
    async login(
      @Body() body: { username: string; password: string }
    ): Promise<any> {
      return this.service.login(body.username, body.password);
    }
  
    @Get("/me")
    @Authorized()
    @HttpCode(200)
    async getProfile(@Req() req: any): Promise<any> {
      return { user: req.user };
    }
  }
  