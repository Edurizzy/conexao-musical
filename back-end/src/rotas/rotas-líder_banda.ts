import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilLíderBanda from "../middlewares/verificar-perfil-líder_banda";
import ServiçosLíderBanda from "../serviços/serviços-líder_banda";
const RotasLíderBanda = Router();
export default RotasLíderBanda;
RotasLíderBanda.post("/", ServiçosLíderBanda.cadastrarLíderBanda);
RotasLíderBanda.get("/:cpf", verificarToken, verificarPerfilLíderBanda,
    ServiçosLíderBanda.buscarLíderBanda);