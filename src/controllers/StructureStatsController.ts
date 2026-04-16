import { Request, Response } from "express";
import { LinearStructure } from "../models/LinearStructure"; // Model base com o contador estático
import { list, queue, stack } from "../models/instances";    // Instâncias compartilhadas
import { StatsView } from "../views/StatsView";              // View das estatísticas

export class StructureStatsController {

  public getStats(_req: Request, res: Response): void {

    // LinearStructure.getCreatedStructures() retorna quantas estruturas
    // foram instanciadas desde que a aplicação iniciou (atributo static)
    StatsView.stats(res, LinearStructure.getCreatedStructures(), [
      { id: stack.getId(), name: stack.name, tamanho: stack.getSize(), tipo: "pilha" },
      { id: queue.getId(), name: queue.name, tamanho: queue.getSize(), tipo: "fila" },
      { id: list.getId(),  name: list.name,  tamanho: list.getSize(),  tipo: "lista" },
    ]);
  }
}