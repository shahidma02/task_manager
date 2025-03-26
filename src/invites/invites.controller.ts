import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { SendInviteDto } from './sendInviteDTO';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private inviteServices: InvitesService) {}

  @Post('/send-invite')
  async sendInvite(@Body() inviteDto: SendInviteDto) {
    console.log('hello');
    return await this.inviteServices.sendInvite(inviteDto);
  }

  @Get()
  async viewInvites(@Request() req) {
    const userId = req.user.sub;
    return this.inviteServices.viewInvites(userId);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.inviteServices.remove(id);
  }

  @Patch('/:id')
  async acceptInvite(@Param('id') id: number, @Request() req) {
    const userId = req.user.sub;
    return await this.inviteServices.acceptInvite(userId, id);
  }
}
