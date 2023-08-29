import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'user', name: 'Gerenciar Usuários', icon: 'people', role: 'admin' },
    { state: 'militar', name: 'Gerenciar Militares', icon: 'assignment_ind', role: 'admin' },
    { state: 'auditoria', name: 'Auditar Militares', icon: 'search', role: '' }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}