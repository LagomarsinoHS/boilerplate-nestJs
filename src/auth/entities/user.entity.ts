import { ApiProperty } from '@nestjs/swagger';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'text',
    select: false, // Hace que al usar este repositorio no te traiga esa info
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  fullName: string;

  @ApiProperty()
  @Column({
    type: 'bool',
    default: true,
  })
  isActive?: boolean;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: ValidRoles[];

  /**
   * Estos son metodos que ejecutaran esto siempre antes de insertar u actualizar,
   * yo agregue esto directamente en el dto pero esto tambien sirve
   */

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
