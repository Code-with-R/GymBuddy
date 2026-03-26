// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Auth = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="flex items-center bg-white min-h-screen">
//       <div className="container mx-auto px-6 py-6">
//         <div className="flex flex-col lg:flex-row rounded-xl shadow-xl overflow-hidden">

//           {/* Left Side */}
//           <div className="w-full lg:w-1/2 p-12">
//             <h3 className="text-3xl text-gray-700 mb-2 font-semibold">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </h3>
//             <p className="text-gray-600">
//               {isLogin ? "Login To Your Account" : "Join your Account"}
//             </p>

//             {/* Social Buttons */}
//             <div className="grid grid-cols-2 gap-6 mt-6">
//               <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
//                 <img className="w-4" src="./google.png" alt="google" />
//                 Google
//               </button>
//               <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded">
//                 <img className="w-5" src="./facebook.png" alt="facebook" />
//                 Facebook
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="flex items-center gap-2 mt-6">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="text-gray-700">or</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
              
//               {/* Name Fields */}
//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4 mt-6">
//                   <div>
//                     <label className="block text-gray-700 mb-2">First Name</label>
//                     <input
//                       className="w-full px-4 py-2 border outline-none"
//                       placeholder="Enter your First Name"
//                       type="text"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-2">Last Name</label>
//                     <input
//                       className="w-full px-4 py-2 border outline-none"
//                       placeholder="Enter your Last Name"
//                       type="text"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Email */}
//               <div className="mb-4 mt-6">
//                 <label className="block text-gray-700 mb-2">Email Address</label>
//                 <input
//                   className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
//                   placeholder="Enter your email address"
//                   type="email"
//                 />
//               </div>

//               {/* Password */}
//               <div className="mb-4 mt-6">
//                 <label className="block text-gray-700 mb-2">Password</label>
//                 <div className="relative">
//                   <input
//                     className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
//                     placeholder="Enter your password"
//                     type={showPassword ? "text" : "password"}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute top-3 right-3 text-gray-600"
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               {!isLogin && (
//                 <div className="mb-4 mt-6">
//                   <label className="block text-gray-700 mb-2">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
//                       placeholder="Confirm your password"
//                       type={showConfirmPassword ? "text" : "password"}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute top-3 right-3 text-gray-600"
//                     >
//                       {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Remember Me */}
//               {isLogin && (
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="flex items-center gap-2">
//                     <input className="w-4 h-4" type="checkbox" />
//                     <span className="text-sm text-gray-700 font-semibold">
//                       Remember Me
//                     </span>
//                   </div>
//                   <a
//                     href="#"
//                     className="text-amber-600 text-sm font-semibold hover:underline"
//                   >
//                     Forgot Password
//                   </a>
//                 </div>
//               )}

//               {/* Submit */}
//               <div className="mt-6 mb-2">
//                 <button className="w-full bg-amber-600 text-white font-bold rounded py-2">
//                   {isLogin ? "Login" : "Sign Up"}
//                 </button>
//               </div>

//               {/* Toggle */}
//               <p className="text-sm text-center text-gray-600">
//                 {isLogin
//                   ? "Don't have an account?"
//                   : "Already have an account?"}
//                 <span
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-amber-600 hover:underline ml-2 cursor-pointer"
//                 >
//                   {isLogin ? "Sign Up" : "Login"}
//                 </span>
//               </p>
//             </form>
//           </div>

//           {/* Right Side */}
//           <div
//             className="relative w-full lg:w-1/2 h-screen bg-cover bg-center flex items-center justify-center text-white"
//             style={{ backgroundImage: "url('/gym.png.jpg')" }}
//           >
//             <div className="absolute inset-0 bg-black opacity-30"></div>
//             <div className="relative text-center">
//               <h3 className="text-3xl font-bold">
//                 Login your account and explore it.
//               </h3>
//               <p className="max-w-sm mx-auto">
//                 Login your account and enjoy your gym time
//               </p>
//               <button className="mt-6 px-6 py-2 border-2 border-white rounded font-bold">
//                 Create an Account
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;