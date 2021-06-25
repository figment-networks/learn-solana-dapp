export type ProtocolType = {
  id: string
  active: boolean
  logoUrl: string
  steps?: StepType[]
}

export type ProtocolsType = {
  [key: string]: ProtocolType
}

export type StepType = {
  id: string
  title: string
  url: string
}