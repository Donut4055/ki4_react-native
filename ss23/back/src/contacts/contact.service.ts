import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactEntity> {
    const entity = this.contactRepository.create({ ...dto, isBlocked: false });
    return await this.contactRepository.save(entity);
  }

  async findAll(): Promise<ContactEntity[]> {
    return await this.contactRepository.find({ order: { id: 'DESC' } });
  }

  async findBlocked(): Promise<ContactEntity[]> {
    return await this.contactRepository.find({
      where: { isBlocked: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactEntity> {
    const found = await this.contactRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Contact not found');
    }
    return found;
  }

  async update(id: number, dto: UpdateContactDto): Promise<ContactEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return await this.contactRepository.save(entity);
  }

  async toggleBlock(id: number): Promise<ContactEntity> {
    const entity = await this.findOne(id);
    entity.isBlocked = !entity.isBlocked;
    return await this.contactRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.contactRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactRepository.delete(id);
  }
}
