export interface IEvent {
  id: string // Maps to Guid in C#
  name: string
  createdDateTime: Date
  updatedDateTime: Date
  createdBy: string
  updatedBy: string
}
