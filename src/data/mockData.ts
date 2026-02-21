// Mock data for the AgroSmart application
export interface Fazenda {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  tamanhoHa: number;
  culturaPrincipal: string;
  tipoSolo: 'arenoso' | 'argiloso' | 'misto';
  sistemaIrrigacao: 'gotejamento' | 'aspersao' | 'manual';
}

export interface Sensor {
  id: string;
  fazendaId: string;
  nome: string;
  profundidadeCm: number;
  umidadeAtual: number;
  temperaturaSolo: number;
  bateriaPct: number;
  ultimaLeitura: string;
}

export interface Leitura {
  timestamp: string;
  umidade: number;
  temperatura: number;
  chuva: number;
}

export interface Irrigacao {
  id: string;
  fazendaId: string;
  data: string;
  hora: string;
  quantidadeMm: number;
  tipo: 'automatica' | 'manual';
}

export interface Recomendacao {
  id: string;
  fazendaId: string;
  data: string;
  quantidadeMm: number;
  horarioSugerido: string;
  motivo: string;
  aplicada: boolean;
  quantidadeAplicada?: number;
}

export const fazendas: Fazenda[] = [
  {
    id: '1',
    nome: 'Sítio Boa Vista',
    cidade: 'Campinas',
    estado: 'SP',
    tamanhoHa: 5,
    culturaPrincipal: 'Tomate',
    tipoSolo: 'argiloso',
    sistemaIrrigacao: 'gotejamento',
  },
  {
    id: '2',
    nome: 'Chácara Verde',
    cidade: 'Holambra',
    estado: 'SP',
    tamanhoHa: 3,
    culturaPrincipal: 'Alface',
    tipoSolo: 'misto',
    sistemaIrrigacao: 'aspersao',
  },
];

export const sensores: Sensor[] = [
  { id: 'S001', fazendaId: '1', nome: 'Sensor Lote A', profundidadeCm: 20, umidadeAtual: 34, temperaturaSolo: 22, bateriaPct: 85, ultimaLeitura: '2026-02-21T14:30:00' },
  { id: 'S002', fazendaId: '1', nome: 'Sensor Lote B', profundidadeCm: 30, umidadeAtual: 18, temperaturaSolo: 24, bateriaPct: 62, ultimaLeitura: '2026-02-21T14:28:00' },
  { id: 'S003', fazendaId: '2', nome: 'Sensor Canteiro 1', profundidadeCm: 15, umidadeAtual: 42, temperaturaSolo: 21, bateriaPct: 91, ultimaLeitura: '2026-02-21T14:25:00' },
];

export const leituras7dias: Leitura[] = [
  { timestamp: '15/02', umidade: 38, temperatura: 26, chuva: 0 },
  { timestamp: '16/02', umidade: 35, temperatura: 28, chuva: 0 },
  { timestamp: '17/02', umidade: 30, temperatura: 30, chuva: 2 },
  { timestamp: '18/02', umidade: 42, temperatura: 24, chuva: 15 },
  { timestamp: '19/02', umidade: 40, temperatura: 25, chuva: 5 },
  { timestamp: '20/02', umidade: 34, temperatura: 27, chuva: 0 },
  { timestamp: '21/02', umidade: 28, temperatura: 29, chuva: 0 },
];

export const irrigacoes: Irrigacao[] = [
  { id: 'I1', fazendaId: '1', data: '2026-02-20', hora: '17:30', quantidadeMm: 15, tipo: 'manual' },
  { id: 'I2', fazendaId: '1', data: '2026-02-18', hora: '18:00', quantidadeMm: 20, tipo: 'automatica' },
  { id: 'I3', fazendaId: '2', data: '2026-02-19', hora: '06:00', quantidadeMm: 12, tipo: 'automatica' },
];

export const recomendacoes: Recomendacao[] = [
  { id: 'R1', fazendaId: '1', data: '2026-02-21', quantidadeMm: 18, horarioSugerido: '17:00–19:00', motivo: 'Umidade em 28%, sem previsão de chuva, ETc alta', aplicada: false },
  { id: 'R2', fazendaId: '1', data: '2026-02-20', quantidadeMm: 15, horarioSugerido: '17:00–18:30', motivo: 'Umidade em 34%, solo seco na camada superficial', aplicada: true, quantidadeAplicada: 15 },
  { id: 'R3', fazendaId: '2', data: '2026-02-21', quantidadeMm: 8, horarioSugerido: '06:00–07:00', motivo: 'Umidade adequada mas previsão de calor intenso amanhã', aplicada: false },
];

export function getStatusIrrigacao(umidade: number): { label: string; cor: 'success' | 'warning' | 'danger' } {
  if (umidade >= 35) return { label: 'Solo OK', cor: 'success' };
  if (umidade >= 20) return { label: 'Irrigar em breve', cor: 'warning' };
  return { label: 'Irrigar agora!', cor: 'danger' };
}

export const culturasPreCadastradas = [
  { nome: 'Tomate', kc: 1.15, umidadeMin: 25, umidadeMax: 45 },
  { nome: 'Alface', kc: 1.0, umidadeMin: 30, umidadeMax: 50 },
  { nome: 'Cenoura', kc: 1.05, umidadeMin: 20, umidadeMax: 40 },
  { nome: 'Pimentão', kc: 1.1, umidadeMin: 25, umidadeMax: 45 },
  { nome: 'Pepino', kc: 1.0, umidadeMin: 30, umidadeMax: 50 },
  { nome: 'Couve', kc: 0.95, umidadeMin: 25, umidadeMax: 45 },
];
