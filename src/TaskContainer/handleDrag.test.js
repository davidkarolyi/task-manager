import HandleDrag from './handleDrag';
//Take out modify from handledrag to test

it('test-empty',()=>{
    expect(HandleDrag.needToAnimate([],0)).toEqual([]);
})

it('test-1-elem',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100}],-1)).toEqual([]);
})

it('test-1-empty',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100}],0)).toEqual([]);
})

it('test-2-elem',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100},{id:-2,y:150}],-1)).toEqual([2]);
})

it('test-4-elem1',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100},{id:-2,y:150},{id:-3,y:200}],-1)).toEqual([2,3]);
})

it('test-4-elem2',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100},{id:-2,y:150},{id:-3,y:200}],-2)).toEqual([3]);
})

it('test-4-elemLast',()=>{
    expect(HandleDrag.needToAnimate([{id:-1,y:100},{id:-2,y:150},{id:-3,y:200}],-3)).toEqual([]);
})


it('PRE-Sort1',()=>{
    expect(HandleDrag._preSort([{id:2,y:30},{id:6, y:20},{id:3, y:50},{id:4, y:10}])).toEqual([4,6,2,3]);
})
it('PRE-Sort2',()=>{
    expect(HandleDrag._preSort([{id:3, y:50},{id:4, y:10}])).toEqual([4,3]);
})
it('PRE-Sort3',()=>{
    expect(HandleDrag._preSort([{id:3, y:50}])).toEqual([3]);
})

it('Sort1',()=>{
    const children=[{id:2,y:30},{id:6, y:20},{id:3, y:50},{id:4, y:10}];
    const items=[{id:2,text:"2"},{id:6, text:"6"},{id:3, text:"3"},{id:4, text:"4"}];
    const res=[{id:4,text:"4"},{id:6, text:"6"},{id:2, text:"2"},{id:3, text:"3"}];
    expect(HandleDrag.Sort(children,items)).toEqual(res);
})

it('AppSort1',()=>{
    const orderedItems=[{id:2,text:"2"},
                        {id:8, text:"3"},
                        {id:4, text:"4"},
                        {id:6, text:"6"}];
//-------------------------------------------------------->
    const activeDays=["mo"];
//-------------------------------------------------------->
    const currentState={itemsMo:[{id:2,text:"2"},
                                {id:4, text:"4"},
                                {id:6, text:"6"},
                                {id:3, text:"3"},
                                ],
                        itemsTu:[],
                        itemsWe:[{id:10,text:"10"},
                                {id:9,text:"9"}],
                        itemsTh:[],
                        itemsFr:[]};
//-------------------------------------------------------->
    const res={itemsMo:[{id:2,text:"2"},
                        {id:3, text:"3"},
                        {id:4, text:"4"},
                        {id:6, text:"6"},
                        ],
               itemsTu:[],
               itemsWe:[{id:10,text:"10"},
                        {id:9,text:"9"}],
               itemsTh:[],
               itemsFr:[]};
//-------------------------------------------------------->
    expect(HandleDrag.sortApp(activeDays,currentState,orderedItems)).toEqual(res);
})


it('AppSort2',()=>{
    const orderedItems=[{id:2,text:"2"},
                        {id:8, text:"3"},
                        {id:4, text:"4"},
                        {id:6, text:"6"},
                        {id:10,text:"10"},
                        {id:9,text:"9"}];
//-------------------------------------------------------->
    const activeDays=["mo","we"];
//-------------------------------------------------------->
    const currentState={itemsMo:[{id:2,text:"2"},
                                {id:4, text:"4"},
                                {id:6, text:"6"},
                                {id:3, text:"3"},
                                ],
                        itemsTu:[],
                        itemsWe:[{id:10,text:"10"},
                                {id:9,text:"9"}],
                        itemsTh:[],
                        itemsFr:[]};
//-------------------------------------------------------->
    const res=currentState;
//-------------------------------------------------------->
    expect(HandleDrag.sortApp(activeDays,currentState,orderedItems)).toEqual(res);
})


it('AppSort2',()=>{
    const orderedItems=[{id:9,text:"9"},
                        {id:4, text:"4"},
                        {id:10, text:"10"},
                        {id:2, text:"2"}, 
                        {id:8,text:"6"},
                        {id:3,text:"3"}];
//-------------------------------------------------------->
    const activeDays=["mo","we"];
//-------------------------------------------------------->
    const currentState={itemsMo:[{id:2,text:"2"},
                                {id:4, text:"4"},
                                {id:6, text:"6"},
                                {id:3, text:"3"},
                                ],
                        itemsTu:[],
                        itemsWe:[{id:10,text:"10"},
                                {id:9,text:"9"}],
                        itemsTh:[],
                        itemsFr:[]};
//-------------------------------------------------------->
    const res=currentState;
//-------------------------------------------------------->
    expect(HandleDrag.sortApp(activeDays,currentState,orderedItems)).toEqual(res);
})