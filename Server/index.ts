import { log } from 'console';
import express, { Express } from 'express';
import http, { get } from 'http';
import { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { CartState, Chat, ChatState, Product, RoomState, User } from './types';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  log('Server is running on port ' + port);
});

const room: RoomState = {
  roomId: 'NO ROOM',
  users: [],
  admin: { userId: '', userName: '' },
};

const userSocket: Map<string, string> = new Map();

const cart: CartState = {
  products: [],
  totalAmount: 0,
};

const messages: Array<Chat> = [];

const addToCart = (product: Product) => {
  const existingItem = cart.products.find(
    (item) => item.productId === product.productId
  );
  if (existingItem) {
    existingItem.quantity += product.quantity;
    cart.totalAmount += product.quantity * product.price;
  } else {
    cart.products.push(product);
    cart.totalAmount += product.quantity * product.price;
  }
};

const incrementItem = (productId: string) => {
  const existingItem = cart.products.find(
    (item) => item.productId === productId
  );
  if (existingItem) {
    existingItem.quantity += 1;
    cart.totalAmount += existingItem.price;
  }
};

const decrementItem = (productId: string) => {
  const existingItem = cart.products.find(
    (item) => item.productId === productId
  );
  if (existingItem?.quantity == 1) {
    cart.totalAmount -= existingItem.price;
    cart.products = cart.products.filter(
      (item) => item.productId !== productId
    );
  } else if (existingItem) {
    existingItem.quantity -= 1;
    cart.totalAmount -= existingItem.price;
  }
};

const removeFromCart = (productId: string) => {
  const existingItem = cart.products.find(
    (item) => item.productId === productId
  );
  if (existingItem) {
    cart.totalAmount -= existingItem.quantity * existingItem.price;
    cart.products = cart.products.filter(
      (item) => item.productId !== productId
    );
  }
};

const contributeOn = (productId: string, user: User) => {
  const existingItem = cart.products.find(
    (item) => item.productId === productId
  );
  if (existingItem) {
    existingItem.contributors.push(user);
  }
}

const contributeOff = (productId: string, userId: string) => {
  const existingItem = cart.products.find(
    (item) => item.productId === productId
  );
  if (existingItem) {
    existingItem.contributors = existingItem.contributors.filter(
      (user) => user.userId !== userId
    );
  }
}

const contributeAll = (user:User) => {
  cart.products.forEach((product: Product) => {
    if (!product.contributors.find((user) => user.userId === user.userId)) {
      product.contributors.push(user);
    }
  })
}

// remove user as a contributor in all products if the user is a contributor
const contributeAllOff = (user: User) => {
  cart.products.forEach((product: Product) => {
    if (product.contributors.find((user1) => user1.userId === user.userId)) {
      product.contributors = product.contributors.filter(
        (user2) => user2.userId !== user.userId
      );
    }
  })
}


const clearCart = () => {
  cart.products = [];
};

io.on('connection', (socket: Socket) => {
  log('User', socket.id, 'connected');

  socket.on(
    'createRoom',
    (userId: string, userName: string, getRoomId: (roomId: string) => void) => {
      const roomId = uuid().slice(0, 6); // create new room
      log('Room created with id', roomId, 'by user', userId);
      socket.join(roomId); // join admin to the new created room
      room.roomId = roomId; // save room id
      room.users = [{ userId, userName }]; // save room id and add admin as a user
      room.admin = { userId, userName }; // save  admin details
      getRoomId(roomId); // send room id to the admin
      io.to(roomId).emit('updateRoom', room);
      userSocket.set(socket.id, userId); // save user id and socket id
      cart.products = [];
      cart.totalAmount = 0;
    }
  );

  socket.on('joinRoom', (userId: string, userName: string, roomId: string) => {
    socket.join(roomId); // join user to the room
    console.log('User', userId, 'joined room', roomId);

    room.users?.push({ userId, userName }); // add user to the room
    io.to(roomId).emit('updateRoom', room); // broadcast user data to all users in the room
    io.to(roomId).emit('updateCart', cart);
  });

  socket.on('leaveRoom', (userId: string, roomId: string) => {
    socket.leave(roomId); // leave user from the room
    room.users = room.users?.filter((user) => user.userId !== userId); // remove user from the room
    io.to(roomId).emit('updateRoom', room); // broadcast user data to all users in the room
  });

  socket.on('addToCart', (product) => {
    addToCart(product);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('increment', (productId) => {
    incrementItem(productId);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('decrement', (productId) => {
    decrementItem(productId);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('removeFromCart', (productId) => {
    removeFromCart(productId);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('clearCart', () => {
    clearCart();
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('contributeOn', (productId,user: User) => {
    contributeOn(productId,user);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('contributeOff', (productId,userId) => {
    contributeOff(productId,userId);
    io.to(room.roomId).emit('updateCart', cart);
  });
  socket.on('contributeAll', (user) => {
    contributeAll(user);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('contributeAllOff', (user) => {
    contributeAllOff(user);
    io.to(room.roomId).emit('updateCart', cart);
  });

  socket.on('sendChat', (chat) => {
    log('Chat received from', chat.userId, chat.userName,chat.message);
    messages.push(chat);
    io.
    to(room.roomId).
    emit('updateChat', messages);

  })


  socket.on('disconnect', () => {
    room.users = room.users?.filter(
      (user) => user.userId !== userSocket.get(socket.id)
    ); // remove user from the room
    log('User', socket.id, 'disconnected');
  });
});
