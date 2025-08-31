import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import LíderBanda from "../entidades/líder_banda";
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosLíderBanda {
    constructor() { }
    static async cadastrarLíderBanda(request, response) {
        try {
            const { usuário_info, perfil_banda, genero_musical, cidade, vagas } = request.body;
            const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
            const entityManager = getManager();
            await entityManager.transaction(async (transactionManager) => {
                await transactionManager.save(usuário);
                const líder_banda = LíderBanda.create({ usuário, perfil_banda, genero_musical, cidade, vagas});
                await transactionManager.save(líder_banda);
                await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
                return response.json({ status: Status.ATIVO, token });
            });
        } catch (error) {
            return response.status(500).json({ erro: error });
        }
    };
    static async buscarLíderBanda(request, response) {
        try {
            const cpf_encriptado = md5(request.params.cpf);
            const líder_banda = await LíderBanda.findOne({
                where: { usuário: cpf_encriptado },
                relations: ["usuário"]
            });
            if (!líder_banda) return response.status(404).json({ erro: "LíderBanda não encontrado." });
            return response.json({
                nome: líder_banda.usuário.nome,
                email: líder_banda.usuário.email,
                perfil_banda: líder_banda.perfil_banda,
                genero_musical: líder_banda.genero_musical,
                cidade: líder_banda.cidade,
                vagas: líder_banda.vagas
            });
        } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarLíderBanda" }); }
    };
};