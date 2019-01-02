window.onload = function() {
    document.getElementById("Body").focus();
  }

var Operators = ['+', '-', 'x', '÷'];
var DecimalAdded = false;
var Sqrt = false;
var Power = false;
var keyBord = false;
var equalPressed = false;
var DoubleOperator = false;
var KeyBordPressedKey;

function KeyPressFunction (event) {
    KeyBordPressedKey = event.keyCode;
    keyBord = true;
    if (KeyBordPressedKey == 94)
        Pwr();
    else
        Process();
}

function KeyDownFunction (event) {
    if (event.keyCode == 8 || event.keyCode == 27) {
        KeyBordPressedKey = event.keyCode;
        keyBord = true;
        Process();
    }
}

function Process (e) {
        var input = document.getElementById("Screen");
        var InputVal = input.innerHTML;
        var BtnVal;

        if (keyBord == true ) {
            BtnVal = KeyBordPressedKey;
            
            if (BtnVal == 47)
                BtnVal = '÷';
            else if (BtnVal == 42)
                BtnVal = 'x';
            else if (BtnVal == 45)
                BtnVal = '-';
            else if (BtnVal == 43)
                BtnVal = '+';
            else if (BtnVal == 46)
                BtnVal = '.';
            else if (BtnVal == 8)
                BtnVal = 'Del';
            else if (BtnVal == 67 || BtnVal == 99 || BtnVal == 27)
                BtnVal = 'C';
            else if (BtnVal == 13 || BtnVal == 61)
                BtnVal = '=';
            else if (BtnVal == 48)
                BtnVal = '0';
            else if (BtnVal == 49)
                BtnVal = '1';
            else if (BtnVal == 50)
                BtnVal = '2';
            else if (BtnVal == 51)
                BtnVal = '3';
            else if (BtnVal == 52)
                BtnVal = '4';
            else if (BtnVal == 53)
                BtnVal = '5';
            else if (BtnVal == 54)
                BtnVal = '6';
            else if (BtnVal == 55)
                BtnVal = '7';
            else if (BtnVal == 56)
                BtnVal = '8';
            else if (BtnVal == 57)
                BtnVal = '9';
            else return;
            keyBord = false;
        }
        else if (keyBord == false){
            BtnVal = e.innerHTML;
        }

        if(BtnVal == 'Del'){
            if (Sqrt == true) {
                input.innerHTML = input.innerHTML.slice(2, input.innerHTML.length - 1);
                Sqrt = false;
            }
            else if (PowerDel == true) {
                input.innerHTML = input.innerHTML.slice(1,input.innerHTML.length - 2)
                PowerDel = false;
                Power = false;
            }
            else if (equalPressed == true) {
                input.innerHTML = "0";
                DecimalAdded = false;
            }
            else {
                input.innerHTML = InputVal.slice(0, -1);    
            }
            
            if (input.innerHTML == "") {
                input.innerHTML = '0';
                DecimalAdded = false;
            }
            DoubleOperator = false;
            return;
        }


        else if(BtnVal == 'C'){
            input.innerHTML = "0";
            DecimalAdded = false;
            Power = false;
            PowerDel = false;
            equalPressed = false;
            DoubleOperator = false;
            return;
        } 
        
        else if (BtnVal == '√' && Sqrt != true && Power == false) {
            
            LastChar = InputVal[InputVal.length -1];
            if (InputVal.length == 1 && Operators.indexOf(LastChar) > -1){
                return;
            }
            else {
                if (InputVal == "" || InputVal == '0') {
                SnackBar("First Enter The Expression Whose You Want To Find Under Root !!", -250)
                return;
                }
                else {
                    input.innerHTML = "√(" + input.innerHTML + ")";
                    Sqrt = true;
                }
            }
            
        }

        else if(BtnVal == '=') {
            if (input.innerHTML == "" || input.innerHTML == '0')
                return;
            var equation = InputVal;
            var LastChar = equation[equation.length - 1];
            
            if(Operators.indexOf(LastChar) > -1){
                input.innerHTML = InputVal.slice(0, -1);
                SnackBar("All The Operators Must Be In Between The Equation !!", -200);
                return;
            }
            else if (LastChar == '.') {
                input.innerHTML = InputVal.slice(0, -1);
            }
            
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/')
            .replace(/[\d.]+/g, function(n){ return parseFloat(n); });;

            if (Power == true) {
                var index = equation.indexOf('^');
                var pwr = equation.slice(index + 1);
                var pwr2 = eval(pwr);
                var base = equation.slice(1, index -1)
                var base2 = eval(base);
                var ans = Math.pow(base2, pwr2);
                input.innerHTML = ans;
                Power = false;
            }
            else if (Sqrt == true) {
                equation = equation.slice(2, equation.length - 1);
                input.innerHTML = Math.sqrt(eval(equation));
                Sqrt = false;
            }
            else {
                input.innerHTML = Number(Math.round(eval(equation) + 'e2') + 'e-2');
            }

            if (input.innerHTML.indexOf('.') > -1) {
                DecimalAdded = true;
            }
            else {
                DecimalAdded = false;
            }
            PowerDel = false;
            equalPressed = true;
        }

        else if (Operators.indexOf(BtnVal) > -1 && Sqrt == false && Power == false) {
            
            var LastChar = InputVal[InputVal.length -1];

            if (equalPressed == true)
                equalPressed = false;

            if(InputVal.length > 24){
                SnackBar("No More Space Left...!!", -125)
            }
            else if (InputVal == "0" && BtnVal == '-') {
                input.innerHTML = BtnVal;
            }
            else if (Operators.indexOf(LastChar) > -1 && InputVal.length > 1) {
                
                if ((LastChar == 'x' || LastChar == '÷') && BtnVal == '-' && DoubleOperator == false) {
                    InputVal += BtnVal;
                    DoubleOperator = true;
                }
                else if (DoubleOperator == true && BtnVal != '-') {
                    InputVal = InputVal.slice(0, -2);
                    InputVal += BtnVal;
                    DoubleOperator = false;                    
                }
                else if (DoubleOperator == false){
                    InputVal = InputVal.slice(0, -1);
                    InputVal += BtnVal;
                }
                input.innerHTML = InputVal;
            }
            else if (input.innerHTML != "0" && (!(Operators.indexOf(LastChar) > -1))) {
                input.innerHTML += BtnVal;
            } 
            DecimalAdded = false;
            PowerDel = false;
        }

        

        else if (BtnVal == '.' && Sqrt == false) {
            
            if (input.innerHTML == '0' || input.innerHTML == "" || equalPressed == true) {
                input.innerHTML = "";
            }

            if(InputVal.length > 24){
                SnackBar("No More Space Left...!!", -125)
                return;
            }
                
            if (DecimalAdded == false && equalPressed == false) {
                input.innerHTML += BtnVal;
                DecimalAdded = true;
            }
            else if (equalPressed == true) {
                input.innerHTML = ".";
            }
            equalPressed = false;
            PowerDel = false;
            DoubleOperator = false;
        }

        else if (Sqrt != true && BtnVal != '√') {
            if (input.innerHTML == '0' || input.innerHTML == "" || equalPressed == true) {
                input.innerHTML = "";
                equalPressed = false;
            }
                
            if(InputVal.length > 24){
                SnackBar("No More Space Left...!!", -125)
                return;
            }
            input.innerHTML += BtnVal;
            PowerDel = false;
            DoubleOperator = false;
        }
    }

    function Pwr() {
        if (Power == false && Sqrt == false) {
            var input = document.getElementById("Screen");
            var InputVal = input.innerHTML;
            var LastChar = InputVal[InputVal.length - 1];
            
            if (InputVal == "" || InputVal == '0') {
                SnackBar("First Enter The Value Of ' x ' !!", -125)
                return;
            }

            if (InputVal.length == 1 && Operators.indexOf(LastChar) > -1){
                return;
            }

            else if(Operators.indexOf(LastChar) > -1 || LastChar == '.'){
                input.innerHTML = InputVal.slice(0, -1);
            }
            
            InputVal = InputVal.replace(/x/g, '*').replace(/÷/g, '/');
            input.innerHTML = "(" + eval(InputVal) + ")^";

            Power = true;
            PowerDel =true;
        }
    }

    function SnackBar(Str, Margin) {
    var x = document.getElementById("SnackBar")

    x.innerHTML = Str;
    x.style.marginLeft = Margin;
    x.className = "show";

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}