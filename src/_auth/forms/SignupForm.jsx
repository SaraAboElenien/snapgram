import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import React from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from '@/components/Shared/Loader';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import api from "@/api/axios";



// Yup Validation Schema
const SignupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const form = useForm({
    resolver: yupResolver(SignupValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Handler
  const handleSignup = async (user) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/v1/auth/user/signup`,
        user
      );
      const { data } = response;
  
      if (data?.message === "Congrats! You're registered") {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        toast.success("Registration successful! please check your email to verify your account.");
        navigate("/sign-in");
      } else {
        setIsLoading(false);
        toast.error(data?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again later.");
    }
  };
      return (
    <div className="sm:w-420 flex-center flex-col">
      <img src={"/assets/images/logo.svg"} alt="logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-light-2">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use Snapgram, please enter your details.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label" >First Name</FormLabel>
                <FormControl>
                  <Input type="text" className='text-black' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Last Name</FormLabel>
                <FormControl>
                  <Input type="text"   className='text-black' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email"  className='text-black'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password"  className='text-black'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <p className="text-red text-center">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="shad-button_primary" disabled={isLoading}>
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Login Redirect */}
          <p className="text-small-regular text-light-2 text-center mt-2  pb-5">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
