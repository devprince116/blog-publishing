"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "Technology",
    },
  });

  // Function to generate slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const onSubmit = async (data: {
    title: string;
    content: string;
    category: string;
  }) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a blog.");
      router.push("/login");
      return;
    }

    const requestData = {
      data: {
        title: data.title,
        slug: generateSlug(data.title),
        content: data.content,
        category: data.category,
      },
    };

    try {
      const response = await fetch(`${STRAPI_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to submit blog");
      }

      toast.success("Blog submitted");
      reset();
      router.push("/blogs");
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Blog
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Blog Title"
                  fullWidth
                  margin="normal"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Content"
                  fullWidth
                  multiline
                  rows={6}
                  margin="normal"
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Box mt={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit Blog"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default CreateBlog;
