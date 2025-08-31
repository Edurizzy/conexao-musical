import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Músico from "./músico";
import Vaga from "./vaga";

export enum StatusInscrição { PENDENTE = "Pendente", APROVADA = "Aprovada", RECUSADA = "Recusada" }

@Entity()
export default class Inscrição extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "date" }) data_inscrição: Date;
  @Column({ type: "enum", enum: StatusInscrição, default: StatusInscrição.PENDENTE }) status: StatusInscrição;
  @Column() mensagem: string;
  @Column({ default: false }) aprovada: boolean;
  @ManyToOne(() => Músico, (músico) => músico.inscrições, { onDelete: "CASCADE" })
  músico: Músico;
  @ManyToOne(() => Vaga, (vaga) => vaga.inscrições, { onDelete: "CASCADE" })
  vaga: Vaga;
}