let  BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns= document.querySelectorAll(".dropdown select");

let btn = document.querySelector(" form .btn");

let fromCurr= document.querySelector(".from select");

let toCurr= document.querySelector(".to select");

let msg = document.querySelector(".msg")

for (let select of dropdowns){
    for(currCode in countryList){
        let  newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}

let changeFlag = (element)=>{
    let currCode= element.value;
    let countrycode=  countryList[currCode];
    let flagSrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= flagSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=  document.querySelector(".amount input")
    let amtval= amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value= "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const flag =  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(flag);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt= amtval * rate;
    msg.innerText= `${amtval} ${fromCurr.value}= ${finalAmt} ${toCurr.value}`
});