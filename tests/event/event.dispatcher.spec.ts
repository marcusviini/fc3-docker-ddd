import EventDispatcher from '../../src/domain/@shared/event/event.dispatcher'
import SendEmailWhenProductIsCreatedHandler from '../../src/domain/@shared/event/product/handler/sendEmailWhenProductIsCreated.handler'

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
  })
})