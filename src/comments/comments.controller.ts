import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDTO } from './addCommentDTO';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Body() createCommentDto: AddCommentDTO) {
    return this.commentsService.addComment(createCommentDto);
  }

  @Get(':todoId')
  async getComments(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.commentsService.getComments(todoId);
  }

  // @Delete()
  // async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
  //   return this.commentsService.deleteComment(deleteCommentDto);
  // }
}
