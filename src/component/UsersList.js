

function UsersList(props){
    <div key={props.key}>
        <img src={props.image} />
        <h2>{props.prefix} {props.name} {props.lastName}</h2>
        <p>{props.title}</p>
    </div>
}

export default UsersList;