"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
const port = process.env.PORT || 5000;
server.listen(port, () => {
    (0, console_1.log)('Server is running on port ' + port);
});
// const room: RoomState = {
//   roomId: 'NO ROOM',
//   users: [],
//   admin: { userId: '', userName: '' },
// };
const userSocket = new Map();
// export type Product = {
//   productId: string;
//   productName: string;
//   price: number;
//   quantity: number;
//   image: string;
//   addedBy: string;
//   contributors: Array<User>;
// }
// export type CartState = {
//   products: Array<Product>;
//   totalAmount: number;
// }
const cart = {
    products: [],
    totalAmount: 0,
};
const room = {
    roomId: 'NO ROOM',
    users: [],
    admin: { userId: '', userName: '' },
};
const addToCart = (product) => {
    const existingItem = cart.products.find((item) => item.productId === product.productId);
    if (existingItem) {
        existingItem.quantity += product.quantity;
        cart.totalAmount += product.quantity * product.price;
    }
    else {
        cart.products.push(product);
        cart.totalAmount += product.quantity * product.price;
    }
};
const incrementItem = (product) => {
    const existingItem = cart.products.find((item) => item.productId === product.productId);
    if (existingItem) {
        existingItem.quantity += 1;
        cart.totalAmount += product.price;
    }
};
const decrementItem = (product) => {
    const existingItem = cart.products.find((item) => item.productId === product.productId);
    if ((existingItem === null || existingItem === void 0 ? void 0 : existingItem.quantity) == 1) {
        cart.totalAmount -= product.price;
        cart.products = cart.products.filter((item) => item.productId !== product.productId);
    }
    else if (existingItem) {
        existingItem.quantity -= 1;
        cart.totalAmount -= product.price;
    }
};
const removeFromCart = (productId) => {
    const existingItem = cart.products.find((item) => item.productId === productId);
    if (existingItem) {
        cart.totalAmount -= existingItem.quantity * existingItem.price;
        cart.products = cart.products.filter((item) => item.productId !== productId);
    }
};
const clearCart = () => {
    cart.products = [];
};
io.on('connection', (socket) => {
    (0, console_1.log)('User', socket.id, 'connected');
    socket.on('createRoom', (userId, userName, getRoomId) => {
        const roomId = (0, uuid_1.v4)().slice(0, 6); // create new room
        (0, console_1.log)('Room created with id', roomId, 'by user', userId);
        socket.join(roomId); // join admin to the new created room
        room.roomId = roomId; // save room id
        room.users = [{ userId, userName }]; // save room id and add admin as a user
        room.admin = { userId, userName }; // save  admin details
        getRoomId(roomId); // send room id to the admin
        io.to(roomId).emit('users', room.users, room.admin);
        userSocket.set(socket.id, userId); // save user id and socket id
        cart.products = [];
        cart.totalAmount = 0;
    });
    // socket.on('hello1', () => {
    //   console.log('bye bye');
    // });
    socket.on('joinRoom', (userId, userName, roomId) => {
        var _a;
        socket.join(roomId); // join user to the room
        console.log('User', userId, 'joined room', roomId);
        (_a = room.users) === null || _a === void 0 ? void 0 : _a.push({ userId, userName }); // add user to the room
        io.to(roomId).emit('users', room.users, room.admin); // broadcast user data to all users in the room
    });
    // socket.on('leaveRoom', (userId: string, roomId: string) => {
    //   socket.leave(roomId); // leave user from the room
    //   room.users = room.users?.filter((user) => user.userId !== userId); // remove user from the room
    //   io.to(roomId).emit('users', room.roomId); // broadcast user data to all users in the room
    // });
    // socket.on('addToCart', (product) => {
    //   socket.to(room.roomId).emit('addToCart', product);
    // });
    // socket.on('increment', (product) => {});
    // socket.on('decrement', (product) => {});
    // socket.on('removeFromCart', (product) => {});
    // socket.on('clearCart', () => {});
    // socket.on('disconnect', () => {
    //   room.users = room.users?.filter(
    //     (user) => user.userId !== userSocket.get(socket.id)
    //   ); // remove user from the room
    //   log('User', socket.id, 'disconnected');
    // });
});
