document.addEventListener('DOMContentLoaded', function () {

   //Проверяем статус документа и готовность DOM + выполнения скрипта
   console.log('Lets go');

   //Ищем необходимые элементы разметки для работы (wrapperы кнопок и вывод)
   const buttons = document.querySelectorAll('.button'); //Node-list (массив)
   const result = document.querySelector('.display-bot');
   const outputTop = document.querySelector('.display-top');
   let btnPressed; //нажатая кнопка
   result.textContent = '0';
   outputTop.textContent = '';
   let firstValue = '';
   let secondValue = '';
   let sign = '';
   let firstValueFilled = false;
   let resultValue = 0;
   let calcFinished = false;
   //Проходимся по каждой кнопке из NodeList
   buttons.forEach(function (item) {

      //Вешаем слушатель по клику на каждый wrapper
      item.addEventListener('click', function () {

         removeActiveClass();//Убираем подсветку и класс active у всех элементов

         //Определяем нажатую кнопку
         btnPressed = this;
         console.log(btnPressed);
         let value = btnPressed.dataset.value;

         // Выполняется если нажатая кнопка - цифра
         if (btnPressed.classList.contains('number')) {

            //Вызываем ф-ию заполнение первого значения, если оно не заполнено
            if (firstValueFilled === false) {
               getFirstValue(value);
            }

            //Вызываем ф-ию заполнение второго значения, если оно не заполнено
            if (calcFinished === false && firstValue !== '' && sign !== '') {
               getSecondValue(value);
            } else if (calcFinished === true) {
               console.log('Зашел после равно');
               secondValue = '';                     // Если ввели чилсо после = -> перезаписываем SecondValue
               secondValue += value;
               result.textContent = secondValue;
               calcFinished = false;
            }

         }
         // Выполняется если нажатая кнопка - знак
         if (btnPressed.classList.contains('sign')) {
            item.classList.add('active');
            getSign(value);

         }
         //Обработка кнопок С = +/- и %
         switch (btnPressed.id) {
            case 'C':
               clearAll();
               break;
            case 'equals':
               calculation();
               break;
            case 'plusMinus':
               if (firstValue != '' && firstValueFilled === false) {
                  firstValue = -firstValue;
                  result.textContent = firstValue;
               }
               if (secondValue != '' && calcFinished === false) {
                  secondValue = -secondValue;
                  result.textContent = secondValue
               }
               if (calcFinished == true) {
                  resultValue = -resultValue;
                  result.textContent = resultValue;
                  firstValue = resultValue;
               }
               break;
            case 'percnt':
               if (secondValue != '') {
                  console.log('Проценты');
                  resultValue = basicCalc(+firstValue, +firstValue * +secondValue / 100, sign);
                  result.textContent = resultValue;
                  firstValue = resultValue;
                  calcFinished = true;
               }
               break
            default:
               break;
         }
         //Вывожу значения всех переменных
         console.log(firstValue, secondValue, sign, resultValue);

         //Проверяю длину вводимого текста
         checkDisplayLength();

         //Вывожу сверху дополнительно значения и знак 
         outputTop.textContent = `${firstValue} ${sign} ${secondValue}`;
      })
   })

   //Заполняется первое значение
   function getFirstValue(par) {
      console.log('Наполняем первое значение');
      result.textContent = '';
      firstValue += par;
      result.textContent = firstValue;

   }

   //Получаем знак операции
   function getSign(par) {
      console.log('Нажат знак');
      /*Когда все значения и згнак готовы, при нажатии очередного знака, выполнялось 
      вычисление с предыдущими данными*/

      if (sign != '' && secondValue != '') {
         console.log('Нажали второй раз знак')
         calculation();
      }
      sign = par;
      firstValueFilled = true;
      if (firstValue === '') {
         alert('Сначала введите первое значение!');
         clearAll();
         removeActiveClass();
      }
   }

   //Заполняется второе значение
   function getSecondValue(par) {
      console.log('Наполняем второе значение');
      secondValue += par;
      result.textContent = secondValue;
   }
   //ВЫЧИСЛЕНИЯ!!
   function calculation() {
      console.log('Считаем....');
      if (secondValue !== '') {
         result.textContent = '';
         resultValue = basicCalc(+firstValue, +secondValue, sign);
         console.log(resultValue);
         resultValue = resultRounding(resultValue);
         result.textContent = resultValue;
         firstValue = resultValue;
         calcFinished = true;
         if ((resultValue == NaN) || (resultValue == Infinity)) {
            clearAll();
            result.textContent = 'Ошибка';
            console.log(result.textContent);
         }
      }
   }
   function basicCalc(a, b, sign) {
      switch (sign) {
         case '+':
            return a + b;
            break;
         case '-':
            return a - b;
            break;
         case 'x':
            return a * b;
            break;
         case '/':
            return a / b;
            break;
         default:
            break;
      }
   }
   //Округление результата при необходимости
   function resultRounding(i) {
      console.log('Проверяем округление');
      if (String(i).length >= 6) {
         console.log(i);
         i = +(i.toFixed(2));
         console.log('Округлили');
         console.log(i);
      }
      return i;
   };

   //Убираtv со всех кнопок Класс active, чтоб потом конкретному добавить
   function removeActiveClass() {
      buttons.forEach(function (i) {
         i.classList.remove('active');
      })
   }

   //Ф-ия проверки кол-ва символов в инпуте и обнуления инпута
   function checkDisplayLength() {
      console.log('Проверяем длину');
      if (result.textContent.length >= 8) {
         clearAll();
      }
   }

   function clearAll() {
      firstValue = '';
      secondValue = '';
      sign = '';
      firstValueFilled = false;
      resultValue = '';
      result.textContent = '0';
      calcFinished = false;
      console.log('Очистились');
   }
})
