import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import LíderBanda from "./líder_banda";
import Inscrição from "./inscrição";

export enum NivelHabilidade { INICIANTE = "Iniciante", INTERMEDIARIO = "Intermediário", AVANCADO = "Avançado" }

@Entity()
export default class Vaga extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() titulo: string;
  @Column() instrumento_requerido: string;
  @Column() descricao: string;
  @Column() remunerada: boolean;
  @Column({ type: "enum", enum: NivelHabilidade }) nivel_habilidade: NivelHabilidade;
  @ManyToOne(() => LíderBanda, (líder_banda) => líder_banda.vagas, { onDelete: "CASCADE" })
  líder_banda: LíderBanda;
  @OneToMany(() => Inscrição, (inscrição) => inscrição.vaga) inscrições: Inscrição[];
}