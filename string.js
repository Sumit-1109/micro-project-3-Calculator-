const keys=document.querySelectorAll('.item');
let input=document.getElementById('calcInput');

input.addEventListener('keydown', (event) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+','*', '-', '/', 'Backspace', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
    }else if (event.key === '*') {
        event.preventDefault();
        input.value += 'x';
    }
});

keys.forEach((key)=>{
    key.addEventListener('click',()=>{
        let cinput=input.value;

        if (key.id==='delete'){
            cinput=cinput.slice(0,-1);
            if(cinput.length==0){
                input.value='';
            }
        } else if(key.id==='reset'){
            input.value='';
            return;
        } else if(key.id==='isequal'){
            cinput=parseFloat(eval(cinput.replace(/x/g, '*')).toFixed(3)).toString();
        } else if(key.id==='mul'){
            cinput+='*';
        } else {
            cinput += key.textContent;
        }

        cinput=validateInput(cinput);
            
        if (key.id==='mul'){
                input.value=cinput.replace(/\*/g, 'x');
        }else {
            input.value=cinput;
        }
            
         

    });
});

function validateInput(cinput){
    cinput = cinput.replace(/([+*/x-]){2,}/g, (match) => match.slice(-1));

    if (!/^[0-9.\-]/.test(cinput)) {
        return '';
    }


    return cinput;;
};