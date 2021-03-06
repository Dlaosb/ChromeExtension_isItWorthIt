
//document.addEventListener("DOMContentLoaded", function() {

var count = 0;
function stop(running) {

  if (count === 1000) {
    console.log("I STOPPED")
    clearInterval(running);

  }

}


var running = setInterval(function() {

  stop(running); 
  count++;
  console.log(count);

  var elements = document.getElementsByTagName('*');

  chrome.storage.sync.get('salary', function(data) {
    const salary = data.salary;

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];


        if (node.nodeType === 3) {
          var regexTest = /\$\d+(?:\.\d+)?/gi;
          var text = node.nodeValue;

          var numberStrings = text.match(regexTest);

          if (numberStrings !== null) {
            numberStrings.forEach(function(numberString) {
              var numPrice = parseFloat(numberString.replace(/./, ''));

              var hours = convert(numPrice, salary);

              //replace text matches entire string 


              var replacedText = text.replace(numberString, `${round(hours, 2)} HRs of your Life`);
              //var replacedText = text.replace(/\$\d+(?:\.\d+)?/gi, 'ONE MILLION DOLLARS');

              if (replacedText !== text) {

                //let newNode = document.createTextNod

                element.replaceChild(document.createTextNode(replacedText), node);


                //node = newNode; 


              }

            });
          }
        }
      }
    }
  });
}, 1000);



//match returns an array of matches 

//convert returns cost of hours of life 
function convert(price, salary) {
  //assuming price has been converted from a string to a number 
  let hourlyPay = salary / 2087;
  let hoursOfLife = price / hourlyPay;
  return hoursOfLife;

}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// const regexTest = /\$\d+(?:\.\d+)?/gi;
// const newMessage = 'one million dollars';
// setInterval(function(){ 
//  console.log("BEFORE");
//  var y = document.body.innerHTML.replace(regexTest, newMessage);
//  console.log(y);
//  document.body.innerHTML = document.body.innerHTML.replace(regexTest, newMessage);
//  console.log("AFTER");
// }, 3000);
