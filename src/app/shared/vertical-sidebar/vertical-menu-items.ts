import { RouteInfo } from "./vertical-sidebar.metadata";

export const ROUTES: RouteInfo[] = [
    {
        path: "/inicio",
        title: "Inicio",
        icon: "fas fa-home",
        class: "",
        extralink: false,
        submenu: [],
    },
    {
        path: "personal",
        title: "Personal",
        icon: "fas fa-users",
        class: "has-arrow",
        extralink: false,
        submenu: [
            {
                path: "pages/personal/laboral",
                title: "Laboral",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "pages/personal/hojaVida",
                title: "H.V.",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "personal/busquedaavanzada",
                title: "Busqueda A.",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
        ],
    },
    {
        path: "nomina",
        title: "Nómina",
        icon: "mdi mdi-credit-card-multiple",
        class: "has-arrow",
        extralink: false,
        submenu: [
            {
                path: "nomina/novedades",
                title: "Novedades",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "nomina/parametros",
                title: "Parámetros",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "nomina/reportes",
                title: "Reportes",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
        ],
    },
    {
        path: "integracion",
        title: "Integración",
        icon: "mdi mdi-animation",
        class: "has-arrow",
        extralink: false,
        submenu: [
            {
                path: "integracion/pila",
                title: "Pila",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "integracion/ned",
                title: "NED",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "integracion/tesoreria",
                title: "Tesorería",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            },
            {
                path: "integracion/contabilidad",
                title: "Contabilidad",
                icon: "",
                class: "",
                extralink: false,
                submenu: [],
            }
        ],
    },
    {
        path: "/organizacion",
        title: "Organización",
        icon: "mdi mdi-table",
        class: "",
        extralink: false,
        submenu: [],
    },    
    {
        path: "/acercade",
        title: "Acerca de",
        icon: "mdi mdi-comment",
        class: "",
        extralink: false,
        submenu: [],
    },    
    
];