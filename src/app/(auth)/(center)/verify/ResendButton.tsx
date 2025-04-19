"use client";

import { resendEmail } from "@/actions/auth/actions";
import Loader from "@/components/globals/Loader";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  email: string;
};

const ResendButton = ({ email }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await resendEmail(email);
      if (error || !data) {
        toast.error("Email Not Sent");
      } else {
        toast.success("Email Sent");
      }
    } catch (error) {
      toast.error("Unexpected Error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="w-full" onClick={handleResendEmail} disabled={isLoading}>
      <Loader state={isLoading}>Resend Email</Loader>
    </Button>
  );
};

export default ResendButton;
