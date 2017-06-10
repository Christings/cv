/**
 * Created by Administrator on 2017/6/10.
 */
function test(a, b) {
    console.log(b);
    return {
        test: function (x) {
            return test(x, a);
        }
    };
}
var a =test(0);         //undefined
a.test(1);              //0
a.test(2);              //0
a.test(3);              //0
var b = test(3).test(2).test(1).test(0);    //undefined 3 2 1
var c = test(2).test(3);                    //undefined 2
c.test(1);                                  //3
c.test(0);                                  //3

// $(document).ready(
//     (function () {
//         console.log(1);
//         setTimeout(function () {
//             console.log(2)
//         }, 1000);
//         setTimeout(function () {
//             console.log(3)
//         }, 0);
//         console.log(4);
//     })
// );

// $(document).ready(function () {
//     console.log(1+"2"+"2");         //122
//     console.log(1+ +"2");           //3
//     console.log(1+ +"2"+"2");       //32
//     console.log(1+ -"1"+"2");       //02
//     console.log(+"1"+"1"+"2");      //112
//     console.log("A"-"B");           //NaN
//     console.log("A"-"B"+"2");       //NaN2
//     console.log("A"-"B"+2);         //NaN
// });
// $(document).ready(function () {
//     function Yjh1() {
//         getNumber = function () {
//             console.log(1);
//         }
//         return this;
//     }
//
//     Yjh1.getNumber = function () {
//         console.log(2);
//     }
//     Yjh1.prototype.getNumber = function () {
//         console.log(3);
//     }
//     var getNumber = function () {
//         console.log(4);
//     };
//
//     function getNumber() {
//         console.log(5);
//     }
//
//     Yjh1.getNumber();                   //2
//     getNumber();                        //4
//     // Yjh1().getNumber();                 //匿名函数
//     getNumber();                        //4
//     new Yjh1.getNumber();               //2
//     new Yjh1().getNumber();             //3
//     new new Yjh1().getNumber();         //3
// });