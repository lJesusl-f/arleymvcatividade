import { Response } from "express";

// View da Fila — mesma responsabilidade da StackView, mas para a fila
export class QueueView {

  // Resposta de sucesso ao adicionar
  static added(res: Response): void {
    res.status(201).json({ mensagem: "Item adicionado na fila." });
  }

  // Resposta ao remover o primeiro item da fila
  static removed(res: Response, item: unknown): void {
    res.json({ removido: item });
  }

  // Resposta ao consultar a frente da fila sem remover
  static front(res: Response, item: unknown): void {
    res.json({ frente: item });
  }

  // Resposta com todos os dados da fila
  static all(res: Response, id: number, name: string, size: number, items: unknown[]): void {
    res.json({ estrutura: { id, name }, tamanho: size, itens: items });
  }

  // Resposta ao limpar a fila
  static cleared(res: Response): void {
    res.json({ mensagem: "Fila limpa com sucesso." });
  }

  // Erro: fila vazia
  static empty(res: Response): void {
    res.status(404).json({ erro: "A fila está vazia." });
  }

  // Erro: campo 'item' ausente no corpo da requisição
  static missingItem(res: Response): void {
    res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
  }
}