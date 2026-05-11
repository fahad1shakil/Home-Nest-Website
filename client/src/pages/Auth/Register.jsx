import { Image, Lock, Mail, User, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { googleLogin, registerUser, updateProfileInfo, loading, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const registerHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const lengthRegex = /.{6,}/;

    if (!uppercaseRegex.test(password)) {
      toast.error("Must have an Uppercase letter in the password");
      return;
    }
    if (!lowercaseRegex.test(password)) {
      toast.error("Must have a Lowercase letter in the password");
      return;
    }
    if (!lengthRegex.test(password)) {
      toast.error("Length must be at least 6 characters");
      return;
    }

    registerUser(email, password)
      .then(async () => {
        await updateProfileInfo(name, photo);
        toast.success("Registration Success");
        setLoading(false);
        navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then(() => {
        toast.success("Login Success"),
          setLoading(false),
          navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error(err.message),
          setLoading(false),
          navigate(location.state || "/register");
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-base-200">
      {/* Left Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-base-200 relative">
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center gap-2 px-6 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-black uppercase tracking-widest text-[10px] shadow-lg shadow-black/5 transition-all hover:scale-105 group z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Home
        </Link>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-white/20 backdrop-blur-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-primary mb-2">Join Us</h2>
            <p className="text-gray-400 font-medium">
              Create your premium HomeNest account
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={registerHandler} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="text-gray-600 font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Full Name
                </span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 border-gray-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-gray-600 font-bold flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" /> Photo URL
                </span>
              </label>
              <input
                name="photoUrl"
                type="text"
                placeholder="https://your-photo-link.com"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 border-gray-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-gray-600 font-bold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> Email
                </span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 border-gray-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-gray-600 font-bold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" /> Password
                </span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 border-gray-200"
              />
            </div>

            <div className="form-control mt-8">
              <button className="btn-premium w-full text-lg">
                <UserPlus className="w-6 h-6" /> Create Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="grow h-px bg-gray-100"></div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="grow h-px bg-gray-100"></div>
          </div>

          {/* Google Register */}
          <button
            onClick={googleLoginHandler}
            type="button"
            className="btn w-full border-2 border-gray-100 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-3 py-4"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Google Account
          </button>

          {/* Bottom Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-primary font-bold hover:text-secondary transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image / Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary to-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
          alt="Modern Apartment"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white z-10">
          <h2 className="text-5xl font-black mb-4 drop-shadow-lg">Join HomeNest</h2>
          <p className="text-white/90 max-w-md text-lg font-medium">
            Join thousands of satisfied users and find your perfect home today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
