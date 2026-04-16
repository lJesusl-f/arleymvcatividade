import { Response } from "express";

// A View é responsável por formatar e enviar as respostas HTTP.
// O Controller nunca chama res.json() diretamente — ele delega para cá.
export class StackView {

  // Resposta de sucesso ao adicionar um item
  static added(res: Response): void {
    res.status(201).json({ mensagem: "Item adicionado na pilha." });
  }

  // Resposta ao remover um item — devolve o item removido
  static removed(res: Response, item: unknown): void {
    res.json({ removido: item });
  }

  // Resposta ao consultar o topo sem remover
  static top(res: Response, item: unknown): void {
    res.json({ topo: item });
  }

  // Resposta com todos os dados da pilha
  static all(res: Response, id: number, name: string, size: number, items: unknown[]): void {
    res.json({ estrutura: { id, name }, tamanho: size, itens: items });
  }

  // Resposta ao limpar a pilha
  static cleared(res: Response): void {
    res.json({ mensagem: "Pilha limpa com sucesso." });
  }

  // Erro: pilha vazia (404 = não encontrado)
  static empty(res: Response): void {
    res.status(404).json({ erro: "A pilha está vazia." });
  }

  // Erro: campo 'item' não enviado no corpo da requisição (400 = bad request)
  static missingItem(res: Response): void {
    res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
  }
}