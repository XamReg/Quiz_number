/*Проект ниже был взять за основу из учебного курса, чтобы полчуть практический опыт
была взята концепция курса стиль и переделанна под свою идею, чтобы повторить на практике 
с концепте своей идеи */

import './index.css';
import React, {useState} from 'react';

const numRand = Array(5).fill().map(() => Math.round(Math.random() * 10));//Первый массив по которому будет идти сравнение
const nowNumb = Array(1).fill().map(() => Math.round(Math.random() * 10));//2ой чтобы не городить сделал так чтобы можно было разделять по длине.


// Обычная declaration ф-ия, выводит реузльтат , картинку и тег А, который редиректит нас на стартовую стр "/"
function Result({correct}) { //Функ где выводится конечный результа
    return (
      <div className="result">
        <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />  
        <h2>Вы дали {correct} верных ответа из {numRand.length}</h2>
        <a href='/'>
          <button className='button_res'>Попробовать снова</button>
        </a>
      </div>
    );
}
/*В ф-ий ниже происходит вещи по интереснее,percentage - это блок, который показывается
В зависимости от нашего шага, который считается ниже. длина из нашего массива
Показывается весь массив, чтобы опнимать с чем предстоит иметь дело.
Так же 2 кнопки, по клику слушатель событий подтягивает прописанное в Арр услвоие
Для нужной кнопки, или больше или меньше  */

function Game({step,maxNum,minNum}) {
    const percentage = Math.round((step / numRand.length) * 100);

    console.log(percentage);
    return (
    <>    
        <div className="progress">
        <div style={{width: `${percentage}%`}} className="progress __inner"></div>
        </div>
        <h1>{`All numbers: ${numRand.join(',')}`}</h1>
        <h1>{`Now num: ${numRand[step]}`}</h1>
        <h1>{`Compare with: ${nowNumb}`}</h1>
        <button onClick={() => maxNum(step)} className='more'>{`${nowNumb} > ${numRand[step]}`}</button>
        <button onClick={() => minNum(step)} className='min'>{`${nowNumb} < ${numRand[step]}`}</button>
    </>
);
}

function App() {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
//2 хука состояния, оба отчет будут вести с 0 и шаг и кол-во прав ответов
// функция ниже для кнопки больше , проверка на то что больше и + шаг.
    const maxNum = function () {
        setStep(step + 1);
        if (nowNumb >= numRand[step]){
            setCorrect(correct + 1);
        }
    };
// функция на кнопку меньше, + шаг.
    const minNum = function () {
        setStep(step + 1);
        if (nowNumb <= numRand[step]){
            setCorrect(correct + 1);
        }
    };
            
    
/*Ниже выводит 2 окна, если шаги привышают длину массива, то результат,
    до этого будет идти игра */
    return(
        <div className="App">
            { step != numRand.length ? (<Game step={step}
                maxNum={maxNum}minNum={minNum}
                correct={correct}/> 
            ) : (
                <Result correct={correct} />
            )}
        </div>
    );
}

export default App;