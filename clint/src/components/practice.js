import React from 'react'
 

class Practice extends React.Component{
  constructor(){
    super()
    this.state ={
      arr:[ {
              name:"qasim"
      },{
           name:"ameen"
      }]
    }
  }
  update(){
    var foundIndex = this.state.arr.findIndex(x => x.name == "Muhammad Qasim Ameen");
       this.state.arr[foundIndex] = "qasim"
       console.log(this.state.arr)
  }
  render(){
    return(
      <div style={{textAlign:'center',height:'700',width:'auto',justifyContent:'center'}}>
         <h3>Javasript Array practice</h3>
           <br /><hr />
             <button onClick={()=>this.update()}>updating</button>
            {this.state.arr.map((value,index)=>{
              return <p> {value.name} </p>
            })}
      </div>
    )
  }
}export default Practice