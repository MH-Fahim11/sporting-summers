import { Link, useRouteError } from "react-router-dom";
import "./error-page.css"
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page " className="body">
      <div id="particles" class="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <main className="main">
        <section>
            <h1>Page Not Found!</h1>
            <div>
                <span>4</span>
                <span class="circle">0</span>
                <span>4</span>
            </div>
            <p>We are unable to find the page<br/>you're looking for.</p>
            <div>
                <button><Link to="/">Back to Home Page</Link> </button>
            </div>
        </section>
    </main>
    </div>
  );
}