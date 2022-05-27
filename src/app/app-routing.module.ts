import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";

export const Approutes: Routes = [
    {
        path: "",
        component: FullComponent,
        children: [
            {
                path: "",
                redirectTo: "/login",
                pathMatch: "full",
            },
            {
                path: "inicio",
                loadChildren: () =>
                    import("./starter/starter.module").then(
                        (m) => m.StarterModule
                    ),
            },
            {
                path: "pages",
                loadChildren: () =>
                    import("./pages/pages.module").then(
                        (m) => m.PagesModule
                    ),
            }
        ],
    },
    {
        path: "",
        component: BlankComponent,
        children: [
            {
                path: "",
                loadChildren: () =>
                    import("./authentication/authentication.module").then(
                        (m) => m.AuthenticationModule
                    ),
            },
        ],
    },
    {
        path: "**",
        redirectTo: "/authentication/404",
    },
];
