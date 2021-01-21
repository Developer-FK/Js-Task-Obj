let selectFirst = document.querySelector('#first');

const divEle = document.querySelector('div');

const secDiv = document.querySelector('#secDiv');

const thirdDiv = document.querySelector('#thirdDiv');


const forthDiv = document.querySelector('#forthDiv');





fetch("googleProducts.txt")
.then(res => {
    return res.text();
    
}).then((data) => {
    // preparing array where each element is one line text
    let s = data.split('\n');
 //console.log(s)
    // console.log(s.length)


    // split on - and remove integers from begining of each line.
    let arrWithoutInt = s.map(element => {
        let i = element.indexOf('-');
        return [element.substr(0,i -1) , element.substr( i+ 2)];

        
    });

    //console.log(arrWithoutInt)
  
    let obj = {}
    let newArr;
    newArr = arrWithoutInt.map(ele => {

        //console.log(ele)
        let targetele
        if(ele.length > 1){
        targetele = ele[1].split('>');
        // let i = 0
        // let len = 1;
      

            obj[targetele[0].trim()] = {}
        
    }
    return targetele;

    });


    //console.log(newArr)
    newArr.forEach(ele => {
        
        if(ele.length>1){

            obj[(ele[0].trim())][ele[1].trim()] =  {};
        }
    });

    newArr.forEach(ele => {
        
        if(ele.length>2){

            obj[(ele[0].trim())][ele[1].trim()][ele[2].trim()] =  {};
        }
    });
    newArr.forEach(ele => {
        
        if(ele.length>3){

            obj[(ele[0].trim())][ele[1].trim()][ele[2].trim()][ele[3].trim()] =  {};
        }
    });
    newArr.forEach(ele => {
        
        if(ele.length>4){

            obj[(ele[0].trim())][ele[1].trim()][ele[2].trim()][ele[3].trim()][ele[4].trim()] =  {};
        }
    });

    console.log(obj)

    // console.log(obj["Apparel & Accessories"])
    // data prepared
    //Start working on UI
    let optTag, firstFlag = false;
    for(let key of Object.keys(obj)){

        optTag = document.createElement('option');

        optTag.textContent = key;

        selectFirst.append(optTag)
        firstFlag = true
        // createSecondSelect();

    };

    selectFirst.addEventListener('change', createSecondSelect);

    let secondSelect;
    function createSecondSelect()
    {

        thirdDiv.style.display = "none";
        forthDiv.style.display = "none";
        let secSelDuplication = document.getElementById("second")
        if(secSelDuplication != null){

            secSelDuplication.remove()
        }
        console.log("fired");

        if(firstFlag){
            var firstSelectedValue = selectFirst.value;
           secondSelect = document.createElement('select');

            let firstOptionInsec = document.createElement('option');
            firstOptionInsec.textContent = "Select Category";
            firstOptionInsec.setAttribute('selected', true);
            firstOptionInsec.setAttribute('disabled', true);
            secondSelect.setAttribute('id', "second");
            secondSelect.append(firstOptionInsec)
            let count = 0
            for(let key of Object.keys(obj[firstSelectedValue])){

                optTag = document.createElement('option');
                count++;
                optTag.textContent = key;

                secondSelect.append(optTag)


            }

            if(count != 0){

            
                secDiv.append(secondSelect);
                secondSelect.addEventListener('change', createThirdSelect)
                
            }

        }
    }

    function createThirdSelect(){

        thirdDiv.style.display = "initial";
        forthDiv.style.display = "none";

        let thirdSelDuplication = document.getElementById("third");

            if(thirdSelDuplication != null){

                thirdSelDuplication.remove()
            }

            let thirdSelectTag = document.createElement('select');
            thirdSelectTag.setAttribute('id', "third");


            // creting first disabled option  item
            let firstOptionInsec = document.createElement('option');
            firstOptionInsec.textContent = "Select Sub-Category";
            firstOptionInsec.setAttribute('selected', true);
            firstOptionInsec.setAttribute('disabled', true);
            // appending to select

            thirdSelectTag.append(firstOptionInsec)

            let count = 0
            for(let key of Object.keys(obj[selectFirst.value][secondSelect.value])){

                optTag = document.createElement('option');
                count++;
                optTag.textContent = key;

                thirdSelectTag.append(optTag)


            }

            if(count != 0){

            
                thirdDiv.append(thirdSelectTag);
                // thirdSelectTag.addEventListener('change', createThirdSelect)
                
            }


    }


}).catch(err => {

    console.log(err);
})
