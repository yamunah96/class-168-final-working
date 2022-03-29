AFRAME.registerComponent("create-button",{
    init:function(){
        // button1
        var button1= document.createElement("button")
        button1.innerHTML="RATE US"
        button1.setAttribute("id","rating")
        button1.setAttribute("class","btn btn-warning")

        // button2
        var button2= document.createElement("button")
        button2.innerHTML="ORDER NOW"
        button2.setAttribute("id","order")
        button2.setAttribute("class","btn btn-warning")


        var buttondiv= document.getElementById("button-div")
        buttondiv.appendChild(button1)
        buttondiv.appendChild(button2)

    }
})