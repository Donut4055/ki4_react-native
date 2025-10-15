import { PositionStatus } from "@/enums/position.enum";

export interface PositionRequest {
  positionName: string;
  positionStatus: PositionStatus;
  description?: string;
}

export interface Position {
  id: number;
  positionName: string;
  description: string;
  positionStatus: PositionStatus;
  createdAt: string;
}
