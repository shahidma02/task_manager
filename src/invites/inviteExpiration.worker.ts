// import { Processor, WorkerHost } from '@nestjs/bullmq';
// import { PrismaService } from 'src/prisma.service';
// import { Job } from 'bullmq';

// @Processor('manage')
// export class InviteExpirationWorker extends WorkerHost {
//   constructor(private prisma: PrismaService) {
//     super();
//   }

//   async process(job: Job) {
//     const { inviteId } = job.data;

//     console.log(`Processing expired invite: ${inviteId}`);

//     const invite = await this.prisma.invitation.findUnique({
//       where: { id: inviteId },
//     });

//     if (invite && invite.status !== 'ACCEPTED') {
//       await this.prisma.invitation.delete({ where: { id: inviteId } });
//       console.log(`Invite ID ${inviteId} expired and was deleted.`);
//     }
//   }
// }
