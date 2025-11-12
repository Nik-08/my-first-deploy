import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Завершить проект',
    description: 'Название задачи',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Нужно завершить разработку backend',
    description: 'Описание задачи (опционально)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'PENDING',
    enum: TodoStatus,
    description: 'Статус задачи',
    required: false,
    default: 'PENDING',
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
    description: 'Изображение в формате base64 (опционально)',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'Дата и время окончания задачи (опционально)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDatetime?: string;
}

export class UpdateTodoDto {
  @ApiProperty({
    example: 'Обновленное название задачи',
    description: 'Название задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Обновленное описание',
    description: 'Описание задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'IN_PROGRESS',
    enum: TodoStatus,
    description: 'Статус задачи',
    required: false,
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
    description: 'Изображение в формате base64',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'Дата и время окончания задачи',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDatetime?: string;
}

export class UpdateTodoStatusDto {
  @ApiProperty({
    example: 'COMPLETED',
    enum: TodoStatus,
    description: 'Новый статус задачи',
  })
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
