import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UpdateData {
  @PrimaryColumn('varchar', { length: 255 })
  link: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('mediumtext')
  content: string;

  @Column('varchar', { length: 100 })
  press: string;

  @Column('varchar', { length: 50 })
  section: string;
}
