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
import { AddCommentDTO } from './dto/addCommentDTO';
import { AtGuard } from 'src/auth/common/guards/at.guard';
// import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AtGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Body() createCommentDto: AddCommentDTO, @Request() req) {
    try {
      const userId = req.user.sub;
      return this.commentsService.addComment(userId, createCommentDto);
    } catch (error) {
      handleError(error, 'Error adding comment');
    }
  }

  @Get(':todoId')
  async getComments(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Request() req,
  ) {
    try {
      const userId = req.user.sub;
      return this.commentsService.getComments(userId, todoId);
    } catch (error) {
      handleError(error, 'Error finding comments');
    }
  }

  // @Delete()
  // async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
  //   return this.commentsService.deleteComment(deleteCommentDto);
  // }
}
