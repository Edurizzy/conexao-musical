export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "líder_banda": return "LíderBanda";
        case "músico": return "Músico";
        default: return;
    }
};