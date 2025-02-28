"use client";
import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
export default function BlogPost({
  title,
  excerpt,
  image,
  author,
  date,
  category,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Chip
            label={category}
            size="small"
            sx={{ mb: 1, bgcolor: "primary.main", color: "white" }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {excerpt}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ width: 32, height: 32, mr: 1 }}
                src={author.avatar}
              />
              <Typography variant="body2" color="text.primary">
                {author.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
