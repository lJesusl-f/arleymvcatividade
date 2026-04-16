import { Request, Response } from "express";
import { stack } from "../models/instances"; // Model: instância compartilhada da pilha
import { StackView } from "../views/StackView"; // View: responsável pela resposta

// O Controller coordena o fluxo:
// 1. Recebe a requisição
// 2. Valida os dados
// 3. Aciona o Model
// 4. Delega a resposta à View
export class StackController {

  public add(req: Request, res: Response): void {
    const { item } = req.body;

    // Valida se o campo 'item' foi enviado
    if (item === undefined) return StackView.missingItem(res);

    stack.add(item);       // Aciona o Model para adicionar
    StackView.added(res);  // Delega a resposta à View
  }

  public remove(_req: Request, res: Response): void {
    const removed = stack.remove(); // Aciona o Model para remover

    // Se a pilha estava vazia, remove() retorna undefined
    if (removed === undefined) return StackView.empty(res);

    StackView.removed(res, removed); // View formata a resposta com o item removido
  }

  public peek(_req: Request, res: Response): void {
    const top = stack.peek(); // Consulta o topo sem remover

    if (top === undefined) return StackView.empty(res);

    StackView.top(res, top);
  }

  public getAll(_req: Request, res: Response): void {
    // Passa os dados do Model para a View formatar
    StackView.all(res, stack.getId(), stack.name, stack.getSize(), stack.getItems());
  }

  public clear(_req: Request, res: Response): void {
    stack.clear();          // Aciona o Model para limpar
    StackView.cleared(res); // View confirma a operação
  }
}