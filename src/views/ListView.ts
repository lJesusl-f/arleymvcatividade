import { Response } from "express";

// View da Lista — além das operações comuns, a lista tem acesso por índice
export class ListView {

  // Resposta de sucesso ao adicionar
  static added(res: Response): void {
    res.status(201).json({ mensagem: "Item adicionado na lista." });
  }

  // Resposta ao remover o último item
  static removed(res: Response, item: unknown): void {
    res.json({ removido: item });
  }

  // Resposta ao remover por índice — devolve o item e o índice usado
  static removedAt(res: Response, item: unknown, index: number): void {
    res.json({ removido: item, indice: index });
  }

  // Resposta ao consultar o último item sem remover
  static last(res: Response, item: unknown): void {
    res.json({ ultimo: item });
  }

  // Resposta ao consultar um item por índice
  static itemAt(res: Response, index: number, item: unknown): void {
    res.json({ indice: index, item });
  }

  // Resposta com todos os dados da lista
  static all(res: Response, id: number, name: string, size: number, items: unknown[]): void {
    res.json({ estrutura: { id, name }, tamanho: size, itens: items });
  }

  // Resposta ao limpar a lista
  static cleared(res: Response): void {
    res.json({ mensagem: "Lista limpa com sucesso." });
  }

  // Erro: lista vazia
  static empty(res: Response): void {
    res.status(404).json({ erro: "A lista está vazia." });
  }

  // Erro: índice inválido — usado tanto para consulta quanto para remoção
  static invalidIndex(res: Response, action: "consulta" | "remoção"): void {
    res.status(404).json({ erro: `Índice inválido para ${action}.` });
  }

  // Erro: campo 'item' ausente no corpo da requisição
  static missingItem(res: Response): void {
    res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
  }

  // Erro: parâmetro index não é um número válido
  static invalidIndexParam(res: Response): void {
    res.status(400).json({ erro: "O parâmetro index deve ser um número." });
  }
}