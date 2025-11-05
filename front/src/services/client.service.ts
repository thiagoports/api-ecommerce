import api from "../lib/http";
import type { Cliente } from "../types/api";

export async function listClientes() {
    const { data } = await api.get<Cliente[]>("v1/clientes/");
    return data;
}

export async function updateCliente(id: number, payload: Partial<Cliente>) {
    const { data } = await api.patch<Cliente>(`v1/clientes/${id}/`, payload);
    return data;
}
