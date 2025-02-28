"use client";
import BlogPost from "@/components/BlogPost";
import Navigation from "@/components/Navigation";
import CommentDialog from "@/components/CommentDialog";
import { Typography, Container, Grid, Box, IconButton } from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Head from "next/head";
import toast from "react-hot-toast";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null
  );
  const [newComment, setNewComment] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs?populate=comments`);
        const data = await response.json();

        const formattedPosts = data.data
          .filter((blog) => blog.isApproved)
          .map((blog) => ({
            id: blog.id,
            title: blog.title,
            excerpt: blog.content.substring(0, 100) + "...",
            image: "https://source.unsplash.com/random/800x600/?technology",
            author: "Unknown Author",
            date: new Date(blog.publishedAt).toLocaleDateString(),
            category: blog.category || "Uncategorized",
            likes: blog.likes || 0,
            liked: false,
            comments: blog.comments
              .filter((comment) => comment.isApproved)
              .map((comment) => comment.text),
          }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    updatedPosts[index].likes += updatedPosts[index].liked ? 1 : -1;
    setPosts(updatedPosts);
  };

  const handleOpenCommentModal = (index: number) => {
    setSelectedPostIndex(index);
    setCommentModalOpen(true);
  };
  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
    setNewComment("");
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "" || selectedPostIndex === null) return;

    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            text: newComment,
            blog: posts[selectedPostIndex].id,
            commentStatus: "Pending",
            isApproved: false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      toast.success("Comment submitted");
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    handleCloseCommentModal();
  };

  return (
    <>
      <Head>
        <title>DevBlog - Modern Web Development</title>
      </Head>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          Featured Articles
        </Typography>
        <Grid container spacing={4}>
          {posts.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No approved blogs found.
            </Typography>
          ) : (
            posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: 6 }}>
                <BlogPost {...post} />
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton
                    onClick={() => handleLike(index)}
                    sx={{ color: post.liked ? "red" : "gray" }}
                  >
                    <Favorite />
                  </IconButton>
                  <Typography sx={{ mr: 2 }}>{post.likes}</Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenCommentModal(index)}
                  >
                    <Comment />
                  </IconButton>
                  <Typography>{post.comments.length}</Typography>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Comment Modal */}
      <CommentDialog
        open={commentModalOpen}
        onClose={handleCloseCommentModal}
        onSubmit={handleAddComment}
        comment={newComment}
        setComment={setNewComment}
        comments={
          selectedPostIndex !== null ? posts[selectedPostIndex].comments : []
        }
      />
    </>
  );
}
