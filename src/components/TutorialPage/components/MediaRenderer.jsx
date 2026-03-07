import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const MediaRenderer = ({ mediaFiles }) => {
  if (!mediaFiles || mediaFiles.length === 0) return null;

  return (
    <Box mt={2}>
      <Divider />
      <Typography variant="h6" mt={1} mb={1}>
        Attachments
      </Typography>
      {mediaFiles.map((item, i) => {
        if (item.type === "image") {
          return (
            <Box key={i} mb={1}>
              <img
                src={item.url}
                alt={item.name}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          );
        }
        if (item.type === "video") {
          return (
            <Box key={i} mb={1}>
              <video controls style={{ maxWidth: "100%" }}>
                <source src={item.url} />
                Your browser does not support video.
              </video>
            </Box>
          );
        }
        if (item.type === "document") {
          return (
            <Box key={i} mb={1}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default MediaRenderer;
