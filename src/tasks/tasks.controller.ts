import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]
    {
     if(Object.keys(filterDto).length)
     {
         return this.tasksService.getTasksWithFilter(filterDto);
     }
     else 
     {
        return this.tasksService.getAllTasks();

     }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string)
    {
     return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto)
    {
     return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string)
    {
        this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status',TaskStatusValidationPipe) status: TaskStatus): Task
    {
        return this.tasksService.updateTaskStatus(id,status);
    }
}
