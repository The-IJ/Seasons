import './Page1.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate, useNavigate } from "react-router-dom";
function Page1() {
    let imageStyle = {
        height: "700px",
        width: "1480px",
        backgroundImage:
        'url("https://media.istockphoto.com/id/1163366315/vector/sky-background-and-pastel-color-vector-illustration.jpg?s=612x612&w=0&k=20&c=xnMNLfDTeCjKQzPgRlgpJLAkBIrnpEsOGKk7HpWHKQY=")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white", 
    };
    const navigate = useNavigate();
    const routeChange1 = () =>{  
        navigate("/weather");
    }
    const routeChange2 = () => {
        window.open("http://127.0.0.1:5000/")
    }
    return (
        <div class = "image" style = {imageStyle}>
            <div className='container'>
                <p class="text-center text-black fs-5 pos1">
                    <br></br><br></br>Hello User!<br></br>
                    If you would like to know more about the season in an image,<br></br>
                    Click on 'IMAGE PROCESSING'!<br></br>
                    If you would like to know the weather conditions of a city,<br></br>
                    Click on 'WEATHER INFO'!
                </p>
                <button type="button" class="btn btn-dark position-absolute top-50 start-50 translate-middle mx-10" onClick={routeChange2}>Image Processing</button>
                <button type="button" class="btn btn-dark position-absolute top-50 start-50 translate-middle pos2" onClick={routeChange1} >Weather Info<span class='mx-500'></span></button>
            </div>
        </div>
    );
}
export default Page1
