export const PositionStatuses = ["ACTIVE", "INACTIVE"] as const;

export type PositionStatus = (typeof PositionStatuses)[number];

export interface Position {
  id: number;
  positionName: string;
  description: string;
  positionStatus: PositionStatus;
  createdAt: string;
}

export type CreatePosition = Omit<Position, "id" | "createdAt">;

export type UpdatePosition = CreatePosition;
