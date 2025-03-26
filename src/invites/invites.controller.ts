import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SendInviteDto } from './sendInviteDTO';
import { InvitesService } from './invites.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthController } from 'src/auth/auth.controller';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('invites')
export class InvitesController {
  constructor(private inviteServices: InvitesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)  
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

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.inviteServices.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async acceptInvite(@Param('id') id: number, @Request() req) {
    const userId = req.user.sub;
    return await this.inviteServices.acceptInvite(userId, id);
  }
}
