import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('/patients/list')
  async getIndex() {}
}
