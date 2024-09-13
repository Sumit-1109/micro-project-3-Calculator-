const keys=document.querySelectorAll('.item');
let input=document.getElementById('calcInput');
let disp=[];

keys.forEach(key=>{
    key.addEventListener('click',()=>{
        if(disp.length===0 && (['+','/','*','isequal'].includes(key.id))){
            disp[0]='INVALID INPUT';
            input.value='INVALID INPUT';
        }else{
            if((input.value==='INVALID INPUT' || input.value==='EXPRESSION ERROR') ){
                disp=[];
                input.value='';
            } 
            if (key.classList.contains('num')) {
                disp.push(key.textContent);
            } else if(key.id==='delete'){
                disp.pop();
            } else if(key.id==='reset'){
                disp.splice(0,disp.length);
            } else if(key.id==='isequal'){
                try{
                    let result=eval(disp.join('').replace(/x/g,'*'));
                    result=parseFloat(result.toFixed(3));
                    disp=(Array.from(result.toString()));
                } catch{
                    disp.splice(0,disp.length,'EXPRESSION ERROR');
                }
            } else if(key.classList.contains('op')){
                lastElement=disp[(disp.length)-1];
                secondlastElement=disp[(disp.length-2)];
                if (['/','x'].includes(secondlastElement)){
                    if (lastElement==='-'){
                        disp.pop();
                        disp.pop();
                        disp.push(key.textContent);
                    }
                }
                if(['+','/','x','-'].includes(lastElement) && ['+','/','*'].includes(key.id)){
                    disp[disp.length-1]=(key.textContent);
                } else if (['-'].includes(key.id)){ 
                    if (['+','-'].includes(lastElement)){
                        disp[disp.length-1]=key.textContent;
                    } else {
                        disp.push(key.textContent);
                    }
                } else {
                    disp.push(key.textContent);
                }
            } else if (key.id === '.') {
                let lastNumber = disp.join('').split(/[\+\-\x\/]/).pop();
                if (!lastNumber.includes('.')) {
                    if (disp.length!=0 && ['1','2','3','4','5','6','7','8','9','0'].includes(disp[disp.length-1]) ){
                        disp.push(key.textContent);
                    }else {
                        disp.push('0');
                        disp.push(key.textContent);

                    }
                }
            } else {
                disp.push(key.textContent);
            }
        }
        
        input.value=disp.join('');
    })
})
