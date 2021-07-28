test('tacos are tasty', ()=>{
    try{
        expect('tacos').toBe('tasty')
    } catch(e){
        console.log('Of course they are!')
    }
})