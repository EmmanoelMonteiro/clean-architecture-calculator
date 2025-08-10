
    // Define all functions first
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    
    function updateDisplay() {
        document.getElementById('display').textContent = currentInput;
    }
    
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }
    
    function appendDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }
    
    function appendOperator(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }
    
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        //if (isNaN(prev) return;
        
        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }
    
    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }
    
    function deleteLastChar() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }
    
    // Initialize calculator when page loads
    window.onload = function() {
        updateDisplay();
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            else if (e.key === '.') appendDecimal();
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                appendOperator(e.key);
            }
            else if (e.key === 'Enter' || e.key === '=') calculate();
            else if (e.key === 'Escape') clearDisplay();
            else if (e.key === 'Backspace') deleteLastChar();
        });
    };
