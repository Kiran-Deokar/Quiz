let q_num =0;
let result = 0;
let prev=document.getElementById("prevBtn"); 
let next=document.getElementById("submitBtn");
function quiz(q_num,check,selected){
    let Qus=q_num;
    let output=""
    fetch('./quiz.json')
    .then((response) => response.json())

    .then((json) =>{
        if(Qus>0){
            let q=Qus-1
            if(selected==json[q].Correct){result += 1;console.log(result)}
        }
       
        if(Qus<json.length){
            (check==1)? a="checked":a="";
            (check==2)? b="checked":b="";
            (check==3)? c="checked":c="";
            (check==4)? d="checked":d="";
            document.getElementById("number").innerText=`( ${json[Qus].Q_id} of ${json.length} )`;
            document.getElementById("que").innerHTML= json[Qus].Q_id+" ) "+json[Qus].Q ;
           
            document.getElementById("options").innerHTML=`
            <label class="options">${json[Qus].opt1}
            <input type="radio" name="radio" value="${json[Qus].opt1}" ${a} />
            <span class="checkmark"></span>
            </label>
            <label class="options">${json[Qus].opt2}
            <input type="radio" name="radio" value="${json[Qus].opt2}" ${b} />
            <span class="checkmark"></span>
            </label>
            <label class="options">${json[Qus].opt3}
            <input type="radio" name="radio" value="${json[Qus].opt3}" ${c} />
            <span class="checkmark"></span>
            </label>
            <label class="options">${json[Qus].opt4}
            <input type="radio" name="radio" value="${json[Qus].opt4}" ${d} />
            <span class="checkmark"></span>
            </label>
            `

        }else{
            let submit_test =confirm("Do you want to Submit the test");
            if(submit_test){
                let percentage=(result*100)/json.length;
                document.getElementById("number").innerHTML="<a href='#'>Logout</a>";
                document.getElementById("options").innerHTML="";
                document.getElementById("que").innerHTML= "Result : " + percentage+" %";
                document.getElementById("options").innerText= ((percentage>35)? "Congrats !!! You Passed The Test":"Sorry You're Not Eligible");
                next.setAttribute("class","d-none")
                prev.setAttribute("class","d-none")
                localStorage.clear()
            }
        }
    })
    
}

prev.addEventListener("click",function(){
    if(q_num >0){
        q_num -=1;
        let check= localStorage.getItem(q_num+1)
         quiz(q_num,check);
    }

})
next.addEventListener("click",function(){
    
    q_num +=1;
    let ele = document.getElementsByName('radio');
    for (i = 0; i < ele.length; i++) {
    if (ele[i].checked){
       var index=i+1
       if(localStorage.getItem(q_num)==null){
    var selected=ele[i].value
       }
    localStorage.setItem(q_num,i+1)
}
}
let check= localStorage.getItem(q_num+1)
    quiz(q_num,check,selected,index);
})

quiz(q_num);

