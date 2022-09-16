
import { Kafka, KafkaConfig } from 'kafkajs';

const { KAFKA_BROKERS, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env;

if (!KAFKA_BROKERS) {
  console.error('Missing Kafka credentials:', ['KAFKA_BROKERS', 'KAFKA_USERNAME', 'KAFKA_PASSWORD'].filter(env => !process.env[env]).join(', '));
  process.exit(1);
}

const config: KafkaConfig = {
  clientId: 'awesome-service',
  brokers: KAFKA_BROKERS.split(',')
};

if (KAFKA_USERNAME) {
  config.sasl = {
    mechanism: 'plain',
    username: KAFKA_USERNAME ?? '',
    password: KAFKA_PASSWORD ?? ''
  };
}

export const kafka = new Kafka(config);