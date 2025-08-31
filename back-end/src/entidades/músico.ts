import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuário from "./usuário";
import Inscrição from "./inscrição";

export enum Disponibilidade { FINS_DE_SEMANA = "Fins_De_Semana", NOITES = "Noites", INTEGRAL = "Integral" }

@Entity()
export default class Músico extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() instrumento_principal: string;
  @Column() anos_experiencia: number;
  @Column({ type: "enum", enum: Disponibilidade }) disponibilidade: Disponibilidade;
  @OneToMany(() => Inscrição, (inscrição) => inscrição.músico) inscrições: Inscrição[];
  @OneToOne(() => Usuário, (usuário) => usuário.músico, { onDelete: "CASCADE" })
  @JoinColumn()
  usuário: Usuário;
}