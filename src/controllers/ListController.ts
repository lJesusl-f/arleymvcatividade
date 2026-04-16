import { Request, Response } from "express";
import { list } from "../models/instances"; // Model: instância da lista
import { ListView } from "../views/ListView"; // View da lista

export class ListController {

  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) return ListView.missingItem(res);

    list.add(item);
    ListView.added(res);
  }

  public remove(_req: Request, res: Response): void {
    const removed = list.remove(); // Remove o último item (pop)

    if (removed === undefined) return ListView.empty(res);

    ListView.removed(res, removed);
  }

  public removeAt(req: Request, res: Response): void {
    // Converte o parâmetro de rota (string) para número
    const index = Number(req.params.index);

    // Number("abc") retorna NaN — precisamos verificar isso
    if (Number.isNaN(index)) return ListView.invalidIndexParam(res);

    const removed = list.removeAt(index); // Remove pelo índice no Model

    // removeAt retorna undefined se o índice for inválido
    if (removed === undefined) return ListView.invalidIndex(res, "remoção");

    ListView.removedAt(res, removed, index);
  }

  public getAt(req: Request, res: Response): void {
    const index = Number(req.params.index);

    if (Number.isNaN(index)) return ListView.invalidIndexParam(res);

    const item = list.getAt(index); // Consulta pelo índice no Model

    if (item === undefined) return ListView.invalidIndex(res, "consulta");

    ListView.itemAt(res, index, item);
  }

  public peek(_req: Request, res: Response): void {
    const last = list.peek(); // Consulta o último sem remover

    if (last === undefined) return ListView.empty(res);

    ListView.last(res, last);
  }

  public getAll(_req: Request, res: Response): void {
    ListView.all(res, list.getId(), list.name, list.getSize(), list.getItems());
  }

  public clear(_req: Request, res: Response): void {
    list.clear();
    ListView.cleared(res);
  }
}