import taskProcessor from './taskProcessor';

it('test-1-day',()=>{
    expect(taskProcessor(["mo"],{itemsMo:[{id:1,text:"1"},{id:2,text:"2"}]}))
                                    .toEqual([{id:1,text:"1"},{id:2,text:"2"}]);
})

it('test-0-day',()=>{
    expect(taskProcessor([],{itemsMo:[{id:1,text:"1"},{id:2,text:"2"}]}))
                                    .toEqual([]);
})

it('test-2-day',()=>{
    expect(taskProcessor(["mo","we"],{itemsMo:[{id:1,text:"1"},{id:2,text:"2"}],
                                        itemsWe:[{id:3,text:"3"}]}))
                                    .toEqual([{id:1,text:"1"},{id:2,text:"2"},{id:3,text:"3"}]);
})

it('test-2-day-section',()=>{
    expect(taskProcessor(["mo","we"],{itemsMo:[{id:1,text:"1"},{id:2,text:"2"}],
                                        itemsWe:[{id:3,text:"3"},{id:4,text:"1"}]}))
                                    .toEqual([{id:1,text:"1"},{id:2,text:"2"},{id:3,text:"3"}]);
})
