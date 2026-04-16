import { Request, Response } from "express";
import { queue } from "../models/instances"; // Model: instância da fila
import { QueueView } from "../views/QueueView"; // View da fila

export class QueueController {

  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) return QueueView.missingItem(res);

    queue.add(item);       // Adiciona no final da fila (comportamento do Model)
    QueueView.added(res);
  }

  public remove(_req: Request, res: Response): void {
    const removed = queue.remove(); // Remove da frente da fila (shift)

    if (removed === undefined) return QueueView.empty(res);

    QueueView.removed(res, removed);
  }

  public peek(_req: Request, res: Response): void {
    const front = queue.peek(); // Consulta a frente sem remover

    if (front === undefined) return QueueView.empty(res);

    QueueView.front(res, front);
  }

  public getAll(_req: Request, res: Response): void {
    QueueView.all(res, queue.getId(), queue.name, queue.getSize(), queue.getItems());
  }

  public clear(_req: Request, res: Response): void {
    queue.clear();
    QueueView.cleared(res);
  }
}