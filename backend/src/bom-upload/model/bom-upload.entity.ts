/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bomupload')
export class BomUploadEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'int', nullable: true })
  InsID: number;

  @Column({ type: 'varchar', nullable: true })
  IRN: string;

  @Column({ type: 'varchar', nullable: true })
  OperationSBU: string;

  @Column({ type: 'varchar', nullable: true })
  Buyer: string;

  @Column({ type: 'varchar', nullable: true })
  BuyerDiv: string;

  @Column({ type: 'date', nullable: true })
  InspectedDate: Date;

  @Column({ type: 'varchar', nullable: true })
  Type: string;

  @Column({ type: 'varchar', nullable: true })
  DeptName: string;

  @Column({ type: 'varchar', nullable: true })
  InspectionStage: string;

  @Column({ type: 'varchar', nullable: true })
  Style: string;

  @Column({ type: 'varchar', nullable: true })
  PONo: string;

  @Column({ type: 'varchar', nullable: true })
  Color: string;

  @Column({ type: 'varchar', nullable: true })
  AuditorRemark: string;
}
