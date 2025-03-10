import { IPrefixIpcEnum } from './enum'
import { IMainResponse } from './main'

export type IStartJobType = {
  is_starting: boolean
}

export type IStopJobType = {
  is_stop: boolean
}

export type IAwaitJobType = {
  is_awaiting: boolean
}

export type ITaskname = keyof ITaskType

export interface ITaskType {
  start_job: IStartJobType
  stop_job: IStopJobType
  await_job: IAwaitJobType
}

export interface IPayloadStartAction {
  actionName: string
  data: string[]
}

export interface IPayloadCreateAcc {
  name: string
  username: string
  password: string
  status: boolean
}

export type ActionArgRoutes = {
  start: { ret: boolean }
  stop: { args: IPayloadStartAction; ret: boolean }
  await: { args: IPayloadStartAction; ret: boolean }
  seeding: { ret: boolean }
  seeding_profile: { ret: boolean }
  crawler: { ret: boolean }
}

export type EventKey = keyof PreloadEventMap
export type EventArgs<K extends EventKey> = PreloadEventMap[K][0]
export type EventReturn<K extends EventKey> = PreloadEventMap[K][1]

export type AccArgRoutes = {
  create: { args: IPayloadCreateAcc; ret: boolean }
  update: { arg: IPayloadCreateAcc; ret: boolean }
  delete: { arg: number; ret: boolean }
  fetch: { arg: unknown; ret: boolean }
}

type Join<Parts extends string[]> = Parts extends []
  ? never
  : Parts extends [string]
    ? Parts[0]
    : Parts extends [string, ...infer Rest]
      ? `${Parts[0]}_${Join<Rest & string[]>}`
      : never

type RouteDefinition = { args?: unknown; ret?: unknown }

type Endpoint<Arg, Return> = [Arg] extends [undefined]
  ? [[], IMainResponse<Return>]
  : [[Arg], IMainResponse<Return>]

export type MakeEndpoints<
  Prefix extends IPrefixIpcEnum,
  M extends Record<string, RouteDefinition>
> = {
  [K in keyof M as Join<[Prefix, K & string]>]: Endpoint<M[K]['args'], M[K]['ret']>
}
export interface PreloadEventMap
  extends MakeEndpoints<IPrefixIpcEnum.action, ActionArgRoutes>,
    MakeEndpoints<IPrefixIpcEnum.account, AccArgRoutes> {}

export type IIpcCustomRenderer<T extends Record<string, RouteDefinition>> = {
  [K in keyof T]: T[K]['args'] extends undefined
    ? () => Promise<IMainResponse<T[K]['ret']>>
    : (payload: T[K]['args']) => Promise<IMainResponse<T[K]['ret']>>
}
