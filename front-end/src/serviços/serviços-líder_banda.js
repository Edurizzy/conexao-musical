import servidor from "./servidor";
export function serviçoCadastrarLíderBanda(líder_banda) { return servidor.post("/líderes_banda", líder_banda); };
export function serviçoBuscarLíderBanda(cpf) { return servidor.get(`/líderes_banda/${cpf}`); };