import { Response } from "express";

// Tipagem auxiliar para descrever cada estrutura no retorno das estatísticas
interface StructureInfo {
  id: number;
  name: string;
  tamanho: number;
  tipo: string;
}

// View das Estatísticas — formata o resumo geral das estruturas criadas
export class StatsView {

  // Recebe o total de estruturas criadas e a lista com detalhes de cada uma
  static stats(res: Response, total: number, estruturas: StructureInfo[]): void {
    res.json({ totalEstruturasCriadas: total, estruturas });
  }
}