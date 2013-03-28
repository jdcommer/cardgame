(function(){

    const nrOfVariations = 3;
    const checkAfterSelection = 3;
    var playField = undefined;
    var selectedCards = 0;
    var respondOnClicks = true;

    var borderColors = [" greenBorder", " redBorder", " blueBorder"];
    var contentColors = [" greenContent", " redContent", " blueContent"];
    var content = [" heart", " umbrella", " star"];
    var background = [" horizontal", " vertical", " angled"];

    function checkIfValidSet(){
        respondOnClicks = false;
        var selectedItemsNodeList = document.getElementsByClassName("selected");
        var selectedItems = Array.prototype.slice.call(selectedItemsNodeList)
        var classCounter = {};
        for (var i = 0; i < selectedItems.length; i++){
            var classNames = selectedItems[i].className.split(" ");
            for (var j = 0; j < classNames.length; j++){
                var name = classNames[j];
                if (name in classCounter){
                    classCounter[name]++
                } else {
                    classCounter[name] = 1
                }
            }
        }
        var correctResult = true;
        for (var counter in classCounter){
            if (classCounter[counter] == 2){
                correctResult = false;
                break;
            }
        }
        if (correctResult){
            setTimeout(function(){
                for (i = 0 ; i < selectedItems.length ; i++){
                    setRandomClasses(selectedItems[i]);
                }
                restorePlayfield();
            }, 3000)
            document.body.className = "correct";
        } else {
            setTimeout(function(){
                for (i = 0 ; i < selectedItems.length ; i++){
                    var card = selectedItems[i];
                    var selectedEarlier = card.className.indexOf(" selected");
                    card.className = card.className.substring(0, selectedEarlier);
                }
                restorePlayfield();
            }, 3000);
            document.body.className = "incorrect";
        }

    }

    function restorePlayfield(){
        document.body.className = "";
        selectedCards = 0;
        respondOnClicks = true;
    }

    function handleClick(){
        if (respondOnClicks){
        var selectedEarlier = this.className.indexOf(" selected");
        if (selectedEarlier >= 0){
          this.className = this.className.substring(0, selectedEarlier);
            selectedCards--;
        } else {
            this.className += " selected";
            selectedCards++;
        }
        if (selectedCards == checkAfterSelection){
            checkIfValidSet();
        }
        }
    }

    function randomInt(max){
        var random = Math.random();
        return Math.floor(random * max);
    }

    function setRandomClasses(card) {
        card.className = "card stripes";
        card.className += borderColors[randomInt(nrOfVariations)];
        card.className += contentColors[randomInt(nrOfVariations)];
        card.className += content[randomInt(nrOfVariations)];
        card.className += background[randomInt(nrOfVariations)]
    }

    function createCard(){
        var card = document.createElement("div");
        setRandomClasses(card);
        card.onclick = handleClick;
        return card;
    }

    window.onload = function(){
        playField = document.getElementById("playmat");
        for (var i = 0 ; i < 12; i++){
            var card = createCard();
            playField.appendChild(card);
        }
    }
})();
