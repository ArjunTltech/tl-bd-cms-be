
import { v4 as uuidv4 } from 'uuid';
import prisma from './prisma.js';
import { io } from '../utils/socket.js';




export const createNotification = async ({ subject, message }) => {
  try {
    // Save the notification in the database
    const notification = await prisma.notification.create({
      data: {
        id: uuidv4(),
        subject,
        message
      },
    });
console.log(notification,"nnnnnn");

    // Emit the notification to all connected clients
    io.emit('new-notification', notification);

  } catch (error) {
    console.error('Error creating notification:', error);
  } finally {
    // Optionally disconnect the Prisma client if no other operations are ongoing
    await prisma.$disconnect();
  }
};