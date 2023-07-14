import EventDispatcher from '../../src/domain/@shared/event/event.dispatcher'
import ProductCreatedEvent from '../../src/domain/@shared/event/product/productCreated.event'
import SendEmailWhenProductIsCreatedHandler from '../../src/domain/@shared/event/product/handler/sendEmailWhenProductIsCreated.handler'

describe('Domain events tests', () => {
  it('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
  })
  it('Should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
  })
  it('Should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
  })
  it('Should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handler')
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'description',
      price: 14
    })
    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})