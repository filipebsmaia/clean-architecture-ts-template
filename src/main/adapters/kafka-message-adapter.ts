import { HandlerAdapter } from '@adapters/handlers/HandlerAdapter';
import { KafkaMessage } from 'kafkajs';

export const adaptMessage = (handler: HandlerAdapter) => {
  return async(message: KafkaMessage) => {
    await handler.handle(message.value ? JSON.parse(message.value.toString()) : null);

  };
};