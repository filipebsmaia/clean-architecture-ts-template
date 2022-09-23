/* eslint-disable no-console */

import { adaptMessage } from 'src/main/adapters/kafka-message-adapter';
import { kafka } from './client';
import { makeCreateUserHandler } from './factories/create-user';

export const consumer = kafka.consumer({
  groupId: 'test',
  allowAutoTopicCreation: true
});

const topics = [
  'account.create-user'
] as const;

type Topic = typeof topics[number];

const createUserHandler = adaptMessage(makeCreateUserHandler());

export async function start() {
  await consumer.connect();

  await Promise.all(
    topics.map(topic => {
      return consumer.subscribe({ topic });
    })
  );

  await consumer.run({
    async eachMessage(data) {
      const { topic, message } = data;
      try {
        console.log(`[${topic}]`, message.value?.toString());

        switch (topic as Topic) {
          case 'account.create-user':
            await createUserHandler(message);
            break;
          default:
            console.error(`Kafka topic not handled: ${topic} \nDid you forgot to assign handler for it?`);
            break;
        }

      } catch (err) {
        console.log(`Error in topic ${topic} for message: ${message.value?.toString()}`);
        console.error(err);
      }
    }
  });
}