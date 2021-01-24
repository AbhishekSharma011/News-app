import {Button} from 'reactstrap';   
import './Header.css';
export default function Header(props)  
{
    function onClickHandler()
    {
        props.latestNews();
    }
return (
    <div className="button">        
    <Button id="refresh-button" className="btn-primary" onClick={onClickHandler}>Show Latest News</Button>
    </div>
)
}
