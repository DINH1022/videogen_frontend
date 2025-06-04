import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Divider,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import {
  ExpandMore,
  Language as LanguageIcon,
  Link as LinkIcon,
  Check,
  Add,
} from "@mui/icons-material";

const languages = [
  { value: "afrikaans", label: "Tiếng Afrikaans" },
  { value: "arabic", label: "Tiếng Ả Rập" },
  { value: "bengali", label: "Tiếng Bengali" },
  { value: "bulgarian", label: "Tiếng Bulgaria" },
  { value: "catalan", label: "Tiếng Catalan" },
  { value: "chinese", label: "Tiếng Trung" },
  { value: "croatian", label: "Tiếng Croatia" },
  { value: "czech", label: "Tiếng Séc" },
  { value: "danish", label: "Tiếng Đan Mạch" },
  { value: "dutch", label: "Tiếng Hà Lan" },
  { value: "english", label: "Tiếng Anh" },
  { value: "estonian", label: "Tiếng Estonia" },
  { value: "finnish", label: "Tiếng Phần Lan" },
  { value: "french", label: "Tiếng Pháp" },
  { value: "german", label: "Tiếng Đức" },
  { value: "greek", label: "Tiếng Hy Lạp" },
  { value: "gujarati", label: "Tiếng Gujarat" },
  { value: "hindi", label: "Tiếng Hindi" },
  { value: "hungarian", label: "Tiếng Hungary" },
  { value: "icelandic", label: "Tiếng Iceland" },
  { value: "indonesian", label: "Tiếng Indonesia" },
  { value: "italian", label: "Tiếng Ý" },
  { value: "japanese", label: "Tiếng Nhật" },
  { value: "korean", label: "Tiếng Hàn" },
  { value: "latvian", label: "Tiếng Latvia" },
  { value: "lithuanian", label: "Tiếng Lithuania" },
  { value: "malay", label: "Tiếng Mã Lai" },
  { value: "malayalam", label: "Tiếng Malayalam" },
  { value: "norwegian", label: "Tiếng Na Uy" },
  { value: "polish", label: "Tiếng Ba Lan" },
  { value: "portuguese", label: "Tiếng Bồ Đào Nha" },
  { value: "romanian", label: "Tiếng Romania" },
  { value: "russian", label: "Tiếng Nga" },
  { value: "serbian", label: "Tiếng Serbia" },
  { value: "slovak", label: "Tiếng Slovakia" },
  { value: "slovenian", label: "Tiếng Slovenia" },
  { value: "spanish", label: "Tiếng Tây Ban Nha" },
  { value: "swahili", label: "Tiếng Swahili" },
  { value: "swedish", label: "Tiếng Thụy Điển" },
  { value: "tamil", label: "Tiếng Tamil" },
  { value: "telugu", label: "Tiếng Telugu" },
  { value: "thai", label: "Tiếng Thái" },
  { value: "turkish", label: "Tiếng Thổ Nhĩ Kỳ" },
  { value: "ukrainian", label: "Tiếng Ukraine" },
  { value: "urdu", label: "Tiếng Urdu" },
  { value: "vietnamese", label: "Tiếng Việt" },
  { value: "welsh", label: "Tiếng Wales" },
];

const LanguageSelect = ({ value, onChange, sx, ...props }) => {
  const [open, setOpen] = useState(false);
  const [customLanguage, setCustomLanguage] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const selectedLanguage =
    languages.find((lang) => lang.value === value) ||
    (value ? { value, label: value } : null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setShowCustomInput(false);
    setCustomLanguage("");
  };

  const handleSelect = (language) => {
    onChange(language.value);
    handleClose();
  };

  const handleCustomSubmit = () => {
    if (customLanguage.trim()) {
      onChange(customLanguage.trim());
      handleClose();
    }
  };

  const handleShowCustomInput = () => {
    setShowCustomInput(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <Box sx={sx}>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        endIcon={<ExpandMore />}
        fullWidth
        sx={{
          justifyContent: "space-between",
          textAlign: "left",
          color: selectedLanguage ? "inherit" : "text.secondary",
          borderColor: open ? "primary.main" : "inherit",
        }}
        {...props}
      >
        {selectedLanguage ? selectedLanguage.label : "Chọn ngôn ngữ"}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1300, width: anchorEl?.offsetWidth || "auto" }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              maxHeight: 300,
              overflow: "auto",
              border: 1,
              borderColor: "divider",
              boxShadow: 3,
            }}
          >
            {showCustomInput ? (
              <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  ref={inputRef}
                  size="small"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  placeholder="Nhập ngôn ngữ..."
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCustomSubmit();
                    }
                    if (e.key === "Escape") {
                      setShowCustomInput(false);
                      setCustomLanguage("");
                    }
                  }}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleCustomSubmit}
                >
                  <Check fontSize="small" />
                </Button>
              </Box>
            ) : (
              <List dense>
                {languages.map((language) => (
                  <ListItem key={language.value} disablePadding>
                    <ListItemButton
                      onClick={() => handleSelect(language)}
                      selected={value === language.value}
                    >
                      <ListItemText primary={language.label} />
                      {value === language.value && (
                        <Check color="primary" fontSize="small" />
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleShowCustomInput}>
                    <Add sx={{ mr: 1 }} fontSize="small" />
                    <ListItemText primary="Thêm ngôn ngữ khác..." />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
export default LanguageSelect;
