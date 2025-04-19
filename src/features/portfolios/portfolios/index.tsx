"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  buttonVariants,
  containerVariants,
  pulseVariants,
} from "./MotionVariants";

export default function Portfolios() {
  const hasPortfolio = false;

  return (
    <div>
      <motion.div
        className="space-y-8 py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hasPortfolio ? (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Portfolio</h2>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/settings">
                  <Edit className="mr-2 size-4" />
                  Edit
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="relative mb-6 flex size-24 items-center justify-center rounded-full bg-primary/10"
              variants={pulseVariants}
              animate="pulse"
            >
              <AlertCircle className="size-12 text-primary" />
              <span className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <PlusCircle className="size-6" />
              </span>
            </motion.div>
            <motion.h2
              className="mb-2 text-2xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              No portfolio yet
            </motion.h2>
            <motion.p
              className="mb-6 max-w-md text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              Create your portfolio to showcase your projects and skills
            </motion.p>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                className="group relative overflow-hidden px-8 py-6 transition-all duration-300 hover:shadow-lg"
                size="lg"
                asChild
              >
                <Link href="/dashboard/create">
                  <div className="relative z-10 flex items-center gap-2">
                    <PlusCircle className="size-5" />
                    <span className="font-medium">
                      Create your first portfolio
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
