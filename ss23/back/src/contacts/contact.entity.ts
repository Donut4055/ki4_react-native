import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum ContactTag {
  Family = 'Gia đình',
  Friend = 'Bạn bè',
  Colleague = 'Đồng nghiệp',
  Other = 'Khác',
}

@Entity('contacts')
@Unique(['phone'])
export class ContactEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 32 })
  phone!: string;

  @Column({ type: 'varchar', length: 16 })
  tag!: ContactTag;

  @Column({ type: 'boolean', default: false })
  isBlocked!: boolean;
}
