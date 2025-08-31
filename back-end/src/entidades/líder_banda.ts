import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuário from "./usuário";
import Vaga from "./vaga";

export enum PerfilBanda { AUTORAL = "Autoral", COVER = "Cover", TRIBUTO = "Tributo" }

@Entity()
export default class LíderBanda extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "enum", enum: PerfilBanda }) perfil_banda: PerfilBanda;
  @Column() genero_musical: string;
  @Column() cidade: string;
  @Column({ type: "int" }) vagas: number;
  @OneToOne(() => Usuário, (usuário) => usuário.líder_banda, { onDelete: "CASCADE" })
  @JoinColumn()
  usuário: Usuário;
}