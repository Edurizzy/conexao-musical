import { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuário from "../../contextos/contexto-usuário";
import música from "../../imagens/imagem.jpg";
import { estilizarCard, estilizarCardHeaderCentralizado, estilizarPáginaÚnica }
    from "../../utilitários/estilos";
export default function PáginaInicial() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    function HeaderCentralizado() {
        return (<div className={estilizarCardHeaderCentralizado()}>
            Conexão Musical</div>)
    };
    return (
        <div className={estilizarPáginaÚnica()}>
            <Card header={HeaderCentralizado} className={estilizarCard(usuárioLogado.cor_tema)}>
                <Image src={música} alt="músicona" width={1100} />
            </Card>
        </div>
    );
};