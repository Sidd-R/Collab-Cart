export type User = {
  userId: string;
  userName: string;
}

export type RoomState = {
  roomId: string;
  admin: User;
  users: Array<User>;
}

export type Product = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  addedBy: string;
  contributors: Array<User>;
}

export type CartState = {
  products: Array<Product>;
  totalAmount: number;
}

