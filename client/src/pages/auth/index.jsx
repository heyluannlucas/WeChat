import Background from "../../assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be the same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password }
        );
        if (response.data.user.id) {
          localStorage.setItem("authToken", response.data.token);
          setUserInfo(response.data.user);
          navigate(response.data.user.profileSetup ? "/chat" : "/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password }
        );
        if (response.status === 201) {
          localStorage.setItem("authToken", response.data.token);
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="h-[80vh] bg-white border border-gray-300 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl overflow-hidden flex">
        {/* Login Content */}
        <div className="flex flex-col gap-10 items-center justify-center bg-gray-800 text-white p-8 w-1/2 rounded-l-3xl shadow-md">
          {/* Logo */}
          <Logo />

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger
                className="data-[state=active]:bg-gray-700 text-white border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gray-700 text-white border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                value="signup"
              >
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="flex flex-col gap-5 mt-10">
              <Input
                placeholder="Email"
                type="email"
                className="bg-gray-700 text-white placeholder:text-gray-400 rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="bg-gray-700 text-white placeholder:text-gray-400 rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="bg-purple-600 hover:bg-purple-500 rounded-full p-6" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="flex flex-col gap-5">
              <Input
                placeholder="Email"
                type="email"
                className="bg-gray-700 text-white placeholder:text-gray-400 rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="bg-gray-700 text-white placeholder:text-gray-400 rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="bg-gray-700 text-white placeholder:text-gray-400 rounded-full p-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="bg-purple-600 hover:bg-purple-500 rounded-full p-6" onClick={handleSignup}>
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image Content */}
        <div className="relative flex justify-center items-center bg-gray-200 w-1/2 rounded-r-3xl shadow-md overflow-hidden">
          <img src={Background} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <path
          d="M10 0C4.48 0 0 4.48 0 10v8c0 5.52 4.48 10 10 10h3c0 2.21 1.79 4 4 4s4-1.79 4-4h3c5.52 0 10-4.48 10-10v-8c0-5.52-4.48-10-10-10H10z"
          fill="#8338ec"
        />
        <path
          d="M28 0c5.52 0 10 4.48 10 10v8c0 5.52-4.48 10-10 10h-3c0 2.21-1.79 4-4 4s-4-1.79-4-4h-3c-5.52 0-10-4.48-10-10v-8c0-5.52 4.48-10 10-10h3c0-2.21 1.79-4 4-4s4 1.79 4 4h3z"
          fill="#975aed"
        />
      </svg>
      <span className="text-3xl font-semibold text-[#8338ec]">WeChat</span>
    </div>
  );
};

export default Auth;
