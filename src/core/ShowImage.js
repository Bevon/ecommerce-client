import {API} from '../config'


export default function ShowImage({item, url}){
    return (
        <div>
            <img src={`${API}/${url}/photo/${item._id}`} className="card-img-top product-img" style={{maxHeight:'100%', maxWidth:'100%'}} alt={item.name}></img>
        </div>
    )
}
