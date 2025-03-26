import { Injectable, NotFoundException } from '@nestjs/common';
import { SendInviteDto } from './sendInviteDTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvitesService {
  constructor(private prisma: PrismaService) {}
  async sendInvite(payload: SendInviteDto) {
    console.log(payload);
    const user = await this.prisma.user.findUnique({
      where: { id: Number(payload.sentTo) },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${payload.sentTo} not found`);
    }
    return await this.prisma.invitation.create({
      data: payload,
    });
  }

  //   view all invites

  async viewInvites(id: number) {
    const invites = await this.prisma.invitation.findMany({
      where: { sentTo: id },
    });

    if (!invites || invites.length === 0) {
      return { message: 'No invites were found for the respective ID.' };
    }

    return invites;
  }

  async remove(id: number) {
    const invite = await this.prisma.invitation.findUnique({ where: { id } });
    if (!invite) {
      throw new NotFoundException(`Invitation with ID ${id} not found`);
    }
    return this.prisma.invitation.delete({ where: { id } });
  }

  async acceptInvite(userId: number, inviteId: number) {
    const invite = await this.prisma.invitation.findUnique({
      where: { sentTo: userId, id: inviteId },
    });

    if (!invite) {
      throw new NotFoundException(`Invite not found`);
    }

    const result = await this.prisma.invitation.update({
      where: { id: inviteId },
      data: { status: 'ACCEPTED' },
    });

    const addMember = await this.prisma.user_Company.create({
      data: {
        userId: userId,
        companyId: invite.companyId,
        role: 'MEMBER',
      },
    });
  }
}
