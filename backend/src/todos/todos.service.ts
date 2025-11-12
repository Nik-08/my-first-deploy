import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, creatorId: string): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      creatorId,
      createDatetime: new Date(),
      endDatetime: createTodoDto.endDatetime
        ? new Date(createTodoDto.endDatetime)
        : null,
    });
    return this.todosRepository.save(todo);
  }

  async findAll(creatorId: string): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { creatorId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, creatorId: string): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    if (todo.creatorId !== creatorId) {
      throw new ForbiddenException('You do not have access to this todo');
    }
    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    creatorId: string,
  ): Promise<Todo> {
    const todo = await this.findOne(id, creatorId);

    const { endDatetime, ...rest } = updateTodoDto;
    const updateData: Partial<Todo> = { ...rest };

    if (endDatetime) {
      updateData.endDatetime = new Date(endDatetime);
    }

    Object.assign(todo, updateData);
    return this.todosRepository.save(todo);
  }

  async updateStatus(
    id: string,
    status: TodoStatus,
    creatorId: string,
  ): Promise<Todo> {
    const todo = await this.findOne(id, creatorId);
    todo.status = status;
    return this.todosRepository.save(todo);
  }

  async remove(id: string, creatorId: string): Promise<void> {
    const todo = await this.findOne(id, creatorId);
    await this.todosRepository.remove(todo);
  }
}
