export interface Order {
  id: string;
  maxAllowedPrice: number;
  loadingAddress: string;
  unloadingAddress: string;
  loadingDate: Date | null;
  unloadingDate: Date | null;
  goodsType: string;
  notes?: string;
}
