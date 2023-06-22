import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        img: loggedInUser.photoURL,
      };
      fetch("https://sporting-summers-sever-side.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <div className="flex text-center justify-center">
      <p className="mr-2 -ml-5 font-serif"> Login With:</p>
        <button
          onClick={handleGoogleSignIn}
          className="text-3xl mr-5"
        >
          <FcGoogle></FcGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
