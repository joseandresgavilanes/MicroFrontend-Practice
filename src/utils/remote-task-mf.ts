import { PublishSubscribe } from './publish-subscribe';

export type RemoteTaskEvent = 'before-finishing' | 'finish';

export type Metadata = {
  key: string;
  value: string;
}

export type RemoteFinishParams = {
  metadataList?: Metadata[];
  comment?: string;
  error?: Error;
}

export type RemoteTaskProps<T = void> = {
  userId: number;
  flowInstanceCode: string;
  workItemId: number;
  metadata: T | {[paramName: string]: any};
  emitter: PublishSubscribe<RemoteTaskEvent>;
  onFinish: (data: RemoteFinishParams) => void;
}