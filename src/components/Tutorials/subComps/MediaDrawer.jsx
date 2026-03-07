import React, { useState } from "react";
import { Drawer, Tabs, Tab, Button, Typography, Box } from "@mui/material";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadTutorialMedia,
  removeTutorialMedia,
} from "../../../store/actions";

const TABS = [
  { label: "Image", type: "image", accept: "image/*" },
  { label: "Video", type: "video", accept: "video/*" },
  { label: "Document", type: "document", accept: ".pdf,.doc,.docx,.txt" },
];

const MediaDrawer = ({
  visible,
  onClose,
  owner,
  tutorial_id,
  mediaFiles = [],
  defaultTab = 0,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(defaultTab);

  const uploading = useSelector(({ tutorials: { media } }) => media.uploading);
  const deleting = useSelector(({ tutorials: { media } }) => media.deleting);

  const currentType = TABS[tab].type;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file)
      uploadTutorialMedia(
        owner,
        tutorial_id,
        file,
        currentType,
      )(firebase, firestore, dispatch);
  };

  const handleDelete = (item) =>
    removeTutorialMedia(
      owner,
      tutorial_id,
      item.name,
      item.url,
      item.type,
    )(firebase, firestore, dispatch);

  const visibleFiles = (mediaFiles || []).filter((f) => f.type === currentType);

  return (
    <Drawer anchor="right" open={visible} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={{ width: 380, p: 2 }}>
        <Typography variant="h6" mb={1}>
          Upload Media
        </Typography>

        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {TABS.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>

        <Box mt={2}>
          <input
            type="file"
            accept={TABS[tab].accept}
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: "block", marginBottom: "1rem" }}
          />
          {uploading && <Typography>Uploading...</Typography>}
        </Box>

        <Box mt={2}>
          {visibleFiles.map((item, i) => (
            <Box key={i} sx={{ mb: 2, p: 1, border: "1px solid #eee" }}>
              <Typography variant="body2" noWrap>
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ wordBreak: "break-all" }}>
                {item.url}
              </Typography>
              <Box mt={1}>
                <Button
                  size="small"
                  onClick={() => navigator.clipboard.writeText(item.url)}
                >
                  Copy URL
                </Button>
                <Button
                  size="small"
                  color="error"
                  disabled={deleting}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default MediaDrawer;
