import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './contact.entity';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Create a new contact',
    schema: {
      example: {
        name: 'John Doe',
        phone: '+84901234567',
        tag: 'Friend',
      },
    },
  })
  async create(@Body() dto: CreateContactDto): Promise<ContactEntity> {
    return await this.contactService.create(dto);
  }

  @Get()
  async findAll(): Promise<ContactEntity[]> {
    return await this.contactService.findAll();
  }

  @Get('blocked')
  async findBlocked(): Promise<ContactEntity[]> {
    return await this.contactService.findBlocked();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactEntity> {
    return await this.contactService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Replace contact by id',
    schema: {
      example: {
        name: 'Jane Doe',
        phone: '+84123456789',
        tag: 'Colleague',
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactDto,
  ): Promise<ContactEntity> {
    return await this.contactService.update(id, dto);
  }

  @Patch(':id/toggle-block')
  async toggleBlock(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ContactEntity> {
    return await this.contactService.toggleBlock(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.contactService.remove(id);
  }
}
