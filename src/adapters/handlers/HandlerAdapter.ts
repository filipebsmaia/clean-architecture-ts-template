import { Message } from './ports/Message';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HandlerAdapter {
  handle(request: Message): Promise<void>;
}