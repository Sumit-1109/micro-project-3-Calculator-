const keys = document.querySelectorAll('.item');        
let input = document.getElementById('calcInput');       
let disp = [];                                          


keys.forEach(key => {
    key.addEventListener('click', () => {

        if (disp.length === 0 && (['+', '/', '*', 'isequal'].includes(key.id))) {
            disp[0] = 'INVALID INPUT';
            input.value = 'INVALID INPUT';
        } else {


            if ((input.value === 'INVALID INPUT' || input.value === 'EXPRESSION ERROR')) {
                disp = [];
                input.value = '';
            }

            if (key.classList.contains('num')) {
                disp.push(key.textContent);
            } else if (key.id === 'delete') {
                disp.pop();

            } else if (key.id === 'reset') {
                disp.splice(0, disp.length);

            } else if (key.id === 'isequal') {
                try {
                    let result = eval(disp.join('').replace(/x/g, '*'));
                    result = parseFloat(result.toFixed(3));           
                    disp = (Array.from(result.toString()));              

                } catch {
                    disp.splice(0, disp.length, 'EXPRESSION ERROR');       
                }

            } else if (key.classList.contains('op')) {
                let lastElement = disp[(disp.length) - 1];
                let secondLastElement = disp[(disp.length) - 2];

                
                if (['+', '/', 'x', '-'].includes(lastElement)) {
                    if (['x', '/'].includes(secondLastElement) && lastElement === '-') {
                        if (['+', '/', 'x'].includes(key.id)) {
                            disp.pop();
                            disp.pop();
                            disp.push(key.textContent);
                        }
                    } else if (['+', '/', 'x'].includes(key.id)) {
                        disp.pop();
                        disp.push(key.textContent);
                    } else if (key.id === '-') {
                        if (lastElement !== '-') {
                            disp.push(key.textContent);
                        }
                    }
                } else {
                    disp.push(key.textContent);
                }
            } else if (key.id === '.') {
                let lastNumber = disp.join('').split(/[\+\-\*\/]/).pop();
                if (!lastNumber.includes('.')) {
                    disp.push(key.textContent);
                }
            } else {
                disp.push(key.textContent);
            }
        }

        input.value = disp.join('');
    })
});
