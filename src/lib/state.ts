export const VALID_STATES = ["rs", "go"] as const;
export type State = typeof VALID_STATES[number];

export function isValidState(s: string): s is State {
  return VALID_STATES.includes(s as State);
}

export const STATE_META: Record<string, { nome: string; cidadePrincipal: string; centerLat: number; centerLng: number }> = {
  RS: { nome: "Rio Grande do Sul", cidadePrincipal: "PORTO ALEGRE", centerLat: -30.0346, centerLng: -51.2177 },
  GO: { nome: "Goiás", cidadePrincipal: "GOIÂNIA", centerLat: -16.6869, centerLng: -49.2648 },
};

export function stateScopedKey(key: string, uf: string) {
  return `${key}-${uf.toLowerCase()}`;
}
