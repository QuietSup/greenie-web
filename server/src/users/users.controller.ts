import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Retrieves the current user information.
   *
   */
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAccessAuthGuard)
  @Get('me')
  async currentUser(@User() reqUser) {
    if (reqUser.id) {
      const user = await this.usersService.findOne(reqUser.id);
      if (!user) throw new NotFoundException('user not found');
      return user;
    }
    throw new NotFoundException('user not found');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
