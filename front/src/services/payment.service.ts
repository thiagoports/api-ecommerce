import api from "../lib/http";
import type { Payment } from "../types/api";

export async function listPayments() {
    const { data } = await api.get<Payment[]>("v1/payments/");
    return data;
}

export async function createPayment(payload: {
    cart_id: number;
    payment_method: Payment["payment_method"];
    amount: string;
}) {
    const { data } = await api.post<Payment>("v1/payments/", payload);
    return data;
}

export async function updatePaymentStatus(id: number, status: Payment["status"], paid_at?: string) {
    const { data } = await api.patch<Payment>(`v1/payments/${id}/`, { status, paid_at });
    return data;
}
