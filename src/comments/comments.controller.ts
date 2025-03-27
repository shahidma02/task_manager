import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDTO } from './addCommentDTO';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Body() createCommentDto: AddCommentDTO, @Request() req) {
    const userId = req.user.sub;
    return this.commentsService.addComment(userId, createCommentDto);
  }

  @Get(':todoId')
  async getComments(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.commentsService.getComments(userId, todoId);
  }

  // @Delete()
  // async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
  //   return this.commentsService.deleteComment(deleteCommentDto);
  // }
}
