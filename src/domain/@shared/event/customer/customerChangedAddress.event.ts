import EventInterface from '../event.interface'

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventData: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(eventData: any) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}