import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoCadastrarLíderBanda, serviçoBuscarLíderBanda } from "../../serviços/serviços-líder_banda";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios } from "../../utilitários/validações";
import {
    estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider,
    estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputNumber, estilizarInputText, estilizarLabel
} from "../../utilitários/estilos";

export default function CadastrarLíderBanda() {
    const referênciaToast = useRef(null);
    const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
    const navegar = useNavigate();

    const [dados, setDados] = useState({
        perfil_banda: "",
        genero_musical: "",
        cidade: "",
        vagas: ""
    });
    const [erros, setErros] = useState({});

    const opçõesPerfilBanda = [
        { label: "Autoral", value: "Autoral" },
        { label: "Cover", value: "Cover" },
        { label: "Tributo", value: "Tributo" }
    ];

    function alterarEstado(event) {
        const chave = event.target.name;
        const valor = event.target.value;
        setDados({ ...dados, [chave]: valor });
    };

    function validarCampos() {
        const errosCamposObrigatórios = validarCamposObrigatórios(dados);
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    };

    function títuloFormulário() {
        return usuárioLogado?.cadastrado ? "Consultar Dados de Líder" : "Completar Cadastro de Líder de Banda";
    };

    async function cadastrarLíderBanda() {
        if (validarCampos()) {
            try {
                const response = await serviçoCadastrarLíderBanda({
                    ...dados,
                    usuário_info: usuárioLogado,
                });

                if (response.data) {
                    setUsuárioLogado(usuário => ({
                        ...usuário,
                        status: response.data.status,
                        token: response.data.token,
                        cadastrado: true
                    }));
                }
                mostrarToast(referênciaToast, "Dados de líder cadastrados com sucesso!", "sucesso");
            } catch (error) {
                const mensagemErro = error.response?.data?.erro || "Ocorreu um erro. Tente novamente.";
                mostrarToast(referênciaToast, mensagemErro, "erro");
            }
        }
    };

    function labelBotãoSalvar() {
        return usuárioLogado?.cadastrado ? "Consultar" : "Salvar e Finalizar";
    };

    function açãoBotãoSalvar() {
        if (!usuárioLogado?.cadastrado) {
            cadastrarLíderBanda();
        }
    };

    function redirecionar() {
        if (usuárioLogado?.cadastrado) {
            navegar("/pagina-inicial");
        }
    };

    useEffect(() => {
        let desmontado = false;
        async function buscarDadosLíderBanda() {
            try {
                const response = await serviçoBuscarLíderBanda(usuárioLogado.cpf);
                if (!desmontado && response.data) {
                    setDados({
                        perfil_banda: response.data.perfil_banda || "",
                        genero_musical: response.data.genero_musical || "",
                        cidade: response.data.cidade || "",
                        vagas: response.data.vagas || ""
                    });
                }
            } catch (error) {
                const erro = error.response?.data?.erro;
                if (erro) mostrarToast(referênciaToast, erro, "erro");
            }
        }

        if (usuárioLogado?.cadastrado) {
            buscarDadosLíderBanda();
        }

        return () => { desmontado = true; };
    }, [usuárioLogado?.cadastrado, usuárioLogado?.cpf]);

    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center" />
            <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>

                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Perfil da Banda*:</label>
                    <Dropdown name="perfil_banda"
                        className={estilizarDropdown(erros.perfil_banda, usuárioLogado.cor_tema)}
                        value={dados.perfil_banda} options={opçõesPerfilBanda} onChange={alterarEstado}
                        placeholder="-- Selecione --" />
                    <MostrarMensagemErro mensagem={erros.perfil_banda} />
                </div>

                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Gênero Musical Principal*:</label>
                    <InputText name="genero_musical"
                        className={estilizarInputText(erros.genero_musical, usuárioLogado.cor_tema)}
                        value={dados.genero_musical} onChange={alterarEstado} />
                    <MostrarMensagemErro mensagem={erros.genero_musical} />
                </div>

                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Cidade*:</label>
                    <InputText name="cidade"
                        className={estilizarInputText(erros.cidade, usuárioLogado.cor_tema)}
                        value={dados.cidade} onChange={alterarEstado} />
                    <MostrarMensagemErro mensagem={erros.cidade} />
                </div>

                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Vagas Abertas*:</label>
                    <InputNumber name="vagas"
                        value={dados.vagas} onValueChange={(e) => setDados({ ...dados, vagas: e.value })}
                        mode="decimal" inputClassName={estilizarInputNumber(erros.vagas, usuárioLogado.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.vagas} />
                </div>

                <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
                <div className={estilizarInlineFlex()}>
                    <Button
                        className={estilizarBotãoRetornar()}
                        label="Retornar"
                        onClick={() => navegar("/pagina-inicial")} />

                    <Button
                        className={estilizarBotão()}
                        label={labelBotãoSalvar()}
                        onClick={açãoBotãoSalvar} />
                </div>
            </Card>
        </div>
    );
};