import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto, UpdateTodoStatusDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('todos')
@Controller('todos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Создание новой задачи' })
  @ApiResponse({
    status: 201,
    description: 'Задача успешно создана',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех задач текущего пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список задач пользователя',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiParam({ name: 'id', description: 'UUID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Информация о задаче',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа к этой задаче' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.todosService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление задачи' })
  @ApiParam({ name: 'id', description: 'UUID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно обновлена',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа к этой задаче' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todosService.update(id, updateTodoDto, req.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Изменение статуса задачи' })
  @ApiParam({ name: 'id', description: 'UUID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Статус задачи успешно изменен',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа к этой задаче' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto,
    @Request() req,
  ) {
    return this.todosService.updateStatus(
      id,
      updateTodoStatusDto.status,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiParam({ name: 'id', description: 'UUID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно удалена',
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа к этой задаче' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  remove(@Param('id') id: string, @Request() req) {
    return this.todosService.remove(id, req.user.id);
  }
}

