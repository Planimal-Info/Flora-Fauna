import "./UserCards.css";

export default function UserCards(props){
  
  return(
    <div className="user-card">
    <img src={props.source} className="user-img" onClick={props.modalHandler}/>
    <h2 className="user-card-title">{props.title}</h2>
    <h4 className="user-card-desc">{props.desc}</h4>
    </div>
  )
}
